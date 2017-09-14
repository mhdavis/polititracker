const axios = require("axios");
const db = require("../models");

module.exports = function (app, passport) {

// ==================================================================
// VERFICATION FOR API ROUTES
// ==================================================================

  // Reps API
  // ===================================================
  app.post('/api/reps', passport.authenticate('local-signin', {
    successfulRedirect: '/api/reps',
    failureRedirect: '/'
  }));

  // Elections API
  // ===================================================
  app.post('/api/elections', passport.authenticate('local-signin', {
    successfulRedirect: '/api/elections',
    failureRedirect: '/'
  }));

  let key = process.env.GOOGLE_CIVIC_INFO_APIKEY;
  let apiUrl = "https://www.googleapis.com/civicinfo/v2/"

  // ==================================================================
  // API GET ROUTES
  // ==================================================================

  // Reps API
  // ===================================================
  app.get("/api/reps", function (req, res) {

    let repsRoute = "representatives?key=";

    if (req.user) {
      let userAddress = req.user.full_address;
      let formattedAddress = userAddress.replace(/\s/g, "%20");

      axios.get(apiUrl + repsRoute + key + "&address=" + formattedAddress).then(function (repsRes) {
        res.json(repsRes.data);

      }).catch(function (error) {
        console.log(error);
      });
    } else {

      res.send("Please Login to access Representatives API");

    }

  });

  // Elections API
  // ===================================================
  app.get("/api/elections", function (req, res) {

    let electsRoute = "elections?key=";

    if (req.user) {
      let userAddress = req.user.full_address;
      let userState = req.user.state;
      let formattedAddress = userAddress.replace(/\s/g, "%20");

      axios.get(apiUrl + electsRoute + key).then(function (electsRes) {

        let voterRoute = "voterinfo?key=";
        let elections = electsRes.data.elections;

        let electionsObj = {
          polititracker_elections: []
        };

        let electDetailPromise = new Promise (function (resolve, reject) {
          let electionsIdsArr = [];
          for (let i=1; i < elections.length; i++) {
            let electionId = elections[i].id;
            let divisionId = elections[i].ocdDivisionId;

            if (divisionId.indexOf("state:" + userState.toLowerCase()) !== -1) {
              electionsIdsArr.push(electionId);
            }
          }

          let results = [];
          let index = 0;

          function next() {
            if (results.length < electionsIdsArr.length) {
              axios.get(apiUrl +  voterRoute + key + "&address=" + formattedAddress + "&electionId=" + electionsIdsArr[index]).then(function (voterRes) {
                results.push(voterRes.data);
                index++;
                next();
              }, reject);
            } else {
              resolve(results);
            }
          }

          next();
        }); // end electDetailPromise


        electDetailPromise.then(function (results) {
          electionsObj.polititracker_elections = results;
          res.json(electionsObj);
        }, function (err) {
          console.log(err);
        });


      }).catch(function (error) {
        console.log(error);
      }); // end axios call

    } else {
      res.send("Please login to access Elections API");
    }

  }); // app.get elections


}
