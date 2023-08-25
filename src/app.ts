import express from 'express';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import BaseController from './controllers/baseController';
import { dbConfig } from './db';

class App {
  public app: express.Application;
  public port: number;
 
  constructor(controllers: BaseController[], port: number) {
    this.app = express();
    this.port = port;
 
    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }
 
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(express.urlencoded({ extended: true, limit: '50mb' }));
    this.app.use(cookieParser());
    this.app.use(morgan('dev'));
    this.app.use(cors());

    this.app.use((error: any, request: express.Request, response: express.Response, next: express.NextFunction) => {
        const status = error.status || 500;
        const message = error.message || error;
        console.error(error);
        response.status(status).send(message);
      });
  }
 
  private initializeControllers(controllers: BaseController[]) {
    controllers.forEach((controller) => {
      controller.initializeRoutes();
      this.app.use('/', controller.router);
    });
  }
 
  private connectToTheDatabase() {
    dbConfig
    /* .authenticate().then(() => logger.info("connected to db")) */
    .sync().then(() => console.log("connected to db"))            
    .catch((error:any) => {            
        console.log(error);       
     });    
  }
}
 
export default App;