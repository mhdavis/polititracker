const axios = require("axios");

module.exports = function(app) {

   let key = process.env.GOOGLE_CIVIC_INFO_APIKEY;
   // let userAddress = req.body.full_address;
   let userAddress = "104 Stadium Dr, Chapel Hill, NC 27514";
   // let userState req.body.state;
   let userState = "NC";
   let formattedAddress = userAddress.replace(/\s/g, "%20");
   let apiUrl = "https://www.googleapis.com/civicinfo/v2/"

   app.get("/api/reps", function(req, res) {
      let repsRoute = "representatives?key=";

      axios.get(apiUrl + repsRoute + key + "&address=" + formattedAddress).then(function(repsRes) {
         res.json(repsRes.data);

      }).catch(function(error) {
         console.log(error);
      });
   });


   app.get("/api/elections", function(req, res) {
      let electsRoute = "elections?key=";
      let userAddress = req.body.address;

      axios.get(apiUrl + electsRoute + key).then(function(electsRes) {

         let voterRoute = "voterinfo?key=";
         let elections = electsRes.data.elections;

         let electionsObj = {
            polititracker_elections: []
         };

         let electDetailPromise = new Promise(function(resolve, reject) {
            let electionsIdsArr = [];
            for (let i = 0; i < elections.length; i++) {
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
                  axios.get(apiUrl + voterRoute + key + "&address=" + formattedAddress + "&electionId=" + electionsIdsArr[index]).then(function(voterRes) {
                     results.push(voterRes.data);
                     console.log(voterRes.data);
                     index++;
                     next();
                  }, reject);
               } else {
                  resolve(results);
               }
            }

            next();
         });

         electDetailPromise.then(function(results) {
            electionsObj.polititracker_elections = results;
            res.json(electionsObj);
         }, function(err) {
            console.log(err);
         });

      }).catch(function(error) {
         console.log(error);
      });
   });
}
