import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(cors());
const port = process.env.PORT || 3001;

app.use(express.json());

const dataDir = path.join(__dirname, 'data');
fs.mkdirSync(dataDir, { recursive: true });

function appendToFile(fileName, entry) {
  const filePath = path.join(dataDir, fileName);
  let list = [];
  if (fs.existsSync(filePath)) {
    try {
      list = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (_) {
      list = [];
    }
  }
  list.push({ ...entry, receivedAt: new Date().toISOString() });
  fs.writeFileSync(filePath, JSON.stringify(list, null, 2));
}

app.post('/api/contact', (req, res) => {
  try {
    appendToFile('contacts.json', req.body);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

app.post('/api/quote', (req, res) => {
  try {
    appendToFile('quotes.json', req.body);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
