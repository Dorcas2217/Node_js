import { clearPage } from '../../utils/render';
import { getPlaces } from '../../utils/places';

/**
 * La page de photos, accessible avec l'URI "/photos" 
 * ou avec un lien nommé "Photos" dans la barre de navigation, doit afficher un carrousel des lieux proposés.
Lorsqu'on arrive sur la page initialement, la page doit afficher 
le 3ème lieu dans la liste, avec son image et son nom en dessous.
La page doit également afficher deux boutons. Le premier permet d'afficher le lieu précédent 
dans la liste à la place de celui-ci. Et l'autre permet d'afficher le lieu suivant. Ces boutons ne doivent pas 
être cliquables s'il n'y a plus de lieu suivant ou de lieu précédent dans la liste.
 */

const Photos = () => {
  clearPage();
  displayPhotos();
};

const displayPhotos = () => {
  const places = getPlaces();
  const placeContainer = document.createElement('div');
  const prevButton = document.createElement('button');
  const nextButton = document.createElement('button');

  let currentIndex = 2;

  const showCurrentPlace = () => {
    const currentPlace = places[currentIndex];
    placeContainer.innerHTML = `
      <img src="${currentPlace.image}" alt="${currentPlace.name}">
      <h2>${currentPlace.name}</h2>
    `;
  };

  const updateButtons = () => {
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === places.length - 1;
  };

  const goToPreviousPlace = () => {
    currentIndex-=1;
    showCurrentPlace();
    updateButtons();
  };

  const goToNextPlace = () => {
    currentIndex+=1;
    showCurrentPlace();
    updateButtons();
  };

  prevButton.textContent = 'Précédent';
  prevButton.addEventListener('click', goToPreviousPlace);

  nextButton.textContent = 'Suivant';
  nextButton.addEventListener('click', goToNextPlace);

  placeContainer.id = 'place';
  showCurrentPlace();

  const main = document.querySelector('main');
  main.appendChild(placeContainer);
  main.appendChild(prevButton);
  main.appendChild(nextButton);

  updateButtons();
};



export default Photos;
