// JavaScript Document

window.onload = init();

function init() {

	window.addEventListener('scroll', function (e) {
		var distanceY = window.pageYOffset || document.documentElement.scrollTop,
			shrinkOn = 300,
			header = document.querySelector("header");
		if (distanceY > shrinkOn) {
			classie.add(header, "smaller");
		} else {
			if (classie.has(header, "smaller")) {
				classie.remove(header, "smaller");
			}
		}
	});


	$.ajax({
		method: 'GET',
		url: 'https://me.esposito1540.com/wp-json/wp-api-menus/v2/menus/2',
		dataType: 'json',
		success: function (data) {

			$('nav').hide();
			
			var menu = menuBuilder(data.items);

			$('nav').html(menu).slideDown();
			
			$("#loaderDiv").fadeOut("slow");

		},
		error: function () {

			console.log('all is not good');

		}
	});

}


function menuBuilder(obj) {

	var theMenu = '';


	if (obj.length > 0) {

		theMenu = theMenu + '<ul>';

		obj.forEach(function (item) {

			theMenu = theMenu + '<li><a href="#">' + item.title + '</a>';

			if (item.children) {

				theMenu = theMenu + menuBuilder(item.children);
			}

			theMenu = theMenu + '</li>';

		});

		theMenu = theMenu + '</ul>';

	} else {

		console.log('no data');

	}

	return theMenu;


}


