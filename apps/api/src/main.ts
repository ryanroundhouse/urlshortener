import * as express from 'express';
import { DBHelper } from './app/helper/db-helper';
import { UrlDto } from './app/url.model';
import { UrlService } from './app/url.service';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/urls', async (req, res) => {
  res.json(await UrlService.getAll());
});

app.post('/api/urls', async (req, res) => {
  console.log('req.body: ');
  console.log(req.body);
  res.json(await UrlService.create(req.body));
});

app.delete('/api/urls/:code', async (req, res) => {
  res.json(await UrlService.delete(req.params.code));
});

app.get('/:code', async (req, res) => {
  const url: UrlDto = await UrlService.getUrl(req.params.code);
  if (url) {
    res.redirect(url.url);
  } else {
    res.redirect('/api/urls');
  }
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

DBHelper.init();
