var device = {} || device;

digitGrouping = function(price) {
	return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

$("#menu-toggle").click(function(e) {
	e.preventDefault();
	$("#wrapper").toggleClass("toggled");
});

device.init = function() {
	device.drawTable();
	device.initBrand();
}

$(document).on("click", '[data-toggle="lightbox"]', function(event) {
	event.preventDefault();
	$(this).ekkoLightbox();
});

device.initBrand = function() {
	$.ajax({
		url: "https://secondbestdb.herokuapp.com/Brands",
		method: "GET",
		datatype: "json",
		success: function(data){
			$.each(data, function(i, v){
				$("#Brand").append(
					"<option value='" + v.id + "'>" + v.Name + "</option>"
				);
			})
		}
	})
}

device.save = function() {
	if($("#formAddEditDevice").valid()) {
		if($("#id").val() == 0) {
			var deviceObj			= {};
			deviceObj.Name			= $("#Name").val();
			deviceObj.Images		= [];
			if ($("#Images0").val() != "")
				deviceObj.Images.push($("#Images0").val());
			if ($("#Images1").val() != "")
				deviceObj.Images.push($("#Images1").val());
			if ($("#Images2").val() != "")
				deviceObj.Images.push($("#Images2").val());
			var brandObj			= {};
			brandObj.id				= $("#Brand").val();
			brandObj.Name			= $("#Brand option:selected").html();
			deviceObj.Brand			= brandObj;
			deviceObj.Status		= $("#Status").val();
			deviceObj.Price			= $("#Price").val();
			deviceObj.CPU			= $("#CPU").val();
			deviceObj.Screen		= $("#Screen").val();
			deviceObj.OS			= $("#OS").val();
			deviceObj.RearCamera	= $("#RearCamera").val();
			deviceObj.FrontCamera	= $("#FrontCamera").val();
			deviceObj.Ram			= $("#Ram").val();
			deviceObj.Rom			= $("#Rom").val();
			$.ajax({
				url: "https://secondbestdb.herokuapp.com/Devices",
				method: "POST",
				dataType: "json",
				contentType: "application/json",
				data: JSON.stringify(deviceObj),
				success: function(data) {
					$('#myModal').modal('hide');
					device.drawTable();
				}
			});
			bootbox.alert("Device added!");
		} else {
			var deviceObj			= {};
			deviceObj.id			= $("#id").val();
			deviceObj.Name			= $("#Name").val();
			deviceObj.Images		= [];
			if ($("#Images0").val() != "")
				deviceObj.Images.push($("#Images0").val());
			if ($("#Images1").val() != "")
				deviceObj.Images.push($("#Images1").val());
			if ($("#Images2").val() != "")
				deviceObj.Images.push($("#Images2").val());
			var brandObj			= {};
			brandObj.id				= $("#Brand").val();
			brandObj.Name			= $("#Brand option:selected").html();
			deviceObj.Brand			= brandObj;
			deviceObj.Status		= $("#Status").val();
			deviceObj.Price			= $("#Price").val();
			deviceObj.CPU			= $("#CPU").val();
			deviceObj.Screen		= $("#Screen").val();
			deviceObj.OS			= $("#OS").val();
			deviceObj.RearCamera	= $("#RearCamera").val();
			deviceObj.FrontCamera	= $("#FrontCamera").val();
			deviceObj.Ram			= $("#Ram").val();
			deviceObj.Rom			= $("#Rom").val();
			$.ajax({
				url: "https://secondbestdb.herokuapp.com/Devices/" + deviceObj.id,
				method: "PUT",
				dataType: "json",
				contentType: "application/json",
				data: JSON.stringify(deviceObj),
				success: function(data) {
					$('#myModal').modal('hide');
					device.drawTable();
				}
			});
			bootbox.alert("Device updated!");
		}
	}
}

device.openModal = function() {
	device.reset();
	$('#myModal').modal('show');
}

device.reset = function() {
	$("#deviceModalTitle").text("Add new device:");
	$("#addButton").text("Add");
	$("#id").val('0');
	$("#Name").val('');
	$("#Images0").val('');
	$("#Images1").val('');
	$("#Images2").val('');
	$("#Brand").val('');
	$("#Status").val('');
	$("#Price").val('');
	$("#CPU").val('');
	$("#Screen").val('');
	$("#OS").val('');
	$("#RearCamera").val('');
	$("#FrontCamera").val('');
	$("#Ram").val('');
	$("#Rom").val('');
	var validator = $("#formAddEditDevice").validate();
	validator.resetForm();
}

device.drawTable = function() {
	$.ajax({
		url: "https://secondbestdb.herokuapp.com/Devices",
		method: "GET",
		datatype: "json",
		success: function(data){
			$("#tbDevices").empty();
			$.each(data, function(i, v){
				let imagesDevice = "";
				for (let i = 0; i < v.Images.length; i++) {
					imagesDevice += "<a href='" + v.Images[i] + "'data-toggle='lightbox' data-gallery='gallery" + v.id + "' data-title='" + v.Name + "'><img src='" + v.Images[i] + "' height='50'></a> ";
				}
				$("#tbDevices").append(
					"<tr><td>" + v.id + "</td><td>" + v.Name + "</td><td>" + imagesDevice + "</td><td>" + v.Brand.Name + "</td><td>" + v.CPU + "</td><td>" + v.Screen + "</td><td>" + v.OS + "</td><td>" + v.RearCamera + "</td><td>" + v.FrontCamera + "</td><td>" + v.Ram + " GB</td><td>" + v.Rom + " GB</td><td>" + v.Status + " %</td><td>" + digitGrouping(v.Price) + " ₫</td><td><a href='javascript:void(0);' onclick='device.get(" + v.id + ")'><i class='fa fa-edit' title='Edit this device'></i></a> <a href='javascript:void(0);' onclick='device.remove(" + v.id + ")'><i class='fa fa-trash' title='Remove this device'></i></a></td></tr>"
				);
			});
			$("#devicesManagement").DataTable();
		}
	});
}

device.get = function(id) {
	$.ajax({
		url: "https://secondbestdb.herokuapp.com/Devices/" + id,
		method: "GET",
		dataType: "json",
		success: function(data) {
			$("#deviceModalTitle").text("Update device details:");
			$("#addButton").text("Update");
			$("#id").val(data.id);
			$("#Name").val(data.Name);
			$("#Images0").val(data.Images[0]);
			$("#Images1").val(data.Images[1]);
			$("#Images2").val(data.Images[2]);
			$("#Brand").val(data.Brand.id);
			$("#Status").val(data.Status);
			$("#Price").val(data.Price);
			$("#CPU").val(data.CPU);
			$("#Screen").val(data.Screen);
			$("#OS").val(data.OS);
			$("#RearCamera").val(data.RearCamera);
			$("#FrontCamera").val(data.FrontCamera);
			$("#Ram").val(data.Ram);
			$("#Rom").val(data.Rom);
			var validator = $("#formAddEditDevice").validate();
			validator.resetForm();
			$('#myModal').modal('show');
		}
	});
}

device.remove = function(id) {
	bootbox.confirm({
		title: "Remove device?",
		message: "Do you really want to remove this device? This cannot be undone.",
		buttons: {
			cancel: {
				label: '<i class="fa fa-times"></i> No'
			},
			confirm: {
				label: '<i class="fa fa-check"></i> Yes'
			}
		},
		callback: function (result) {
			if (result) {
				$.ajax({
					url: "https://secondbestdb.herokuapp.com/Devices/" + id,
					method: "DELETE",
					dataType: "json",
					success: function(data) {
						device.drawTable();
					}
				});
				$.ajax({
					url: "https://secondbestdb.herokuapp.com/Cart/" + id,
					method: "DELETE",
					dataType: "json",
					success: function(data) {
						device.drawTable();
					}
				});
				bootbox.alert("Device removed!");
			}
		}
	});
}

$("#OrderStatusFilter").click(function(OrderStatus) {
	ordersdrawTable(OrderStatus);
})

ordersdrawTable = function(OrderStatus) {
	$.ajax({
		url: "https://secondbestdb.herokuapp.com/Orders",
		method: "GET",
		datatype: "json",
		success: function(data){
			$("#tbCustomers").empty();
			$.each(data, function(i, v){
				if (v.OrderStatus == $("#OrderStatusFilter").val()) {;
					let imagesDevice = "";
					for (let i = 0; i < v.BuyDevice.Images.length; i++) {
						imagesDevice += "<a href='" + v.BuyDevice.Images[i] + "'data-toggle='lightbox' data-gallery='gallery" + v.BuyDevice.id + "' data-title='" + v.BuyDevice.Name + "'><img src='" + v.BuyDevice.Images[i] + "' height='50'></a> ";
					}
					$("#tbCustomers").append(
						"<tr><td>" + v.id + "</td><td>" + v.OrderStatus + "</td><td>" + v.Name + "</td><td>" + v.PhoneNumber + "</td><td>" + v.Address + "</td><td>" + v.BuyDevice.Name + "</td><td>" + imagesDevice + "</td><td>" + v.BuyDevice.Brand.Name + "</td><td>" + v.BuyDevice.Status + " %</td><td>" + digitGrouping(v.BuyDevice.Price) + " ₫</td><td><a href='javascript:void(0);' onclick='getOrder(" + v.id + ")'><i class='fa fa-edit' title='Edit this order'></i></a> <a href='javascript:void(0);' onclick='removeOrder(" + v.id + ")'><i class='fa fa-trash' title='Remove this order'></i></a></td></tr>"
					);
				}
			});
			$("#ordersManagement").DataTable();
		}
	});
}

getOrder = function(orderID) {
	$.ajax({
		url: "https://secondbestdb.herokuapp.com/Orders/" + orderID,
		method: "GET",
		dataType: "json",
		success: function(data) {
			$("#deviceModalTitle").text("Update order details:");
			$("#id").val(data.id);
			$("#OrderStatus").val(data.OrderStatus);
			$("#CustomerName").val(data.Name);
			$("#PhoneNumber").val(data.PhoneNumber);
			$("#Address").val(data.Address);
			$("#Name").val(data.BuyDevice.Name);
			$("#Images0").val(data.BuyDevice.Images[0]);
			$("#Images1").val(data.BuyDevice.Images[1]);
			$("#Images2").val(data.BuyDevice.Images[2]);
			$("#Brand").val(data.BuyDevice.Brand.id);
			$("#Status").val(data.BuyDevice.Status);
			$("#Price").val(data.BuyDevice.Price);
			$("#CPU").val(data.BuyDevice.CPU);
			$("#Screen").val(data.BuyDevice.Screen);
			$("#OS").val(data.BuyDevice.OS);
			$("#RearCamera").val(data.BuyDevice.RearCamera);
			$("#FrontCamera").val(data.BuyDevice.FrontCamera);
			$("#Ram").val(data.BuyDevice.Ram);
			$("#Rom").val(data.BuyDevice.Rom);
			var validator = $("#formAddEditOrder").validate();
			validator.resetForm();
			$('#myModal').modal('show');
		}
	});
}

saveOrder = function() {
	var orderObj					= {};
	orderObj.id						= $("#id").val();
	orderObj.OrderStatus			= $("#OrderStatus").val();
	orderObj.Name					= $("#CustomerName").val();
	orderObj.PhoneNumber			= $("#PhoneNumber").val();
	orderObj.Address				= $("#Address").val();
	orderObj.BuyDevice				= {};
	orderObj.BuyDevice.Name			= $("#Name").val();
	orderObj.BuyDevice.Images		= [];
	if ($("#Images0").val() != "")
		orderObj.BuyDevice.Images.push($("#Images0").val());
	if ($("#Images1").val() != "")
		orderObj.BuyDevice.Images.push($("#Images1").val());
	if ($("#Images2").val() != "")
		orderObj.BuyDevice.Images.push($("#Images2").val());
	var brandObj					= {};
	brandObj.id						= $("#Brand").val();
	brandObj.Name					= $("#Brand option:selected").html();
	orderObj.BuyDevice.Brand		= brandObj;
	orderObj.BuyDevice.Status		= $("#Status").val();
	orderObj.BuyDevice.Price		= $("#Price").val();
	orderObj.BuyDevice.CPU			= $("#CPU").val();
	orderObj.BuyDevice.Screen		= $("#Screen").val();
	orderObj.BuyDevice.OS			= $("#OS").val();
	orderObj.BuyDevice.RearCamera	= $("#RearCamera").val();
	orderObj.BuyDevice.FrontCamera	= $("#FrontCamera").val();
	orderObj.BuyDevice.Ram			= $("#Ram").val();
	orderObj.BuyDevice.Rom			= $("#Rom").val();
	
	$.ajax({
		url: "https://secondbestdb.herokuapp.com/Orders/" + orderObj.id,
		method: "PUT",
		dataType: "json",
		contentType: "application/json",
		data: JSON.stringify(orderObj),
		success: function(data) {
			$('#myModal').modal('hide');
			ordersdrawTable();
		}
	});
	bootbox.alert("Order updated!");
}

removeOrder = function(orderID) {
	bootbox.confirm({
		title: "Remove Order?",
		message: "Do you really want to remove this Order? This cannot be undone.",
		buttons: {
			cancel: {
				label: '<i class="fa fa-times"></i> No'
			},
			confirm: {
				label: '<i class="fa fa-check"></i> Yes'
			}
		},
		callback: function (result) {
			if (result) {
				$.ajax({
					url: "https://secondbestdb.herokuapp.com/Orders/" + orderID,
					method: "GET",
					datatype: "json",
					success: function(data){
						var deviceObj			= {};
						deviceObj.Name			= data.BuyDevice.Name;
						deviceObj.Images		= data.BuyDevice.Images;
						deviceObj.Brand			= data.BuyDevice.Brand;
						deviceObj.Status		= data.BuyDevice.Status;
						deviceObj.Price			= data.BuyDevice.Price;
						deviceObj.CPU			= data.BuyDevice.CPU;
						deviceObj.Screen		= data.BuyDevice.Screen;
						deviceObj.OS			= data.BuyDevice.OS;
						deviceObj.RearCamera	= data.BuyDevice.RearCamera;
						deviceObj.FrontCamera	= data.BuyDevice.FrontCamera;
						deviceObj.Ram			= data.BuyDevice.Ram;
						deviceObj.Rom			= data.BuyDevice.Rom;
					
						$.ajax({
							url: "https://secondbestdb.herokuapp.com/Devices",
							method: "POST",
							dataType: "json",
							contentType: "application/json",
							data: JSON.stringify(deviceObj)
						});
					}
				});
				$.ajax({
					url: "https://secondbestdb.herokuapp.com/Orders/" + orderID,
					method: "DELETE",
					dataType: "json",
					success: function(data) {
						bootbox.alert("Order removed!");
						ordersdrawTable();
					}
				});
			}
		}
	});
}

getAdminID = function() {
	$.ajax({
		url: "https://secondbestdb.herokuapp.com/AdminID/1",
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
			url: "https://secondbestdb.herokuapp.com/AdminID/1",
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