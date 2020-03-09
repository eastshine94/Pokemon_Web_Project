import * as express from 'express';
import Pokemon from '../models/Pokemon';
import { Op, literal } from 'sequelize';
import { Literal } from 'sequelize/types/lib/utils';
import { SortKey, Regions } from '../../shared/types/PokeType';

const router = express.Router();

//http://localhost:3001/api/pokemons? searchValue= & regions= & orderBy= & offset=1 & limit=12
router.get('', async (req, res) => {
  const searchParam: string = req.query.search ? req.query.search : "";
  const offset: number = req.query.offset ? Number(req.query.offset) : 0;
  const limit: number = req.query.limit ? Number(req.query.limit) : 12
  const regions: Regions = req.query.regions ? req.query.regions : "All";
  const regionsQuery: Literal = regions === "All" ? literal("") : literal(`regions= "${req.query.regions}"`);
  const sortKey: SortKey = req.query.orderBy ? req.query.orderBy : "ID_ASC";
  const orderBy = getOrderBy(sortKey);

  // 특수문자가 검색될 경우
  let regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;
  if (regExp.test(searchParam)) {
    res.json({
      count: 0,
      data: []
    });
    return;
  }

  const pokemons = await Pokemon.findAndCountAll({
    attributes: ["id", "name", "image", "types", "height", "weight", "regions"],
    where: {
      [Op.or]: [
        { id: { [Op.like]: `%${searchParam}%` } },
        { name: { [Op.like]: `%${searchParam}%` } },
        { [Op.and]: literal(`regexp_like(types,'\"${searchParam}\"+')`) }
      ],
      [Op.and]: [regionsQuery]
    },
    order: [[orderBy.col, orderBy.direction]],
    offset: Number(offset),
    limit: Number(limit),
  })

  res.json({
    count: pokemons.count,
    data: pokemons.rows
  });

});

router.get('/detail/:id', async(req, res) => {
  const pokemon = await Pokemon.findByPk(req.params.id);
  res.json({
    data: pokemon,
  })
});


const getOrderBy = (val: SortKey) => {
  switch (val) {
    case "ID_ASC":
      return { col: "id", direction: "ASC" };
    case "ID_DESC":
      return { col: "id", direction: "DESC" };
    case "Alpha_ASC":
      return { col: "name", direction: "ASC" };
    default:
      return { col: "name", direction: "DESC" };
  }
}


export default router;
