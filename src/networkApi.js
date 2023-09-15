const logger = require("./logger");// Purpose: Network API for fetching data from the server

exports.fetchRequest = async function fetchRequest(url, method, body, headers = {}) {
    // fetchRequest for get,post request to aliceblue api
    const options = {
        method: method,
        headers: new Headers({ 'content-type': 'application/json', ...headers }), // or just { 'content-type': 'application/json' } for json data,
        body: body ? JSON.stringify(body) : null,
        redirect: 'follow',

    }
    let response = null
    try {

        response = await fetch(url, options)
        logger.log("debug", `URL : ${url} METHOD : ${method} STATUS : ${response.status} STATUS TEXT : ${response.statusText}`)
        response = await response.json()
        return response
    }
    catch (err) {
        logger.error(`ERROR IN NETWORK REQUEST URL : ${url} METHOD : ${method} ${response.statusText} `, err)
        return { error: true, message: err.message }
    }

}