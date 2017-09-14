$(document).on("click", "#new-address-submit", function (event) {
  event.preventDefault();

  // get data
  let newAddress = {
    street: document.forms["update-address"]["street"].value,
    city: document.forms["update-address"]["city"].value,
    state: document.forms["update-address"]["state"].value,
    zipcode: document.forms["update-address"]["zipcode"].value
  };

  $.ajax({
    method: "PUT",
    url: "/profile",
    dataType: "json",
    data: newAddress,
    success: function (data) {
      window.location.reload();
    }
  })
});
