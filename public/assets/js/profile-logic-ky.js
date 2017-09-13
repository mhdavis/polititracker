/*
contests is an array
contest table
  -> contest header
  -> candidate table
*/

main();

function main() {
  // make ajax call to elections API
  $.ajax({
    type: 'GET',
    url: "/api/elections",
    dataType: "json",
    contentType: "application/json;charset=utf-8"
  }).done(function(data) {
    // FOR elections in object.polititracker array
    let pt_elections = data.polititracker_elections;
    let electionNumber = 0;

    for (let i=0; i < pt_elections.length; i++) {
      if (pt_elections[i].contests) {
      electionNumber++;

      createCarouselItem(pt_elections[i], i);
      // when response object returned
      populateIndicators(i);
      // append to carousel inner div
      }
    }

    $("#upcoming-elections-number").text(electionNumber);


    //  else {
    //   let $noElections = $("<h4>").text("No Upcoming Elections");
    //
    // }


    $("carousel").carousel();
  });

}

function populateIndicators(slide) {
  let $li = $("<li>")
  .attr("data-target", "#profileCarouselIndicators")
  .attr("data-slide-to", slide);

  if (slide === 0) {
    $li.addClass("active");
  }

  // .carousel-indicators is the <ol>
  $(".carousel-indicators").append($li);
}

// ========================================================
// CAROUSEL ITEM FUNCTIONS
// ========================================================

function createCarouselItem(pt_election, iterator) {
  let $carouselItem = $("<div>").addClass("carousel-item");
   // *** if carousel item is first
   if (iterator === 0) {
      // add active class
      $carouselItem.addClass("active");
   }

   let $electionHeader = $("<div>").addClass("profile-election-header");
   createElectionHeader(pt_election.election, $electionHeader);
   $carouselItem.append($electionHeader);
   // append to carousel item div (automatically)
   let $contestList = $('<div>').addClass("profile-contest-list");
   createContestList(pt_election.contests, $contestList);
   $carouselItem.append($contestList);
   // append to carousel item div (automatically)
   let $pollingInfo = $('<div>').addClass("profile-polling-info");
   createPollingInfo(pt_election.pollingLocations[0], $pollingInfo);
   $carouselItem.append($pollingInfo);
   // append ot carousel item div
   $("#carouselInner").append($carouselItem); // carousel inner is a already-existing div
}

// ========================================================
//  ELECTION HEADER
// ========================================================

function createElectionHeader(election, electionHeaderDiv) {
  console.log(election.name);
   let $electionTitle = $("<h3>")
      .addClass("profile-election-title")
      .text(election.name);

   let $electionDate = $("<h4>")
      .addClass("profile-election-title profile-red")
      .text(election.electionDay);

   electionHeaderDiv
      .append($electionTitle)
      .append($electionDate);
}

// ========================================================
// CONTEST FUNCTIONS
// ========================================================

function createContestList(contests, contestListDiv) {
   // FOR contest table

   for (let i = 0; i < contests.length; i++) {
      let $contestTable = $('<div>').addClass('profile-contest-table');
      createContestTable(contests[i], $contestTable);
      // append contest table to contest list
      contestListDiv.append($contestTable);
   }
}

function createContestTable(contest, contestTableDiv) {
   /*
   contest table
    -> contest header
    -> candidate table
   */
   // append contest header to contest table div (inside function)
   createContestHeader(contest, contestTableDiv);
   // append candidate table to contest table div (inside)
   createCandidateTable(contest.candidates, contestTableDiv);
}

function createContestHeader(contest, contestTableDiv) {

 let contestTypeName = contest.type;
 let contestOfficeName = contest.office;

 let $spanOffice =
  $('<span>')
  .addClass('profile-red')
  .append('Office: ');

  // create h4 with contest office
 let $contestOffice =
  $('<h4>')
  .append($spanOffice)
  .append(contestOfficeName);

 let $spanType =
  $('<span>')
  .addClass('profile-red')
  .append('Contest Type: ');

// create h4 with contest type
 let $contestType =
  $('<h4>')
    .append($spanType)
    .append(contestTypeName);

// append to contest header
 let $contestHeader =
  $('<div>')
    .addClass("profile-contest-header")
    .append($contestType)
    .append($contestOffice);

 contestTableDiv.append($contestHeader);
}

function createCandidateTable(candidates, contestTableDiv) {
   let $candidateTable = $("<table>").addClass("profile-candidate-table")

   // create candidate table header (static)
   let arr = ["Candidate", "Party", "Website", "Media"];
   let $tr = $("<tr>");

    // FOR candidates in array
   for (let i = 0; i < arr.length; i++) {
      let $th = $("<th>").text(arr[i]);
      $tr.append($th);
   }

   $candidateTable.append($tr);

   for (let i = 0; i < candidates.length; i++) {
     createCandidateEntry(candidates[i], $candidateTable);
   }

   // create candidate row (createCandidateEntry)
   // append to candidate table
   contestTableDiv.append($candidateTable);
 }

 function createCandidateEntry(candidate, candidateTableDiv) {
   let $tr = $("<tr>").addClass("profile-cand-entry");

   let $name = $("<td>").addClass("profile-cand-name");
   let $party = $("<td>").addClass("profile-cand-party");
   let $url = $("<td>").addClass("profile-cand-url");
   let $social = $("<td>").addClass("profile-cand-social");

   candidate.name ? $name.text(candidate.name) : $name.text("N/A");
   candidate.party ? $party.text(candidate.party) : $party.text("N/A");
   candidate.url ? $url.text(candidate.candidateUrl) : $url.text("N/A");

   $tr.append($name);
   $tr.append($party);
   $tr.append($url);

   if (candidate.channels) {
     for (let i=0; i < candidate.channels.length; i++) {
       let $a = $("<a>")
       .addClass("profile-social")
       .attr("target", "_blank")
       .attr("href", candidate.channels[i].id);
       let $i = $("<i>")
       .addClass("fa")
       .attr("aria-hidden", "true");

       switch (candidate.channels.type) {
         case "Facebook":
           $a.addClass("profile-social-fb")
           $i.addClass("fa-facebook-square");
           break;
         case "Twitter":
           $a.addClass("profile-social-tw");
           $i.addClass("fa-twitter-square");
           break;
         case "Youtube":
           $a.addClass("profile-social-yt");
           $i.addClass("fa-youtube-play");
           break;
       }

       $a.append($i);
       $social.append($a);
     }

   } else {
     $social.text("N/A");
   }

   $tr.append($name);
   $tr.append($party);
   $tr.append($url);
   $tr.append($social);

   candidateTableDiv.append($tr);

 }

 // ========================================================
 // POLLING INFO FUNCTIONS
 // ========================================================

 function createPollingInfo(information, pollingInfoDiv) {
   let $pollingInfo = $("<div>").addClass("profile-polling-info");

   let $pollingHeader = $("<div>").addClass("profile-polling-header");
   let $pollingTitle = $("<h3>").text("Polling Information");
   $pollingHeader.append($pollingTitle);

   let $pollingBody = $("<div>").addClass("profile-polling-body row");
   let $col7 = $("<div>").addClass("col-7");
   let $col5 = $("<div>").addClass("col-5");

   let address = information.address;

   $col7.append(
     $("<p>").html(
       "<span class='profile-polling-highlight'>" +
       address.locationName +
       "</span><br>"+
       address.line1 + "<br>" +
       "<span>" +
       address.city + ", " +
       address.state + " " +
       address.zip +
       "</span>"
     )
   );

   $col5.append(
     $("<p>").html(
       "<span class='profile-polling-highlight'>Polling Hours</span><br>" +
       information.pollingHours
     )
   )

   $pollingBody
   .append($col7)
   .append($col5);

   $pollingInfo
   .append($pollingHeader)
   .append($pollingBody);

   pollingInfoDiv.append($pollingInfo);
 }
