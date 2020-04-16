const express = require('express');
const app = express();
const port = 3000;

//https://expressjs.com/en/resources/middleware/cors.html
const cors = require('cors');

let quests = [{
    id : 1, 
    title : "sjette quest"
  },{
    id : 2, 
    title : "syvende quest"
  },{
    id : 3, 
    title : "ottende quest"
  }];

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

// app.use(cors());

app.get('/quests', cors(), (req : any, res : any) => {
    res.send(quests);
});