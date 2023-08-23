import express from 'express';
 
abstract class BaseController {
  public router: express.Router = express.Router();
 
  constructor() {
    }
  public initializeRoutes(): void {
    // To be implemented by child classes
  }
}
 
export default BaseController;