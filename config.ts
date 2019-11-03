import { defaultTo } from "lodash";

export const config = {
  YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: defaultTo(process.env.REDIS_PORT, 6379),
  EXPRESS_PORT: 80,
  REIDS_PASS: process.env.REIDS_PASS,
  INTERVAL_MS: defaultTo(process.env.INTERVAL_MS, 1800000),
  YOUTUBE_ID: process.env.YOUTUBE_ID
};
