import express from 'express';
import dotenv from 'dotenv';
import expressLayouts from 'express-ejs-layouts';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', './views');
app.set('layout', 'layout/main');

app.use(expressLayouts);
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home', { title: "Gay'vent", hideChrome: true, mainClass: 'login-page' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
