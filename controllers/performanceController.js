const db = require('../models/index');

const Performances = db.Performances;

//admin methods
const addPerformance = async (req, res) => {
    let input_data = {
        change: req.body.change,
        date: req.body.date,
        iraId: req.body.iraId
    }

    const performance = await Performances.create(input_data);
    res.status(200).send(performance);
}

const deletePerformance = async (req, res) => {
    let id = req.params.id;

    await Performances.destroy({where :{id: id}});
    res.status(200).send(`Performance with id: ${id} is deleted`);
}

//common methods
const getAllPerformances = async (req, res) => {
    let performances = await Performances.findAll({});
    res.status(200).send(performances);
}

const getOnePerformance = async (req, res) => {
    let id = req.params.id;

    let performance = await Performances.findOne({where: {id : id}});
    res.status(200).send(performance);
}

module.exports = {
    addPerformance,
    getAllPerformances,
    getOnePerformance,
    deletePerformance
}