export const envConfig = () => ({
  environment: process.env.NODE_ENV || 'dev',
  port: +process.env.PORT || 3002,
  mongoDB: process.env.MONGODB,
  defaultLimit: +process.env.DEFAULT_LIMIT || 10,
});
