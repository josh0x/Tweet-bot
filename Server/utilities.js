const fs = require("fs");
const axios = require("axios");

const download = function (uri, filename, callback) {
  axios({
    url: uri,
    responseType: "stream",
  })
    .then(
      (response) =>
        new Promise((resolve, reject) => {
          response.data
            .pipe(fs.createWriteStream(filename))
            .on("finish", () => resolve())
            .on("error", (e) => reject(e));
        })
    )
    .then(() => callback());
};

module.exports = { download };
