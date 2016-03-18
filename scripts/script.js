window.onload = function() {
	var number_one = "";//Цифра которая вводится первой
	var number_two = "";//Цифра которая вводится второй
	var operator = "";//Переменная для хранения знака операции
	var res = 0;//Перременная для хранения результата операции
	var numToggle = true;//Перключатель между первым и вторым числом
	var operationToggle = 0;//Переключатель задающий операцию
	var fractionToggle = true;//
	var button = document.getElementById('container');
	var icon = document.getElementById("icon");
	button.onclick = function(e) {
			if(e.target.className == "button number"){
				if(res == +number_one && numToggle && fractionToggle) {
					number_one = "";
					res = 0;
					icon.value ="";
				} 
				icon.value += e.target.innerHTML;
				createNumber(e.target.innerHTML);
			} else if(e.target.className == "button operation" && numToggle == true){
				icon.value += e.target.innerHTML;
				numToggle = false;
				fractionToggle = true;
				operator += e.target.innerHTML;
				operation(e.target);
			}else if(e.target.id == "remove"){
				remove();
				icon.value = "";
			}else if(e.target.id == "positive_or_negative"){
				if(numToggle && res == 0){
					number_one = +number_one * -1;
					icon.value = number_one;
				} else if (number_two != ""){
					number_two = +number_two * -1;
					icon.value = number_one + operator + number_two;
				}
			}else if(e.target.id == "fraction"){
				if(fractionToggle && numToggle && res == 0){
					icon.value += e.target.innerHTML;
					number_one += e.target.innerHTML;
					fractionToggle = false;
				} else if(fractionToggle && numToggle == false){
					icon.value += e.target.innerHTML;
					number_two += e.target.innerHTML;
					fractionToggle = false;
				}
			}else if(e.target.id == "equals"){
				result();
			}
		}//Функция которая обрабатывает события
	function createNumber(num) {
		if(numToggle){
			number_one += num;
		} else if (numToggle == false){
			number_two +=num;
		}
	}//Изменяет запись числа
	function operation(op) {
		switch(op.id){
			case "divide":
				operationToggle = 1;
				break;
			case "multiply":
				operationToggle = 2;
				break;
			case "minus":
				operationToggle = 3;
				break;
			case "plus":
				operationToggle = 4;
				break;
		}
	}//Обрабатывает вызов операции
	function result() {
		if (number_one == "") {number_one = 0;}
		if (number_two == "") {number_two = 0;}
		switch(operationToggle){
			case 1:
				if(+number_one == 0 || number_two == 0){
					icon.value = "";
					remove();
					break;
				}
				res = +number_one / +number_two;
				icon.value = Math.round(res * 10000) / 10000;
				clear();
				break;
			case 2:
				if(+number_one == 0 || number_two == 0){
					icon.value = "";
					remove();
					break;
				}
				res = +number_one * +number_two;
				icon.value = Math.round(res * 10000) / 10000;
				clear();
				break;
			case 3:
				res = +number_one - +number_two;
				icon.value = Math.round(res * 10000) / 10000;
				clear();
				break;
			case 4:
				res = (+number_one) + (+number_two);
				icon.value = Math.round(res * 10000) / 10000;
				clear();
				break;
		}
	}//Производит операцию
	function clear() {
		 number_one = res;
		 number_two = "";
		 operator = "";
		 numToggle = true;
		 fractionToggle = true;
		 operationToggle = 0;
	}//изменяет значения после произведения операции
	function remove() {
		 number_one = 0;
		 number_two = "";	
		 operator = "";
		 res = 0;
		 numToggle = true;
		 operationToggle = 0;
		 fractionToggle = true;
	}//Удаляет и возвращает все на исходную позицию
}
