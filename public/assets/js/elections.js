/*
contests is an array

contest table
  -> contest header
  -> candidate table
*/
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

function main() {
   // make ajax call to elections API
   $.ajax({
      type: 'GET',
      url: "/api/elections",
      dataType: "json",
      contentType: "application/json;charset=utf-8"
   }).done(function(data) {
         // NOTE: FOR elections in object.polititracker array
         for (var i = 0; i < data.polititracker_elections.length; i++) {
            createCarouselItem(i)
               // when response object returned
               populateIndicators(i)
               // append to carousel inner div
         }
      })

   }

// CAROUSEL ITEM FUNCTIONS
// ========================================================
function createCarouselItem(resp) {
   $carouselItem = $("<div>").addClass("carousel-item");
   // *** if carousel item is first
   if (resp === 0) {
      // add active class
      $carouselItem.addClass("active");
   }

   let $electionHeader = $("<div>").addClass("profile-election-header");
   createElectionHeader(resp);
   // append to carousel item div (automatically)
   let $contestList = $('<div>').addClass("profile-contest-list");
   createContestList(resp);
   // append to carousel item div (automatically)
   let $pollingInfo = $('<div>').addClass("profile-polling-info");
   createPollingInfo(resp);
   // append ot carousel item div
}

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

// CONTEST FUNCTIONS
// ========================================================

function createContestList(contests) {
   // NOTE: FOR contest table   
   for (var i = 0; i < contests.length; i++) {
      let $contestTable = $('<div>').addClass('profile-contest-table');

      createContestTable(resp);

      // append contest table to contest list
      $contestList.append(contestTable);
   }
}

function createContestTable(resp) {
   // create contest table div

   createContestHeader(resp);
   createCandidateTable(resp);
   // append contest header to contest table div
   // append candidate table to contest table div
}

function createContestHeader(contest) {
   $contestOffice = $('<h4>').append(CONTEST)

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

 let $contestTable = 
  $('<div>')
    .addClass("profile-contest-table")
    .append($contestHeader);
}

function createCandidateTable(resp) {
   // create candidate table header (static)
   let arr = ["Candidate", "Party", "Website", "Media"];
   let $tr = $("<tr>");
 
    // NOTE: FOR candidates in array
   for (let i = 0; i < arr.length; i++) {
      let $th = $("<th>").val(arr[i]);
      $tr.append($th);
      // create candidate row (createCandidateEntry)
      // append to candidate table
   }
 }

   // ========================================================
   // POLLING INFO FUNCTIONS
   // ========================================================
