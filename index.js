
const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();

const accommodationRoutes = require('./src/routes/accommodation');
const bookingRoutes = require('./src/routes/bookings');
const authRoutes = require('./src/routes/auth');
const datesRoutes = require('./src/routes/dates');




// Middleware to parse JSON bodies
app.use(express.json());

// Configure sessions
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Routes
app.use('/accommodation', accommodationRoutes);
app.use('/bookings', bookingRoutes);
app.use('/auth', authRoutes);
app.use('/', datesRoutes);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html file at the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
