const { default: axios } = require("axios");
var cron = require("node-cron");
const { TwitterApi } = require("twitter-api-v2");
require("dotenv").config();

const baseBio =
  "Dad, Software Engineer, Lead Developer @vybin_network, Working on something called The Temporary Plane";

cron.schedule("0 */4 * * *", async () => {
  const players = await axios
    .get("https://thetemporaryplane.com/api/players")
    .then((res) => res.data.data);

  const userClient = new TwitterApi({
    appKey: process.env.CONSUMER_KEY,
    appSecret: process.env.CONSUMER_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACCESS_TOKEN_SECRET,
  });

  const rwClient = userClient.readWrite;

  const results = await rwClient.v1.updateAccountProfile({
    description: baseBio + `\n${players.length} Players in the void`,
  });

  if (!results.id) {
    console.error("Failed to update bio - ", Date.now());
  }
});
