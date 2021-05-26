var prompt = require('prompt');
var colors = require('colors');

console.log('Поиск простых чисел в заданном диапазоне.\nДля поиска чисел нужно ввести диапазон от и до');
prompt.start();
prompt.get(['first','second'], function(err, result) {
	var a = parseInt(result.first);
	var b = parseInt(result.second);
	if(!Number.isInteger(a) || !Number.isInteger(b)) {
		return (console.log('вы ввели не число'));
	}else if(a <= 1) {
		return (console.log('первое число должно быть больше еденицы'))
	}else if(b < a) {
		return (console.log('второе число должно быть больше чем первое'));
	}
	let array = [];
	let array1 = [];
	for (var i = a; i <= b; i++) {
		array.push(i);
	}
	console.log('исходный диапазон чисел: ' + array);

	for (var i = 0; i <= array.length; i++) {
		for (var j=2; j < array[i]; j++) {
			if (array[i] % j == 0) {
				array1.push(array[i]) 
				break;
			};
		}
	}
	array2 = array.filter(el => !array1.includes(el))
	if (array2.length == 0) {
		return console.log(colors.red('в выбранном вами диапазоне нет простых чисел'));	
	}else {
		console.log('найдены простые числа: ' + array2);
		for (var el = 0; el <= array2.length; el++) {
			if (el == 0) {
				console.log('певрое простое число: ' + colors.green(array2[el]));
			}else if (el == 1) {
				console.log('второе простое число: ' + colors.yellow(array2[el]));
			}else if (el == 2) {
				console.log('третье простое число: ' + colors.red(array2[el]));
			}
		}	
	}
	
});

