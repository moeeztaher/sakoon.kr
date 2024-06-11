const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Serve Angular app
app.use(express.static(path.join(__dirname, 'dist/sakoonkr/browser')));
app.use('/assets/music', express.static(path.join(__dirname, 'src/assets/music')));

app.get('/api/tracks', (req, res) => {
  const musicDir = path.join(__dirname, 'src/assets/music');
  fs.readdir(musicDir, (err, files) => {
    if (err) {
      return res.status(500).send('Unable to scan directory: ' + err);
    }
    const tracks = files.filter(file => file.endsWith('.mp3')).map(file => {
      const [title, artist] = file.replace('.mp3', '').split(',');
      return { title, artist, path: `/assets/music/${file}` };
    });
    res.json(tracks);
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/sakoonkr/browser/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
