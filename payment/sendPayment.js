const sendEther = async (web3, toUser) =>  {
  const gasPrice = await web3.eth.getGasPrice();
  const amountToSend = web3.utils.toWei('0.003', 'ether');
  web3.eth.sendTransaction({
    from: web3.adminWallet.address,
    to: toUser.walletAddr,
    value: amountToSend,
    gas: 70000 * 2, //가스량에 따라 유동적으로 바꿔줘야함.
    gasPrice: gasPrice,
  })
    .on('error', (error) => {
      console.error('Transaction error:', error);
    });
}

module.exports = sendEther;
