import environment from "../environment";
import { Redis } from "ioredis";

const redis = new Redis(environment.cacheHost);

console.log(environment.cacheHost, "Redis connected.... 🚀🚀🚀🚀🚀🚀🚀🚀");

export default redis;
