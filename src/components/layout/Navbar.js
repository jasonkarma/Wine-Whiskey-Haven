import React, { useState, useCallback } from 'react';
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

  const handleProfileMenuOpen = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleProfileMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleMobileMenuToggle = useCallback(() => {
    setMobileMenuOpen(!mobileMenuOpen);
  }, [mobileMenuOpen]);

  const handleMobileMenuClose = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const handleNavigation = useCallback((path) => {
    navigate(path);
    handleProfileMenuClose();
    handleMobileMenuClose();
  }, [navigate]);

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
      onClose={handleMobileMenuClose}
      keepMounted
    >
      <Box sx={{ width: 250 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => handleNavigation(item.path)}
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
          onClick={() => handleNavigation(item.path)}
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
          onClick={() => handleNavigation('/cart')}
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
          keepMounted
        >
          <MenuItem onClick={() => handleNavigation('/profile')}>
            Profile
          </MenuItem>
          <MenuItem onClick={() => handleNavigation('/orders')}>
            Orders
          </MenuItem>
          <MenuItem onClick={() => handleNavigation('/wishlist')}>
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
