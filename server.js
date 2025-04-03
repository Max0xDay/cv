/* Author: Max Day
 * Date: 03/04/2025
 *
 */
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8765; 


app.use(express.static(path.join(__dirname, 'public')));

app.use('/pdfs', express.static(path.join(__dirname, 'pdfs')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.listen(PORT, () => {
  console.log(`CV server is running at http://localhost:${PORT}`);
});