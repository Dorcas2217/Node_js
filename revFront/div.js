const div = ()  => {
    // Récupérer toutes les divs de la page
    const divs = document.querySelectorAll('.color-div');
  
    // Ajouter un événement click à chaque div
    divs.forEach((div) => {
      div.addEventListener('click', (e) => {
        e.target.innerText = e.target.style.backgroundColor;
        e.target.style.width = "100px";
        e.target.style.height = "100px"; 
      });
    });
  }
  
  div();
  