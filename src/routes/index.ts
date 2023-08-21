const { Router } = require('express');
const routerIndex = Router();
/* GET home page. */
routerIndex.get('/', function(req: any, res: any, next: any) {
  res.render('index', { title: '' });
});

module.exports = {router : routerIndex};