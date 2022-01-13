const db = require('../models/index');

const Investments = db.Investments;

//admin methods
const addInvestment = async (req, res) => {
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

const deleteInvestment = async (req, res) => {
    let id = req.params.id;

    await Investments.destroy({where :{id: id}});
    res.status(200).send(`Investment with id: ${id} is deleted`);
}

//common methods
const getAllInvestments = async (req, res) => {
    let investments = await Investments.findAll({});
    res.status(200).send(investments);
}

const getOneInvestment = async (req, res) => {
    let id = req.params.id;

    let investment = await Investments.findOne({where: {id : id}});
    res.status(200).send(investment);
}

module.exports = {
    addInvestment,
    deleteInvestment,
    getOneInvestment,
    getAllInvestments
}