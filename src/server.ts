import app from './app';
const server = require('http').createServer(app);

const port = normalizePort(process.env.PORT || 3000);

server.listen(port, function(){ 
    console.log(`server is listening on ${port}`)
});

function normalizePort(val: number|string): number|string|boolean {
  let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
  if (isNaN(port)) return val;
  else if (port >= 0) return port;
  else return false;
}