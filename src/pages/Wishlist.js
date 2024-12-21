import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  IconButton,
} from '@mui/material';
import { Delete, AddShoppingCart } from '@mui/icons-material';
import { toggleWishlist } from '../redux/slices/wishlistSlice';
import { addToCart } from '../redux/slices/cartSlice';

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const handleRemoveFromWishlist = (product) => {
    dispatch(toggleWishlist(product));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  if (wishlistItems.length === 0) {
    return (
      <Container sx={{ py: 8 }}>
        <Box textAlign="center">
          <Typography variant="h4" gutterBottom>
            Your Wishlist is Empty
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Add items to your wishlist by clicking the heart icon on products you love.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" gutterBottom>
        My Wishlist
      </Typography>
      <Grid container spacing={4}>
        {wishlistItems.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 3,
                },
              }}
            >
              <CardMedia
                component="img"
                height="250"
                image={product.imageUrl}
                alt={product.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary">
                  ${product.price.toFixed(2)}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                <IconButton
                  color="error"
                  onClick={() => handleRemoveFromWishlist(product)}
                  aria-label="remove from wishlist"
                >
                  <Delete />
                </IconButton>
                <IconButton
                  color="primary"
                  onClick={() => handleAddToCart(product)}
                  aria-label="add to cart"
                >
                  <AddShoppingCart />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Wishlist;
