let id = 0;
let id2 = 50;

$(document).ready(function() {
   democracy.getReps();
   democracy.getCandidates();
   democracy.getPollingInfo();
   democracy.getNumberOfUpcomingElections();
});


let democracy = {


   getReps: function() {
      $.ajax({
         type: 'GET',
         url: "/api/reps",
         dataType: "json",
         contentType: "application/json;charset=utf-8"

      }).done(function(data) {

         for (let i = 2; i < 6; i++) {
            let repPhoto = data.officials[i].photoUrl;

            let repParty = data.officials[i].party;

            let repName = data.officials[i].name;

            let repWebsite = data.officials[i].urls[0];

            let socialMedia = data.officials[i].channels;

            let $repCard = "<div class='profile-rep-card card' id='" + id + "'></div>"

            let $placeholderImg = "<div class='img-frame'><img class='card-img-top' alt='Card image cap' src='img/person-icon.png' height='250'></div>"

            let $repImage = "<div class='img-frame'><img class='card-img-top' alt='Card image cap' src='" + repPhoto + "' height='250'></div>";

            let $democrat = "<div class='card-block text-center'><h4 class='card-title' style='margin-top: 10px;'>" + repName + "</h4><p>" + repParty.substring(0, 8) + "</p>"

            let $republican = "<div class='card-block text-center'><h4 class='card-title' style='margin-top: 10px;'>" + repName + "</h4><p>" + repParty + "</p>";

            let $website = "<div class='card-footer text-center' id='" + id2 + "'>" + "<a href='" + repWebsite + "' target='_blank'><i class='profile-reps-social profile-reps-web fa fa-address-book fa-2x' aria-hidden='true'></i></a>";

            $(".card-deck").append($repCard);

            // If rep photo does not exist then use a placeholder image
            if (!repPhoto) {
               $('#' + id).append($placeholderImg);

            } else {
               $('#' + id).append($repImage);
            }

            // If rep party is democratic, change the string to democrat
            if (repParty === "Democratic") {
               $('#' + id).append($democrat);

            } else {
               $('#' + id).append($republican);
            }

            $('#' + id).append($website);

            // If rep social media channels exist, list them
            if (!socialMedia) {
               $('#' + id2).append("Social Media N/A");

            } else {

               for (let j = 0; j < data.officials[i].channels.length; j++) {

                  let socialChannel = data.officials[i].channels[j].id;

                  let $facebook = "<a href='http://www.facebook.com/" + socialChannel + "' target='_blank'><i class='profile-reps-social profile-social-fb fa fa-facebook-square fa-2x' aria-hidden='true'></i></a>";

                  let $twitter = "<a href='http://www.twitter.com/" + socialChannel + "' target='_blank'><i class='profile-reps-social profile-social-tw fa fa-twitter-square fa-2x' aria-hidden='true'></i></a>";

                  let $youtube = "<a href='http://www.youtube.com/user/" + socialChannel + "' target='_blank'><i class='profile-reps-social profile-social-yt fa fa-youtube-play fa-2x' aria-hidden='true'></i></a>";

                  // Switch statement to correspond the correct icon with the corect channel type
                  switch (data.officials[i].channels[j].type) {

                     case "Facebook":
                        $('#' + id2).append($facebook);
                        break;

                     case "Twitter":
                        $('#' + id2).append($twitter);
                        break;

                     case "YouTube":
                        $('#' + id2).append($youtube);
                        break;
                  }
               }
            }
            id2++
            id++
         }
      })
   },


   getNumberOfUpcomingElections: function() {
      $.ajax({
         type: 'GET',
         url: "/api/elections",
         dataType: "json",
         contentType: "application/json;charset=utf-8"
      }).done(function(data) {
         let $numberOfElections = "<span style='color: red;'>" + " " + data.polititracker_elections.length + "</span>";

         $(".profile-upcoming-elects").append($numberOfElections);
      })
   },


   getPollingInfo: function() {
      $.ajax({
         type: 'GET',
         url: "/api/elections",
         dataType: "json",
         contentType: "application/json;charset=utf-8"
      }).done(function(data) {

         if (data.polititracker_elections.length === 0) {
            $(".main").html("NO UPCOMING ELECTIONS");

         } else if (!data.polititracker_elections[0].pollingLocations) {
            $("#polling-location").append("Polling info unavailable");

         } else {
            for (var i = 0; i < data.polititracker_elections[0].pollingLocations.length; i++) {
               let pollingLocation = data.polititracker_elections[0].pollingLocations;

               let pollingHours = data.polititracker_elections[0].pollingLocations[i].pollingHours;

               let locationName = data.polititracker_elections[0].pollingLocations[i].address.locationName;

               let street = data.polititracker_elections[0].pollingLocations[i].address.line1;

               let city = data.polititracker_elections[0].pollingLocations[i].address.city;

               let state = data.polititracker_elections[0].pollingLocations[i].address.state;

               let zip = data.polititracker_elections[0].pollingLocations[i].address.zip;

               $("#polling-location").append(locationName);

               $("#polling-address").append(street + "<br>" + city + ", " + state + " " + zip);

               $("#polling-hours").append(pollingHours);

               $("#polling-times").append("Polling Hours:");
            }
         }
      })
   },


   getCandidates() {
      $.ajax({
         type: 'GET',
         url: "/api/elections",
         dataType: "json",
         contentType: "application/json;charset=utf-8"

      }).done(function(data) {
         if (data.polititracker_elections.length === 0) {
            let $electionTitle = $('<h3>').addClass("profile-election-title").append("NO UPCOMING ELECTIONS");

            let $electionHeader = $('<div>').addClass("profile-election-header").append($electionTitle);

            $(".carousel-item").append($electionHeader);

         } else {

            for (let i = 0; i < data.polititracker_elections.length; i++) {

               // Create Election & Date Header
               let $electionTitle = $('<h3>').addClass("profile-election-title").append(data.polititracker_elections[i].election.name);

               let $electionDate = $('<h4>').addClass("profile-election-date").append(data.polititracker_elections[i].election.electionDay);

               let $electionHeader = $('<div>').addClass("profile-election-header").append($electionTitle).append($electionDate);

               // Create Contest Header
               for (let j = 0; j < data.polititracker_elections[i].contests.length; j++) {

                  let contestTypeName = data.polititracker_elections[i].contests[j].type;

                  let $spanType = $('<span>').addClass('profile-red').append('Contest Type: ');

                  let contestOfficeName = data.polititracker_elections[i].contests[j].office;

                  let $spanOffice = $('<span>').addClass('profile-red').append('Office: ');

                  let $contestOffice = $('<h4>').append($spanOffice).append(contestOfficeName);

                  let $contestType = $('<h4>').append($spanType).append(contestTypeName);

                  let $contestHeader = $('<div>').addClass("profile-contest-header").append($contestType).append($contestOffice);

                  let $contestTable = $('<div>').addClass("profile-contest-table").append($contestHeader);

                  let $contestEntry = $('<div>').addClass("profile-contest-entry").append($contestTable);

                  let $contestsList = $('<div>').addClass("profile-contests-list").append($contestEntry);

                  $(".carousel-item")
                     .append($contestHeader).prepend($electionHeader)

                  // Create Table 
                  let $trContent = $('<tr>').addClass("profile-candidate-entry");
                  let $tdName = $('<td>').addClass("profile-cand-name");
                  let $tdParty = $('<td>').addClass("profile-cand-party");
                  let $tdUrl = $('<td>').addClass("profile-cand-url");
                  let $tdSocial = $('<td>').addClass("profile-cand-social");

                  let $candidateHeader = $('<th>').append('Candidate');
                  let $partyHeader = $('<th>').append('Party');
                  let $websiteHeader = $('<th>').append('Website');
                  let $mediaHeader = $('<th>').append('Media');

                  let $header = $('<tr>')
                     .append($candidateHeader)
                     .append($partyHeader)
                     .append($websiteHeader)
                     .append($mediaHeader);

                  let $table = $("<table>").prepend($header);
                  $('.carousel-item').append($table)

                  if (data.polititracker_elections[i].contests) {

                     let race = data.polititracker_elections[i].contests[j];

                     for (var k = 0; k < race.candidates.length; k++) {
                        if (race.candidates[k]) {
                           let $trCandidate = $('<tr>')
                              .append('<td>' + race.candidates[k].name + '</td>')
                              .append('<td>' + (race.candidates[k].party ? race.candidates[k].party : "N/A") + '</td>')
                              .append('<td>' + (race.candidates[k].candidateUrl ? race.candidates[k].party : "N/A") + '</td>')
                              .append('<td>' + (race.candidates[k].social ? race.candidates[k].party : "N/A") + '</td>')

                           $table.append($trCandidate);
                        }
                     }
                  }
               }
            }
         }
      })
   }
}
