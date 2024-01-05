const express = require('express');
const pug = require('pug');
const basicAuth = require('express-basic-auth');
const data = require('./data');

const app = express();
const port = 4131;

// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('resources'));


// Basic Auth Configuration
const authUsers = { 'admin': 'password' };
const authMiddleware = basicAuth({
    users: authUsers,
    challenge: true
});

// Pug templates setup
app.set('view engine', 'pug');
app.set('views', './templates');

// // Extra credit: middleware function to print request
// function logRequest(req, res, next) {
//     const originalSend = res.send;
//     const startTime = Date.now();

//     // Log request details
//     console.log(`Request: ${req.method} ${req.url}`);

//     // Intercept the send function to log the response status
//     res.send = function(data) {
//         console.log(`Response Status: ${res.statusCode}`);
//         console.log(`Response Time: ${Date.now() - startTime}ms`);
//         originalSend.apply(res, arguments);
//     };

//     next();
// }

// app.use(logRequest);

// Routes
app.get('/', (req, res) => {
    res.render('mainpage');
});

app.get('/main', (req, res) => {
    res.render('mainpage');
});

app.get('/contact', (req, res) => {
    res.render('contactform');
});

app.post('/contact', async (req, res) => {
    const { name, email, date, dropdown, checkbox } = req.body;
    try {
        await data.addContact({ name, email, date, dropdown, checkbox: checkbox === 'on' });
        res.render('confirmation');
    } catch (error) {
        console.error(error);
        res.status(500).render('error');
    }
});

app.get('/testimonies', (req, res) => {
    res.render('testimonies');
});

app.get('/admin/contactlog', authMiddleware, async (req, res) => {
    try {
        const contacts = await data.getContacts();
        res.render('contactlog', { contacts });
    } catch (error) {
        console.error('Database error:', error);
        if (error.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
            // Handle timeout error
            res.status(503).render('error', { message: 'Database timeout. Please try again later.' });
        } else {
            res.status(500).render('error', { message: 'Internal Server Error' });
        }
    }
});

app.delete('/api/contact', authMiddleware, async (req, res) => {
    try {
        const success = await data.deleteContact(req.body.id);
        res.json({ success });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/sale', async (req, res) => {
    try {
        const recentSales = await data.getRecentSales();
        const currentSale = recentSales.length > 0 ? recentSales[0] : null;

        // If the most recent sale does not have an end time, it is active
        const saleStatus = {
            active: currentSale ? currentSale.end_time == null : false,
            message: currentSale ? currentSale.message : ""
        };

        res.json(saleStatus);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/sale', authMiddleware, async (req, res) => {
    const { message } = req.body;
    await data.addSale(req.body.message);
    if (message) {
        saleActive = true;
        saleMessage = message;
        res.json({ success: true, message: 'Sale message updated.' });
    } else {
        res.status(400).json({ error: 'Message is required' });
    }
});

app.delete('/api/sale', authMiddleware, async (req, res) => {
    saleActive = false;
    saleMessage = "";
    await data.endSale();
    res.json({ success: true, message: 'Sale ended.' });
});

app.get('/admin/salelog', authMiddleware, async (req, res) => {
    try {
        const sales = await data.getRecentSales();
        res.json(sales);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.use((req, res) => {
    res.status(404).render('404');
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
