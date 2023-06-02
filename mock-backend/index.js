const express = require('express');
const axios = require('axios');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



const app = express();


// mock endpoint that would serve images for example:

app.get('/images', async (req, res) => {
  try {
    const response = await axios.get('https://picsum.photos/v2/list');
    const images = response.data.map((image) => ({
      id: image.id,
      url: image.download_url,
      author: image.author,
    }));

    res.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});


app.post('/users', async (req, res) => {
  const { username, email, password, userType, hotelId } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password,
        userType,
        hotelId,
      },
    });

    res.json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Create a new subscription
app.post('/subscriptions', async (req, res) => {
  const { userId, type, startDate, endDate } = req.body;

  try {
    const subscription = await prisma.subscription.create({
      data: {
        userId,
        type,
        startDate,
        endDate,
      },
    });

    res.json(subscription);
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ error: 'Failed to create subscription' });
  }
});

// Get all subscriptions
app.get('/subscriptions', async (req, res) => {
  try {
    const subscriptions = await prisma.subscription.findMany();
    res.json(subscriptions);
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    res.status(500).json({ error: 'Failed to fetch subscriptions' });
  }
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});