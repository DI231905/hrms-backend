const userController = require("../controllers/user.controller");
const verifyToken = require('../middleware/JWTAuth')

module.exports = (app) =>{
    app.post("/api/user/login", userController.verifyUser);
    app.post("/api/user", [verifyToken], userController.addUser);
    app.get("/api/user/show",[verifyToken], userController.getUser);
}