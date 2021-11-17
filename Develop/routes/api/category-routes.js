const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  try {
    const CategoryData = Category.findAll( {
    include: [{ model: Product }]
    })
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
try {
    const CategoryID = Category.findByPk(req.params.id, {
    include: [{ model: Product }]
  // be sure to include its associated Products
});
if (!CategoryID) {
  res.status(404).json({ message: 'No Category found with this id!' });
  return;
}

res.status(200).json(CategoryID);
} catch (err) {
res.status(500).json(err);
}
});
router.post('/', (req, res) => {
  // create a new category
  try {
    const CategoryData = Category.create(req.body);
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const CategoryData = Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!CategoryData) {
      res.status(404).json({ message: 'No Category with this id!' });
      return;
    }
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const CategoryData = Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!CategoryData) {
      res.status(404).json({ message: 'No Category found with this id!' });
      return;
    }

    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
