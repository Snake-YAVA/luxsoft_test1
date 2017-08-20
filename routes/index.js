/**
 * Роутинг
 * @exports routes
 */
module.exports = function(app) {	
	
	var calc = new Calculator();

	app.get('/', frontpage);
	app.get('/mod-tarif', mod_tarif);
	app.post('/mod-tarif', mod_tarif_post);
	app.post('/calculate', calculate);

	function frontpage(req, res) {
		res.render('index', {
			title: 'Рассчёт стоимости посылки',
			calc_operands: calc.operands
		});
	}

	function mod_tarif(req, res) {
		res.render('mod_tarif', {
			title: 'Модификатор тарифов',
			calc_operands: calc.operands,
			calc_func: calc.formula
		});
	}	

	function mod_tarif_post(req, res, next) {		
		var new_calc = new Calculator(req.body.formula);

		var success = false;
		try {			
			var testResult = new_calc.get_cost(1, 1, 1, 1, 1);
			console.log(testResult);
			var success = typeof(testResult) == 'number' && testResult != null && testResult != 'Infinity' && testResult != '-Infinity';			
		} catch (e) {

		}  	
		
		//Если нужно заменить не формулу, а целиком функцию, то можно так:
		//eval("calc.get_cost = function(width) { return width * 10; };");
		if (success == true) {
			calc = new_calc;
			console.log(JSON.stringify(calc.get_cost.toString()));
			res.send('');
		} else {
			res.status(500).send('Something went wrong');
		}
	}

	function calculate(req, res, next) {
		var operands = [];
		for (var key in calc.operands) {
			operands.push(req.body[key]);
		}

		console.log(JSON.stringify(calc.get_cost.toString()));
		var cost = calc.get_cost(...operands);		
		res.send(JSON.stringify(cost));
	}


}

function Calculator( formula ) {
	this.operands = {
		width: 'Ширина',
		height: 'Высота',
		length: 'Длина',
		weight: 'Вес',
		distance: 'Расстояние',
	};
	this.default_formula = "(width * height * length * 0.1 + weight * 0.2) * distance * 0.3";
	this.formula = (formula != null) ? formula : this.default_formula;

	this.get_cost = function (width, height, length, weight, distance) {
		var result = eval(this.formula + ";");
		return parseFloat(result.toFixed(2));
	};

}