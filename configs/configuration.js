const Configuration = {
  APP_PORT: 5000,
  DB_URL: "mongodb://localhost:27017/demo_rt?retryWrites=true&w=majority",
  JWT_EXPIRATION: 3600,
  JWT_REFRESH_EXPIRATION: 86400,
  SECRET_KEY: "secret-key",
};

module.exports = Configuration;
