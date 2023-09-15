// For More Info: https://v2api.aliceblueonline.com/appendix

exports.BASE_URL = BASE_URL = "https://ant.aliceblueonline.com/rest/AliceBlueAPIService/api"
exports.CONTRACT_URL = CONTRACT_URL = "https://v2api.aliceblueonline.com/restpy/contract_master" // QUERY PARAMS: exchange
exports.APIENCRYPTIONKEY = APIENCRYPTIONKEY = BASE_URL + "/customer/getAPIEncpkey"
exports.SESSIONID = SESSIONID = BASE_URL + "/customer/getUserSID"

// PORTFOLIO SECTION 
exports.POSITIONBOOK = POSITIONBOOK = BASE_URL + "/positionAndHoldings/positionBook"
exports.HOLDINGS = HOLDINGS = BASE_URL + "/positionAndHoldings/holdings"

// ORDER MANAGEMENT SECTION

exports.PLACEORDER = PLACEORDER = BASE_URL + "/placeOrder/executePlaceOrder"
exports.BRACKETORDER = BRACKETORDER = BASE_URL + "/placeOrder/executePlaceOrder"
exports.SQUAREOFFPOSITION = SQUAREOFFPOSITION = BASE_URL + "/positionAndHoldings/sqrOofPosition"
exports.ORDERBOOK = ORDERBOOK = BASE_URL + "/placeOrder/fetchOrderBook"
exports.TRADEBOOK = TRADEBOOK = BASE_URL + "/placeOrder/fetchTradeBook"
exports.EXITBRACKETORDER = EXITBRACKETORDER = BASE_URL + "/placeOrder/exitBracketOrder"
exports.MODIFYORDER = MODIFYORDER = BASE_URL + "/placeOrder/modifyOrder"
exports.MARKETORDER = MARKETORDER = BASE_URL + "/placeOrder/executePlaceOrder"
exports.CANCELORDER = CANCELORDER = BASE_URL + "/placeOrder/cancelOrder"
exports.ORDERHISTORY = ORDERHISTORY = BASE_URL + "/placeOrder/orderHistory"

// FUNDS SECTION 
exports.FUNDS = FUNDS = BASE_URL + "/limits/getRmsLimits"

// PROFILE SECTION
exports.PROFILE = PROFILE = BASE_URL + "/customer/accountDetails"

// HISTORY SECTION
exports.HISTORY = HISTORY = BASE_URL + "/chart/history"

// WEBSOCKET SECTION 
// CREATE WS SESSION FOR VENDORS
exports.CREATESESSION = CREATESESSION = BASE_URL + "/ws/createWsSession"
exports.WEBSOCKET = WEBSOCKET = "wss://ws1.aliceblueonline.com/NorenWS"

// Transaction Types
exports.BUY = BUY = "B"
exports.SELL = SELL = "S"

// Price Types 
exports.LIMIT = LIMIT = "L"
exports.MARKET = MARKET = "MKT"
exports.SLL = SLL = "SL"
exports.SLM = SLM = "SL-M"

// Product Types
exports.MIS = MIS = "MIS"
exports.CNC = CNC = "CNC"
exports.NRML = NRML = "NRML"

// Segment Types
exports.Equity = Equity = "CASH"
exports.Derivative = Derivative = "FO"
exports.Commodity = Commodity = "COM"
exports.Currency = Currency = "CUR"
exports.All = All = "ALL"

// Exchange
exports.NSE = NSE = "nse_cm"
exports.BSE = BSE = "bse_cm"
exports.NFO = NFO = "nse_fo"
exports.MCX = MCX = "mcx_fo"
exports.CDS = CDS = "cde_fo"
exports.BFO = BFO = "mcx_sx"
exports.BCD = BCD = "bcs_fo"
exports.NCO = NCO = "nse_com"
exports.BCO = BCO = "bse_com"

