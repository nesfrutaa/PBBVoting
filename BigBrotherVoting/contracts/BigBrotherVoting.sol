// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract BigBrotherVoting {
    // Store the contract owner's address (the deployer)
    address public owner;
    
    // Define the structure for each contestant
    struct Contestant {
        string name;    // Contestant's name
        uint256 likes; // Number of votes/likes received
    }
    
    // Array to store all contestants
    Contestant[] public contestants;
    
    // Mapping to track if an address has already voted
    mapping(address => bool) public hasVoted;
    
    // Event emitted when a contestant receives a vote
    event ContestantLiked(string name, uint256 newLikes);
    
    // Constructor: Initializes the contract with three contestants
    constructor() {
        owner = msg.sender;  // Set deployer as owner
        
        // Add the three contestants with 0 initial votes
        contestants.push(Contestant("Fyang", 0));
        contestants.push(Contestant("Alyssa", 0));
        contestants.push(Contestant("Hong Lao Shi", 0));
    }
    
    // Function to like/vote for a contestant
    function likeContestant(uint256 contestantId) public {
        // Check if contestant ID is valid
        require(contestantId < contestants.length, "Invalid contestant ID");
        
        // If sender is not the owner, check if they have already voted
        if (msg.sender != owner) {
            require(!hasVoted[msg.sender], "You can only vote once");
            hasVoted[msg.sender] = true;
        }
        
        // Increment the contestant's vote count
        contestants[contestantId].likes += 1;
        
        // Emit event with updated vote count
        emit ContestantLiked(
            contestants[contestantId].name,
            contestants[contestantId].likes
        );
    }
    
    // Function to get all contestants and their vote counts
    function getContestants() public view returns (Contestant[] memory) {
        return contestants;
    }
    
    // Function to check if a user has already voted
    function hasUserVoted(address user) public view returns (bool) {
        return hasVoted[user];
    }
} 