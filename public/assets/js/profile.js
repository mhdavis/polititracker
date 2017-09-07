$(document).ready(function () {

  $(".update-address-btn").on("click", function (event) {
      // check if all form inputs filled
      let street = document.forms["update-address"]["street"].value.trim();
      let city = document.forms["update-address"]["city"].value.trim();
      let state = document.forms["update-address"]["state"].value.trim();
      let zipcode = document.forms["update-address"]["zipcode"].value.trim();
      let fullAddress = street + " " + city + ", " + state + " " zipcode;

      let updatedAddress = {
        state: state,
        full_address: fullAddress;
      };

      if (street !== '' || city !== '' || state !== '' || zipcode !== '') {
        alert("Please Fill Out Your Updated Address Completely");
      } else {
        $.put('/profile', updatedAddress).then(
          // refresh the page with the new info
          // recall the ajax query that fires on page load to load new info
          // for user.
        );
      }
  });

});
