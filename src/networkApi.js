// Purpose: Network API for fetching data from the server

exports.fetchRequest = async function fetchRequest(url, method, body, headers = {}) {
    // fetchRequest for get,post request to aliceblue api
    const options = {
        method: method,
        headers: new Headers({ 'content-type': 'application/json', ...headers }), // or just { 'content-type': 'application/json' } for json data,
        body: body ? JSON.stringify(body) : null,
        redirect: 'follow',

    }
    try {

        let response = await fetch(url, options)
        response = await response.json()
        return response
    }
    catch (err) {
        console.error(`ERROR IN NETWORK REQUEST URL : ${url} METHOD : ${method} `, err)
        return { error: true, message: err.message }
    }

}