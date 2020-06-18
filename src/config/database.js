module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'angeloni',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
