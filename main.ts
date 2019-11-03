import { config } from "./config";
import * as redis from "redis";
import * as ypi from "youtube-channel-videos";
import { isEqual } from "lodash";
const express = require("express");
const ooPatch = require("json8-patch");

var moment = require("moment");
const app = express();
const port = config.EXPRESS_PORT;

app.listen(port, () => {
  watchOnce();
  setInterval(() => watchOnce(), +config.INTERVAL_MS);
});

const client = redis.createClient(+config.REDIS_PORT, config.REDIS_HOST, {
  auth_pass: config.REIDS_PASS
});

function watchOnce() {
  return new Promise(resolve => {
    ypi.channelVideos(config.YOUTUBE_API_KEY, config.YOUTUBE_ID, function(
      channelItems
    ) {
      client.GET(config.YOUTUBE_ID, (err, yt_id_get) => {
        const parsed = JSON.parse(yt_id_get);
        if (!isEqual(parsed, channelItems)) {
          const payload = JSON.stringify({
            channel: {
              name: channelItems[0].snippet.channelTitle
            },
            date: moment().unix(),
            diff: ooPatch.diff(parsed, channelItems)
          });
          client.publish(config.YOUTUBE_ID + ":notify", payload);
          client.lpush(config.YOUTUBE_ID + ":list", payload);
        }
        client.set(config.YOUTUBE_ID, JSON.stringify(channelItems), () => {
          resolve();
        });
      });
    });
  });
}
