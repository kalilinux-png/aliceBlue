// Purpose : Contains all the base functions for the Alice API
// For More Details Visit: https://v2api.aliceblueonline.com/

// import * as constant from './constant'
const constant = require("./constant")
const { fetchRequest } = require("./networkApi")


// Purpose: To get the access token for the user
class Alice {
    constructor(userId) {
        this.ACCESS_TOKEN = null
        this.USERID = userId ? userId : null
        this.APIENCRYPTIONKEY = null

    }

    apiEncryptionKey() {
        // Get the api encryption key for the user
        let response = fetchRequest(constant.APIENCRYPTIONKEY, "POST", {
            "userId": this.USERID
        })
        return response
    }
    // Portfolion Section
    async positionBook(ret = "DAY") {
        // Get the position book of the user
        let response = await fetchRequest(constant.POSITIONBOOK, "POST", { ret })
        return response
    }

    async holdings() {
        // Get the holdings of the user
        let response = await fetchRequest(constant.HOLDINGS, "GET",)
        return response
    }

    // ORDER MANAGEMENT SECTION

    async placeOrder(trading_symbol, exch, transtype, ret, prctyp, qty, symbol_id, price, trigPrice, pCode, complexty, orderTag) {
        return { "error": "Not Implemented" }

    }
}


module.exports = Alice;