//  SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.2;
 
contract EcommerceStore {
    Products[] public deployedProducts;
    
    function createProduct(uint minimum) public {
        Products newProduct = new Products(minimum, msg.sender);
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
        address payable seller;
        address payable escrowContracts;
        mapping (address => bool) confirmations;
        uint productCount;
    }
    mapping(address => Product) public products;
    mapping(address => bool) public sellers;

    // constructor(uint minimum, address creator) {
    //     manager = creator;
    //     minimumContribution = minimum;
    // }


    function createProduct(
        string calldata description, uint price,
        address payable seller
    ) public restrictedToSeller {
        require(address(msg.sender).balance > price*2, "The msg.sender is not payable");
        // get last index of requests from storage
       Product storage newRequest = requests[numRequests];
    //    // increase requests counter
    //    numRequests ++;
       // add information about new request
       newRequest.description = description;
       newRequest.price = price;
       newRequest.seller = seller;
       newRequest.productCount = 0;
    }

    function purchase(address escrow) public payable {
        require(address(msg.sender).balance >= products[escrow].price*2); // ensure the seller has enough ether to fulfill the purchase
        sellers[msg.sender] = true;
    }
    
    function approveReceipt(uint index) public {
        // get request at provided index from storage
        Product storage request = requests[index];
        // sender needs to have contributed to Campaign
        require(approvers[msg.sender]);
        // sender must not have voted yet
        require(!request.confirmations[msg.sender]);
        
        // add sender to addresses who have voted
        request.confirmations[msg.sender] = true;
        // increment approval count
        request.productCount --;
    }

    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    
    
    modifier restrictedToSeller() {
        require(msg.sender == manager);
        _;
    }
    
    function approveRequest(uint index) public {
        // get request at provided index from storage
        Product storage request = requests[index];
        // sender needs to have contributed to Campaign
        require(approvers[msg.sender]);
        // sender must not have voted yet
        require(!request.approvals[msg.sender]);
        
        // add sender to addresses who have voted
        request.approvals[msg.sender] = true;
        // increment approval count
        request.approvalCount ++;
    }
    
    function finalizeRequest(uint index) public restrictedToSeller {
        Product storage request = requests[index];
        require(!request.complete);
        require(request.approvalCount > (approversCount / 2));
        request.recipient.transfer(request.value);
        request.complete = true;
    }
}