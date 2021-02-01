export default () => ({
  PORT: parseInt(process.env.PORT, 10) || 3000,
  DATABASE: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432
  },
  BE_API_URL: process.env.BE_API_URL || 'http://localhost:3030'
});
