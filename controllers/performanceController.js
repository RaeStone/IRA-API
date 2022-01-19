const db = require('../models/index');

const Performances = db.Performances;

//admin methods
const addPerformance = async (req, res) => {
    try {
        let input_data = {
            change: req.body.change,
            date: req.body.date,
            iraId: req.body.iraId
        }
    
        const performance = await Performances.create(input_data);
        res.status(200).send(performance);
    }
    catch(error){
        res.status(400).send(error);
    }
}

const deletePerformance = async (req, res) => {
    try {
        let id = req.params.id;
    
        await Performances.destroy({where :{id: id}});
        res.status(200).send(`Performance with id: ${id} is deleted`);
    }
    catch(error){
        res.status(400).send(error);
    }
}

//common methods
const getAllPerformances = async (req, res) => {
    try{
        let performances = await Performances.findAll({});
        res.status(200).send(performances);
    }
    catch(error) {
        res.status(400).send(error);
    }
}

const getOnePerformance = async (req, res) => {
    try {
        let id = req.params.id;
    
        let performance = await Performances.findOne({where: {id : id}});
        res.status(200).send(performance);
    }
    catch(error){
        res.status(400).send(error);
    }
}

const getPerformanceByIra = async (req, res) => {
    try{
        let iraId = req.params.id;
    
        let performances = await Performances.findAll({where: {iraId : iraId}});
        res.status(200).send(performances);
    }
    catch(error){
        res.status(400).send(error);
    }
}

module.exports = {
    addPerformance,
    getAllPerformances,
    getOnePerformance,
    deletePerformance,
    getPerformanceByIra
}