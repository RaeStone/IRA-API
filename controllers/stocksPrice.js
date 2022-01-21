const requestify = require('requestify')

const pullOneStockInv = (req, res) => {
    let code = req.body.investment.name;
    console.log("code: ", code);
    requestify.get('https://boiling-falls-79972.herokuapp.com/current/' + code)
    .then ( (response) => {
        console.log(response);
        let stock = response.getBody();
        req.body.investment.currentValue = stock.stock_value;
        res.status(200).send(req.body.investment);  
    })
    .catch( (error) => {
        res.status(500).send(error);
    })
}

const pullManyStocksInv = (req, res) => {
    let codes = "";

}

module.exports = {
    pullOneStockInv,
    pullManyStocksInv
}

