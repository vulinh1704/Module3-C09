const homeHandleRouter = require('./handleRouter/HomeHandleRouter');
const userHandleRouter = require('./handleRouter/userHandleRouter');
const router = {
    'home': homeHandleRouter.showHome,
    'create': homeHandleRouter.createProduct,
    'delete': homeHandleRouter.deleteProduct,
    'login': userHandleRouter.login
}
module.exports = router