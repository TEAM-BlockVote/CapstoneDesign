let databaseConfig;

if (process.env.NODE_ENV === 'production') {
  databaseConfig = {
    connectionLimit: 200,
    host: process.env.PRODUCTION_HOST,
    user: process.env.PRODUCTION_ROOT,
    password: process.env.PRODUCTION_PASSWORD,
    database: 'BlockVote'
  };
};
if(process.env.NODE_ENV === 'development') {
  databaseConfig = {
    connectionLimit: 200,
    host: process.env.HOST,
    user: process.env.ROOT,
    password: process.env.PASSWORD,
    database: 'BlockVote'
  };
}

module.exports = databaseConfig;