function setupElectionsPanel() {
  $.ajax({
    type: 'GET',
    url: "/api/elections",
    dataType: "json",
    contentType: "application/json;charset=utf-8"
  }).done(function (resp) {
    for (let i=0; i < resp.polititracker_elections.length; i++) {
      populateIndicators(i);
      addElectionEntry(resp.polititracker_elections[i]);
    }
  });
}

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

function addElectionEntry(obj) {
  
}

function addCarouselEntry(resp) {

}
