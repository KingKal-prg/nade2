const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/generate-plugin', (req, res) => {
    const { pluginName, licenseKey, serverIP, expirationDate } = req.body;

    if (!pluginName || !licenseKey || !serverIP) {
        return res.status(400).send("Missing required data");
    }

    const generatedPlugin = `${pluginName}-${licenseKey}.jar`;

    res.json({
        message: "Plugin generated successfully!",
        downloadLink: `/download/${generatedPlugin}`
    });
});

app.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    res.send(`You can download the plugin: ${filename}`);
});

// Export the express app as a Vercel handler
module.exports = app;
