const Menu = [
    {
      id: 1,
      title: '4 fromages',
      content: 'Gruyère, Sérac, Appenzel, Gorgonzola, Tomates',
    },
    {
      id: 2,
      title: 'Vegan',
      content: 'Tomates, Courgettes, Oignons, Aubergines, Poivrons',
    },
    {
      id: 3,
      title: 'Vegetarian',
      content: 'Mozarella, Tomates, Oignons, Poivrons, Champignons, Olives',
    },
    {
      id: 4,
      title: 'Alpage',
      content: 'Gruyère, Mozarella, Lardons, Tomates',
    },
    {
      id: 5,
      title: 'Diable',
      content: 'Tomates, Mozarella, Chorizo piquant, Jalapenos',
    },
  ];

const readAllMenu = () => Menu;

const addOneMenu = (menu) => Menu.push(menu);

export { readAllMenu, addOneMenu };