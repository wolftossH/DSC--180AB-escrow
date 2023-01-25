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
        uint price;
        // address payable escrowContracts;
        address payable seller;
        mapping (address => bool) confirmations;
        mapping (address => string) buyer_id;
        // float rating;
        // mapping (float => string) rating_review;
        uint amt;
    }

    address public seller;
    uint public numProducts;
    uint public minimumContribution;

    mapping(uint => Product) public products;
    mapping(address => bool) public sellers;

    constructor(uint minimum, address creator) {
        seller = creator;
        minimumContribution = minimum;
    }

    function createProduct(
        string calldata description, uint price,
        uint amt
        , address payable seller
    ) public restrictedToSeller {
        require(address(msg.sender).balance > price*2, "The msg.sender is not payable");
        //  create new product
       Product storage newProduct = products[numProducts];
       // increase product count
       numProducts ++;
       // add information about new request
       newProduct.description = description;
       newProduct.price = price;
       newProduct.seller = seller;
       newProduct.amt = amt;
    }

    function purchase(address escrow) public payable {
        require(address(msg.sender).balance >= products[numProducts].price*2); // ensure the seller has enough ether to fulfill the purchase
        sellers[msg.sender] = true;
    }
    
    function approveReceipt(uint index) public {
        // get request at provided index from storage
        Product storage request = products[numProducts];
        // sender needs to have contributed to Campaign
        require(sellers[msg.sender]);
        // sender must not have voted yet
        require(!request.confirmations[msg.sender]);
        
        // add sender to addresses who have voted
        request.confirmations[msg.sender] = true;
        // increment approval count
        request.numProducts --;
    }

modifier restrictedToSeller() {
        require(msg.sender == seller);
        _;
    }

}