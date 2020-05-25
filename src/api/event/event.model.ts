import { IEvent } from './event.interface';
import { DB } from '../../dbs';
import { MongoClient } from 'mongodb';

export class Event implements IEvent {
    title: string;
    description : string = "";
    date : Date  = new Date();

    constructor(private db : DB, title : string, description : string, date : Date){
        this.title = title;
        this.description = description;
        this.date = date;
    }

    /**
     * save 
     */
    private async save(){
        await this.db.connect().then(()=>{
            this.db.save( 'documents' , {
                item: 'canvas',
                qty: 100,
                tags: ['cotton'],
                size: { h: 28, w: 35.5, uom: 'cm' }
              });
        });
    }

    /**
     * entrypoint (isoleret)
     * create
     */
    public create() {
       return this.save();
    }
}