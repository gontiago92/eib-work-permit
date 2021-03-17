import 'dotenv/config';
import cors from 'cors';
import express from 'express' 
import db from './lib/db.js';

const app = express();
 
app.use(cors());
app.use(express.json())
 

app.get('/', (req, res) => {
    res.status(200).send('<h1>Server side</h1>')
})

/*
app.use('/', require('./routes/pages'))
app.use('/auth', require('./routes/auth'))
*/
app.use('/', (req,res) => {
  res.status(404).send('<h1>404 Page Not Found!</h1>');
});
 
app.listen(process.env.PORT, () =>
  console.log(`Server listening on port ${process.env.PORT}!`),
);
