import * as express from 'express';
import * as DB from './models/index';
import * as http from 'http';
import * as cors from 'cors';
import { Sequelize } from 'sequelize/types';
import logger from './logger';
import updatePokemonList from './database/pokemon';
import getNotice from './database/notice';
import pokemonRouter from './routes/pokemons';
import authRouter from './routes/auth';
import boardRouter from './routes/board';
import noticeRouter from './routes/notice';

const stopServer = async (server: http.Server, sequelize: Sequelize, signal?: string) => {
    logger.info(`Stopping server with signal: ${signal}`);
    await server.close();
    await sequelize.close();
    process.exit();
};
const runServer = async () => {
    const sequelize = DB.init();
    const app = express();
    app.set('port', process.env.PORT || 3001);
    app.use(express.json());
    app.use(cors());
    app.use('/api/pokemons', pokemonRouter);
    app.use('/api/auth', authRouter);
    app.use('/api/board', boardRouter);
    app.use('/api/notice', noticeRouter);
    const server = app.listen(app.get('port'), () => {
        logger.info(`listening on port ${app.get('port')}...`);
    });

    await sequelize.authenticate()
    .then(() => { logger.info("Connected to DB successfully."); })
    .catch(e => {
        stopServer(server, sequelize);
        throw e;
    });
    await sequelize.sync();
    await updatePokemonList();
    await getNotice();
};

runServer();



