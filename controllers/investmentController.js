const requestify = require('requestify');
const db = require('../models/index');

const Investments = db.Investments;

//admin methods
const addInvestment = async (req, res) => {
    try {
        let input_data = {
            name: req.body.name,
            quantity: req.body.quantity,
            datePurchased: req.body.datePurchased,
            originalValue: req.body.originalValue,
            iraId: req.body.iraId
        }
    
        const investment = await Investments.create(input_data);
        res.status(200).send(investment);
    }
    catch(error) {
        res.status(400).send(error);
    }
}

const deleteInvestment = async (req, res) => {
    try {
        let id = req.params.id;
    
        await Investments.destroy({where :{id: id}});
        res.status(200).send(`Investment with id: ${id} is deleted`);
    }
    catch(error){
        res.status(400).send(error);
    }
}

//common methods
const getAllInvestments = async (req, res) => {
    try {
        let investments = await Investments.findAll({});
        let code = "";
        investments.forEach((inv) => {
            code = code + inv.name + ",";
        });
        code = code.substring(0, code.length -1);
        requestify.get('https://boiling-falls-79972.herokuapp.com/current/' + code)
        .then((response) => {
            let stocks = response.getBody();
            let prices = [];
            stocks.stocks.forEach((stock) => {
                prices.push(stock.stock_value);
            })
            let i = 0;
            investments.forEach((inv) => {
                inv.dataValues.currentValue = prices[i];
                i++
            })
            res.status(200).send(investments);
        })
    }
    catch(error){
        res.stauts(400).send(error);
    }
}

const getOneInvestment = async (req, res, next) => {
    try {
        let id = req.params.id;
        let investment = await Investments.findOne({where: {id : id}})
        let code = investment.name;
        requestify.get('https://boiling-falls-79972.herokuapp.com/current/' + code)
        .then ( (response) => {
            let stock = response.getBody();
            investment.dataValues.currentValue = stock.stock_value;
            res.status(200).send(investment);
        })
    }
    catch(error){
        res.status(400).send(error);
    }
}

const getInvestmentByIra = async (req, res) => {
    try{
        let iraId = req.params.id;
    
        let investments = await Investments.findAll({where: {iraId : iraId}});
        res.status(200).send(investments);
    }
    catch(error) {
        res.status(400).send(error);
    }
}

module.exports = {
    addInvestment,
    deleteInvestment,
    getOneInvestment,
    getAllInvestments,
    getInvestmentByIra
}