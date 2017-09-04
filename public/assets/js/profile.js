// These are counter variables to use as identifiers for the dynamically created elements that use jQuery

let id = 0;
let idTwo = 50;
let idThree = 100
let idFour = 150

$(document).ready(function() {
    democracy.getReps();
    democracy.getElectionInfo();
    democracy.getCandidates();
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

                $(".card-deck").append("<div class='profile-rep-card card' id='" + id + "'></id");

                if (!data.officials[i].photoUrl) {
                    $('#' + id).append("<div class='img-frame'><img class='card-img-top' alt='Card image cap' src='img/person-icon.png' height='250'></div>");

                } else {
                    $('#' + id).append("<div class='img-frame'><img class='card-img-top' alt='Card image cap' src='" + data.officials[i].photoUrl + "' height='250'></div>");
                }

                if (data.officials[i].party === "Democratic") {
                    $('#' + id).append("<div class='card-block text-center'><h4 class='card-title' style='margin-top: 10px;'>" + data.officials[i].name + "</h4><p>" + data.officials[i].party.substring(0, 8) + "</p>");

                } else {
                    $('#' + id).append("<div class='card-block text-center'><h4 class='card-title' style='margin-top: 10px;'>" + data.officials[i].name + "</h4><p>" + data.officials[i].party + "</p>");
                }

                $('#' + id).append("<div class='card-footer text-center' id='" + idTwo + "'>" + "<a href='" + data.officials[i].urls[0] + "' target='_blank'><i class='profile-reps-social profile-reps-web fa fa-address-book fa-2x' aria-hidden='true'></i></a>")

                if (!data.officials[i].channels) {
                    $('#' + idTwo).append("Social Media N/A")

                } else {
                for (let j = 0; j < data.officials[i].channels.length; j++) {

                    switch (data.officials[i].channels[j].type) {
                        case "Facebook":
                            $('#' + idTwo).append("<a href='http://www.facebook.com/" + data.officials[i].channels[j].id + "' target='_blank'><i class='profile-reps-social profile-reps-fb fa fa-facebook-square fa-2x' aria-hidden='true'></i></a>");
                            break;

                        case "Twitter":
                            $('#' + idTwo).append("<a href='http://www.twitter.com/" + data.officials[i].channels[j].id + "' target='_blank'><i class='profile-reps-social profile-reps-tw fa fa-twitter-square fa-2x' aria-hidden='true'></i></a>");
                            break;

                        case "YouTube":
                            $('#' + idTwo).append("<a href='http://www.youtube.com/user/" + data.officials[i].channels[j].id + "' target='_blank'><i class='profile-reps-social profile-reps-yt fa fa-youtube-play fa-2x' aria-hidden='true'></i></a>");
                            break;
                    }
                }
                    
                }

                idTwo++
                id++
            }
        })
    },


    getElectionInfo: function() {
        $.ajax({
            type: 'GET',
            url: "/api/elections",
            dataType: "json",
            contentType: "application/json;charset=utf-8"

        }).done(function(data) {
            $(".profile-upcoming-elects").append("<span style='color: red;'>" + " " + data.polititracker_elections.length + "</span>");

            if (data.polititracker_elections.length === 0) {
                $(".profile-election-title").html("NO UPCOMING ELECTIONS")

            } else {
                
            $(".profile-election-title").html(data.polititracker_elections[0].election.name);

            $(".profile-election-date").append(data.polititracker_elections[0].election.electionDay);

            $("#polling-location").html(data.polititracker_elections[0].pollingLocations[0].address.locationName);

            $("#polling-address").html(data.polititracker_elections[0].pollingLocations[0].address.line1 + "<br>" + data.polititracker_elections[0].pollingLocations[0].address.city + ", " + data.polititracker_elections[0].pollingLocations[0].address.state + " " + data.polititracker_elections[0].pollingLocations[0].address.zip);

            $("#polling-hours").html(data.polititracker_elections[0].pollingLocations[0].pollingHours);

            $("#polling-times").html("Polling Hours:")
            }
        })
    },


    getCandidates: function() {
        $.ajax({
            type: 'GET',
            url: "/api/elections",
            dataType: "json",
            contentType: "application/json;charset=utf-8"

        }).done(function(data) {

// data.polititracker_elections[0].contests.length
            for (let i = 0; i < 1; i++) {
                $(".profile-contest-header").append("<h4><span class='profile-red'>Contest Type: </span>" + data.polititracker_elections[0].contests[i].type + "</h4><h4><span class='profile-red'>Office: </span>" + data.polititracker_elections[0].contests[i].office);

                for (let j = 0; j < data.polititracker_elections[0].contests[i].candidates.length; j++) {

                    $(".profile-cand-name").append(data.polititracker_elections[0].contests[i].candidates[j].name)


                    // If party exists post the URL, otherwise post N/A
                    if (data.polititracker_elections[0].contests[i].candidates[j].party === true) {
                        $(".profile-cand-party").append(data.polititracker_elections[0].contests[i].candidates[j].party);

                    } else {
                        $(".profile-cand-party").append("N/A")

                    }


                    // If website exists post the URL, otherwise post N/A
                    if (data.polititracker_elections[0].contests[i].candidates[j].candidatesUrl === true) {
                        $(".profile-cand-url").append("<a href='" + data.polititracker_elections[0].contests[i].candidates[j].candidatesUrl + "'>Website</a>")

                    } else {
                        $(".profile-cand-url").append('N/A')

                    }

                        if (!data.polititracker_elections[0].contests[i].candidates[j].channels) {
                            $(".profile-cand-social").html("N/A")

                        } else {

                    for (let k = 0; k < data.polititracker_elections[0].contests[i].candidates[j].channels.length; k++) {

                            switch (data.officials[i].channels[j].candidates[j].channels[k]) {
                                case "Facebook":
                                    $('#' + idTwo).append("<a href='http://www.facebook.com/" + data.polititracker_elections[0].contests[i].candidates[j].channels[k].id + "' target='_blank'><i class='profile-reps-social profile-reps-fb fa fa-facebook-square fa-2x' aria-hidden='true'></i></a>");
                                    break;

                                case "Twitter":
                                    $('#' + idTwo).append("<a href='http://www.twitter.com/" + data.polititracker_elections[0].contests[i].candidates[j].channels[k].id + "' target='_blank'><i class='profile-reps-social profile-reps-tw fa fa-twitter-square fa-2x' aria-hidden='true'></i></a>");
                                    break;

                                case "YouTube":
                                    $('#' + idTwo).append("<a href='http://www.youtube.com/user/" + data.polititracker_elections[0].contests[i].candidates[j].channels[k].id + "' target='_blank'><i class='profile-reps-social profile-reps-yt fa fa-youtube-play fa-2x' aria-hidden='true'></i></a>");
                                    break;
                            }
                        }
                    }
                }
            }
        })
    }
}
