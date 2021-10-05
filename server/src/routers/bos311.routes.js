module.exports = app=>{
    const bos311Hex = require('../controllers/bos311.controller.js');
    var router = require('express').Router();
    router.get("/:id", bos311Hex.findOne);
    router.get("/hex_num/:HEX_600", bos311Hex.findByHexNum);
    app.use('/bos311/hex_data', router);
};