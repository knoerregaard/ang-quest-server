import { MongoClient, Db } from "mongodb";
import * as express from 'express';
// const MongoClient = require('mongodb').MongoClient
const cred = require('../../cred.js');
// https://blog.mlab.com/2017/05/mongodb-connection-pooling-for-express-applications/
// Note: A production application should not expose database credentials in plain text.
// For strategies on handling credentials, visit 12factor: https://12factor.net/config.

//Explicit read write

export class DB {
  //stien til mongo
  private PROD_uri : string = "mongodb+srv://angquestUser:ang12345@cluster0-mmxgw.azure.mongodb.net/test?retryWrites=true&w=majority";
  //Instantiate a mongoClient
  private mongoClient : MongoClient = new MongoClient(this.PROD_uri);
  //Db reference.
  public db! : Db;

  constructor(){
    this.mongoClient.connect()
      .then(() => {
        //On connect a db is opened
        this.db = this.mongoClient.db("myproject")
        //We also initialize the change detection
        // this.detectChanges();
      })
      .catch((error)=>{
        console.log(error);
      })
  }
  
  /**
  * connect returns a mongoClient object
  */
  public async connect(){ 
    await MongoClient.connect(this.PROD_uri).then((mongoClient: MongoClient) => {
      this.db = mongoClient.db("myproject");
    })
  } 
  
  /**
  * save
  */
  public save(collection : string, document : object){
    //Save a document DB
    //declarative ???
    // let db = this.mongoClient.db("myproject");
    this.db.collection(collection)
      .insertOne(document) 
      .then((doc)=>{return doc})
      .catch((error)=>{ 
        //Handle error 
      })
      .finally(()=>{
        //Close connection
      });
  }
  
  /**
   * update
   */
  public update() {
    
  }

  /**
   * delete
   */
  public async delete(collection : string) {

  }
  
  public detectChanges(app : express.Express){
    


    // let db = new MongoClient(this.PROD_uri).db("myproject");
    const collection = this.db.collection('documents');

    //definere en ChangeStream
    const changeStream = collection.watch();

    //Anvend ChangeStream med .on(eventlistener, callback)
    changeStream.on('change', (doc) =>{
      console.log(doc);
      
    });
    

    // changeStream.hasNext((document) => {
    //   return document;
    // })

    //ved fejl
    changeStream.on("error", data => {
      // log error here.
      console.log(data);
      
    });
  }

}

