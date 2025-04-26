const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;
const { exec } = require('child_process');

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

    // Simulating the creation of a .jar file
    const jarFilePath = path.join(__dirname, 'generated_plugins', `${pluginName}-${licenseKey}.jar`);
    
    // Create the generated_plugins directory if it doesn't exist
    if (!fs.existsSync(path.dirname(jarFilePath))) {
        fs.mkdirSync(path.dirname(jarFilePath));
    }

    // This is where you would normally generate your plugin's .jar file.
    // For this example, we're just creating a dummy file.
    fs.writeFileSync(jarFilePath, `Generated Plugin: ${pluginName}\nLicense Key: ${licenseKey}\nServer IP: ${serverIP}\nExpiration: ${expirationDate}`);
    
    // Send the .jar file to the client
    res.json({
        message: 'Plugin generated successfully!',
        downloadUrl: `/download/${pluginName}-${licenseKey}.jar`
    });
});

// Endpoint to download the generated plugin .jar file
app.get('/download/:fileName', (req, res) => {
    const filePath = path.join(__dirname, 'generated_plugins', req.params.fileName);

    if (fs.existsSync(filePath)) {
        res.download(filePath); // Let the user download the file
    } else {
        res.status(404).send('File not found');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
