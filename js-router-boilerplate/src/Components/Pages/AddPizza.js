import { clearPage } from '../../utils/render';
import Navigate from '../Router/Navigate';
import { addOneMenu } from '../../models/pizzas';

const AddPizza = () => {
  clearPage();
  formPizza();
};

const formPizza = () => {
  const main = document.querySelector('main');

  const form = document.createElement('form');
  const title = document.createElement('input');
  const content = document.createElement('input');
  const submit = document.createElement('input');

  title.type = 'text';
  title.placeholder = 'titre';
  content.type = 'text';
  content.placeholder = 'contenu';
  submit.type = 'submit';
  submit.value = 'Ajouter';

  form.appendChild(title);
  form.appendChild(content);
  form.appendChild(submit);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const newPizza = {
      id: Date.now(),
      title: title.value,
      content: content.value,
    };
    // affiche la pizza sur la même page puis redirige vers la page d'accueil.
    const pizzaContainer = document.createElement('div');
    pizzaContainer.innerHTML = `
      <h2>${newPizza.title}</h2>
      <p>${newPizza.content}</p>
    `;
    addOneMenu(newPizza);
    form.appendChild(pizzaContainer);
    Navigate('/');
});

  main.appendChild(form); 
}

export default AddPizza;
