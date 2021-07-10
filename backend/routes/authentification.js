const express = require("express");
const router = express.Router();

const UtilisateurCtrl = require("../controllers/authentification");
const testPassword = require("../middleware/testpassword");
// testPassword, 
// post
//cree utilisateur (chiffre mot de passe)
router.post("/signup", UtilisateurCtrl.signupUser);
// //connection utilisateur
router.post("/login", UtilisateurCtrl.loginUser);

module.exports = router;
