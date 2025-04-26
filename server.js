const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(bodyParser.json());

// Serve the static HTML page
app.use(express.static('public'));

// Handle POST request to generate plugin
app.post('/generate-plugin', (req, res) => {
    const { pluginName, licenseKey, serverIP, expirationDate } = req.body;

    if (!pluginName || !licenseKey || !serverIP) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // You can process and generate the plugin here
    // Example: Generate plugin files or store data in a database

    console.log(`Plugin Name: ${pluginName}`);
    console.log(`License Key: ${licenseKey}`);
    console.log(`Server IP: ${serverIP}`);
    console.log(`Expiration Date: ${expirationDate}`);

    res.json({ message: 'Plugin generated successfully!' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
