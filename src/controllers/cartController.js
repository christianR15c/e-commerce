import model from '../../models';

const { Cart } = model;
const { Product } = model;
const { User } = model;

// create or add a product on a cart
const createCart = (req, res) => {
  User.findOne({
    where: { id: req.params.userId },
  }).then((user) => {
    !user
      ? res.status(400).json({
          message: 'you have to login first to start adding items on cart',
        })
      : Product.findOne({
          where: {
            id: req.params.productId,
          },
        })
          .then((product) => {
            let price;
            if (product) {
              price = product.price;
              Cart.findAll({
                where: {
                  productId: req.params.productId,
                  userId: req.params.userId,
                },
              }).then((product) => {
                product.length != 0
                  ? res.status(400).json({
                      message:
                        'product already added on cart you  can change quantity instead',
                    })
                  : Cart.create({
                      userId: req.params.userId,
                      productId: req.params.productId,
                      price,
                      quantity: req.body.quantity,
                      subtotal: req.body.quantity * price,
                    }).then((cart) =>
                      res.status(200).json({
                        message: 'product has added to cart successfuly',
                        cart,
                      })
                    );
              });
            } else res.status(400).json({ message: 'product not found' });
          })
          .catch((err) => console.log(err));
  });
};

// view details of a single product on cart
const viewSingleProduct = (req, res) => {
  Cart.findOne({
    where: { userId: req.params.userId },
  })
    .then((products) => {
      Cart.findOne({
        where: { id: req.params.productId },
        include: {
          model: Product,
        },
      }).then((product) => {
        !product
          ? res.status(400).json({ message: 'product not found' })
          : res.status(200).json({ success: true, product });
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: 'products on cart couldnot be found',
        error,
      });
    });
};

// delete a single product on a cart
const deleteProductOnCart = (req, res) => {
  Cart.findAll({
    where: { userId: req.params.userId },
  })
    .then((products) => {
      Cart.findOne({
        where: { productId: req.params.productId },
      })
        .then((product) => {
          product.destroy().then(() => {
            res.status(200).json({ message: 'product deleted successfully' });
          });
        })
        .catch((error) => {
          res.status(400).json({ message: 'product not found', error });
        });
    })
    .catch((error) => {
      res.status(400).json({ message: 'Ooops, try again ...' });
    });
};

// view all products on a cart
const viewProductInCart = (req, res) => {
  Cart.findAll({
    where: {
      userId: req.params.userId,
    },
    attributes: {
      exclude: ['userId', 'createdAt', 'updatedAt'],
    },
    include: {
      model: Product,
      attributes: ['productName', 'price'],
    },
  })
    .then((cartProducts) => {
      if (cartProducts == 0) {
        res.status(400).json({
          message: 'no cart created, please add some products to cart first',
        });
      } else
        res.status(200).json({
          success: true,
          products: cartProducts,
        });
    })
    .catch((error) => res.status(500).json({ error }));
};

// canceling a cart || delete a cart
const cancelCart = (req, res) => {
  Cart.destroy({
    where: { userId: req.params.userId },
  })
    .then(() => {
      res.status(200).json({ message: `cart canceled successfully` });
    })
    .catch((error) => {
      res.status(400).json({ message: 'cart not found' });
    });
};

export default {
  createCart,
  viewProductInCart,
  deleteProductOnCart,
  viewSingleProduct,
  cancelCart,
};
