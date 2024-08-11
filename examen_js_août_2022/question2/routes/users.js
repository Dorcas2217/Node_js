const express = require('express');

const router = express.Router();

const {createUsers}  = require  ('../models/places');

/* GET users listing. */
router.get('/', (req, res) => {
  res.json({ users: [{ name: 'e-baron' }] });
});

/**
 * Créer un nouvel utilisateur. L'opération doit prendre en entrée le nom de l'utilisateur 
 * ainsi que son adresse mail, et doit retourner l'ID de l'utilisateur créé au format JSON. 
 * L'opération doit renvoyer une erreur si
 *  le nom ou l'adresse mail ne sont pas fournis, ainsi que si un utilisateur existe déjà pour cette adresse mail.
 */

router.post('/', (req, res) => {
  const name = req?.body?.name?.trim().length ? req.body.name : undefined;
  const email = req?.body?.email?.trim().length ? req.body.email : undefined;
  
  if (!name || !email) {
    res.status(400).json({ error: 'Missing name or email' });
    return;
  }
  const userId = createUsers(name, email);
  if (!userId) {
    res.status(400).json({ error: 'User already exists' });
    return;
  }

  res.json({ userId });
});

module.exports = router;
