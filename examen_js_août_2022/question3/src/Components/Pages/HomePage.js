const HomePage = async () => {
  const main = document.querySelector('main');
  main.innerHTML = '';

  // Fetch and display all places
  const placesNames = await getAllPlaces();
  const ul = document.createElement('ul');
  placesNames.forEach((place) => {
    const li = document.createElement('li');
    li.textContent = place.name;
    ul.appendChild(li);
  });
  main.appendChild(ul);

  // Fetch and display the most recommended place (without blocking page rendering)
  getRecommendedPlace().then((recommendedPlace) => {
    const p = document.createElement('p');
    p.textContent = `The most recommended place is ${recommendedPlace.name}`;
    main.appendChild(p);
  }).catch((error) => {
    console.error('Failed to fetch recommended place:', error);
  });

  main.innerHTML += ''; // Append additional content
};

const getAllPlaces = async () => {
  try {
    const response = await fetch('https://places-exam-api.azurewebsites.net/places');
    if (!response.ok) throw new Error(`fetch error: ${response.status} : ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch all places:', error);
    return [];
  }
};

const getRecommendedPlace = async () => {
  try {
    const response = await fetch('https://places-exam-api.azurewebsites.net/recommended');
    if (!response.ok) throw new Error(`fetch error: ${response.status} : ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch recommended place:', error);
    return {};
  }
};

export default HomePage;
