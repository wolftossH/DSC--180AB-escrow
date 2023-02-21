// SPDX-License-Identifier: MIT


pragma solidity ^0.8.7;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract SecondPriceAuction is ERC721URIStorage {

    uint256 public curHighestBid;
    uint256 public secondPrice;
    uint256 public endTime;
    uint256 private reserve;
    uint256 public withholding;

    address payable public seller;
    address payable public curHighestBidder; 

    enum AuctionState{Active, Inactive, Payout}
    AuctionState public auction_state;

    modifier onlySeller() {
        require(msg.sender == seller);
        _;
    }

    modifier onlyWinner() {
        require(msg.sender == curHighestBidder);
        _;
    }

    constructor() ERC721("SPA", "SPAM") {
        auction_state = AuctionState.Inactive;
        curHighestBid = 0;
        reserve = 0;
    }

    function startAuction(uint256 _time, uint _reserve) public payable{
        require(auction_state == AuctionState.Inactive, 'Auction Already Active');
        require(msg.value > 0, 'Must Deposit Withholding');
        auction_state = AuctionState.Active;
        endTime = block.timestamp + _time;
        withholding = msg.value;
        seller = payable(msg.sender);
        reserve = _reserve;
    }

    function endAuction() public onlySeller payable{
        require(auction_state == AuctionState.Active, 'No Ongoing Auction');
        require(block.timestamp > endTime, 'Cannot End Auction Early');
        require(msg.value == secondPrice, 'Must Deposit the Payble Price');
        payable(msg.sender);
        auction_state = AuctionState.Payout;
    }

    function failedAuction() public onlyWinner {
        require(block.timestamp > endTime + 86400, 'Seller Have 24 Hours to endAuction');
        curHighestBidder.transfer(address(this).balance);
        auction_state = AuctionState.Inactive;
    }

    function placeBid() public payable {
        require(auction_state == AuctionState.Active, 'Auction Inactive');
        require(msg.value > curHighestBid * 2, 'Must Depost More Than 2x Current Highest Bid');
        require(block.timestamp <= endTime, 'Auction Ended');
        //refunding previous seller
        curHighestBidder.transfer(curHighestBid * 2);
        //establish new highest bidder
        secondPrice = curHighestBid; 
        curHighestBid = msg.value / 2;
        curHighestBidder = payable(msg.sender);
    }

    function getHighestBid() public view returns (uint256){
        return curHighestBid;
    }

    function confirmRecieved() public onlyWinner{
        require(auction_state == AuctionState.Payout, 'Auction not in Payout Stage');
        seller.transfer(2*secondPrice + withholding);
        curHighestBidder.transfer(address(this).balance);
        auction_state = AuctionState.Inactive;
    }

    function noBuyer() public onlySeller{
        require(curHighestBidder == address(0), 'There Are Buyers');
        require(block.timestamp > endTime, 'Bidding is Ongoing');
        seller.transfer(address(this).balance);
        auction_state = AuctionState.Inactive;
    }
}