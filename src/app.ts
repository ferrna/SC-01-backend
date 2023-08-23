import express from 'express';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import BaseController from './controllers/baseController';

class App {
  public app: express.Application;
  public port: number;
 
  constructor(controllers: BaseController[], port: number) {
    this.app = express();
    this.port = port;
 
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
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
 
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
 
export default App;