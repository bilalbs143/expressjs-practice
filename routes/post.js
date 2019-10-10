var express = require('express');
var router = express.Router();
var PostController = require('../controllers/PostController');
router.use(require('../middleware/tokenChecker'))

/* index. */
router.get('/index', PostController.index);

/* store. */
router.post('/store', PostController.store);

/* show. */
router.get('/show/:id', PostController.show);

/* edit. */
router.get('/edit/:id', PostController.edit);

/* update. */
router.patch('/update/:id', PostController.update);

/* destroy. */
router.delete('/destroy/:id', PostController.destroy);

module.exports = router;
