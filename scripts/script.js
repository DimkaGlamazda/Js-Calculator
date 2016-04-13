window.onload = function() {
	

	var calckObj = new Screen();

	calckObj._button_elem.onclick = function(e) {
		calckObj.calck(e.target);
	}


	function Screen() {


		this._elem = document.getElementById('icon');
		this._button_elem = document.getElementById('container');
		this._num_one = "";
		this._num_two = "";
		this._num_toggle = true;
		this.operation = [0, ""];
		this.fraction_toggle = true;
		this.resault = undefined;



		this.calck;
		this.creation_num;
		this.creation_operation;
		this.get_res;
		this.clear;
		this.positive_or_negative;
		this.icon_show;
		this.fraction;

	}




	Screen.prototype.calck = function(el) {

			this.clear(el);

			if(this.resault == undefined){

				this.positive_or_negative(el);
				this.creation_operation(el);
				this.creation_num(el); 
				this.fraction(el);
				this.get_res(el);

			}
		}

	Screen.prototype.creation_num = function(number) {

			if(number.className != "button number") return;

			
			if(this._num_toggle){

				this._num_one += number.value;
				this._elem.value = this._num_one;

			}else{

				this._num_two += number.value;
				this._elem.value = this._num_one + this.operation[1] + this._num_two;

			}
		}


		Screen.prototype.creation_operation = function(operation) {

			if (operation.className == "button number") {

				return;

			} else if(operation.className == "button operation" && this.operation[0] == 0  && this._num_one != 0){

				this._num_toggle = false;
				this.fraction_toggle = true;
				switch(operation.id){
					case "divide":
						this.operation[0] = 1;
						this.operation[1] = '/';
						this.icon_show(this.operation[1]);
						break;
					case "multiply":
						this.operation[0] = 2;
						this.operation[1] = '*';
						this.icon_show(this.operation[1]);
						break;
					case "minus":
						this.operation[0] = 3;
						this.operation[1] = '-';
						this.icon_show(this.operation[1]);
						break;
					case "plus":
						this.operation[0] = 4;
						this.operation[1] = '+';
						this.icon_show(this.operation[1]);
					break;
				}
			}
		}

		Screen.prototype.get_res = function(element) {

			if(element.id == "equals" && this._num_toggle == false && this._num_two != ""){
				switch(this.operation[0]){
					case 1:
						this.resault = (parseInt(this._num_one)) / (parseInt(this._num_two));
						break;
					case 2:
						this.resault = +this._num_one * +this._num_two;
						break;
					case 3:
						this.resault = +this._num_one - +this._num_two;
						break;
					case 4:
						this.resault = (+this._num_one) + (+this._num_two);
						break;
				}
				return this.icon_show("=" + this.resault);
			}else return;
		}


		Screen.prototype.clear = function(element) {

			if(element.id == "remove"){
				this._elem.value = 0;
				this._num_one = "";
				this._num_two = "";
				this._num_toggle = true;
				this.fraction_toggle = true;
				this.operation = [0, ""];
				this.resault = undefined;
			}

		}


		Screen.prototype.positive_or_negative = function(element) {
			if(element.id != "positive_or_negative") return;

			if(this._num_toggle && this._num_one != ""){

				this._num_one *= -1;
				this._elem.value = this._num_one;

			} else if (this._num_two != ""){

				this._num_two *= -1;
				this._elem.value = this._num_one + this.operation[1] + this._num_two;

			}
		}


		Screen.prototype.icon_show = function(symbol) {
			this._elem.value += symbol;
		}


		Screen.prototype.fraction = function(elem) {
			if (elem.id == "fraction" && this._num_toggle && this.fraction_toggle && this._num_one != "") {

				this._num_one = this._num_one + ".";
				this._elem.value = this._num_one;
				this.fraction_toggle = false;

			} else if (elem.id == "fraction" && !this._num_toggle && this.fraction_toggle){

				this._num_two = this._num_two + ".";
				this._elem.value = this._num_one +this.operation[1]+ this._num_two;
				this.fraction_toggle = false;

			}
		}
}
