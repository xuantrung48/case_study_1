$(function() {
	getAdminID();
})

getAdminID = function() {
	$.ajax({
		url: "http://localhost:3000/AdminID/1",
		method: "GET",
		datatype: "json",
		success: function(data){
			$("#email").val(data.Email);
		}
	})
}

adminIdSave = function() {
	if($('#formAdmin').valid()){
		var adminObj		= {};
		adminObj.id			= 1;
		adminObj.Email		= $("#email").val();
		adminObj.Password	= $("#password").val();
		$.ajax({
			url: "http://localhost:3000/AdminID/1",
			method: "PUT",
			dataType: "json",
			contentType: "application/json",
			data: JSON.stringify(adminObj),
			success: function(data) {
				bootbox.alert("Profile updated!");
			}
		});
	}
}