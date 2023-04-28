const {Router} = require('express');
const router = Router();
const Article = require('../models/Article');

router.get('/poems', async(req, res) => {
    const poems = await Article.find({}).lean();
    res.send(poems);
})
 
router.post('/create', async(req, res) => {
    const newPoem = new Article({
        title: req.query.title,
        poem: req.query.poem,
        author: req.query.author
    });

    await newPoem.save();
    res.send(newPoem);
})

module.exports = router;