function createElectionEntry(resp) {

}

function createElectionHeader(resp) {
  let $electionHeader = $("<div>").addClass("profile-election-header");

  let $electionTitle = $("<h3>")
  .addClass("profile-election-title")
  .val(resp.election.name);

  let $electionDate = $("<h4>")
  .addClass("profile-election-title")
  .val(resp.election.electionDay);

  $electionHeader
  .append($electionTitle)
  .append($electionDate);

}

function createTableHeaders() {
  let arr = ["Candidate", "Party", "Website", "Media"];

  let $tr = $("<tr>");

  for (let i=0; i < arr.length; i++) {
    let $th = $("<th>").val(arr[i]);
    $tr.append($th);
  }
}

function createCandidateEntry(candidate) {
  let $tr = $("<tr>").addClass("profile-cand-entry");

  let $name = $("<td>").addClass("profile-cand-name");
  let $party = $("<td>").addClass("profile-cand-party");
  let $url = $("<td>").addClass("profile-cand-url");
  let $social = $("<td>").addClass("profile-cand-social");

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

    $tr.append($name);
    $tr.append($party);
    $tr.append($url);
    $tr.append($social);
  }

}

function createPollingInfo(resp) {
  let $pollingInfo = $("<div>").addClass("profile-polling-info");

  let $pollingHeader = $("<div>").addClass("profile-polling-header");
  let $pollingTitle = $("<h3>").text("Polling Information");
  $pollingHeader.append($pollingTitle);

  let $pollingBody = $("<div>").addClass("profile-polling-body row");
  let $col7 = ("<div>").addClass("col-7");
  let $col5 = ("<div>").addClass("col-5");

  let address = resp.pollingLocations[0].address;

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

  return $pollingInfo;
}

function createContestsList (resp) {
  let $contestsList = $("<div>").addClass("profile-contest-entry");
  for (contest in resp.contests) {
    let $contestEntry = createContestEntry(contest);
    $contestsList.append($contestEntry);
  }
}

// Populate Indicators function
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
