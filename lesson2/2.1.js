const events = require('events');
const inquirer = require("inquirer");

const ee = new events.EventEmitter(); 

ee.on('tick', () => {
	inquirer
		.prompt([{
				name: "time", 
				type: "input", 
				message: "Введите время в формате h:m (например 14:00): ", 
			},
			{
				name: "date", 
				type: "input", 
				message: "Введите будущую дату в формате dd-mm-yyyy (например 24-02-2022): ",
			}
			]) 
		.then((answer) => { 
			var time = answer.time.split(':');
			var date = answer.date.split('-');
			function timer() {
				const futureDate = new Date(date[2], date[1] - 1, date[0], time[0], time[1]);
				const currentDate = new Date();
				const diff = futureDate - currentDate;
				let days  = Math.floor( diff / (1000*60*60*24) );
				let hours = Math.floor( diff / (1000*60*60) );
				let mins  = Math.floor( diff / (1000*60) );
				let secs  = Math.floor( diff / 1000 );

				let d = days;
				let h = hours - days  * 24;
				let m = mins  - hours * 60;
				let s = secs  - mins  * 60;

				if(diff < 999) {
					console.log('таймер завершил работу');
					process.exit(0);

			    }else{
			    	console.log(d + ":" + h + ":" + m + ":" + s);
			    };	
			}
			setInterval(timer, 1000);
		});
});

ee.emit('tick');






	
