import * as dotenv from "dotenv";
dotenv.config();

const environmentVariables: any = {
  nodeEnv: process.env.NODE_ENV,
  dbName: process.env.DB_NAME,
  port: process.env.PORT,
  role: process.env.ROLE,
  origin: process.env.ORIGIN,
  jwtSecret: process.env.JWT_SECRET,
  serviceName: process.env.SERVICE_NAME,
  mongoAtlasUser: process.env.MONGO_ATLAS_USER,
  mongoAtlasPassword: process.env.MONGO_ATLAS_PASSWORD,
  free: process.env.FREE,
  premium: process.env.PREMIUM,
  gold: process.env.GOLD,
  kafkaBrokerListener: process.env.KAFKA_BROKER_LISTENER,
  redisURL: process.env.REDIS_URL,
  webdreiDir: process.env.WEBDREI_DIR,
  redisExpireTime: process.env.REDIS_EXPIRE_TIME,
  dbUri: process.env.DB_URI,
  cacheHost: process.env.CACHE_HOST,
};
export default environmentVariables;
