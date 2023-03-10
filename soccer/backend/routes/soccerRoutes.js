import {
    addNewPlayer,
    getPlayers,
    getPlayerById,
    updatePlayer,
    deletePlayer,
} from "../controllers/playerControllers";

const routes = (app) => {
    app.route("/players")
        .post(addNewPlayer) // POST endpoint
        .get(getPlayers); // GET endpoint - all players

    app.route("/player/:PlayerId")
        .get(getPlayerById) // GET endpoint - player by Id
        .put(updatePlayer) // PUT endpoint - updates the player
        .delete(deletePlayer); // DELETE endpoint - deletes the player
};

export default routes;
