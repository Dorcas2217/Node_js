var express = require('express');
var router = express.Router();
const { serialize, parse } = require('../utils/json');
const jsonDbPath = __dirname + '/../data/pizzas.json';
const MENU = [
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

/* Read all the pizzas from the menu
   GET /pizzas?order=title : ascending order by title
   GET /pizzas?order=-title : descending order by title
*/
router.get('/', (req, res, next) => {
  const order = req?.query?.order?.includes('title')? req.query.order : undefined

  let menuOrder
  const menu = parse(jsonDbPath, MENU)
  if(order) 
    menuOrder = [...menu].sort((a,b) => a.title.localeCompare(b.title));

  if(order == '-title')
    menuOrder.reverse();
  
  res.json( menuOrder ?? menu);
});

router.get('/:id', (req, res, next) => {
  const id = req?.params?.id? parseInt(req.params.id): undefined;
  if(!id)
    return res.sendStatus(400)

  const menu = parse(jsonDbPath, MENU)
  const pizzas = menu.find(p => p.id == id)
  if(!pizzas)
    return res.sendStatus(404)

  res.json(pizzas);
  
});


router.post('/', (req, res) => {
  const title = req?.body?.title?.trim().length ? req.body.title : undefined;
  const content = req?.body?.content?.trim().length ? req.body.content : undefined;

  console.log('POST /pizzas');

  if (!title || !content) return res.sendStatus(400); // error code '400 Bad request'
  const menu = parse(jsonDbPath, MENU);
  const lastItemIndex = menu.length ? menu.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? menu[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  const newPizza = {
    id: nextId,
    title: title,
    content: content,
  };

  menu.push(newPizza);

  serialize(jsonDbPath, menu);

  res.json(newPizza);
});

// Delete a pizza from the menu based on its id
router.delete('/:id', (req, res) => {
  const id = req.params.id? parseInt(req.params.id, 10) : undefined;

  if(!id ) 
    return res.sendStatus(400);

  const menu = parse(jsonDbPath, MENU);
  const foundIndex = menu.findIndex(pizza => pizza.id == id);

  if (foundIndex < 0)
    return res.sendStatus(404);

  const itemsRemovedFromMenu = menu.splice(foundIndex, 1);
  const itemRemoved = itemsRemovedFromMenu[0];

  res.json(itemRemoved);
});

// Update or create a pizza based on its id and new values for its parameters
router.put('/:id', (req, res) => {
  const id = req.params.id? parseInt(req.params.id, 10) : undefined;

  if (!id || id < 0) return res.status(400).send('BAD Request : A correct ID is required');

  const title = req?.body?.title?.trim().length ? req.body.title : undefined;
  const content = req?.body?.content?.trim().length ? req.body.content : undefined;

  if (!title || !content) return res.send(400).send('all the property of the request must be fill correctly (title and content)');

  const menu = parse(jsonDbPath, MENU);
  const foundIndex = menu.findIndex(pizza => pizza.id == id);

  if (foundIndex < 0) {
    const newPizza = {
      id: id,
      title: title,
      content: content,
    };
  
    menu.push(newPizza);
    serialize(jsonDbPath, menu);

    return res.json(newPizza);
  }

  const updatedPizza = {...menu[foundIndex], ...req.body};

  menu[foundIndex] = updatedPizza;
  serialize(jsonDbPath, menu);

  res.json(updatedPizza);
});

// Update a pizza based on its id and new values for its parameters
router.patch('/:id', (req, res) => {
  const id = req.params.id? parseInt(req.params.id, 10) : undefined;

  if (!id) return res.status(400).send('BAD Request : ID is required');

  const title = req?.body?.title;
  const content = req?.body?.content;

  if ((!title && !content) || title?.length === 0 || content?.length === 0) return res.sendStatus(400);

  const menu = parse(jsonDbPath, MENU);

  const foundIndex = menu.findIndex(pizza => pizza.id == req.params.id);

  if (foundIndex < 0) return res.sendStatus(404);

  const updatedPizza = {...menu[foundIndex], ...req.body};

  menu[foundIndex] = updatedPizza;

  res.json(updatedPizza);
});


module.exports = router;
