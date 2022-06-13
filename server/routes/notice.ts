import * as express from 'express';
import Notice from '../models/Notice';

const router = express.Router();

router.get("", async(req, res) => {
    const notice = await Notice.findAll();
    res.json({data: notice});
})


export default router;