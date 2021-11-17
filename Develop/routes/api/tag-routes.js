const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  try {
    const TagData = Tag.findAll( {
    include: [{ model: Product, through: ProductTag, as: 'product_tag' }]
    })
    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const TagID = Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: 'product_tag' }]
    });
  // be sure to include its associated Products
if (!TagID) {
  res.status(404).json({ message: 'No Tag found with this id!' });
  return;
}

res.status(200).json(TagID);
} catch (err) {
res.status(500).json(err);
}
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const TagData = Tag.create(req.body);
    res.status(200).json(TagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const TagData = Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!TagData) {
      res.status(404).json({ message: 'No Tag with this id!' });
      return;
    }
    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const TagData = Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!TagData) {
      res.status(404).json({ message: 'No Tag found with this id!' });
      return;
    }

    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
