const express = require('express');


const app = express();

app.get('/', (req, res) => {
        res.status(200).json({message:'Welcome to my application', app: 'Natours'});
})
app.post('/', (req, res) => {res.send('you can post this to endpoints at https:// it is post request')});
const port = 3000;
app.listen(port,()=>{
console.log(`listening on port ${port}!`);
})