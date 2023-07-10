const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();
const port = process.env.PORT || 7000;

// static path
const staticPath = path.join(__dirname, '../public');
// views path
const viewsPath = path.join(__dirname, '../templates/views')
// partials path
const partialsPath = path.join(__dirname, '../templates/partials')
// serve static files
app.use(express.static(staticPath))

// configure hbs template engine
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Routes
app.get('/', (req, res) => {
    res.render('index', {
        extraLink : 'new link'
    })
});
app.get('/about', (req, res) => {
    res.render('about')
});
app.get('/weather', (req, res) => {
    res.render('weather')
});
app.get('*', (req, res) => {
    res.render('404')
});

app.listen(port, (err) => {
    if (err) return console.log(err)
    console.log(`The server is running in the port: ${port}`)
})