import model from '../../models';

const { Category } = model;

const createCategory = (req, res) => {
  const { categoryName } = req.body;

  Category.findOrCreate({
    where: { categoryName },
  })
    .then(([categoryName, created]) => {
      created
        ? res.json({
            message: 'category successfully created',
            categoryName,
          })
        : res.json({
            message: 'category already exist',
            categoryName,
          });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
};

const getAllCategories = (req, res) => {
  Category.findAll().then((categories) => {
    res.status(200).json(categories);
  });
};

const getSingleCategory = (req, res) => {
  Category.findByPk(req.params.categoryId)
    .then((category) => {
      category
        ? res.status(200).json(category)
        : res.status(400).json({ message: `category not found` });
    })
    .catch((error) => console.log(error));
};

const updateCategory = (req, res) => {
  const { categoryName } = req.body;
  Category.findByPk(req.params.categoryId)
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
  Category.findByPk(req.params.categoryId)
    .then((category) => {
      !category
        ? res.status(400).json({
            message: `category not found`,
          })
        : category
            .destroy()
            .then(() =>
              res.status(200).json({
                message: `category deleted successfully`,
              })
            )
            .catch((error) => res.status(400).json(error));
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
