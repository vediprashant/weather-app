const path     = require('path');
const express  = require('express');
const hbs      = require('hbs');
const geocode  = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port=process.env.PORT || 3000

const publicDirectory  = path.join(__dirname, '../public');
const viewsDirectory   = path.join(__dirname, '../templates/views');
const partialsDirectoy = path.join(__dirname, '../templates/partials');

app.use(express.static(publicDirectory));

app.set('view engine', 'hbs');
app.set('views', viewsDirectory);
hbs.registerPartials(partialsDirectoy);

app.get('/', (req, res) => {
    res.render('index', {
        title : 'Weather',
        name : 'Prashant Chaturvedi'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About',
        name : 'Prashant Chaturvedi'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error : 'No address provided'
        })
    }
    geocode(req.query.address, (error, data) => {
        if(error) {
           return res.send({error});
        }
        
        forecast(data,(error,data) => {
            if(error){
                return res.send({error});
            }
                res.send(data);
        })

    });
});


app.get('/help', (req, res) => {
    res.render('Help', {
        title : 'help',
        name :  'Prashant Chaturvedi'
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title : 'help',
        name : 'Prashant Chturvedi'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: 'error',
        name : 'Prashant Chaturvedi'
    })
})

app.listen(port, () =>{
    console.log(`Server is up on port ${port}`);
});