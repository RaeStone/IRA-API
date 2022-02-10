const db = require('../models/index');
const requestify = require('requestify');
const IRAs = db.IRAs;

//admin methods
const addIra = async (req, res) => {
    try {
        let input_data = {
            currentAmount: req.body.currentAmount,
            taxRate: req.body.taxRate,
            maturityDate: req.body.maturityDate,
            rmdDate: req.body.rmdDate,
            userId: req.body.userId
        }
    
        const ira = await IRAs.create(input_data);
        res.status(200).send(ira);
    }
    catch(error){
        res.status(400).send(error);
    }
}

const deleteIra = async (req, res) => {
    try {
        let id = req.body.id;
    
        await IRAs.destroy({where :{id: id}});
        res.status(200).send(`IRA with id: ${id} is deleted`);
    }
    catch(error){
        res.status(400).send(error);
    }
}

const updateIraTotal = async (req, res) => {
    try {
        let id = req.body.id;
        let total = req.body.total;
    
        await IRAs.update({currentAmount: total},{where :{id: id}});
        res.status(200).send(`IRA with id: ${id} updated account total: ${total}`);
    }
    catch(error){
        res.status(400).send(error);
    }
}

//common methods
const getAllIras = async (req, res) => {
    try{
        let iras = await IRAs.findAll({});
        res.status(200).send(iras);
    }
    catch(error){
        res.status(400).send(error);
    }
}

const getOneIra = async (req, res) => {
    try{
        let userId = req.body.id;
        console.log("userId:", userId);
    
        let ira = await IRAs.findOne({where: {userId : userId}});
        if (ira){
            res.status(200).send(ira);
        }
        else {
            res.status(200).send({});
        }
    }
    catch(error){
        res.status(400).send(error);
    }
}

const getIraFull = async (req, res) => {
    //have to call stock api and append to investment objects
    try {
        let userId = req.body.id;
        let ira = await IRAs.findOne({where: {userId : userId}, include: { all: true, nested: true}});
        if (ira){
            let codes = "";
            let investments = ira.dataValues.investments;
            if (investments.length > 0){
                let len = 1;
                for (const investment of investments){
                    codes = codes + investment.dataValues.name + ",";
                    len++;
                }
                codes = codes.substring(0, codes.length -1);
                requestify.get('https://boiling-falls-79972.herokuapp.com/current/' + codes)
                .then((response) => {
                let stocks = response.getBody();
                let prices = [];
                stocks.stocks.forEach((stock) => {
                    prices.push(stock.stock_value);
                })
                let i = 0;
                investments.forEach((inv) => {
                    inv.dataValues.currentValue = prices[i];
                    i++;
                })
            })
        }
        res.status(200).send(ira);
    }
        else {
            res.status(200).send({});
        }
    }
    catch(error) {
        res.status(400).send(error);
    }
}

const getFull = async (req, res) => {
    //have to call stock api and append to investment objects
    try {
        let userId = req.params.id;
        let ira = await IRAs.findOne({where: {userId : userId}, include: { all: true, nested: true}});
        if (ira){
            let codes = "";
            let investments = ira.dataValues.investments;
            if (investments.length > 0){
                let len = 1;
                for (const investment of investments){
                    codes = codes + investment.dataValues.name + ",";
                    len++;
                }
                codes = codes.substring(0, codes.length -1);
                requestify.get('https://boiling-falls-79972.herokuapp.com/current/' + codes)
                .then((response) => {
                let stocks = response.getBody();
                let prices = [];
                stocks.stocks.forEach((stock) => {
                    prices.push(stock.stock_value);
                })
                let i = 0;
                investments.forEach((inv) => {
                    inv.dataValues.currentValue = prices[i];
                    i++;
                })
            })
        }
        res.status(200).send(ira);
    }
        else {
            res.status(200).send({});
        }
    }
    catch(error) {
        res.status(400).send(error);
    }
}

const getAllIrasFull = async (req, res) => {
    //have to call stock api and append to investment objects
    try {
        let promises = [];
        let iras = await IRAs.findAll({include: { all: true, nested: true}});
        iras.forEach((ira) => {
            let codes = "";
            let investments = ira.dataValues.investments;
            let len = 1;
            for (const investment of investments){
                codes = codes + investment.dataValues.name + ",";
                len++;
            }
            codes = codes.substring(0, codes.length -1);
            promises.push(requestify.get('https://boiling-falls-79972.herokuapp.com/current/' + codes));
        }) 
        Promise.all(promises)
        .then((responses) => {
            for(let i = 0; i < responses.length; i++){
                let ira = iras[i];
                let investments = ira.dataValues.investments;
                let stocks = responses[i].getBody();
                let prices = [];
                stocks.stocks.forEach((stock) => {
                    prices.push(stock.stock_value);
                })
                let j = 0;
                investments.forEach((inv) => {
                    inv.dataValues.currentValue = prices[j];
                    j++;
                })
            }
            console.log(iras);
            res.status(200).send(iras);
        })
    }
    catch(error) {
        res.status(400).send(error);
    }
}

module.exports = {
    addIra,
    getAllIras,
    getOneIra,
    deleteIra,
    getIraFull,
    getAllIrasFull,
    updateIraTotal,
    getFull
}
