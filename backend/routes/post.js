const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require('../middleware/multer-config');
//controlleur
const postCtrl = require("../controllers/post");

// cree un post
router.post("/", auth,multer, postCtrl.createPost);
//met a jour le status j'aime de l'utilisateur sur un post
router.post("/:id/like", auth, postCtrl.updateLikePost);

//put
// met à jour le post
router.put("/:id", auth,multer, postCtrl.ModifyPost);

//delete
//supprime une sauce
router.delete("/:id", auth, postCtrl.deletePost);

//get
//renvoie toutes les sauces
router.get("/", auth, postCtrl.getAllPost);
//renvoie la sauces avec l'id
router.get("/:id", auth, postCtrl.getOnePost);

module.exports = router;