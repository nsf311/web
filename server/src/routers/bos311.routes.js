module.exports = app=>{
    const bos311Hex = require('../controllers/bos311.controller.js');
    var router = require('express').Router();
    // finaAll function should be put before getBy Id!
    router.get("/all_reg_res", bos311Hex.findAll);

    router.get("/:id", bos311Hex.findOne);
    router.get("/hex_num/:HEX_600", bos311Hex.findByHexNum);
    router.get("/reg_res_user_freq/:user_type/:frequency", bos311Hex.findByUserTypeFreq);
    router.get("/hex_reg_vars_filtered/:HEX_600/:user_type/:frequency", bos311Hex.findHexByUserTypeFreq)
    
    app.use('/bos311/hex_data', router);
};