const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = (req, res, next) => {
  try {    
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const profilId = decodedToken.profilId; 
    if (req.body.profilId && req.body.profilId !== profilId) {
      console.log('Id utilisateur invalide');
      throw 'Id utilisateur invalide';
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({
      error: error | new Error('Requête non valide !')
    });
  }
};