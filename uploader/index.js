const serveIndex = require('serve-index');
const express = require('express');
const WeDeploy = require('wedeploy');
const multer = require('multer');
const storage = multer.diskStorage({
  filename: (req, file, cb) => cb(null, file.originalname),
  destination: (req, file, cb) => cb(null, './public/images'),
})
const upload = multer({storage});
const app = express();
app.post('/upload', upload.single('image'), (req, res) => {
  res.redirect(`${req.protocol}://${req.get('host')}/images`);

  WeDeploy
    .data('data-forsale.wedeploy.sh')
    .create('listings', {
      "title": req.body.title,
      "description": req.body.description,
      "price": req.body.price,
      "filename": req.file.filename
    })
    .then(function(succ){
      console.log(succ)
    })
    .catch(function(err){
      console.log(err)
    });
});
app.use(express.static(__dirname + '/public'));
app.use(serveIndex('public', {'icons': true}));
app.listen(3000);