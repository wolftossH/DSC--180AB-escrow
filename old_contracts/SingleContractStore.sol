
//  SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.2;
 
contract Store {

    struct Product {
        string name;
        string description;
        uint init_amt;
        uint amt;
        uint price;

        uint deposit_fund;
        mapping (address => bool) buyer_confirmations;
        mapping (address => bool) past_buyers;
        mapping (address => bool) past_rejects;

        address[] buyer_ids;

        address seller;

        uint rating;
        uint tot_ratings;
        mapping (string => uint) rating_review;
    }

    struct Seller {
        address seller;
        string name;
        uint[] products;
        uint rating;
    }

    Product[] public allProducts;
    Seller[] public allSellers;

    uint public numProducts;
    uint public minimumContribution;

    mapping(uint => Product) public products;
    mapping(address => Seller) public sellers;

    function createProduct (
        string calldata description
        , uint price
        , uint amt
    ) public payable {

        require(address(msg.sender).balance > price*2 ether, "Not enough balance to sell");
        require(msg.value == price*1 ether, "Value must be equal to");
        
        //  create new product
        uint256 idx = allProducts.length;
        allProducts.push();

        Product storage newProduct = products[idx];
        
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
        newProduct.seller = address(msg.sender);

        Seller storage curSeller = sellers[address(msg.sender)];
        curSeller.products.push(idx);
    }
    

    function buyProduct(
        uint product_id
        // , uint deposit
        // , address payable recipient
    ) public payable {
        // select a product they want to buy
        Product storage curProd = products[product_id];
        require(address(msg.sender).balance > curProd.price*2 ether, "Not enough balance to sell");
        // add 0.0001 to the price to maintain money in Store contract for transferring fee & 
        require(msg.value == curProd.price*2*1 ether, "Not enough money to buy");
        // require(msg.value == price*0.00001 ether, "Value must be equal to");
        require(curProd.amt > 0, 'Product ran out');
        
        curProd.deposit_fund += msg.value;
        curProd.buyer_confirmations[address(msg.sender)] = false;      
        curProd.amt --;
        curProd.buyer_ids.push(address(msg.sender));

    }

    function approvePurchase(
        uint product_id
        , address payable buyer_id
    ) public {
        /*
        Select a buyer from a product to determine if the buyer is fine to buy
        */

        Product storage curProd = products[product_id];
        require(curProd.seller == address(msg.sender), 'Only the seller can approve Purchase');
        curProd.buyer_confirmations[buyer_id] = true;      
    }

    function rejectPurchase(
        uint product_id
        , address payable buyer_id
    ) public {
        /*
        Select a buyer from a product to reject from buying
        */
        // reject then refund
        Product storage curProd = products[product_id];
        require(curProd.seller == address(msg.sender), 'Only the seller can reject Purchase');
        require(!curProd.past_rejects[address(msg.sender)], 'Buyer already rejected');
        require(!curProd.past_buyers[address(msg.sender)], 'Buyer already bought product');

        payable(address(buyer_id)).transfer(curProd.price*2 ether);
        curProd.amt ++;
        curProd.past_rejects[buyer_id] = true;
    }

    function approveReceipt(
        uint product_id
        // , address payable buyer_id

    ) public {
        /*
        Once confirm receive the product or purchase, the buyer now can get back the refund.
        This also pays the seller the amount
        */
        Product storage curProd = products[product_id];
        // get request at provided index from storage
        // sender must not have voted yet ?????
        require(curProd.buyer_confirmations[address(msg.sender)], 'Seller has not confirmed');
        require(!curProd.past_buyers[address(msg.sender)], 'Buyer already bought the product');

        payable(address(msg.sender)).transfer(curProd.price*1 ether);
        // need to transfer to seller too *************************
        payable(curProd.seller).transfer(curProd.price*1 ether);

        curProd.deposit_fund -= curProd.price*2;
        // curProd.buyer_confirmations[address(msg.sender)] = false;  
        curProd.past_buyers[address(msg.sender)] = true;

        if (curProd.amt == 0) {
            payable(curProd.seller).transfer(curProd.price*1 ether);
        }
            
    }

    function observeBuyers(
        uint product_id
    ) public
    view returns (address[] memory){
        /*
        Show list of buyers for seller to choose
        */
        Product storage curProd = products[product_id];
        require(curProd.seller == address(msg.sender));
        return curProd.buyer_ids;
    }

    function addRating(
        uint product_id
        , uint rating
        , string memory review
    ) public {
        Product storage curProd = products[product_id];
        require(curProd.seller != address(msg.sender));
        require(curProd.buyer_confirmations[address(msg.sender)], 'You did not buy the product to review');
        curProd.rating_review[review] = rating;
        curProd.tot_ratings ++;
        curProd.rating += rating;
        
    }

}