import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from '@mui/material';
import {
  ShoppingCart,
  Person,
  Menu as MenuIcon,
  Favorite,
} from '@mui/icons-material';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const menuItems = [
    { text: 'Whiskey', path: '/whiskey' },
    { text: 'Wine', path: '/wine' },
    { text: 'About', path: '/about' },
    { text: 'Contact', path: '/contact' },
  ];

  const renderMobileMenu = (
    <Drawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={handleMobileMenuToggle}
    >
      <Box sx={{ width: 250 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={RouterLink}
              to={item.path}
              onClick={handleMobileMenuToggle}
            >
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );

  const renderDesktopMenu = (
    <>
      {menuItems.map((item) => (
        <Button
          key={item.text}
          color="inherit"
          component={RouterLink}
          to={item.path}
          sx={{ mx: 1 }}
        >
          {item.text}
        </Button>
      ))}
    </>
  );

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            fontFamily: 'Playfair Display',
          }}
        >
          Wine & Whiskey Haven
        </Typography>

        {!isMobile && renderDesktopMenu}

        <IconButton
          color="inherit"
          component={RouterLink}
          to="/cart"
        >
          <Badge badgeContent={cartItems.length} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>

        <IconButton
          color="inherit"
          onClick={handleProfileMenuOpen}
        >
          <Person />
        </IconButton>

        {isMobile && (
          <IconButton
            color="inherit"
            onClick={handleMobileMenuToggle}
            edge="end"
          >
            <MenuIcon />
          </IconButton>
        )}

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          sx={{
            '& .MuiPaper-root': {
              mt: 1,
              minWidth: 180,
            }
          }}
          onTransitionEnd={() => {
            if (!Boolean(anchorEl)) {
              setAnchorEl(null);
            }
          }}
        >
          <MenuItem onClick={() => {
            navigate('/profile');
            handleProfileMenuClose();
          }}>
            Profile
          </MenuItem>
          <MenuItem onClick={() => {
            navigate('/orders');
            handleProfileMenuClose();
          }}>
            Orders
          </MenuItem>
          <MenuItem onClick={() => {
            navigate('/wishlist');
            handleProfileMenuClose();
          }}>
            Wishlist
          </MenuItem>
          <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
        </Menu>

        {renderMobileMenu}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
