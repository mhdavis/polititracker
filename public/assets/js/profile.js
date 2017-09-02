$(document).ready(function() {
    democracy.getReps();

    $('#click').on('click', function() {
        alert('it worked!')
    })
});


let democracy = {
    getReps: function() {
        $.ajax({
            type: 'GET',
            url: "/api/reps",
            dataType: "json",
            contentType: "application/json;charset=utf-8"
        }).done(function(data) {
            // $('#string').append(JSON.stringify(data));
        })
    }
}
