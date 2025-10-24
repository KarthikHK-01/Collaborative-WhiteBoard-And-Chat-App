import { Router } from "express";
import bodyParser from "body-parser";

const router = Router();

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.get("/hi", (req, res) => {
    const name = req.query.name;
    return res.status(200).json({message: `Hello ${name}`});
});

export default router;