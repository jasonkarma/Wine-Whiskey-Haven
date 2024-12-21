import React from 'react';
import { useSelector } from 'react-redux';
import {
  Typography,
  Paper,
  Grid,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from '@mui/material';
import PageContainer from '../components/layout/PageContainer';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  // Temporary user data for development
  const tempUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    joinDate: 'January 2024',
    preferences: {
      favoriteCategory: 'Single Malt Whiskey',
      notifications: true,
      newsletter: true,
    },
    orderHistory: [
      {
        id: 'ORD001',
        date: '2024-01-15',
        total: 299.99,
        status: 'Delivered',
      },
      {
        id: 'ORD002',
        date: '2024-01-01',
        total: 159.99,
        status: 'Processing',
      },
    ],
  };

  const displayUser = user || tempUser;

  return (
    <PageContainer>
      <Grid container spacing={4}>
        {/* Profile Overview */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3,
              height: '100%'
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  margin: '0 auto',
                  mb: 2,
                  bgcolor: 'primary.main',
                }}
              >
                {displayUser.name.charAt(0)}
              </Avatar>
              <Typography variant="h5" gutterBottom>
                {displayUser.name}
              </Typography>
              <Typography color="textSecondary">
                Member since {displayUser.joinDate}
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <List>
              <ListItem>
                <ListItemText
                  primary="Email"
                  secondary={displayUser.email}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Favorite Category"
                  secondary={displayUser.preferences.favoriteCategory}
                />
              </ListItem>
            </List>
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
            >
              Edit Profile
            </Button>
          </Paper>
        </Grid>

        {/* Order History */}
        <Grid item xs={12} md={8}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3,
              height: '100%'
            }}
          >
            <Typography variant="h6" gutterBottom>
              Order History
            </Typography>
            <List>
              {displayUser.orderHistory.map((order) => (
                <React.Fragment key={order.id}>
                  <ListItem>
                    <ListItemText
                      primary={`Order #${order.id}`}
                      secondary={
                        <>
                          <Typography component="span" variant="body2">
                            Date: {order.date}
                          </Typography>
                          <br />
                          <Typography component="span" variant="body2">
                            Total: ${order.total}
                          </Typography>
                          <br />
                          <Typography
                            component="span"
                            variant="body2"
                            color={
                              order.status === 'Delivered'
                                ? 'success.main'
                                : 'info.main'
                            }
                          >
                            Status: {order.status}
                          </Typography>
                        </>
                      }
                    />
                    <Button variant="outlined" size="small">
                      View Details
                    </Button>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Profile;
