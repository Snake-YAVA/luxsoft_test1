$( document ).ready(function() {

	$('form[name="calc-cost"]').submit(function(e) {
		var form = $(this);
		var url = form.attr('action');
		$.ajax({
				type: form.attr('method'),
				url: url,
				data: form.serialize(),
				success: function(data)
				{
					console.log(data);
					$('.result').html("Стоимость отправления: " + data + " руб.");
				},
				error: function(err) {
					console.log(err);
				}
			});

		e.preventDefault();
	});

	$('form[name="change-tarif"]').submit(function(e) {
		var form = $(this);
		var url = form.attr('action');
		$.ajax({
				type: form.attr('method'),
				url: url,
				data: form.serialize(),
				success: function(data)
				{
					location.replace("/");							
				},
				error: function(err) {
					form.find('input[type=text]').css('background-color', 'red');
				}
			});
		
		e.preventDefault();
	});


});