const db = require('../models/index');

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
        let id = req.params.id;
    
        await IRAs.destroy({where :{id: id}});
        res.status(200).send(`IRA with id: ${id} is deleted`);
    }
    catch(error){
        res.status(400).send(error);
    }
}

const updateIraTotal = async (req, res) => {
    try {
        let id = req.params.id;
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
        let id = req.params.id;
    
        let ira = await IRAs.findOne({where: {id : id}});
        res.status(200).send(ira);
    }
    catch(error){
        res.status(400).send(error);
    }
}

const getIraFull = async (req, res) => {
    try {
        let id = req.params.id;
    
        let ira = await IRAs.findOne({where: {id : id}, include: { all: true, nested: true}});
        res.status(200).send(ira);
    }
    catch(error) {
        res.status(400).send(error);
    }
}

const getAllIrasFull = async (req, res) => {
    try {
        let iras = await IRAs.findAll({include: { all: true, nested: true}});
        res.status(200).send(iras);
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
    updateIraTotal
}
