//  SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.2;
 
contract EcommerceStore {
    Products[] public deployedProducts;
    
    function createProduct(
        // uint minimum
    ) public {
        // Products newProduct = new Products(minimum,msg.sender);
        Products newProduct = new Products(msg.sender);

        deployedProducts.push(newProduct);
    }
    
    function getDeployedCampaigns() public view returns (Products[] memory) {
        return deployedProducts;
    }
}
 
contract Products {

    struct Product {
        string name;
        string description;
        uint init_amt;
        uint amt;
        uint price;

        // address payable deposit_fund;
        uint deposit_fund;
        mapping (address => bool) buyer_confirmations;
        mapping (address => bool) past_buyers;
        address[] buyer_ids;

        address payable recipient;

        uint rating;
        uint tot_ratings;
        mapping (string => uint) rating_review;
    }

    struct Seller {
        string name;
        Product[] productid;
        uint rating;
    }

    // Product[] public products;
    address payable public seller;
    uint public numProducts;
    uint public minimumContribution;

    // address[] buyer_id;

    mapping(uint => Product) public products;
    // mapping(address => bool) public buyers;
    mapping(address => Seller) public sellers;

    constructor(
        // uint minimum,
        address creator
    ) {
        seller = payable(creator);
        // minimumContribution = minimum;
    }

    function createProduct(
        string calldata description
        , uint price
        , uint amt
        // , address payable deposit_fund
    ) public restrictedToSeller payable{
        require(address(msg.sender).balance > price*2 ether, "Not enough balance to sell");
        require(msg.value >= price*0.001 ether, "Not enough money to buy");
        //  create new product
       Product storage newProduct = products[numProducts];
       // increase product count
       numProducts ++;
       // add information about new request
       newProduct.description = description;
       newProduct.price = price;
    //    Create deposit fund for this product in to stay in contract
    //    when both havent approved
       newProduct.deposit_fund = 0;        
       newProduct.amt = amt;
       newProduct.init_amt = amt;

    }
    

    function buyProduct(
        uint product_id
        // , uint deposit
        // , address payable recipient
    ) public restrictedToBuyer payable {
        // select a product they want to buy
        Product storage curProd = products[product_id];
        require(address(msg.sender).balance > curProd.price*2 ether, "Not enough balance to sell");
        require(msg.value == curProd.price*2 ether, "Not enough money to buy");
        require(curProd.amt > 0, 'Product ran out');
        curProd.deposit_fund += msg.value;
        // curProd.recipient = recipient;

        curProd.buyer_confirmations[address(msg.sender)] = false;      
        curProd.amt --;
    
        curProd.buyer_ids.push(address(msg.sender));

    }
    function observeBuyers(
        uint product_id
    ) public restrictedToSeller 
    view returns (address[] memory){
        Product storage curProd = products[product_id];
        return curProd.buyer_ids;
    }

    function approvePurchase(
        uint product_id
        , address payable buyer_id
    ) public restrictedToSeller{
        Product storage curProd = products[product_id];
        curProd.buyer_confirmations[buyer_id] = true;      
    }

    function rejectPurchase(
        uint product_id
        , address payable buyer_id
    ) public restrictedToSeller{
        // reject then refund

        Product storage curProd = products[product_id];
        require(curProd.past_buyers[address(msg.sender)], 'Buyer already rejected');
        require(!curProd.buyer_confirmations[address(msg.sender)], 'Buyer already bought product');

        payable(address(buyer_id)).transfer(curProd.price*2 ether);
        curProd.amt ++;
        curProd.past_buyers[buyer_id] = true;
    }

    function approveReceipt(
        uint product_id
        // , address payable buyer_id

    ) public restrictedToBuyer payable{
        Product storage curProd = products[product_id];
        // get request at provided index from storage
        // sender must not have voted yet ?????
        require(curProd.buyer_confirmations[address(msg.sender)], 'Seller has not confirmed');
        // curProd.recipient.transfer(curProd.price);
        payable(address(msg.sender)).transfer(curProd.price*1 ether);
        curProd.deposit_fund -= curProd.price*2;
        // need to transfer to seller too *************************
        payable(address(seller)).transfer(curProd.price*1 ether);
        curProd.buyer_confirmations[address(msg.sender)] = false;      
    }

    function addRating(
        uint product_id
        , uint rating
        , string memory review
    ) public restrictedToBuyer {
        Product storage curProd = products[product_id];
        require(curProd.buyer_confirmations[address(msg.sender)], 'You did not buy the product to review');
        curProd.rating_review[review] = rating;
        curProd.tot_ratings ++;
        curProd.rating += rating;
        
    }
    
modifier restrictedToSeller() {
        require(msg.sender == seller, 'Only Seller can use');
        _;
    }
modifier restrictedToBuyer() {
        require(msg.sender != seller, 'Only Buyer can use');
        _;
    }

}