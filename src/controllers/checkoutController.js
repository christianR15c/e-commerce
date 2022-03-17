// import stripe from 'stripe';
import model from '../../models';
import fetch from 'cross-fetch';

const { Cart } = model;

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// stripe(process.env.STRIPE_SECRET_KEY);

const checkout = async (req, res) => {
  // geting information of products on cart
  const urlCart = `${process.env.SERVER_URL}/api/product/oncart/1`;
  const urlProducts = `${process.env.SERVER_URL}/api/product`;
  async function getCartsData(urlCart) {
    const response = await fetch(urlCart);

    return response.json();
  }

  const cartData = await getCartsData(urlCart);
  if (cartData.products.length != 0) {
    // stripe configuration
    stripe.checkout.sessions
      .create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: cartData.products.map((item) => {
          return {
            price_data: {
              currency: 'rwf',
              product_data: {
                name: item.productId,
              },
              unit_amount: item.subtotal,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${process.env.SERVER_URL}/success.html`,
        cancel_url: `${process.env.SERVER_URL}/cancel.html`,
      })
      .then((session) => res.status(200).json({ url: session.url, session }))
      .catch((error) => res.status(500).json({ error: error.message }));
  } else res.status(500).json({ message: 'there is no cart' });
};

export default { checkout };
