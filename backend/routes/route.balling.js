const { Router } = require("express");
// const Balling = require("../models/model.balling");
const Booking = require("../models/model.booking");

const router = Router();

const rate = { small: 10, medium: 20, large: 30 };
const itemCategory = {vahicle:50, forniture:30, kitchen_stuff:20, others:10};
const perDay = 10;

router.get("/:id", async (req, res) =>{

    try{
        const fetchBooking = await Booking.findById(req.params.id);

        if(!fetchBooking){
            return res.status(404).send("Booking not found");
        }

        const {category, size, duration} = fetchBooking;
        const cost = (perDay*duration) * rate[size] * itemCategory[category];

        fetchBooking.cost = cost;

        await fetchBooking.save();

        res.render("balling", {cost, balling: fetchBooking})

    }catch(err){
        return res.status(500).send("server error");
    }
})


module.exports = router;


// enum:['vahicle', 'forniture', 'kitchen stuff', 'others'] 