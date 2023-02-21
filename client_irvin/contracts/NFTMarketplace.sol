//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTMarketplace is ERC721URIStorage {

    using Counters for Counters.Counter;
    //_tokenIds variable has the most recent minted tokenId
    Counters.Counter private _tokenIds;
    //Keeps track of the number of items sold on the marketplace
    Counters.Counter private _itemsSold;
    //owner is the contract address that created the smart contract
    address admin;
    //The fee charged by the marketplace to be allowed to list an NFT
    uint256 listFee = 0.001 ether;

    //The structure to store info about a listed token
    struct ListedToken {
        uint256 tokenId;
        address owner;
        address curWinner;
        uint256 curHighestBid;
        uint256 secondPrice;
        uint256 endTime;
        uint256 reserve;
        bool currentlyListed;
    }

    //the event emitted when a token is successfully listed
    event TokenListedSuccess (
        uint256 indexed tokenId,
        address owner,
        address curWinner,
        uint256 curHighestBid,
        uint256 secondPrice,
        uint256 endTime,
        uint256 reserve,
        bool currentlyListed
    );

    //This mapping maps tokenId to token info and is helpful when retrieving details about a tokenId
    mapping(uint256 => ListedToken) private idToListedToken;

    constructor() ERC721("NFTMarketplace", "NFTM") {
        admin = msg.sender;
    }

    function getListPrice() public view returns (uint256) {
        return listFee;
    }

    function getLatestIdToListedToken() public view returns (ListedToken memory) {
        uint256 currentTokenId = _tokenIds.current();
        return idToListedToken[currentTokenId];
    }

    function getListedTokenForId(uint256 tokenId) public view returns (ListedToken memory) {
        return idToListedToken[tokenId];
    }

    function getCurrentToken() public view returns (uint256) {
        return _tokenIds.current();
    }

    //The first time a token is created, it is listed here
    function createToken(string memory tokenURI, uint256 reserve, uint256 time) public payable returns (uint) {

        //Increment the tokenId counter, which is keeping track of the number of minted NFTs
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        //Mint the NFT with tokenId newTokenId to the address who called createToken
        _safeMint(msg.sender, newTokenId);

        //Map the tokenId to the tokenURI (which is an IPFS URL with the NFT metadata)
        _setTokenURI(newTokenId, tokenURI);

        //Update the mapping of tokenId's to Token details, useful for retrieval functions
        idToListedToken[newTokenId] = ListedToken(
            newTokenId,
            msg.sender,
            address(0),
            0,
            0,
            32503708801,
            0,
            false
        );

        //Helper function to update Global variables and emit an event
        listToken(newTokenId, reserve, time);

        return newTokenId;
    }


    function listToken(uint256 tokenId, uint256 reserve, uint256 time) private {
        //Make sure the sender sent enough ETH to pay for listing
        require(msg.sender == idToListedToken[tokenId].owner, "Only owner can list token");
        require(msg.value == listFee, "Must send listing fee");
        //require(idToListedToken[tokenId].currentlyListed == false, "Token already listed");

        approve(address(this), tokenId);
        payable(msg.sender);
        payable(admin).transfer(listFee);

        idToListedToken[tokenId] = ListedToken(
            tokenId,
            address(this),
            address(0),
            0,
            0,
            block.timestamp + time,
            reserve,
            true
        );

        _transfer(msg.sender, address(this), tokenId);
        //Emit the event for successful transfer. The frontend parses this message and updates the end user
        emit TokenListedSuccess(
            tokenId,
            address(this),
            address(0),
            0,
            0,
            block.timestamp + time,
            reserve,
            true
        );
    }
    
    //This will return all the NFTs currently listed to be sold on the marketplace
    function getAllNFTs() public view returns (ListedToken[] memory) {
        uint nftCount = _tokenIds.current();
        ListedToken[] memory tokens = new ListedToken[](nftCount);
        uint currentIndex = 0;
        uint currentId;
        //at the moment currentlyListed is true for all, if it becomes false in the future we will 
        //filter out currentlyListed == false over here
        for(uint i=0;i<nftCount;i++)
        {
            currentId = i + 1;
            ListedToken storage currentItem = idToListedToken[currentId];
            tokens[currentIndex] = currentItem;
            currentIndex += 1;
        }
        //the array 'tokens' has the list of all NFTs in the marketplace
        return tokens;
    }
    
    //Returns all the NFTs that the current user is owner or seller in
    function getMyNFTs() public view returns (ListedToken[] memory) {
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;
        uint currentId;
        //Important to get a count of all the NFTs that belong to the user before we can make an array for them
        for(uint i=0; i < totalItemCount; i++)
        {
            if(idToListedToken[i+1].owner == msg.sender){
                itemCount += 1;
            }
        }

        //Once you have the count of relevant NFTs, create an array then store all the NFTs in it
        ListedToken[] memory items = new ListedToken[](itemCount);
        for(uint i=0; i < totalItemCount; i++) {
            if(idToListedToken[i+1].owner == msg.sender) {
                currentId = i+1;
                ListedToken storage currentItem = idToListedToken[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function endAuction(uint256 tokenId) public payable{
        require(msg.sender == idToListedToken[tokenId].owner, "Only Owner can Call This Function");
        require(idToListedToken[tokenId].currentlyListed, "Item Not Listed");
        require(block.timestamp > idToListedToken[tokenId].endTime, "Cannot End Auction Early");
        require(msg.value == idToListedToken[tokenId].secondPrice, "Must Deposit the Payble Price");

        uint256 secondPrice = idToListedToken[tokenId].secondPrice;
        idToListedToken[tokenId].currentlyListed = false;

        if (secondPrice < idToListedToken[tokenId].reserve){
            _transfer(address(this), idToListedToken[tokenId].owner, tokenId);
            payable(msg.sender).transfer(msg.value);
            idToListedToken[tokenId].owner = msg.sender;
        }
        else {
            payable(msg.sender);
            _transfer(address(this), idToListedToken[tokenId].curWinner, tokenId);
            idToListedToken[tokenId].owner = idToListedToken[tokenId].curWinner;
        }
    }

    function failedAuction(uint256 tokenId) public payable {
        require(block.timestamp > idToListedToken[tokenId].endTime + 86400, "Seller Have 24 Hours to endAuction");

        address winner = idToListedToken[tokenId].curWinner;
        address owner = idToListedToken[tokenId].owner;
        uint256 refund = idToListedToken[tokenId].curHighestBid * 2;

        idToListedToken[tokenId].currentlyListed = false;
        payable(winner).transfer(refund);
        _transfer(address(this), owner, tokenId);
    }

    function placeBid(uint256 tokenId) public payable {
        require(idToListedToken[tokenId].currentlyListed, "Item not listed");
        require(msg.value > idToListedToken[tokenId].curHighestBid * 2, "Must Depost More Than 2x Current Highest Bid");
        require(block.timestamp <= idToListedToken[tokenId].endTime, "Auction Ended");
        
        //refunding previous bidder
        payable(idToListedToken[tokenId].curWinner).transfer(idToListedToken[tokenId].curHighestBid * 2);

        //establish new highest bidder
        idToListedToken[tokenId].secondPrice = idToListedToken[tokenId].curHighestBid; 
        idToListedToken[tokenId].curHighestBid = msg.value / 2;
        idToListedToken[tokenId].curWinner = payable(msg.sender);
    }

    function getHighestBid(uint256 tokenId) public view returns (uint256){
        return idToListedToken[tokenId].curHighestBid;
    }

    function getAuctionEndtime(uint256 tokenId) public view returns (uint256){
        return idToListedToken[tokenId].endTime;
    }
    
    function confirmRecieved(uint256 tokenId) public payable{
        require(msg.sender == idToListedToken[tokenId].curWinner, "Only Auction Winner can Confirm Item Recieved");
        require(idToListedToken[tokenId].endTime < block.timestamp + 300, "Auction not Ended");

        _itemsSold.increment();
        idToListedToken[tokenId].currentlyListed = false;
        
        address payable seller = payable(idToListedToken[tokenId].owner);
        address payable buyer = payable(idToListedToken[tokenId].curWinner);
        uint256 secondPrice = idToListedToken[tokenId].secondPrice;
        uint256 highestBid = idToListedToken[tokenId].curHighestBid;

        seller.transfer(2*secondPrice);
        buyer.transfer(2*highestBid - secondPrice);

        idToListedToken[tokenId].owner = buyer;
    }

    function noBuyer(uint256 tokenId) public {
        require(idToListedToken[tokenId].curWinner == address(0), "There Are Buyers");
        require(block.timestamp > idToListedToken[tokenId].endTime, "Bidding is Ongoing");
        idToListedToken[tokenId].currentlyListed = false;
        _transfer(address(this), idToListedToken[tokenId].owner, tokenId);
    }
}