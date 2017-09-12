$(document).ready(function() {
   getCandidates();
});

function getCandidates() {
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
                  for (var k = 0; k < data.polititracker_elections[i].contests.length; k++) {

                     let race = data.polititracker_elections[i].contests[k];

                     for (var l = 0; l < race.candidates.length; l++) {
                        if (race.candidates[l]) {
                           let $trCandidate = $('<tr>')
                              .append('<td>' + race.candidates[l].name + '</td>')
                              .append('<td>' + (race.candidates[l].party ? race.candidates[l].party : "N/A") + '</td>')
                              .append('<td>' + (race.candidates[l].candidateUrl ? race.candidates[l].party : "N/A") + '</td>')
                              .append('<td>' + (race.candidates[k].social ? race.candidates[l].party : "N/A") + '</td>')

                           $table.append($trCandidate);
                        }
                     }
                  }
               }
            }
         }
      }
   })
}
