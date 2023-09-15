const Alice = require("./aliceBase");

require('dotenv').config()
log = console.log

const main = async () => {
    let alice = new Alice(process.env.USERID, process.env.API_KEY)
    console.log(alice)
    let encryptionKey = await alice.apiEncryptionKey()
    log("enc key", encryptionKey)
    let sessionId = await alice.getSessionId()
    // log("session id", sessionId)
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
    // log("Ws Socket", wSocket)

}

main()
