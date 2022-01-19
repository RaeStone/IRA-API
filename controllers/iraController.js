const db = require('../models/index');

const IRAs = db.IRAs;

//admin methods
const addIra = async (req, res) => {
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

const deleteIra = async (req, res) => {
    let id = req.params.id;

    await IRAs.destroy({where :{id: id}});
    res.status(200).send(`IRA with id: ${id} is deleted`);
}

const updateIraTotal = async (req, res) => {
    let id = req.params.id;
    let total = req.body.total;

    await IRAs.update({currentAmount: total},{where :{id: id}});
    res.status(200).send(`IRA with id: ${id} updated account total: ${total}`);
}

//common methods
const getAllIras = async (req, res) => {
    let iras = await IRAs.findAll({});
    res.status(200).send(iras);
}

const getOneIra = async (req, res) => {
    let id = req.params.id;

    let ira = await IRAs.findOne({where: {id : id}});
    res.status(200).send(ira);
}

const getIraFull = async (req, res) => {
    let id = req.params.id;

    let ira = await IRAs.findOne({where: {id : id}, include: { all: true, nested: true}});
    res.status(200).send(ira);
}

const getAllIrasFull = async (req, res) => {
    let iras = await IRAs.findAll({include: { all: true, nested: true}});
    res.status(200).send(iras);
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
