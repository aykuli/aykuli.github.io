/*MAP*/
/*ПЕРЕМЕННЫЕ*/
var mapLink2 = document.querySelector(".contacts-button-map-2");
var mapPopup = document.querySelector(".modal-map");
var mapClose = document.querySelector(".modal-close-map");

var overlay = document.querySelector(".modal-overlay-none");
/*END OF ПЕРЕМЕННЫЕ*/
try {
	storage = localStorage.getItem("login");
} catch (err) {
	isStorageSupport = false;
}
/*отлов ошибок браузера*/

/*END OF отлов ошибок браузера*/

/*FUNCTIONS*/
mapLink2.addEventListener("click", function (evt) {
	evt.preventDefault();
	console.log('mapLink работает')
	mapPopup.classList.add("modal-show");
	overlay.classList.add("modal-overlay");
});
/*закрытие окна*/
mapClose.addEventListener("click", function (evt) {
	evt.preventDefault();
	console.log("Нажатие по ЗАКРЫТЬ");
	mapPopup.classList.remove("modal-show");
	overlay.classList.remove("modal-overlay");
});

overlay.addEventListener("click", function(evt) {
	console.log("Нажатие по где угодно");
	mapPopup.classList.remove("modal-show");
	overlay.classList.remove("modal-overlay");
});

window.addEventListener("keydown", function (evt) {
	if (evt.keyCode === 27) {
		if (mapPopup.classList.contains("modal-show")) {
			evt.preventDefault();
			mapPopup.classList.remove("modal-show");
			overlay.classList.remove("modal-overlay");
		} 
	}
});
/*END OF закрытие окна*/
/*END OF FUNCTIONS*/
/*END OF MAP*/