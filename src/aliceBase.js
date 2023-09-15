// Purpose : Contains all the base functions for the Alice API
// For More Details Visit: https://v2api.aliceblueonline.com/

// import * as constant from './constant'
const constant = require("./constant")
const { generateHash } = require("./utils")
const { fetchRequest } = require("./networkApi")
const logger = require("./logger");
const { log } = require("winston");
const WebSocket = require('websocket').w3cwebsocket;


// Purpose: To get the access token for the user
class Alice {
    constructor(userId, apiKey) {
        this.USERID = userId ? userId : null
        this.API_KEY = apiKey ? apiKey : null
        this.ACCESS_TOKEN = null
        this.APIENCRYPTIONKEY = null
        this.SESSION_TOKEN = null

    }

    async apiEncryptionKey() {
        // Get the api encryption key for the user
        let response = await fetchRequest(constant.APIENCRYPTIONKEY, "POST", {
            "userId": this.USERID
        })
        response.stat === "Ok" && (this.APIENCRYPTIONKEY = response.encKey) ? logger.info("API Encryption Key Received") : logger.error("API Encryption Key Not Received")
        return response
    }

    async getSessionId() {
        // To Get Session Id 
        let string = this.USERID + this.API_KEY + this.APIENCRYPTIONKEY
        let encodedString = await generateHash(string)
        logger.log("debug", `encoded String ${encodedString}`)

        let response = await fetchRequest(constant.SESSIONID, "POST", { "userId": this.USERID, "userData": encodedString })
        log("response", response)
        if (response.stat === "Ok") {
            this.SESSION_TOKEN = response.sessionID;
            this.headers = { 'authorization': 'Bearer ' + this.USERID + " " + this.SESSION_TOKEN, 'content-type': 'application/json' }

            logger.info("Session Id Received ", this.SESSION_TOKEN);
        } else {
            logger.error("Session Id Not Received");
        }
        return response

    }
    // Portfolion Section
    async positionBook(ret = "DAY") {
        // Get the position book of the user
        logger.log("debug", `position book ${this.headers.authorization}`)
        let response = await fetchRequest(constant.POSITIONBOOK, "POST", { ret }, this.headers)
        return response
    }

    async holdings() {
        // Get the holdings of the user
        let response = await fetchRequest(constant.HOLDINGS, "GET", null, this.headers)
        return response
    }

    // ORDER MANAGEMENT SECTION

    async placeOrder(trading_symbol = "ASHOKLEY-EQ", exch = "NSE", transtype = "BUY", ret = 'DAY', prctyp = "M", qty = 1, symbol_id = "212", price = "0", trigPrice = "00.00", pCode = "MIS", complexty = 'regular', order_tag = 'Kred Konnect', discqty = '0', stop_loss = null, square_off = null, trailing_sl = null) {
        // Place an order for the user
        let data = [{
            'complexty': complexty,
            'discqty': discqty,
            'exch': exch,
            'pCode': pCode,
            'price': price,
            'prctyp': prctyp,
            'qty': qty,
            'ret': ret,
            'symbol_id': symbol_id,
            'trading_symbol': trading_symbol,
            'transtype': transtype,
            "stopLoss": stop_loss,
            "target": square_off,
            "trailing_stop_loss": trailing_sl,
            "trigPrice": trigPrice,
            "orderTag": order_tag
        }]
        let response = await fetchRequest(constant.PLACEORDER, "POST", data, this.headers)
        return response
    }

    async squareOff(exchangeSegment = constant.NSE, pCode = constant.MIS, netQty = 1, tockenNo = 212, symbol = "ASHOKLEY") {
        // To Place Square Off Order
        // let data = [{
        //     "exchSeg": exchangeSegment,
        //     "pCode": pCode,
        //     "netQty": netQty,
        //     "tockenNo": tockenNo,
        //     "symbol": symbol
        // }]
        let data = [{
            "exchSeg": "nse_cm",
            "pCode": "MIS",
            "netQty": "0",
            "tockenNo": "212",
            "symbol": "ASHOKLEY"
        }]
        log("data", data)
        let response = await fetchRequest(constant.SQUAREOFFPOSITION, "POST", data, this.headers)
        return response
    }

    async getFunds() {
        // Get the funds of the user
        let response = await fetchRequest(constant.FUNDS, "GET", null, this.headers)
        return response
    }

    async getProfile() {
        // Get the user profile
        let response = await fetchRequest(constant.PROFILE, "GET", null, this.headers)
        return response
    }

    async invalidateSession() {
        // Invalidate the session of the user for the web socket
        let response = await fetchRequest(constant.INVALIDATE_SESSION, "POST", { "loginType": "API" }, this.headers)
        return response

    }
    async getWSSession() {
        // Get the websocket session for the user
        let response = await fetchRequest(constant.CREATESESSION, "POST", { "loginType": "API" }, this.headers)
        return response
    }

    async WebSocket() {
        // Get the websocket session for the user

        const wSocket = new WebSocket(constant.WEBSOCKET);

        if (this.SESSION_TOKEN) {
            logger.info("Invalidating Old Session...", this.SESSION_TOKEN)
            let response = await this.invalidateSession()
            logger.info(`Session Invalidated  ${response.stat}`)
            response = await this.getWSSession()
            logger.info(`Session Created  ${response.stat}`)

        }
        let enc_string = await generateHash(await generateHash(this.SESSION_TOKEN))
        let data = {
            "susertoken": enc_string,
            "t": "c",
            "actid": this.USERID + "_API",
            'uid': this.USERID + "_API",
            "source": "API"
        }
        logger.info(data)

        wSocket.onopen = function () {
            console.log("On Open")
            wSocket.send(JSON.stringify(data));
            wSocket.send(JSON.stringify({ "k": "NFO|54957#MCX|239484", "t": "t" }));
        }
        wSocket.onmessage = function (event) {
            console.log("On Message", event.message)
        }
        wSocket.onerror = function (event) {
            console.log("On Error", event.message)
        }
        wSocket.onclose = function (event) {
            console.log("On Close", event.message)
        }

        return wSocket

    }

    async searchScrip(searchString) {
        // To Search Scrip 
        let data = {
            "symbol": searchString,
            exchange: ["All", "NSE", "BSE", "CDS", "MCX", "NFO"]
        }
        let response = await fetchRequest(constant.SEARCHSCRIP, "POST", data, this.headers)
    }

    async watchList() {

        let response = await fetchRequest(constant.WATCHLIST, "GET", null, this.headers)
        return response


    }

    async orderBook() {
        // To Get Order Book  
        let response = await fetchRequest(constant.ORDERBOOK, "GET", null, this.headers)
        return response
    }

    async tradeBook() {
        // To Get Trade Book
        let response = await fetchRequest(constant.TRADEBOOK, "GET", null, this.headers)
        return response
    }

    async exitBracketOrder(nestOrderNumber, symbolOrderId, status) {
        // To Exit Bracket Order
        let data = {
            "nestOrderNumber": nestOrderNumber,
            "symbolOrderId": symbolOrderId,
            "status": status
        }
        let response = await fetchRequest(constant.EXITBRACKETORDER, "POST", data, this.headers)
        return response
    }

    async modifyOrder(transtype = constant.BUY, discqty = 0, exch = constant.NSE, trading_symbol = "ASHOKLEY-EQ", nestOrderNumber = 1234, prctyp = constant.MARKET, price = 0, qty = 1, trigPrice = 0, filledQuantity = 0, pCode = constant.MIS) {
        // To Modify Order
        let data = {
            "transtype": transtype,
            "discqty": discqty,
            "exch": exch,
            "trading_symbol": trading_symbol,
            "nestOrderNumber": nestOrderNumber,
            "prctyp": prctyp,
            "price": price,
            "qty": qty,
            "trading_symbol": trading_symbol,
            "trigPrice": trigPrice,
            "filledQuantity": filledQuantity
        }

        let response = await fetchRequest(constant.MODIFYORDER, "POST", data, this.headers)
        return response

    }

    async cancelOrder(nestOrderNumber, exch = constant.NSE, trading_symbol = "ASHOKLEY-EQ") {
        // To Cancel Order
        let data = {
            "exch": exch,
            "nestOrderNumber": nestOrderNumber,
            "trading_symbol": trading_symbol
        }
        let response = await fetchRequest(constant.CANCELORDER, "POST", data, this.headers)
        return response

    }

    async orderHistory(nestOrderNumber) {
        let data = {
            "nestOrderNumber": nestOrderNumber
        }
        let response = fetchRequest(constant.ORDERHISTORY, "POST", data, this.headers)
        return response

    }
}


module.exports = Alice;