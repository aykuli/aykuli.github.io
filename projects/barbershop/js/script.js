/*ПЕРЕМЕННЫЕ*/

//выбираем элемент с классом .login-link
var link = document.querySelector(".login-link");
//выбираем элемент с классом .modal-login
var popup = document.querySelector(".modal-login");
//выбираем элемент с классом .modal-close
var close = document.querySelector(".modal-close");
var overlay = document.querySelector(".modal-overlay-none");
//поиск по значению атрибута
var login = popup.querySelector("[name=login]");
var password = popup.querySelector("[name=password]");
var form = popup.querySelector("form");

/*END OF ПЕРЕМЕННЫЕ*/

/*FUNCTIONS*/
//При нажатии на элемент с классом .login-link прерываем дефолтное действие с помощью preventDefault
link.addEventListener("click", function (evt) {
	evt.preventDefault();
	console.log("Нажатие по ВХОД");
	popup.classList.add("modal-show");
	overlay.classList.add("modal-overlay");
	//при открытии окна popup фокус переносится в поле ввода имени
	login.focus();
});

//при нажатии на кнопку с классом ..modal-close в переменной close удаляем из блока с классом .modal-login в переменной popup убираем класс .modal-show
close.addEventListener("click", function(evt) {
	evt.preventDefault();
	console.log("Нажатие по ЗАКРЫТЬ");
	popup.classList.remove("modal-show");
	overlay.classList.remove("modal-overlay");

});

overlay.addEventListener("click", function(evt) {
	console.log("Нажатие по где угодно");
	popup.classList.remove("modal-show");
	overlay.classList.remove("modal-overlay");
});

form.addEventListener("submit", function (evt) {
	evt.preventDefault();
	if (!login.value || !password.value) {
		evt.preventDefault();
		console.log("Нужно ввести логин и пароль");
	}
})
/*END OF FUNCTIONS*/