const  productRouting = require('./handle/productHandle');
const router = {
    "home" : productRouting.showHome
}
module.exports = router;