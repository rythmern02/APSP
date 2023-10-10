// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Asps {
    
    struct Evidence {
        string name;
        string ipfsHash;
        string description;
        bool validation;
        uint voteCount;
        mapping(address => bool) voters;
    }

    struct Validator {
        string name;
        string bio;
        address walletAddress;
        bool isRegistered;
    }

    mapping(uint => Evidence) public EvidenceMatch;
    mapping(address => Validator) public validators;

    address private owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Only the owner can call this function");
        _;
    }

    uint public counter = 0;

    function registerAsValidator(string calldata _name, string calldata _bio, address _walletAddress) public {
        require(!validators[msg.sender].isRegistered, "Validator is already registered.");
        validators[msg.sender] = Validator(_name, _bio, _walletAddress, true);
    }

    function addEvidenceToMapping(
        string calldata _nameOfEvidence,
        string calldata _ipfsHashOfEvidence,
        string calldata _descriptionOfEvidence
    ) public  {
        counter++;
        Evidence storage newEvidence = EvidenceMatch[counter];
        newEvidence.name = _nameOfEvidence;
        newEvidence.ipfsHash = _ipfsHashOfEvidence;
        newEvidence.description = _descriptionOfEvidence;
    }

    // Function to validate evidence
    function validateEvidence(uint _evidenceId) public {
        require(validators[msg.sender].isRegistered, "Validator is not registered.");
        require(_evidenceId <= counter);
        Evidence storage evidences = EvidenceMatch[_evidenceId];
        require(!evidences.validation, "Evidence is already validated.");
        evidences.validation = true;
        evidences.voters[msg.sender] = true; 
        evidences.voteCount++;
    }

     // Function to upvote evidence
     function upvoteEvidence(uint _evidenceId) public {
         require(_evidenceId <= counter);
         Evidence storage evidences = EvidenceMatch[_evidenceId];
         require(!evidences.voters[msg.sender], "You have already voted for this evidence.");
         evidences.voters[msg.sender] = true; 
         evidences.voteCount++;
     }

     // Function to get validator details
     function getValidatorDetails(address _validatorAddress) public view returns (string memory name, string memory bio, address walletAddress) {
         Validator storage validator = validators[_validatorAddress];
         return (validator.name, validator.bio, validator.walletAddress);
     }

     // Function to get evidence details
     function getEvidenceDetails(uint _evidenceId) public view returns (string memory name, string memory ipfsHash, string memory description, bool validation, uint voteCount) {
         Evidence storage evidences = EvidenceMatch[_evidenceId];
         return (evidences.name, evidences.ipfsHash, evidences.description, evidences.validation, evidences.voteCount);
     }
     
     function getAllEvidenceIds() public view returns (uint[] memory) {
         uint[] memory evidenceIds = new uint[](counter);
         for (uint i = 1; i <= counter; i++) {
             evidenceIds[i-1] = i;
         }
         return evidenceIds;
     }
}
//0xFb2179a153f925CE7e93f01190ee82f20691dA49