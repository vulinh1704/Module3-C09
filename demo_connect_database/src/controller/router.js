const homeHandleRouter = require('./handleRouter/HomeHandleRouter');
const router = {
    'home' : homeHandleRouter.showHome,
    'create': homeHandleRouter.createProduct,
    'delete': homeHandleRouter.deleteProduct
}
module.exports = router