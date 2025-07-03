const { Router } = require("express");
const Booking = require("../models/model.booking");

const router = Router();

router.get("/", (req, res) => {
    return res.render("booking");
});

router.post("/", async (req, res)=>{
    const {category, description, size, duration} = req.body;
    const newBooking = await Booking.create({
        category,
        description,
        size,
        duration,
        createdBy: req.user._id
    });

    res.redirect(`/balling/${newBooking._id}`);
})


module.exports = router;

