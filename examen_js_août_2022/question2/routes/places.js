var express = require('express');
var router = express.Router();

const {createPlaces, addPlaces}  = require  ('../models/places');


/**
 * Créer un nouveau lieu de vacances. L'opération doit prendre en entrée le nom du lieu ainsi que sa description, et doit retourner l'ID du lieu créé au format JSON. 
 * L'opération doit renvoyer une erreur si le nom ou la description ne sont pas fournis.
 */

router.post('/', (req, res) => {
  const name = req?.body?.name?.trim().length ? req.body.name : undefined;
  const description = req?.body?.description?.trim().length ? req.body.description : undefined;
  
  if (!name || !description) {
    res.status(400).json({ error: 'Missing name or description' });
    return;
  }
  const placeId = createPlaces(name, description);
  if (!placeId) {
    res.status(400).json({ error: 'Place already exists' });
    return;
  }
  
  res.json({ placeId });
});

 /**
   * Ajouter un lieu à ses favoris. L'opération doit prendre en entrée l'ID de l'utilisateur 
   * et l'ID du lieu qu'il souhaite ajouter en favori. L'opération doit renvoyer une erreur 
   * si aucun utilisateur ne correspond à l'ID d'utilisateur donné, si aucun lieu ne correspond à 
   * l'ID de lieu donné, ou si cet utilisateur a déjà ce lieu dans ses favoris.
   */

router.put('/fav', (req, res) => {
const userId = req?.body?.userId ? parseInt(req.body.userId, 10) : undefined;
const placeId = req?.body?.placeId ? parseInt(req.body.placeId, 10) : undefined;

if (!userId || !placeId) {
  res.status(400).send({ error: 'Missing userId or placeId' });
  return;
} 

const result = addPlaces(userId, placeId);    

if (!result) {
  res.status(400).send({ error: 'Place already in favorites' });
  return;
}

res.json(result);
});

module.exports = router;
