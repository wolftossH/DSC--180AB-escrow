/**
 *Submitted for verification at Etherscan.io on 2022-12-03
*/

// SPDX-License-Identifier: GPL-3.0

// Just recently provided by professor in class since we just started coding smart contracts last week
// We deployed and tested in our section using the goerli test network (see link below)
// https://goerli.etherscan.io/address/0x478805e928c9449914ae22da20dfdf94841e0d8e#code

pragma solidity ^0.8.4;
contract Purchase {
    uint256 public value;

    address payable public s;
    address payable public b;

    address payable public seller;
    address payable public buyer;

    enum State { Created, Locked, Release, Inactive }
    // The state variable has a default value of the first member, `State.created`
    State public state;
    // since seller is launching --> there should be item name and description, item details --> make those readable by buyer
    modifier condition(bool condition_) {
        require(condition_);
        _;
    }

    /// Only the buyer can call this function.
    error OnlyBuyer();
    /// Only the seller can call this function.
    error OnlySeller();
    /// The function cannot be called at the current state.
    error InvalidState();
    /// The provided value has to be even.
    error ValueNotEven();

    modifier onlyBuyer() {
        if (msg.sender != buyer)
            revert OnlyBuyer();
        _;
    }

    modifier onlySeller() {
        if (msg.sender != seller)
            revert OnlySeller();
        _;
    }

    modifier inState(State state_) {
        if (state != state_)
            revert InvalidState();
        _;
    }

    event Aborted();
    event PurchaseConfirmed();
    event ItemReceived();
    event SellerRefunded();

    event LogPurchase(address seller, address s);

    // Ensure that `msg.value` is an even number.
    // Division will truncate if it is an odd number.
    // Check via multiplication that it wasn't an odd number.
    constructor(uint256 _purchaseValue, address payable _seller) payable {
        value = _purchaseValue * 1 ether;

        seller = payable(msg.sender);
        s = _seller;
        
        if ((2 * value) != msg.value)
            revert ValueNotEven();
    }

    /// Abort the purchase and reclaim the ether.
    /// Can only be called by the seller before
    /// the contract is locked.
    function abort()
        external
        onlySeller
        inState(State.Created)
    {
        emit Aborted();
        state = State.Inactive;
        // We use transfer here directly. It is
        // reentrancy-safe, because it is the
        // last call in this function and we
        // already changed the state.
        seller.transfer(address(this).balance);
    }

    /// Confirm the purchase as buyer.
    /// Transaction has to include `2 * value` ether.
    /// The ether will be locked until confirmReceived
    /// is called.
    function confirmPurchase(address payable _buyer)
        external
        inState(State.Created) // state.Release status
        // require((msg.value == (2 * value), "Please send in 2x the purchase amount"))
        condition(msg.value == (2 * value))
        payable
    {
        emit PurchaseConfirmed();
        buyer = payable(msg.sender);
        b = _buyer;
        state = State.Locked;
        emit LogPurchase(address(msg.sender), buyer);
    }

    /// Confirm that you (the buyer) received the item.
    /// This will release the locked ether.
    function confirmReceived(address payable _buyer)
        external
        onlyBuyer
        inState(State.Locked)
    {
        require(_buyer == b);
        
        emit ItemReceived();
        // It is important to change the state first because
        // otherwise, the contracts called using `send` below
        // can call in again here.
        state = State.Release;

        b.transfer(value);
    }

    /// This function refunds the seller, i.e.
    /// pays back the locked funds of the seller.
    function refundSeller(address payable _seller)
        external
        onlySeller
        inState(State.Release)
    {
        require(_seller == s);
        emit SellerRefunded();
        // It is important to change the state first because
        // otherwise, the contracts called using `send` below
        // can call in again here.
        state = State.Inactive;
        s.transfer(3 * value);
    }
}