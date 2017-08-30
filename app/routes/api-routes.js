const axios = require("axios");

module.exports = function (app) {

  let key = process.env.GOOGLE_CIVIC_INFO_APIKEY;
  let formattedAddress = userAddress.replace(" ", "%20");

  app.get("/api/representatives", function (req, res) {
    let userAddress = req.body.address;
    let repsRoute = "https://www.googleapis.com/civicinfo/v2/representatives?key=";

    axios.get(repsRoute + key + "&address=" + formattedAddress).then(function (repsRes) {
      res.json(repsRes);
    }).catch(function (error) {
      console.log(error);
    });
  });

  app.get("/api/elections", function (req, res) {
    let electsRoute = "https://www.googleapis.com/civicinfo/v2/elections?key=";
    let userAddress = req.body.address;

    axios.get(electsRoute + key).then(function (electsRes) {
      let voterRoute = "https://www.googleapis.com/civicinfo/v2/voterinfo?key=";
      let elections = electsRes.elections;

      // NOTE: perhaps add an object?
      for (let i=1; i < elections.length; i++) {
        let electionId = elections[i].id;

        axios.get(voterRoute + key + "&address=" + address + "&electionId=" + electionId, function (voterRes) {
          // NOTE: do something with each raceDetail response object
        });
      }

    }).catch(function (error) {
      console.log(error);
    });
  });
}
