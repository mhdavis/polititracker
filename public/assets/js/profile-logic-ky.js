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
    // NOTE: FOR elections in object.polititracker array
    console.log(data);
    let pt_elections = data.polititracker_elections;
    console.log("===================================================");
    console.log(pt_elections);
    console.log("===================================================");

    for (let i = 0; i < pt_elections.length; i++) {
      createCarouselItem(pt_elections[i], i);
      // when response object returned
      populateIndicators(i);
      // append to carousel inner div
    }

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
   $carouselItem = $("<div>").addClass("carousel-item");
   // *** if carousel item is first
   if (iterator === 0) {
      // add active class
      $carouselItem.addClass("active");
   }

   let $electionHeader = $("<div>").addClass("profile-election-header");
   createElectionHeader(pt_election.election);
   // append to carousel item div (automatically)
   let $contestList = $('<div>').addClass("profile-contest-list");
   createContestList(pt_election.contests);
   // append to carousel item div (automatically)
   let $pollingInfo = $('<div>').addClass("profile-polling-info");
   createPollingInfo(pt_election.pollingLocations[0]);
   // append ot carousel item div
   $("#carouselInner").append($carouselItem);
}

// ========================================================
//  ELECTION
// ========================================================

function createElectionHeader(election) {
   let $electionTitle = $("<h3>")
      .addClass("profile-election-title")
      .val(election.name);

   let $electionDate = $("<h4>")
      .addClass("profile-election-title")
      .val(election.electionDay);

   $electionHeader
      .append($electionTitle)
      .append($electionDate);
}

// ========================================================
// CONTEST FUNCTIONS
// ========================================================

function createContestList(contests) {
   // NOTE: FOR contest table
   for (let i = 0; i < contests.length; i++) {
      let $contestTable = $('<div>').addClass('profile-contest-table');
      createContestTable(contests[i]);
      // append contest table to contest list
   }
}

function createContestTable(contest) {
   /*
   contest table
    -> contest header
    -> candidate table
   */

   // create contest table div
   let $contestTable =
    $('<div>')
      .addClass("profile-contest-table");

   // append contest header to contest table div (inside function)
   createContestHeader(contest);
   // append candidate table to contest table div (inside)
   createCandidateTable(contest.candidates);
}

function createContestHeader(contest) {

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

 $contestTable.append($contestHeader);
}

function createCandidateTable(candidates) {
   let $candidateTable = $("<table>").addClass("profile-candidate-table")

   // create candidate table header (static)
   let arr = ["Candidate", "Party", "Website", "Media"];
   let $tr = $("<tr>");

    // NOTE: FOR candidates in array
   for (let i = 0; i < arr.length; i++) {
      let $th = $("<th>").val(arr[i]);
      $tr.append($th);
   }

   $candidateTable.append($tr);

   for (let i = 0; i < candidates.length; i++) {
     createCandidateEntry(candidates[i]);
   }

   // create candidate row (createCandidateEntry)
   // append to candidate table
   $contestTable.append($candidateTable);
 }

 // ========================================================
 // POLLING INFO FUNCTIONS
 // ========================================================

 function createPollingInfo(information) {
   let $pollingInfo = $("<div>").addClass("profile-polling-info");

   let $pollingHeader = $("<div>").addClass("profile-polling-header");
   let $pollingTitle = $("<h3>").text("Polling Information");
   $pollingHeader.append($pollingTitle);

   let $pollingBody = $("<div>").addClass("profile-polling-body row");
   let $col7 = ("<div>").addClass("col-7");
   let $col5 = ("<div>").addClass("col-5");

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
       pollingLocations[0].pollingHours
     )
   )

   $pollingBody
   .append($col7)
   .append($col5);

   $pollingInfo
   .append($pollingHeader)
   .append($pollingBody);

   $contestTable.append($pollingInfo);
 }
