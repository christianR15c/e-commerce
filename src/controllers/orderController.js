import model from '../../models';
import fetch from 'cross-fetch';

const { Order } = model;

const order = async (req, res) => {
  const urlCart = `${process.env.SERVER_URL}/api/product/oncart/${req.params.cartId}`;
  async function getCartsData(urlCart) {
    const response = await fetch(urlCart);

    return response.json();
  }

  const cartData = await getCartsData(urlCart);
  const products = cartData.products;

  !products
    ? res.status(500).json({ message: 'cart not found' })
    : Order.max('orderId', {
        where: { userId: req.params.cartId },
      }).then((order) => {
        let orderId;
        orderId = order + 1;
        products.forEach((product) => {
          Order.create({
            orderId,
            userId: product.userId,
            productId: product.productId,
            quantity: product.quantity,
            price: product.price,
            subtotal: product.subtotal,
          });
        });
        res.status(200).json({ message: 'order made successfully' });
      });
};

// get all orders user made
const getUserOrder = (req, res) => {
  Order.findAll({
    where: { userId: req.params.userId },
    order: [['orderId', 'DESC']],
  })
    .then((orders) => {
      res.json(orders);
    })
    .catch((error) => console.log(error));
};

const getSinlgeOrder = (req, res) => {
  Order.findAll({
    where: {
      orderId: req.params.orderId,
      userId: req.params.userId,
    },
  })
    .then((order) => {
      order.length === 0
        ? res.status(500).json({ message: 'order not found' })
        : res.status(200).json(order);
    })
    .catch((error) => {
      res.status(400).json({ message: 'order not found' });
    });
};

const deleteOrder = (req, res) => {
  Order.destroy({
    where: {
      orderId: req.params.orderId,
      userId: req.params.userId,
    },
  })
    .then(() => res.status(200).json({ message: `order deleted successfully` }))
    .catch((error) => {
      res.status(400).json({ message: 'order not found' });
    });
};

export default {
  order,
  getUserOrder,
  getSinlgeOrder,
  deleteOrder,
};
