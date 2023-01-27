import { addNewPlayer, getPlayers, getPlayerById } from '../controllers/playerControllers';

const routes = (app) => {
    app.route('/players')
        .post(addNewPlayer)     // POST endpoint
        .get(getPlayers)        // GET endpoint - all players

    app.route('/player/:PlayerId')
        .get(getPlayerById);    // GET endpoint - player by Id    
}

export default routes;