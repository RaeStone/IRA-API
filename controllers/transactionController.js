const db = require('../models/index');

const Transactions = db.Transactions;

//admin methods
const addTransaction = async (req, res) => {
    try {
        let input_data = {
            type: req.body.type,
            amount: req.body.amount,
            date: req.body.date,
            iraId: req.body.iraId
        }
    
        const transaction = await Transactions.create(input_data);
        res.status(200).send(transaction);
    }
    catch(error){
        res.status(400).send(error);
    }
}

const deleteTransaction = async (req, res) => {
    try {
        let id = req.params.id;
    
        await Transactions.destroy({where :{id: id}});
        res.status(200).send(`Transaction with id: ${id} is deleted`);
    }
    catch(error) {
        res.status(400).send(error);
    }
}

//common methods
const getAllTransactions = async (req, res) => {
    try {
        let transactions = await Transactions.findAll({});
        res.status(200).send(transactions);
    }
    catch(error) {
        res.status(400).send(erorr);
    }
}

const getOneTransaction = async (req, res) => {
    try {
        let id = req.params.id;
    
        let transaction = await Transactions.findOne({where: {id : id}});
        res.status(200).send(transaction);
    }
    catch(error) {
        res.status(400).send(error);
    }
}

const getTransactionByIra = async (req, res) => {
    try {
        let iraId = req.params.id;
    
        let transactions = await Transactions.findAll({where: {iraId : iraId}});
        res.status(200).send(transactions);
    }
    catch(error) {
        res.status(400).send(error);
    }
}

module.exports = {
    addTransaction,
    getAllTransactions,
    getOneTransaction,
    deleteTransaction,
    getTransactionByIra
}