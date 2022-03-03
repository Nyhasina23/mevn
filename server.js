const express = require('express');
const app = express();
const PORT = 3000
const connectionDB = require('./db.config')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const bucketListItemsRoutes = require('./routes/api/bucketListItem.js')
const router = require('./routes/api/bucketListItem.js')
const path = require('path')
app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    });
connectionDB();
var corsOptions = {
        origin : 'http://localhost:8080'
}
app.use(cors(corsOptions))

app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(router)
app.use('/api/bucketListItems/' , bucketListItemsRoutes)

if(process.env.NODE_ENV === 'production'){
        app.use(express.static('client/dist'))
        app.get('*' , (req , res) => {
                res.sendFile(path.resolve(__dirname , 'client', 'dist' , 'index.html'))
        })
}

app.listen(PORT, () => { console.log('Server start on port ' + PORT); }) 