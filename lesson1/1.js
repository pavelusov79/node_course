const prompt = require('prompt');
const colors = require('colors');

console.log('Поиск простых чисел в заданном диапазоне.\nДля поиска чисел нужно ввести диапазон от и до');
prompt.start();
prompt.get(['first','second'], function(error, result) {
	let first_num = parseInt(result.first);
	let last_num = parseInt(result.second);
	if(!Number.isInteger(first_num) || !Number.isInteger(last_num)) {
		return console.log('error\nвы ввели не число'.red);
	}else if(first_num <= 1) {
		return console.log('error\nпервое число должно быть больше еденицы'.red);
	}else if(last_num < first_num) {
		return console.log('error\nвторое число должно быть больше чем первое'.red);
	}
	let raw_array = [];
	let composite_numbers = [];

	for (let i = first_num; i <= last_num; i++) {
		raw_array.push(i);
		for (let j=2; j < i; j++) {
			if (i % j == 0) {
				composite_numbers.push(i) 
				break;
			};
		}
	}
	console.log('исходный диапазон чисел: ' + raw_array);
	simple_numbers_array = raw_array.filter(el => !composite_numbers.includes(el))
	if (simple_numbers_array.length === 0) {
		return console.log('в выбранном вами диапазоне нет простых чисел'.red);	
	}else {
		console.log('найдены простые числа: ' + simple_numbers_array);
		for (let el = 0; el <= simple_numbers_array.length; el++) {
			if (el == 0) {
				console.log('певрое простое число: ' + colors.green(simple_numbers_array[el]));
			}else if (el == 1) {
				console.log('второе простое число: ' + colors.yellow(simple_numbers_array[el]));
			}else if (el == 2) {
				console.log('третье простое число: ' + colors.red(simple_numbers_array[el]));
			}
		}	
	}
	
});

