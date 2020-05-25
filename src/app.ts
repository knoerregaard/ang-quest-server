import express = require('express');
import cors from 'cors';
import { DB } from './dbs';
import eventRoutes from './api/event/event.routes';

class App {

    public app : any;
    
    private db = new DB();

    constructor() {
        //This app is an Express app.
        this.app = express();

        //Mount routes 
        this.app.use('/', cors(), eventRoutes.routes);

        this.app.get('/test', (req : any, res : any)=>{
            res.send("Hello you, how are you")
        })

        //Setup change detection for the indeividual client
        this.app.get("/stream", (req : any, res : any) => { 
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Content-Type', 'text/event-stream');
            // res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Connection", "keep-alive");
            res.flushHeaders(); // flush the headers to establish SSE with client
            const data = { 
                message : "hello world"
            }
            
            // let db = new MongoClient(this.PROD_uri).db("myproject");
            
            const collection = this.db.db.collection('documents');

            //definerer en ChangeStream
            const changeStream = collection.watch();

            //Anvend ChangeStream med .on(eventlistener, callback)
            // changeStream.on('change', (doc) =>{
            //     res.send(doc);
            // });
            changeStream.on('change',(doc)=>{
                console.log(doc);
                 
                res.write("data: hej" + "\n\n")

            }) 
            changeStream.on('error',(doc)=>{
                console.log(doc);
                
            })
        })
 
    }
}

export default new App().app;  