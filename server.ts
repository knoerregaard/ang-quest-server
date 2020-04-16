const express = require('express');
const app = express()
const port = 3000

let quests = [{
    id : 1, 
    title : "den første quest"
  },{
    id : 2, 
    title : "den anden quest"
  },{
    id : 3, 
    title : "den tredje quest"
  }];

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

app.get('/quests', (req : any, res : any) => {
    res.send(quests);
})