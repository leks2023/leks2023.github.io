$(function(){

	/* Часы */
	setInterval(function() {
		$("#timeNow").html(formatDate(new Date()));
		}, 1000);
	
	function formatDate(date) {
		var hour = "0" + date.getHours(),
			minute = "0" + date.getMinutes(),
			second = "0" + date.getSeconds();
		return [hour.slice(-2), minute.slice(-2), second.slice(-2)].join(":");
	};


	$(".column_content3, .column_content5").click(function(){ // задаем функцию при нажатиии на элемент <button>
		$(".triangle_yellow, .triangle_yellow_right")
			.fadeOut(750)//  плавно изменяем прозрачность для элемента
			.fadeIn(750);
	});


	/* Анимация */
	$('.rotate').click(function() {
		$(this).toggleClass('rotated');
	});
		var rotation = 0;
	$('.rotate').click(function() {
		rotation += 5;
		$(this).css({'-webkit-transform' : 'rotate('+ rotation +'deg)',
					'-moz-transform' : 'rotate('+ rotation +'deg)',
					'-ms-transform' : 'rotate('+ rotation +'deg)',
					'transform' : 'rotate('+ rotation +'deg)'});
	});


	/* Список событий на странице */
	$('.column_content').on('click', function() {
		let $listItems = $('.listItems');
		let timeAdded = new Date;
		let num = 0;
		num = $(".listItems").find("li").length;
		if((num >=0) && (num <=4)) {
			$listItems.prepend('<li>' + 'Click на элементе: ' + 'время события: ' + (timeAdded.getHours() + ":" + timeAdded.getMinutes() ) + '</li>');
		} 
		else $('.listItems').empty();
	});

});
