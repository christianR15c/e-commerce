import model from '../../models';

const { Category } = model;

const createCategory = (req, res) => {
  const { categoryName } = req.body;

  Category.create({
    categoryName,
  })
    .then((category) => {
      res.status(200).json({
        message: 'category successfully created',
        category,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

const getAllCategories = (req, res) => {
  return Category.findAll().then((categories) => {
    res.status(200).json(categories);
  });
};

const getSingleCategory = (req, res) => {
  return Category.findByPk(req.params.categoryId)
    .then((category) => {
      if (category) {
        res.status(200).json(category);
      } else {
        res.status(400).json({ message: `category not found` });
      }
    })
    .catch((error) => console.log(error));
};

const updateCategory = (req, res) => {
  const { categoryName } = req.body;
  return Category.findByPk(req.params.categoryId)
    .then((category) => {
      category
        .update({
          categoryName: categoryName || category.categoryName,
        })
        .then((updatedCategory) => {
          res.status(200).json({
            message: `category successfully updated`,
            data: {
              category,
            },
          });
        })
        .catch((error) => res.status(400).json(error));
    })
    .catch((error) => res.status(400).json(error));
};

const deleteCategory = (req, res) => {
  return Category.findByPk(req.params.categoryId)
    .then((category) => {
      if (!category) {
        return res.status(400).json({
          message: `category not found`,
        });
      } else {
        return category
          .destroy()
          .then(() =>
            res.status(200).json({
              message: `category deleted successfully`,
            })
          )
          .catch((error) => res.status(400).json(error));
      }
    })
    .catch((error) => res.status(400).json(error));
};

export default {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
