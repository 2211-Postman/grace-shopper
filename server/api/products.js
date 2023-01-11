const router = require("express").Router();
const { models: { Product }} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
    try {
        const products = await Product.findAll({
            order: [
                ["productName", "ASC"]
            ]
        })
        res.json(products);
    } catch (err) {
        next (err);
    }
})

router.get("/:productId", async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.productId);
        res.json(product);
    } catch (err) {
        next(err);
    }
});

router.post("/", async (req, res, next) => {
    try {
        res.json(await Product.create(req.body))
    } catch (err) {
        next (err);
    }
})

router.put("/:productId", async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.productId);
        res.json(await product.update(req.body));
    } catch (err) {
        next(err);
    }
});

router.delete("/:productId", async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.productId);
        await product.destroy();
        res.json(product);
    } catch (err) {
        next(err);
    }
});