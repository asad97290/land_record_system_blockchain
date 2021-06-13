let land;
contractListener = async (event) => {

    const asset = JSON.parse(event.payload.toString());
    console.log(`<-- Contract Event Received: ${JSON.stringify(asset)}`);

    const eventTransaction = event.getTransactionEvent();
    console.log(` -------transaction id---------: ${eventTransaction.transactionId} `);

    land = {
        asset,
        txId:eventTransaction.transactionId,
        date:new Date().toLocaleString()
    }
  
};

getLand = async()=>{
    return land;
}

module.exports = {
    contractListener,
    getLand
}