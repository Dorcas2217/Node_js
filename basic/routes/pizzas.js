var express = require('express');
var router = express.Router();

const {  readAllPizzas,
  readOnePizza,
  createOnePizza,
  deleteOnePizza,
  updateOnePizza, } = require('../models/pizzas');


/* Read all the pizzas from the menu
   GET /pizzas?order=title : ascending order by title
   GET /pizzas?order=-title : descending order by title
*/
router.get('/', (req, res, next) => {
  const order = req?.query?.order?.includes('title')? req.query.order : undefined

  const menu = readAllPizzas(order);
  
  res.json(menu);
});

router.get('/:id', (req, res, next) => {
  const id = req?.params?.id? parseInt(req.params.id): undefined;

  const pizza = readOnePizza(id);
  if (!pizza) return res.sendStatus(404);

  res.json(pizza);
  
});


router.post('/', (req, res) => {
  const title = req?.body?.title?.trim().length ? req.body.title : undefined;
  const content = req?.body?.content?.trim().length ? req.body.content : undefined;

  if (!title || !content) return res.sendStatus(400);

  const newPizza = createOnePizza(title, content);

  res.json(newPizza);
});

// Delete a pizza from the menu based on its id
router.delete('/:id', (req, res) => {
  const id = req.params.id? parseInt(req.params.id, 10) : undefined;

  if (!id || id < 0) return res.status(400).send('BAD Request : A correct ID is required');

  const itemRemoved = deleteOnePizza(id);
  if (!itemRemoved) return res.sendStatus(404);

  res.json(itemRemoved);
});

// Update or create a pizza based on its id and new values for its parameters
router.put('/:id', (req, res) => {
  const id = req.params.id? parseInt(req.params.id, 10) : undefined;

  if (!id || id < 0) return res.status(400).send('BAD Request : A correct ID is required');

  const title = req?.body?.title?.trim().length ? req.body.title : undefined;
  const content = req?.body?.content?.trim().length ? req.body.content : undefined;

  if (!title || !content) return res.send(400).send('all the property of the request must be fill correctly (title and content)');

  const newPizza = updateOnePizza(id, { title, content });

    return res.json(newPizza);
  });

// Update a pizza based on its id and new values for its parameters
router.patch('/:id', (req, res) => {
  const id = req.params.id? parseInt(req.params.id, 10) : undefined;

  if (!id) return res.status(400).send('BAD Request : ID is required');

  const title = req?.body?.title;
  const content = req?.body?.content;

  if ((!title && !content) || title?.length === 0 || content?.length === 0) return res.sendStatus(400);

  const updatedPizza = updateOnePizza(id, { title, content });

  if (!updatedPizza) return res.sendStatus(404);

  res.json(updatedPizza);
});


module.exports = router;
