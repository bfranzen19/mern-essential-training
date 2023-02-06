<<<<<<< HEAD
import { addNewPlayer, getPlayers, getPlayerById, updatePlayer, deletePlayer } from '../controllers/playerControllers';

const routes = (app) => {
    app.route('/players')
        .post(addNewPlayer)      // POST endpoint
        .get(getPlayers);        // GET endpoint - all players

    app.route('/player/:PlayerId')
        .get(getPlayerById)     // GET endpoint - player by Id    
        .put(updatePlayer)      // PUT endpoint - update player
        .delete(deletePlayer);  // DELETE endpoint - delete player
}
=======
import {
    addNewPlayer,
    getPlayers,
    getPlayerById,
    updatePlayer,
    deletePlayer,
} from "../controllers/playerControllers";

const routes = (app) => {
    app.route("/players")
        .post(addNewPlayer)     // POST endpoint
        .get(getPlayers);       // GET endpoint - all players

    app.route("/player/:PlayerId")
        .get(getPlayerById)    // GET endpoint - player by Id
        .put(updatePlayer)      // PUT endpoint - updates the player
        .delete(deletePlayer);   // DELETE endpoint - deletes the player
};
>>>>>>> 686fce4830f21c58e9880729630d557063e8ac95

export default routes;
