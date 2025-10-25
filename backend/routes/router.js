import { Router } from "express";
import bodyParser from "body-parser";
import { Login, Signup } from "../controller/user-controller.js";

const router = Router();

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.get("/hi", (req, res) => {
    const name = req.query.name;
    return res.status(200).json({message: `Hello ${name}`});
});

router.post("/login", Login);
router.post("/signup", Signup);

export default router;