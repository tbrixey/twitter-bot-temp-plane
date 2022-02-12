const { default: axios } = require("axios");
const { TwitterApi } = require("twitter-api-v2");
require("dotenv").config();

const baseBio =
  "Addicted to ☕️ Sr Application Developer @cremalab Lead Developer @vybin_network Working on something called The Temporary Plane";

const wait = (seconds) =>
  new Promise((resolve) => setTimeout(() => resolve(true), seconds * 1000));

const run = async () => {
  while (true) {
    const players = await axios
      .get("https://the-temporary-plane.herokuapp.com/api/players")
      .then((res) => res.data);

    const userClient = new TwitterApi({
      appKey: process.env.CONSUMER_KEY,
      appSecret: process.env.CONSUMER_SECRET,
      accessToken: process.env.ACCESS_TOKEN,
      accessSecret: process.env.ACCESS_TOKEN_SECRET,
    });

    const rwClient = userClient.readWrite;

    await rwClient.v1.updateAccountProfile({
      description: baseBio + `\n${players.length} Players in the void`,
    });

    await wait(3600);
  }
};

run();
