function renderPage() {
    // Récupère la date et l'heure actuelles
    const now = new Date();
    
    // Convertit la date en chaîne de caractères lisible
    const dateTimeString = now.toLocaleString();
    
    // Affiche un pop-up avec la date et l'heure actuelles
    alert(`Date et heure actuelles : ${dateTimeString}`);

    const  div = document.createElement('div');
    const button = document.createElement('button');
    let count = 0;

    const countDisplay = document.createElement('p');
    countDisplay.innerText = `Nombre de clics : ${count}`;
  
    div.appendChild(countDisplay);
   
    button.innerText = 'submit';
    div.appendChild(button);

    document.body.appendChild(div);   


    button.addEventListener('click', () => {
        count++;
        countDisplay.innerText = `Nombre de clics : ${count}`;

        if (count >= 5 && count <= 9) {
            countDisplay.innerHTML += "<br>Bravo, bel échauffement !";
        } else if (count >= 10) {
             countDisplay.innerText += "<br>Vous êtes passé maître en l'art du clic !";
        }
    });
};

renderPage();