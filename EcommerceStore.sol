// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;
import "./Escrow.sol" as Escrow;

contract EcommerceStore {
    struct Product {
        string name;
        string description;
        uint price;
        address payable seller;
        address payable escrowContracts;
    }

    struct escrowInfo {
        address payable seller;
        address payable buyer;
    }

    mapping(address => Product) public products;
    mapping(address => bool) public sellers;
    mapping(address => escrowInfo) public escrowContracts;

    uint public totalProducts;
    uint public totalSellers;

    event NewProduct(string name, address payable seller, address payable escrow);
    event NewSeller(address payable seller);

    function addProduct(string memory name, string memory description, uint price) public payable {
        require(address(msg.sender).balance > price*2, "The msg.sender is not payable");
        sellers[payable(msg.sender)] = true;
        totalSellers++;

        Escrow.Purchase escrow_contract = (new Escrow.Purchase){value: msg.value}(price, payable(msg.sender));
        address payable escrow = payable(address(escrow_contract));
        escrowContracts[escrow] = escrowInfo(payable(msg.sender), payable(0));

        products[escrow] = Product(name, description, price, payable(msg.sender), escrow);
        totalProducts++;
        emit NewProduct(name, payable(msg.sender), products[escrow].escrowContracts);
        emit NewSeller(payable(msg.sender));
    }

    function purchase(address escrow) public payable {
        require(address(msg.sender).balance >= products[escrow].price*2); // ensure the seller has enough ether to fulfill the purchase
        escrowContracts[escrow] = escrowInfo(escrowContracts[escrow].seller, payable(msg.sender));
        Escrow.Purchase(escrow).confirmPurchase{value: msg.value}(payable(msg.sender));
    }

    function confirmReceived(address escrow) public {
        Escrow.Purchase(escrow).confirmReceived(payable(msg.sender));
    }

    function refundSeller(address escrow) public {
        Escrow.Purchase(escrow).refundSeller(payable(msg.sender));
    }

}