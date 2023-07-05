require("dotenv").config({ path: __dirname + "/.env" });
const { twitterClient } = require("./twitterClient.js");
// const CronJob = require("cron").CronJob;
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const { download } = require("./utilities");

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const tweet = async () => {
  const uri = "https://i.imgur.com/r4VSoH9.png";
  const filename = "image.png";

  download(uri, filename, async function () {
    try {
      const mediaId = await twitterClient.v1.uploadMedia("./image.png");
      await twitterClient.v2.tweet({
        text: "#Bitcoin",
        media: {
          media_ids: [mediaId],
        },
      });
    } catch (e) {
      console.log(e);
    }
  });
};

app.use(express.json());

app.get("/tweet", (_req, res) => {
  tweet();
  res.send("Tweet sent!");
});

// const cronTweet = new CronJob("*/30 * * * * *", async () => {
//     tweet();
// });

// cronTweet.start();
