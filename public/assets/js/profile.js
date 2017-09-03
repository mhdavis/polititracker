id = 0;
idTwo = 100;

$(document).ready(function() {
    democracy.getReps();
    democracy.getElectionInfo();
    democracy.getCandidateInfo();
});


let democracy = {
    getReps: function() {
        $.ajax({
            type: 'GET',
            url: "/api/reps",
            dataType: "json",
            contentType: "application/json;charset=utf-8"
        }).done(function(data) {

            for (var i = 2; i < 6; i++) {

                $(".card-deck").append("<div class='profile-rep-card card' id='" + id + "'></id");

                if (!data.officials[i].photoUrl) {
                    $('#' + id).append("<div class='img-frame'><img class='card-img-top' alt='Card image cap' src='img/person-icon.png' height='250'></div>");

                } else {

                    $('#' + id).append("<div class='img-frame'><img class='card-img-top' alt='Card image cap' src='" + data.officials[i].photoUrl + "' height='250'></div>");
                }

                $('#' + id).append("<div class='card-block text-center'><h4 class='card-title' style='margin-top: 10px;'>" + data.officials[i].name + "</h4><p>" + data.officials[i].party + "</p>");

                $('#' + id).append("<div class='card-footer text-center' id='" + idTwo + "'>" + "<a href='" + data.officials[i].urls[0] + "' target='_blank'><i class='profile-reps-social profile-reps-web fa fa-address-book fa-2x' aria-hidden='true'></i></a>")


                for (var j = 0; j < data.officials[i].channels.length; j++) {

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

            $("#polling-location").html(data.polititracker_elections[0].pollingLocations[0].address.locationName)

            $("#polling-address").html(data.polititracker_elections[0].pollingLocations[0].address.line1 + "<br>" + data.polititracker_elections[0].pollingLocations[0].address.city + ", " + data.polititracker_elections[0].pollingLocations[0].address.state + " " + data.polititracker_elections[0].pollingLocations[0].address.zip)

            $("#polling-hours").html(data.polititracker_elections[0].pollingLocations[0].pollingHours);

        })
    },


    getCandidateInfo: function() {
        $.ajax({
            type: 'GET',
            url: "/api/elections",
            dataType: "json",
            contentType: "application/json;charset=utf-8"
        }).done(function(data) {

            for (var i = 0; i < data.polititracker_elections[0].contests.length; i++) {

                console.log(data.polititracker_elections[0].contests[i].office)

                // $(".profile-contest-header").html(data.polititracker_elections[0].contests[i].office)
            }
        });
    }
}
