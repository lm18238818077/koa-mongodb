const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
module.exports = (app) => {
  // router.post( '/saveBlock', bodyParser(), app.controller.home.saveBlock )
  // router.get( '/getBlock', app.controller.home.getBlock )
  // router.post( '/delBlock', bodyParser(), app.controller.home.delBlock )
  // router.post( '/updateBlock', bodyParser(), app.controller.home.updateBlock )
  // router.get('/home', app.controller.home.home)
  // router.get('/home/:id/:name', app.controller.home.homeParams)
  // router.get('/user', app.controller.home.login)
  // router.post('/user/register', app.controller.home.register)
  
  router.get( '/user', app.controller.home.getUser )
  router.get( '/user/add', app.controller.home.add )
  router.post( '/user/add', bodyParser(), app.controller.home.saveUser )
  router.get( '/user/update', app.controller.home.update )
  router.post( '/user/update', bodyParser(), app.controller.home.updateUser )
  router.get( '/user/Delete', app.controller.home.delUser )

  app.use(router.routes()).use(router.allowedMethods())
}