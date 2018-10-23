import callAction from "./moleculer";
import express from "express";
const router = express.Router();


router.post('/', (req, res) => {
    callAction("users.hello", { email: "nileshsavani09@gmail.com" }, response => {
        res.json({user: {
                email: 'armin@fluent.ai',
                name: 'ayoub'
            }});
    });
})
module.exports = router;
