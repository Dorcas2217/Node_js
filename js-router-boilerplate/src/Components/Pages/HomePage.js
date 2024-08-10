import { clearPage } from '../../utils/render';
import { readAllMenu } from '../../models/pizzas';

const HomePage = async () => {
  clearPage();
  const main = document.querySelector('main');
  const Menu = await readAllMenu();
  
  const accordion = document.createElement('div');
  accordion.classList.add('accordion', 'my-3');
  Menu.forEach(menuItem => {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');
    cardHeader.setAttribute('id', `heading${menuItem.id}`);

    const button = document.createElement('button');
    button.classList.add('btn', 'btn-link', 'btn-block', 'text-start');
    button.setAttribute('type', 'button');
    button.setAttribute('data-bs-toggle', 'collapse');
    button.setAttribute('data-bs-target', `#collapse${menuItem.id}`);
    button.setAttribute('aria-expanded', 'true');
    button.setAttribute('aria-controls', `collapse${menuItem.id}`);
    button.textContent = menuItem.title;

    cardHeader.appendChild(button);
    card.appendChild(cardHeader);

    const collapse = document.createElement('div');
    collapse.classList.add('collapse', 'show');
    collapse.setAttribute('id', `collapse${menuItem.id}`);
    collapse.setAttribute('aria-labelledby', `heading${menuItem.id}`);
    collapse.setAttribute('data-bs-parent', '#accordion');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    cardBody.textContent = menuItem.content;

    collapse.appendChild(cardBody);
    card.appendChild(collapse);

    accordion.appendChild(card);
  });

  main.appendChild(accordion);

};

export default HomePage;
