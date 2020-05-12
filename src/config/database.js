module.exports = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  define: {
    timestamps: process.env.DB_TIMESTAMPS,
    underscored: process.env.DB_UNDERSCORED,
    underscoredAll: process.env.DB_UNDERSCOREDALL,
  },
};
