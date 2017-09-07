setUpElectionsPanel();

// DONE - Debug
function setupElectionsPanel() {
  $.ajax({
    type: 'GET',
    url: "/api/elections",
    dataType: "json",
    contentType: "application/json;charset=utf-8"
  }).done(function (resp) {
    for (let i=0; i < resp.polititracker_elections.length; i++) {
      // populate indicators ol
      populateIndicators(i);

      // add election entries to carousel
      let $electionEntry = addElectionEntry(resp.polititracker_elections[i]);
      $(".carousel-inner").append($electionEntry);
    }
  });
}

//=====================================================================

// DONE - Debug
function populateIndicators (slide) {
    let $li = $("<li>")
        .attr("data-target", "#profileCarouselIndicators")
        .attr("data-slide-to", slide);

    if (slide === 0) {
        $li.addClass("active");
    }

    // .carousel-indicators is the <ol>
    $(".carousel-indicators").append($li);
}

//=====================================================================

// uses createContestsList , createPollingInfo
function addElectionEntry(pt_election) {
  // create election header info
  let $electionHeader = $("<div>").addClass('profile-election-header');

  let $electionTitle =
  $("<h3>")
  .addClass("profile-election-title")
  .val(pt_election.name);

  let $electionDate =
  $("<h4>")
  .addClass("profile-election-date")
  .val(pt_election.electionDay);

  $electionHeader
  .append($electionTitle)
  .append($electionDate);

  // create contest list
  let $contestsList =
   $("<div>")
   .addClass("profile-contests-list");

   // populate election contests
  for (let i=0; i < pt_election.contests.length; i++) {
    // create profile-contest-entry
    let $contestEntry = $("<div>").addClass("profile-contest-entry");
    let $contestTable = createContestTable(pt_election.contests[i]);

    $contestsList.append($contestEntry);
  }

  // add polling information
  createPollingInfo(pt_election);
}

//=====================================================================

// DONE - Debug
// uses createCandidateRow
function createContestTable(contest) {

  // create table header
  let $contestHeader = $("<div>").addClass("profile-contest-header");

  let $contestTypeSpan = $("<span>")
  .addClass("profile-red")
  .val("Contest Type");

  let $contestOfficeSpan = $("<span>")
  .addClass("profile-red")
  .val("Office");

  let $contestType = $("<h4>")
  .html($contestTypeSpan + " " + contest.type);

  let $contestOffice = $("<h4>")
  .html($contestOfficeSpan + " " + contest.office);

  // create table
  let $table = $("<table>");

  // create table header row
  let headRowArr = ["Candidate", "Party", "Website", "Media"];

  let $trHead = $("<tr>");
  for (let i=0; i < headRowArr.length; i++) {
    let $th = $("<th>").val(headRowArr[i]);
    $trHead.append($th);
  }
  $table.append($trHead);

  // create table candidate rows
  if (contest.candidates) {
    for (let i=0; i < contest.candidates.length; i++) {
      let $candRow = createCandidateRow(contest.candidates[i]);
      $table.append($candRow);
    }
  }


}

//=====================================================================

// DONE- Debug
function createCandidateRow(candidate) {
  let $tr = $("<tr>").addClass("profile-cand-entry");

  let $name = $("<td>").addClass("profile-cand-name");
  let $party = $("<td>").addClass("profile-cand-party");
  let $url = $("<td>").addClass("profile-cand-url");
  let $social = $("<td>").addClass("profile-cand-social");

  candidate.name ? $name.val(candidate.name) : $name.val("N/A");
  candidate.party ? $party.val(candidate.party) : $party.val("N/A");
  candidate.url ? $url.val(candidate.candidateUrl) : $url.val("N/A");

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
    $social.val("N/A");
  }

  $tr.append($name);
  $tr.append($party);
  $tr.append($url);
  $tr.append($social);

}

//=====================================================================

function createPollingInfo(obj) {
  let $pollingInfo = $("<div>").addClass("profile-polling-info");

  let $pollingHeader = $("<div>").addClass("profile-polling-header");
  let $pollingTitle = $("<h3>").text("Polling Information");
  $pollingHeader.append($pollingTitle);

  let $pollingBody = $("<div>").addClass("profile-polling-body row");
  let $col7 = ("<div>").addClass("col-7");
  let $col5 = ("<div>").addClass("col-5");

  let address = obj.pollingLocations[0].address;

  $col7.append(
    $("<p>").html(
      "<span class='profile-polling-highlight'>" +
      address.locationName +
      "</span><br>"+
      address.line1 + "<br>" +
      "<span>" +
      address.city + ", " +
      address.state + " " +
      address.zip
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

  // need to append to final piece
  .append($pollingInfo);
}

//=====================================================================
