const app = require('./app');
const port = 3000;
app.listen(port, () => {
  console.log(`Listening on the port:${port} for a request...`);
});