const pool = require('../server/Router/pool');

exports.updateVoteDataScheduler = async(contractInstance, web3) => {
  try {
    const AllVote = await contractInstance.methods.getAllCandidateVotes().call();
    const voteCodes = AllVote['0'];
    const voteDatas = AllVote['1'];
    let updateQuery = ` UPDATE votingResults SET votes = CASE`;

    for (let index = 0; index < voteCodes.length; index++) {
      const voteCode = voteCodes[index];
      const votes = voteDatas[index];
      for (let candidateNumber = 0; candidateNumber < votes.length; candidateNumber++) {
        const voteCount = votes[candidateNumber];
        updateQuery += `
          WHEN (voteCode = ${voteCode} AND partyNumber = ${candidateNumber + 1}) THEN ${voteCount}`;
      }
    }
    updateQuery += ` 
      END, lastUpdate = NOW() WHERE (voteCode, partyNumber) IN (`;

    for (let index = 0; index < voteCodes.length; index++) {
      const voteCode = voteCodes[index];
      const votes = voteDatas[index];
      for (let candidateNumber = 0; candidateNumber < votes.length; candidateNumber++) {
        updateQuery += `
          (${voteCode}, ${candidateNumber + 1}),`;
      }
    }
    updateQuery = updateQuery.slice(0, -1);
    updateQuery += `);`;
    await pool.execute(updateQuery);
  } catch (error) {
    console.log(error);
  }
}
