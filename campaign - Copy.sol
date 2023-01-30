//  SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.2;
 
contract EcommerceStore {
    Products[] public deployedProducts;
    
    function createProduct(uint minimum) public {
        Products newProduct = new Products(minimum,msg.sender);
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
        uint amt;
        uint price;

        // address payable deposit_fund;
        uint deposit_fund;
        mapping (address => bool) buyer_confirmations;
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

    mapping(uint => Product) public products;
    mapping(address => bool) public buyers;
    mapping(address => Seller) public sellers;


    constructor(uint minimum, address creator) {
        seller = payable(creator);
        minimumContribution = minimum;
    }

    function createProduct(
        string calldata description
        , uint price
        , uint amt
        // , address payable deposit_fund
        , uint deposit_fund
    ) public restrictedToSeller {
        require(address(msg.sender).balance > price*2, "Not enough balance to sell");
        //  create new product
       Product storage newProduct = products[numProducts];
       // increase product count
       numProducts ++;
       // add information about new request
       newProduct.description = description;
       newProduct.price = price;
    //    Create deposit fund for this product in to stay in contract
    //    when both havent approved
       newProduct.deposit_fund = deposit_fund;        
       newProduct.amt = amt;
    }
    
    function buyProduct(
        uint product_id
        , uint deposit
        , address payable recipient
    ) public restrictedToBuyer payable {
        // select a product they want to buy
        Product storage curProd = products[product_id];
        require(address(msg.sender).balance > curProd.price*2, "Not enough balance to sell");
        require(deposit >= curProd.price*2, "Not enough money to buy");
        require(curProd.amt > 0, 'Product ran out');
        curProd.deposit_fund += deposit;
        curProd.recipient = recipient;

        curProd.buyer_confirmations[address(msg.sender)] = false;      
        curProd.amt --;
    }

    function approvePurchase(
        uint product_id
        // , address payable buyer
    ) private restrictedToSeller{
        Product storage curProd = products[product_id];
        curProd.buyer_confirmations[address(msg.sender)] = true;      
    }

    function rejectPurchase(
        uint product_id
        // , address payable buyer
    ) private restrictedToSeller{
        // reject then refund
        Product storage curProd = products[product_id];
        curProd.recipient.transfer(curProd.price*2);
        curProd.amt ++;

    }

    function approveReceipt(
        uint product_id
    ) public restrictedToBuyer{
        Product storage curProd = products[product_id];
        // get request at provided index from storage
        // sender must not have voted yet ?????
        require(!curProd.buyer_confirmations[address(msg.sender)]);
        curProd.recipient.transfer(curProd.price);
        curProd.deposit_fund -= curProd.price*2;
        seller.transfer(curProd.price);
        // need to transfer to seller too *************************
        // curProd.recipient.transfer(curProd.price);
    }

    function addRating(
        uint product_id
        , uint rating
        , string memory review
    ) public restrictedToBuyer {
        Product storage curProd = products[product_id];
        require(curProd.buyer_confirmations, 'You did not buy the product to review');
        curProd.rating_review[review] = rating;
        curProd.tot_ratings ++;
        curProd.rating += rating
        
    }
    
modifier restrictedToSeller() {
        require(msg.sender == seller);
        _;
    }
modifier restrictedToBuyer() {
        require(msg.sender != seller);
        _;
    }

}