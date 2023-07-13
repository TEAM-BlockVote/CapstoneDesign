const { Web3 } = require('web3');

const sendEther = async (toUser) =>  {
  const web3 = new Web3(process.env.INFURA_API);
  const gasPrice = await web3.eth.getGasPrice();
  const amountToSend = web3.utils.toWei('0.003', 'ether');  
  const adminWallet = web3.eth.accounts.privateKeyToAccount(process.env.METAMASK_PRIVATE_KEY);
  web3.eth.accounts.wallet.add(adminWallet);
  web3.eth.sendTransaction({
    from: adminWallet.address,
    to: toUser.walletAddr,
    value: amountToSend,
    gas: 70000 /*2*/, //가스량에 따라 유동적으로 바꿔줘야함.
    gasPrice: gasPrice,
  })
    .on('error', (error) => {
      console.error('Transaction error:', error);
    });
}

module.exports = sendEther;