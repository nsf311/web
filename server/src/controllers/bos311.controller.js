const db = require('../models');
const bos311Hex = db.bos311Hex;

exports.create = (req, res) =>{
    
};


exports.findOne = (req, res) =>{
    const hex_600_id = req.params.id;
    bos311Hex.findById(hex_600_id)
        .then(data =>{
            if(!data)
                res.status(404).send({message:"Not found data with hex id " + hex_600_id});
            else
                res.send(data);
        })
        .catch(err=>{
            res.status(500).send({message: "Error retrieving hexagon data with id= "+ hex_600_id});
        });
};
exports.findByHexNum = (req, res) =>{
    const hex_600 = req.params.HEX_600;
    
    bos311Hex.find({"HEX_600": hex_600}).select({})
    .then(data =>{
        if(!data)
            res.status(404).send({message:"Not found data with hex number " + hex_600});
        else
            res.send(data);
    })
    .catch(err=>{
        res.status(500).send({message: "Error retrieving hexagon data with number= "+ hex_600});
    });
};

exports.findAll = (req, res) =>{
    bos311Hex.find({}).select({})
    .then(data =>{
        if(!data)
            res.status(404).send({message:"Cannot find any data"});
        else
            res.send(data);
    })
    .catch(err=>{
        res.status(500).send({message: "Error retrieving hexagon data with number= "+ hex_600});
    });
} 

exports.findHexVarByFilter = (req, res) =>{
    const hex_600 = req.params.HEX_600;
    const userType = req.params.user_type;
    const frequency = req.params.frequency;
    const reason = req.params.reason;
    bos311Hex.aggregate( [
        {
            "$match":{
                "HEX_600": parseInt(hex_600)
            }
        },
        {
            "$project": {
                "HEX_600":1,
                "results":{
                    "$filter":{
                        "input":"$results",
                        "as":"results",
                        "cond":{
                            "$and":[
                                {"$eq":["$$results.user_type", userType ]},
                                {"$eq":["$$results.frequency", frequency] },
                                {"$eq":["$$results.reason", reason] }
                            ]
                        }
                    }
                }
            }
        }
    ])
    .then(data =>{
        if(!data)
            res.status(404).send({message:"Cannot find any data"});
        else
            res.send(data);
    })
    .catch(err=>{
        res.status(500).send({message: "Error retrieving hexagon data with number= "+ hex_600});
    });
} 

exports.findRegVarByFilter = (req, res) =>{
    const userType = req.params.user_type;
    const frequency = req.params.frequency;
    const reason = req.params.reason;
    bos311Hex.aggregate( [
        {
            "$project": {
                "HEX_600":1,
                "results":{
                    "$filter":{
                        "input":"$results",
                        "as":"results",
                        "cond":{
                            "$and":[
                                {"$eq":["$$results.user_type", userType ]},
                                {"$eq":["$$results.frequency", frequency] },
                                {"$eq":["$$results.reason", reason] }
                            ]
                        }
                    }
                }
            }
        }
    ])
    .then(data =>{
        if(!data)
            res.status(404).send({message:"Cannot find any data"});
        else
            res.send(data);
    })
    .catch(err=>{
        res.status(500).send({message: "Error retrieving hexagon data with number= "+ hex_600});
    });
} 
// exports.update = (req, res) =>{

// };

// exports.delete = (req, res) =>{

// }