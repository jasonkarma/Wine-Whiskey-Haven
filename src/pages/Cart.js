import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Grid,
  Button,
  CardMedia,
  IconButton,
  Paper,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { removeFromCart, updateQuantity, setDeliveryOption } from '../redux/slices/cartSlice';
import PageContainer from '../components/layout/PageContainer';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, total, deliveryOption } = useSelector((state) => state.cart);

  const deliveryOptions = {
    ubereats: {
      name: 'UberEats',
      fee: 5.99,
      estimatedTime: '30-45 minutes',
    },
    foodpanda: {
      name: 'Foodpanda',
      fee: 4.99,
      estimatedTime: '35-50 minutes',
    },
    standard_shipping: {
      name: 'Standard Shipping',
      fee: 15.00,
      estimatedTime: '2-3 business days',
    },
    express_shipping: {
      name: 'Express Shipping',
      fee: 25.00,
      estimatedTime: 'Next business day',
    },
  };

  const handleQuantityChange = (id, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleDeliveryOptionChange = (event) => {
    dispatch(setDeliveryOption(event.target.value));
  };

  const calculateTotal = () => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = deliveryOption ? deliveryOptions[deliveryOption].fee : 0;
    return {
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
    };
  };

  if (items.length === 0) {
    return (
      <PageContainer maxWidth="lg">
        <Box textAlign="center">
          <Typography variant="h4" gutterBottom>
            Your Cart is Empty
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Looks like you haven't added any items to your cart yet.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/')}
            sx={{ mt: 2 }}
          >
            Continue Shopping
          </Button>
        </Box>
      </PageContainer>
    );
  }

  const totals = calculateTotal();

  return (
    <PageContainer maxWidth="lg">
      <Typography variant="h3" gutterBottom sx={{ fontFamily: 'Playfair Display' }}>
        Shopping Cart
      </Typography>

      <Grid container spacing={4}>
        {/* Cart Items */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3}>
            {items.map((item) => (
              <Box key={item.id}>
                <Box sx={{ p: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={3}>
                      <CardMedia
                        component="img"
                        height="120"
                        image={item.imageUrl}
                        alt={item.name}
                        sx={{ objectFit: 'cover', borderRadius: 1 }}
                      />
                    </Grid>
                    <Grid item xs={9}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                          <Typography variant="h6">{item.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.type}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            ${item.price.toFixed(2)}
                          </Typography>
                        </Box>
                        <Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <IconButton
                              size="small"
                              onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                            >
                              <Remove />
                            </IconButton>
                            <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                            <IconButton
                              size="small"
                              onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                            >
                              <Add />
                            </IconButton>
                          </Box>
                          <Typography variant="subtitle1" sx={{ textAlign: 'right' }}>
                            ${(item.price * item.quantity).toFixed(2)}
                          </Typography>
                          <Button
                            startIcon={<Delete />}
                            color="error"
                            onClick={() => handleRemoveItem(item.id)}
                            sx={{ mt: 1 }}
                          >
                            Remove
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Divider />
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Subtotal: ${totals.subtotal.toFixed(2)}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Delivery Fee: ${totals.deliveryFee.toFixed(2)}
              </Typography>
              <Typography variant="h6" color="primary">
                Total: ${totals.total.toFixed(2)}
              </Typography>
            </Box>

            <Typography variant="h6" gutterBottom>
              Delivery Options
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="delivery-option"
                name="delivery-option"
                value={deliveryOption}
                onChange={handleDeliveryOptionChange}
              >
                {Object.entries(deliveryOptions).map(([key, option]) => (
                  <FormControlLabel
                    key={key}
                    value={key}
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography variant="body1">{option.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          ${option.fee.toFixed(2)} - {option.estimatedTime}
                        </Typography>
                      </Box>
                    }
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ mt: 3 }}
            >
              Proceed to Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Cart;
