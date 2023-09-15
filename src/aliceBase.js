// Purpose : Contains all the base functions for the Alice API
// For More Details Visit: https://v2api.aliceblueonline.com/

// import * as constant from './constant'
const constant = require("./constant")
const { generateHash } = require("./utils")
const { fetchRequest } = require("./networkApi")
const logger = require("./logger");
const { log } = require("winston");


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

    async placeOrder(trading_symbol, exch, transtype, ret, prctyp, qty, symbol_id, price, trigPrice, pCode, complexty, orderTag) {
        return { "error": "Not Implemented" }

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

    async getWSSession() {
        // Get the websocket session for the user
        let response = await fetchRequest(constant.CREATESESSION, "POST", { "loginType": "API" }, this.headers)
        return response
    }

    async WebSocket() {
        // Get the websocket session for the user
        const wSocket = new WebSocket(constant.WEBSOCKET);
        wSocket.onopen = function (event) {
            wSocket.send({})
        }

    }


}


module.exports = Alice;