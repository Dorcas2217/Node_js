form = () => {
    // Créer la div contenant le formulaire
    const formDiv = document.createElement('div');
    formDiv.innerHTML = `
        <form id="souhait-form">
            <label for="souhait-input">Veuillez entrer votre souhait :</label>
            <input type="text" id="souhait-input" />
            <input type="submit" value="Soumettre" />
        </form>
    `;

    // Insérer le formulaire juste avant le texte "Hello everybody !"
    const referenceNode = document.body.firstChild; // Ici on prend le premier enfant du body
    document.body.insertBefore(formDiv, referenceNode);

    // Gestion de l'événement de soumission du formulaire
    const form = document.getElementById('souhait-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const souhaitInput = document.getElementById('souhait-input');
        const souhaitValue = souhaitInput.value;
        
        // Cacher le formulaire
        formDiv.style.display = "none";

        // Créer et afficher le souhait
        const souhaitDiv = document.createElement('div');
        souhaitDiv.innerText = `Votre souhait : ${souhaitValue}`;
        document.body.insertBefore(souhaitDiv, referenceNode); // Insérer avant "Hello everybody !"
        
        // Réinitialiser le champ d'entrée
        souhaitInput.value = "";

        // Créer et afficher le bouton pour réafficher le formulaire
        const redisplayButton = document.createElement('button');
        redisplayButton.innerText = "Redisplay the form";
        redisplayButton.onclick = () => {
            formDiv.style.display = "block";
            souhaitDiv.remove();
            redisplayButton.remove();
        }
        document.body.insertBefore(redisplayButton, referenceNode); // Insérer avant "Hello everybody !"

    });
}

form();
