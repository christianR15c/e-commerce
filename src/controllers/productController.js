import model from '../../models';

const { Product } = model;

const createProduct = (req, res) => {
  const { productName, description, quantity, price } = req.body;
  Product.findAll({
    where: { productName, categoryId: req.params.categoryId },
  }).then((product) => {
    product.length != 0
      ? res
          .status(400)
          .json({ message: `product with name: ${productName} exist` })
      : Product.create({
          productName,
          description,
          quantity,
          price,
          categoryId: req.params.categoryId,
        })
          .then((product) => {
            res.status(200).json({
              message: 'product successfully created',
              product,
            });
          })
          .catch((err) => {
            res.status(500).json({ message: 'some errors happened', err });
          });
  });
};

const getAllProducts = (req, res) => {
  return Product.findAll().then((products) => {
    products.length === 0
      ? res.status(400).json({ message: 'No product added yet' })
      : res.status(200).json(products);
  });
};

const getSingleProduct = (req, res) => {
  return Product.findByPk(req.params.productId)
    .then((product) => {
      product
        ? res.status(200).json(product)
        : res.status(400).json({ message: `product not found` });
    })
    .catch((error) => console.log(error));
};

const updateProduct = (req, res) => {
  const { productName, description, quantity, price } = req.body;
  Product.findByPk(req.params.productId)
    .then((productToUpdate) => {
      Product.findAll({
        where: { productName },
      }).then((product) => {
        product.length != 0
          ? res.status(400).json({
              message: `product with name: ${productName} already exist`,
            })
          : productToUpdate
              .update({
                productName: productName || product.productName,
                description: description || product.description,
                quantity: quantity || product.quantity,
                price: price || product.price,
              })
              .then((updatedProduct) => {
                res.status(200).json({
                  message: `product successfully updated`,
                  data: {
                    updatedProduct,
                  },
                });
              })
              .catch((error) => res.status(400).json(error));
      });
    })
    .catch((error) => res.status(400).json(error));
};

const deleteProduct = (req, res) => {
  return Product.findByPk(req.params.productId)
    .then((product) => {
      !product
        ? res.status(400).json({
            message: `product not found`,
          })
        : product
            .destroy()
            .then(() =>
              res.status(200).json({
                message: `product deleted successfully`,
              })
            )
            .catch((error) => res.status(400).json(error));
    })
    .catch((error) => res.status(400).json(error));
};

const findProductByCategory = (req, res) => {
  return Product.findAll({ where: { categoryId: req.params.categoryId } })
    .then((products) => {
      products.length === 0
        ? res.json({ message: 'no product found in this category' })
        : res.status(200).json(products);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

export default {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  findProductByCategory,
};
