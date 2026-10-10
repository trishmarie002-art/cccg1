import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Serve static files with clean URLs & directory indexing
app.use(express.static(__dirname, {
  extensions: ['html'],
  index: 'index.html'
}));

// Fallback to root index.html
app.use((req, res) => {
  res.status(404).sendFile('index.html', { root: __dirname });
});

app.listen(PORT, HOST, () => {
  console.log(`Coast to Coast Construction server running on http://${HOST}:${PORT}`);
});
