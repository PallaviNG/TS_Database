var router = require('express').Router();

router.get("/", function (req, res) {
    res.send({ status: 1, message: 'web router' });
});

module.exports = router;