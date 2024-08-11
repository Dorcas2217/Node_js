import { getAllPlacesNames} from "../../utils/places";
/**
 * La page d'accueil, accessible avec l'URI "/" ou avec un lien nommé "Home" dans la barre 
 * de navigation, doit afficher une liste de tous les noms de lieux de vacances.
 */
const HomePage = () => {
  const main = document.querySelector('main');
  main.innerHTML = '';


  const placesNames = getAllPlacesNames();
  const ul = document.createElement('ul');
  placesNames.forEach(placeName => {
    const li = document.createElement('li');
    li.textContent = placeName;
    ul.appendChild(li);
    li.innerHTML = placeName;
    main.appendChild(li);
  });
  main.appendChild(ul);



};

export default HomePage;
