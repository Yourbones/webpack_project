let express = require('express');
let app = express();

app.get('/user', (req, res) => {
    res.json({slogan: '明月朗朗，清风入怀'});
})

app.listen(4000);