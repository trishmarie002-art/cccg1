import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Redirect index.html aliases to the same canonical URLs used by Vercel.
app.use((req, res, next) => {
 if (req.path.endsWith('/index.html')) return res.redirect(308, req.path.slice(0, -10) + (req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : ''));
 next();
});

// Serve static files with clean URLs & directory indexing
app.use(express.static(__dirname, {
  extensions: ['html'],
  index: 'index.html'
}));

// Fallback to root index.html
app.use((req, res) => {
  res.status(404).sendFile('404.html', { root: __dirname });
});

app.listen(PORT, HOST, () => {
  console.log(`Coast to Coast Construction server running on http://${HOST}:${PORT}`);
});
