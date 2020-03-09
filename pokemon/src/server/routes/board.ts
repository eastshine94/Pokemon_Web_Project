import * as express from "express";
import Board from '../models/Board';
import { Op } from 'sequelize';

const router = express.Router();
////http://localhost:3001/api/pokemons? cursor= & no= 
router.get('', async (req, res) => {
    const cursor: number = req.query.cursor ? Number(req.query.cursor) : 9999999999;
    const offset: number = req.query.page ? 15 * (Number(req.query.page) - 1) : 0;

    const posts = await Board.findAndCountAll({
        where: {
            id: { [Op.lte]: cursor },
        },
        order: [["id", "DESC"]],
        limit: 15,
        offset: offset
    });
    return res.json({
        count: posts.count,
        data: posts.rows,
    });
});

router.get('/:id', async (req, res) => {
    const contents = await Board.findByPk(req.params.id);
    res.json({
        data: contents,
    })

})


router.post('', async (req, res) => {
    const post = req.body;
    try {
        const insertPost = await Board.create({ ...post });
        return res.json({ data: insertPost, msg: "Post writing success." })
    }
    catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});

router.post('/delete', async (req, res) => {
    const deleteNo = req.query.no;
    try {
        await Board.destroy({
            where: {
                id: deleteNo,
            }})
        return res.json({ data: null, msg: "Deleted post." })
    }catch(err){
        return res.status(500).json({ msg: err.message });
    }
});

router.post('/modify', async(req, res) => {
    const updateNo = req.query.no;
    const post = req.body;
    try{
       const updatePost = await Board.update({...post},{
           where: {
               id: updateNo
        }})
        return res.json({data: updatePost, msg: "Updated post."})
    }catch(err){
        return res.status(500).json({msg: err.message});
    }
})

export default router;