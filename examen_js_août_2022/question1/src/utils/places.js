import berlin from '../img/berlin.jpg';
import bruges from '../img/bruges.jpg';
import munich from '../img/munich.jpg';
import paris from '../img/paris.jpg';
import rome from '../img/rome.jpg';

const Places = [
  {
    id: 1,
    name: 'Berlin',
    image: berlin,
  },
  {
    id: 2,
    name: 'Bruges',
    image: bruges,
  },
  {
    id: 3,
    name: 'Munich',
    image: munich,
  },
  {
    id: 4,
    name: 'Paris',
    image: paris,
  },
  {
    id: 5,
    name: 'Rome',
    image: rome,
  },
];

// récupère la liste de tout les noms des lieux de vacances
 function getAllPlacesNames() {
  return Places.map(place => place.name);
}

// Récupère la liste des lieux de vacances
 function getPlaces() {
  return Places;
}

export {getAllPlacesNames, getPlaces};


