const dotenv = require('dotenv');

dotenv.config({ path: './Environment/state.env' });
dotenv.config(
  process.env.NODE_ENV === 'development'
    ? { path: './Environment/.env' }
    : { path: './Environment/production_config.env' }
);

// This module must be declared after the environment configuration
const app = require('./app');

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`App is listening on a port ${port}...`);
});
