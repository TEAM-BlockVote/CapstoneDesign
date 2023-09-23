pragma solidity 0.8.19;

contract Voting {
  struct voteData {
    uint8[] candidates;
    uint256[] totalVotes;
  }

  mapping(string => voteData[]) private votingList;
  string[] private voteCodes;

  function createVote(string memory voteCode, uint8[] memory candidates) public {
    require(!isValidVoteCode(voteCode), "voteCode defined");
    uint256[] memory totalVotes = new uint256[](candidates.length);
    votingList[voteCode].push(voteData(candidates, totalVotes));
    voteCodes.push(voteCode);
  }

  function getVoteList(string memory voteCode) public view returns(voteData[] memory) {
    return votingList[voteCode];
  }
  
  function getAllCandidateVotes() public view returns (string[] memory, uint256[][] memory) {
    uint256[][] memory allCandidateVotes = new uint256[][](voteCodes.length);
    string[] memory allVoteCodes = new string[](voteCodes.length);
    for (uint256 i = 0; i < voteCodes.length; i++) {
      string memory voteCode = voteCodes[i];
      allVoteCodes[i] = voteCode;
      allCandidateVotes[i] = votingList[voteCode][0].totalVotes;
    }
    return (allVoteCodes, allCandidateVotes);
  }

  function submitVote(string memory voteCode, uint8 candidate) public {
    require(isValidVoteCode(voteCode), "voteCode undefined");
    require(isValidCandidate(voteCode, candidate), "candidate undefined");
    votingList[voteCode][0].totalVotes[candidate - 1] += 1;
  }

  function isValidVoteCode (string memory voteCode) private view returns (bool){
    if (getVoteList(voteCode).length <= 0)
      return false;
    return true;
  }

  function isValidCandidate(string memory voteCode, uint8 candidate) private view returns (bool) {
    voteData[] memory voteList = getVoteList(voteCode);
    for (uint i = 0; i < voteList[0].candidates.length; i++) {
      if (voteList[0].candidates[i] == candidate) {
        return true;
      }
    }
    return false;
  }
}
