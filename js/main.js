$(function(){
	productsList();
	createRangeSlider();
	initBrand();
})

$(document).on('click', '[data-toggle="lightbox"]', function (event) {
	event.preventDefault();
	$(this).ekkoLightbox();
});

digitGrouping = function(number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

productsList = function() {
	$.ajax({
		url: "https://secondbestdb.herokuapp.com/Devices",
		method: "GET",
		datatype: "json",
		success: function(data){
			$.each(data, function(i, v){
				let imagesDevice = '<div class="row mx-auto">';
				for (let i = 1; i < v.Images.length; i++) {
					imagesDevice += '<a href="' + v.Images[i] + '"data-toggle="lightbox" data-gallery="gallery' + v.id + '" data-title="' + v.Name + '"><img src="' + v.Images[i] + '" height="50"></a>&nbsp;';
				}
				imagesDevice += '</div>';
				$("#Products").append(
					'<div class="col-lg-4 col-md-6 mb-4"><div class="card h-100"><a href="' + v.Images[0] + '"data-toggle="lightbox" data-gallery="gallery' + v.id + '" data-title="' + v.Name + '"><img class="card-img-top image0" src="' + v.Images[0] + '"></a><br>'+ imagesDevice +'<div class="card-body"><div class="text-center" style="height:50px"><h4 class="card-title">' + v.Name + '</h4></div><div class="card-text"><br><div class="text-center"><span class="btn btn-danger">' + digitGrouping(v.Price) + ' ₫</span></div><br><div class="text-center" onclick="buyDevice(' + v.id + ')"><span class="btn btn-primary">BUY NOW!</span></div><br>Brand: ' + v.Brand.Name + '<br>CPU: ' + v.CPU + '<br>Screen: '  + v.Screen + '<br>OS: ' + v.OS + '<br>Rear Camera: ' + v.RearCamera + '<br>Front Camera: ' + v.FrontCamera + '<br>Ram: ' + v.Ram + ' GB<br>Rom: ' + v.Rom + ' GB<br>Status: ' + v.Status + ' %</div></div></div>'
				);
			})
		}
	})
}

createRangeSlider = function() {
	$("#slider-range").slider({
		range: true,
		min: 0,
		max: 20000000,
		values: [0, 20000000],
		slide: function( event, ui ) {
			$("#amount").val("₫" + ui.values[0] + " - ₫" + ui.values[1]);
		}
	});
	$("#amount").val("₫" + $("#slider-range").slider("values", 0) + " - ₫" + $("#slider-range").slider("values", 1));	
}

$("#enterSearch").on('keypress',function(e) {
    if(e.which == 13) {
		searchProduct();
    }
});

$(function() {
	$("#clickSearch").click(function() {
		searchProduct();
	})
})

$("#slider-range").click(function() {
	searchProduct();
})

$("#brandSearch").click(function() {
	searchProduct();
})

$("#pricesort").click(function() {
	searchProduct();
})

initBrand = function() {
	$.ajax({
		url: "https://secondbestdb.herokuapp.com/Brands",
		method: "GET",
		datatype: "json",
		success: function(data){
			$.each(data, function(i, v){
				$("#brandSearch").append(
					"<option value='" + v.id + "'>" + v.Name + "</option>"
				);
			})
		}
	})
}

searchProduct = function() {
	let keyword = $("#enterSearch").val().toLowerCase();

	$.ajax({
		url: "https://secondbestdb.herokuapp.com/Devices",
		method: "GET",
		datatype: "json",
		success: function(data){
			$("#Products").empty();
			$("#carouselExampleIndicators").empty();

			if ($("#pricesort").val() == "Ascending") {
				data.sort(function(a, b) {
					return parseFloat(a.Price) - parseFloat(b.Price);
				});
			}
			
			if ($("#pricesort").val() == "Descending") {
				data.sort(function(a, b) {
					return parseFloat(b.Price) - parseFloat(a.Price);
				});
			}

			$.each(data, function(i, v){
				let deviceName		= v.Name.toLowerCase();
				let deviceBrand		= v.Brand.Name.toLowerCase();
				let deviceCPU		= v.CPU.toLowerCase();
				let deviceOS		= v.OS.toLowerCase();


				if ((deviceName.includes(keyword) || deviceBrand.includes(keyword) || deviceCPU.includes(keyword) || deviceOS.includes(keyword)) && (v.Price > $("#slider-range").slider("values", 0) && v.Price <  $("#slider-range").slider("values", 1)) && $("#brandSearch").val() == "All") {
					let imagesDevice = '<div class="row mx-auto">';
					for (let i = 1; i < v.Images.length; i++) {
						imagesDevice += '<a href="' + v.Images[i] + '"data-toggle="lightbox" data-gallery="gallery' + v.id + '" data-title="' + v.Name + '"><img src="' + v.Images[i] + '" height="50"></a>&nbsp;';
					}
					imagesDevice += '</div>';
					$("#Products").append(
						'<div class="col-lg-4 col-md-6 mb-4"><div class="card h-100"><a href="' + v.Images[0] + '"data-toggle="lightbox" data-gallery="gallery' + v.id + '" data-title="' + v.Name + '"><img class="card-img-top image0" src="' + v.Images[0] + '"></a><br>'+ imagesDevice +'<div class="card-body"><div class="text-center" style="height:50px"><h4 class="card-title">' + v.Name + '</h4></div><div class="card-text"><br><div class="text-center"><span class="btn btn-danger">' + digitGrouping(v.Price) + ' ₫</span></div><br><div class="text-center onclick="buyDevice(' + v.id + ')"><span class="btn btn-primary">BUY NOW!</span></div><br>Brand: ' + v.Brand.Name + '<br>CPU: ' + v.CPU + '<br>Screen: '  + v.Screen + '<br>OS: ' + v.OS + '<br>Rear Camera: ' + v.RearCamera + '<br>Front Camera: ' + v.FrontCamera + '<br>Ram: ' + v.Ram + ' GB<br>Rom: ' + v.Rom + ' GB<br>Status: ' + v.Status + ' %</div></div></div>'
					);
				}
				
				if ((deviceName.includes(keyword) || deviceBrand.includes(keyword) || deviceCPU.includes(keyword) || deviceOS.includes(keyword)) && (v.Price > $("#slider-range").slider("values", 0) && v.Price <  $("#slider-range").slider("values", 1)) && v.Brand.id == $("#brandSearch").val()) {
					let imagesDevice = '<div class="row mx-auto">';
					for (let i = 1; i < v.Images.length; i++) {
						imagesDevice += '<a href="' + v.Images[i] + '"data-toggle="lightbox" data-gallery="gallery' + v.id + '" data-title="' + v.Name + '"><img src="' + v.Images[i] + '" height="50"></a>&nbsp;';
					}
					imagesDevice += '</div>';
					$("#Products").append(
						'<div class="col-lg-4 col-md-6 mb-4"><div class="card h-100"><a href="' + v.Images[0] + '"data-toggle="lightbox" data-gallery="gallery' + v.id + '" data-title="' + v.Name + '"><img class="card-img-top image0" src="' + v.Images[0] + '"></a><br>'+ imagesDevice +'<div class="card-body"><div class="text-center" style="height:50px"><h4 class="card-title">' + v.Name + '</h4></div><div class="card-text"><br><div class="text-center"><span class="btn btn-danger">' + digitGrouping(v.Price) + ' ₫</span></div><br><div class="text-center onclick="buyDevice(' + v.id + ')"><span class="btn btn-primary">BUY NOW!</span></div><br>Brand: ' + v.Brand.Name + '<br>CPU: ' + v.CPU + '<br>Screen: '  + v.Screen + '<br>OS: ' + v.OS + '<br>Rear Camera: ' + v.RearCamera + '<br>Front Camera: ' + v.FrontCamera + '<br>Ram: ' + v.Ram + ' GB<br>Rom: ' + v.Rom + ' GB<br>Status: ' + v.Status + ' %</div></div></div>'
					);
				}
			})
			
		}
	});
}

var order = {} || order;

order.save = function() {
	if($("#OrderForm").valid()) {
		var orderObj					= {};
		orderObj.Name					= $("#Name").val();
		orderObj.PhoneNumber			= $("#PhoneNumber").val();
		orderObj.Address				= $("#Address").val();
		orderObj.OrderStatus			= "Pending";
		orderObj.BuyDevice				= {};
		orderObj.BuyDevice.ID			= deviceID;
		orderObj.BuyDevice.Name			= deviceName;
		orderObj.BuyDevice.Images		= deviceImages;
		orderObj.BuyDevice.Brand		= deviceBrand;
		orderObj.BuyDevice.Status		= deviceStatus;
		orderObj.BuyDevice.Price		= devicePrice;
		orderObj.BuyDevice.CPU			= deviceCPU;
		orderObj.BuyDevice.Screen		= deviceScreen;
		orderObj.BuyDevice.OS			= deviceOS;
		orderObj.BuyDevice.RearCamera	= deviceRearCamera;
		orderObj.BuyDevice.FrontCamera	= deviceFrontCamera;
		orderObj.BuyDevice.Ram			= deviceRam;
		orderObj.BuyDevice.Rom			= deviceRom;
		$.ajax({
			url: "https://secondbestdb.herokuapp.com/Orders",
			method: "POST",
			dataType: "json",
			contentType: "application/json",
			data: JSON.stringify(orderObj),
			success: function(data) {
				$('#OrderModal').modal('hide');
				bootbox.alert("Thank you for your order! We will be processing and shipping your order ASAP.");
				$("#Products").empty();
				productsList();
				$.ajax({
					url: "https://secondbestdb.herokuapp.com/Devices/" + deviceID,
					method: "DELETE",
					dataType: "json"
				});
			}
		});
	}
}

var deviceID, deviceName, deviceImages, deviceBrand, deviceStatus, devicePrice, deviceCPU, deviceRam, deviceRom, deviceScreen, deviceOS, deviceRearCamera, deviceFrontCamera;
buyDevice = function(device) {
	resetOrderModal();
	$('#OrderModal').modal('show');
	$.ajax({
		url: "https://secondbestdb.herokuapp.com/Devices",
		method: "GET",
		datatype: "json",
		success: function(data){
			$.each(data, function(i, v){
				if (device == v.id) {
					deviceID			= v.id;
					deviceName			= v.Name;
					deviceImages		= v.Images;
					deviceBrand			= v.Brand;
					deviceStatus		= v.Status;
					devicePrice			= v.Price;
					deviceCPU			= v.CPU;
					deviceRam			= v.Ram;
					deviceRom			= v.Rom;
					deviceScreen		= v.Screen;
					deviceOS			= v.OS;
					deviceRearCamera	= v.RearCamera;
					deviceFrontCamera	= v.FrontCamera;
				}
			});
		}
	});
}

resetOrderModal = function() {
	$("#id").val('0');
	$("#Name").val('');
	$("#PhoneNumber").val('');
	$("#Address").val('');
	var validator = $("#OrderForm").validate();
	validator.resetForm();
}