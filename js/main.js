$(document).on('click', '[data-toggle="lightbox"]', function (event) {
	event.preventDefault();
	$(this).ekkoLightbox();
});

$(function(){
	init();
})

init = function() {
	productsList();
}

displayPriceWithDot = function(price) {
	return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

productsList = function() {
	$.ajax({
		url: "http://localhost:3000/Devices",
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
					'<div class="col-md-4 mb-5"><div class="card h-100"><a href="' + v.Images[0] + '"data-toggle="lightbox" data-gallery="gallery' + v.id + '" data-title="' + v.Name + '"><img class="card-img-top image0" src="' + v.Images[0] + '"></a><br>'+ imagesDevice +'<div class="card-body"><div class="text-center" style="height:50px"><h4 class="card-title">' + v.Name + '</h4></div><div class="card-text"><br><div class="text-center"><span class="btn btn-danger">' + displayPriceWithDot(v.Price) + ' ₫</span></div><br>' + 'Brand: ' + v.Brand.Name + '<br>CPU: ' + v.CPU + '<br>Screen: '  + v.Screen + '<br>OS: ' + v.OS + '<br>Rear Camera: ' + v.RearCamera + '<br>Front Camera: ' + v.FrontCamera + '<br>Ram: ' + v.Ram + ' GB<br>Rom: ' + v.Rom + ' GB<br>Status: ' + v.Status + ' %</div></div></div></div>'
				);
			})
		}
	})
}