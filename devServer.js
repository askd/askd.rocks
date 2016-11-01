const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config');

const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/files', express.static(path.join(__dirname, 'files')));

// app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.use('/:lang', (req, res, next) => {
  const lang = req.params.lang ? req.params.lang : 'en';
  const filename = path.join(compiler.outputPath, `index_${lang}.html`);

  compiler.outputFileSystem.readFile(filename, (err, html) => {
    if (err) {
      return next(err);
    }
    res.set('content-type', 'text/html');
    res.send(html);
    return res.end();
  });
});

app.listen(3000, 'localhost', (err) => {
  if (err) {
    console.log(err); // eslint-disable-line
    return;
  }

  console.log('Listening at http://localhost:3000'); // eslint-disable-line
});
