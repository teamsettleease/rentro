const { Router } = require("express");
const Properties = require("../models/model.property");

const router = Router();

router.get("/", async (req, res) =>{
    try{
        const properties = await Properties.find({});
        res.render("listAllProperties", { properties });
    }catch(err){
        console.log("Error listing properties", err.message);
        res.status(500).send("Error listing properties");
    }
})

module.exports = router;