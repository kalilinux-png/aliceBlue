const Alice = require("./aliceBase");

require('dotenv').config()
log = console.log

const main = async () => {
    let alice = new Alice(process.env.USERID, process.env.API_KEY)
    console.log(alice)
    let encryptionKey = await alice.apiEncryptionKey()
    log("enc key", encryptionKey)
    let sessionId = await alice.getSessionId()
    log("session id", sessionId)
    let orderBook = await alice.positionBook()
    log("order Book", orderBook)
    let holding = await alice.holdings()
    log("Holding", holding)
    let funds = await alice.getFunds()
    log("Funds", funds)
    let profile = await alice.getProfile()
    log("Funds", profile)
    let wsSession = await alice.getWSSession()
    log("Ws Session", wsSession)
    let wSocket = await alice.WebSocket()
    let searchScript = await alice.searchScrip("tcs")
    log("Search Script",searchScript)
    let watchList = await alice.watchList()
    log("watch list",watchList)
    let placeOrder = await alice.placeOrder()
    log("place order", placeOrder)
    let square_off = await alice.squareOff()
    log("square off", square_off)   
    let tradeBook = await alice.tradeBook()
    log("trade book", tradeBook)
    let modifyOrder = await alice.modifyOrder(transtype = "B", nestOrderNumber = 230915000171647)
    log("modify order", modifyOrder)
    let cancelOrder = await alice.cancelOrder(nestOrderNumber = 230915000171647)
    log("modify order", cancelOrder)
    let orderHistory = await alice.orderHistory(nestOrderNumber = 230915000171647)
    log("modify order", orderHistory)

}

main()
