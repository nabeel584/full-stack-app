const express = require('express');
const router = express.Router();
const projectController = require('../controller/projectController');

// router.post('/', projectController.homePagePost);
router.get('/', projectController.getAllProducts);
// router.get('/products', projectController.getAllProducts);
// router.patch('/', projectController.updateProducts);
router.post('/', projectController.postProduct);
router.delete('/:id', projectController.deleteProduct);
router.patch('/:id', projectController.updateProduct);
// router.patch('/', projectController.updateProducts);

module.exports = router;
