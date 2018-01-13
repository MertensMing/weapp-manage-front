const jsonServer = require('json-server')
const user = require('./api/user')
const team = require('./api/team')

const routes = {
  user,
  team,
}

const router = jsonServer.router(routes)

const rewriter = jsonServer.rewriter({
  '/api/user': '/team',
})

module.exports = {
  router,
  rewriter,
}