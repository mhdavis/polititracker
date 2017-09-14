let id = 0;
let id2 = 50;

$(document).ready(function() {
   load.getReps();
});

let load = {

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

            if (!repPhoto) {
               $('#' + id).append($placeholderImg);

            } else {
               $('#' + id).append($repImage);
            }

            if (repParty === "Democratic") {
               $('#' + id).append($democrat);

            } else {
               $('#' + id).append($republican);
            }

            $('#' + id).append($website);

            if (!socialMedia) {
               // $('#' + id2).append("");

            } else {

               for (let j = 0; j < data.officials[i].channels.length; j++) {

                  let socialChannel = data.officials[i].channels[j].id;

                  let $facebook = "<a href='http://www.facebook.com/" + socialChannel + "' target='_blank'><i class='profile-reps-social profile-social-fb fa fa-facebook-square fa-2x' aria-hidden='true'></i></a>";

                  let $twitter = "<a href='http://www.twitter.com/" + socialChannel + "' target='_blank'><i class='profile-reps-social profile-social-tw fa fa-twitter-square fa-2x' aria-hidden='true'></i></a>";

                  let $youtube = "<a href='http://www.youtube.com/user/" + socialChannel + "' target='_blank'><i class='profile-reps-social profile-social-yt fa fa-youtube-play fa-2x' aria-hidden='true'></i></a>";

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
   }
}
