const path = require('node:path');
const { parse, serialize } = require('../utils/json');


const jsonDbPathPlaces = path.join(__dirname, '/../data/places.json');
const jsonDbPathUsers = path.join(__dirname, '/../data/users.json');

const Places = [
    {
      id: 1,
      name: 'Berlin',
      description : 'Berlin place !'
    }
  ];

  const Users = [{
    id :1,
    name: 'John',
    email: 'pDwYf@example.com',
    favoris: [  {
        id: 1,
        name: 'Berlin',
        description : 'Berlin place !'
      }, ]
  },]

  /**
   * Ajouter un lieu à ses favoris. L'opération doit prendre en entrée l'ID de l'utilisateur 
   * et l'ID du lieu qu'il souhaite ajouter en favori. L'opération doit renvoyer une erreur 
   * si aucun utilisateur ne correspond à l'ID d'utilisateur donné, si aucun lieu ne correspond à 
   * l'ID de lieu donné, ou si cet utilisateur a déjà ce lieu dans ses favoris.
   */

  const addPlaces = (userId, placeId) => {
    // Parse the users and places data from JSON files
    const users = parse(jsonDbPathUsers, Users);
    const places = parse(jsonDbPathPlaces, Places);
    
    // Find the user by ID
    const user = users.find(u => u.id === userId);
    if (!user) {
      console.error(`User with ID ${userId} not found.`);
      return { error: "User not found" };
    }
  
    // Find the place by ID
    const place = places.find(p => p.id === placeId);
    if (!place) {
      console.error(`Place with ID ${placeId} not found.`);
      return { error: "Place not found" };
    }
  
    // Check if the place is already in the user's favorites
    const exists = user.favoris.find(favori => favori.id === placeId);
    if (exists) {
      console.error(`Place with ID ${placeId} is already in the user's favorites.`);
      return { error: "Place already in favorites" };
    }
  
    // Add the place to the user's favorites
    user.favoris.push(place);
  
    // Serialize the updated users data back to the JSON file
    serialize(jsonDbPathUsers, users);
  
    // Return success
    return { success: true, userId, placeId };
  };
  
      

  /**
   * Créer un nouveau lieu de vacances. L'opération doit prendre en entrée le nom du lieu ainsi 
   * que sa description, et doit retourner l'ID du lieu créé au format JSON. 
   * L'opération doit renvoyer une erreur si le nom ou la description ne sont pas fournis.
   */
  const createPlaces = (namePlace, description) => {
    const places = parse(jsonDbPathPlaces, Places);   

    const existingPlace = places.find(place => place.name === namePlace);
    if (existingPlace) { 
      return null;
    }

    const id = getNextId(Places);
    const newPlace = {
      id,
      name: namePlace,
      description
    };  

    places.push(newPlace);
    serialize(jsonDbPathPlaces, places);
    return id;
  }


  /**
   * Créer un nouvel utilisateur. L'opération doit prendre en entrée le nom de l'utilisateur ainsi que son adresse mail,
   *  et doit retourner l'ID de l'utilisateur créé au format JSON. L'opération doit renvoyer une erreur si le nom
   *  ou l'adresse mail ne sont pas fournis, ainsi que si un utilisateur existe déjà pour cette adresse mail.
   */
  const createUsers = (name, email) => {
    const users = parse(jsonDbPathUsers, Users);
  
    const existingUser = users.find(user => user.email === email);
    if (existingUser) { 
      return null;
    }
  
    const id = getNextId(users);
    const newUser = {
      id,
      name,
      email,
      favoris: [],
    };
  
    users.push(newUser);
    serialize(jsonDbPathUsers, users);  // Corrected line: Now serializing to the correct path
    return id;
  }
  
  function getNextId(table) {
    const lastItemIndex = table.length !== 0 ? table.length - 1 : undefined;
    if (lastItemIndex === undefined) return 1;
    const lastId = table[lastItemIndex].id;
    const nextId = lastId + 1;
    return nextId;
  }
  
  

  module.exports = { addPlaces, createPlaces, createUsers };