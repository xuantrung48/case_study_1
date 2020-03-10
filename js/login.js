$(document).on('keypress',function(e) {
    if(e.which == 13) {
		login();
    }
});

$(function() {
	$("button").click(function() {
		login();
	})
})


var email;
var passwd;

function login() {
	$.ajax({
		url: "http://localhost:3000/AdminID/1",
		method: "GET",
		datatype: "json",
		success: function(data){
			email	= data.Email;
			passwd	= data.Password;
			if ($("#email").val() == email && $("#password").val() == passwd) {
				$(location).attr('href', 'admin/index.html');
			} else {
				$("#wrong").html('<div class="alert alert-danger">Wrong Email or Password!</div>');
			}
		}
	});
	
}