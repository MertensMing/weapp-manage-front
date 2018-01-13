const jsonServer = require('json-server')
const server = jsonServer.create()
const { router, rewriter } = require('./router')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(rewriter)
server.use(router)

server.listen(9090, () => {
  console.log('====> json server is running at http://localhost:9090/')
  console.log()
})