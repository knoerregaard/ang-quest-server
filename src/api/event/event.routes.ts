import * as express from 'express';
import { Event } from './event.model';
import { Db } from 'mongodb';
import { DB } from '../../dbs';

class EventRoutes {

    routes: express.Router;

    constructor() {
        const db = new DB();
        this.routes = express.Router();

        this.routes.get('/listenForUpdate', (req, res) => {
          res.json({title: "asd"})
        });


        this.routes.get('/quests', (req, res) => {
          //Returns a list of quests
          let match = req.query.match;
          console.log(match);
          db.connect()
            .then(()=>{

            })
          res.json({title: "asd"})
        });

        this.routes.get('/event/test', (req, res) => {
            
            // res.writeHead(200, {
            //   'Content-Type': 'text/event-stream',
            //   'Cache-Control': 'no-cache',
            //   'Connection': 'keep-alive'
            // })
            // // countdown(res, 10)
            // db.detectChanges();
          });

        this.routes.post('/event/create', (req, res)=>{
            
            new Event(db ,"title", "description", new Date())
                .create()
                .then(()=>{ res.send("done") });
            
            
            //Async event.
            // event.save().then(()=>{
            //     res.send("done")
            // });
        })

        // this.routes.get('/:id', (req, res) => {
        //     const location_id = req.params;
           
        //     Event.findOne({ isActive: true})
        //         .then(documents =>{                   
        //             res.status(200).send(documents)
        //         })
        //         .catch(err =>{
        //             console.log(err);
        //         })
        // });
    }
}
function countdown(res: any, count : any) {
    res.write("data: " + count + "\n\n")
    if (count)
      setTimeout(() => countdown(res, count-1), 1000)
    else
      res.end()
  }
export default new EventRoutes();