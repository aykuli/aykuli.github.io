/*POPUP REGISTRATION*/

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
//спрашиваем у браузера, есть ли у него в локальных записях логин пользователя
var storage = "";
var isStorageSupport = true;

/*END OF ПЕРЕМЕННЫЕ*/

/*отлов ошибок браузера*/
try {
	storage = localStorage.getItem("login");
} catch (err) {
	isStorageSupport = false;
}
/*END OF отлов ошибок браузера*/

/*FUNCTIONS*/
	//При нажатии на элемент с классом .login-link прерываем дефолтное действие с помощью preventDefault
link.addEventListener("click", function (evt) {
	evt.preventDefault();
	console.log("Нажатие по ВХОД");
	popup.classList.add("modal-show");
	overlay.classList.add("modal-overlay");
	//при открытии окна popup фокус переносится в поле ввода имени, если оно пустое, если оно не пустое - то в поле ввода пароля
	
	if (storage) {
		login.value = storage;
		password.focus();
	} else {
		login.focus();
	}
});

	//при нажатии на кнопку с классом ..modal-close в переменной close удаляем из блока с классом .modal-login в переменной popup убираем класс .modal-show
close.addEventListener("click", function(evt) {
	evt.preventDefault();
	console.log("Нажатие по ЗАКРЫТЬ");
	popup.classList.remove("modal-show");
	overlay.classList.remove("modal-overlay");
	popup.classList.remove("modal-error");
});

overlay.addEventListener("click", function(evt) {
	console.log("Нажатие по где угодно");
	popup.classList.remove("modal-show");
	overlay.classList.remove("modal-overlay");
	popup.classList.remove("modal-error");
});

form.addEventListener("submit", function (evt) {
	evt.preventDefault();
	if (!login.value || !password.value) {
		evt.preventDefault();
		popup.classList.add("modal-error");
	} else {
		if (isStorageSupport) {
			localStorage.setItem("login", login.value);
		}
	}
});

//При нажатии на клавишу esc (у нее номер 27 в keycode) окно попап закрывается - удаляется класс modal-show и odal-overlay"
window.addEventListener("keydown", function (evt) {
	if (evt.keyCode === 27) {
		if (popup.classList.contains("modal-show")) {
			evt.preventDefault();
			popup.classList.remove("modal-show");
			overlay.classList.remove("modal-overlay");
			popup.classList.remove("modal-error");
		} 
	}
});

/*END OF FUNCTIONS*/
/*END OF REGISTRATION*/