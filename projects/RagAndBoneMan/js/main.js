$function () {
	//Preloader
/*let $preloader = $('#page-preloader'),
		$spinner   = $preloader.find('.spinner');
$spinner.fadeOut();
$preloader.delay(350).fadeOut('slow');*/

	/**Parallax on mouse moving*/
	if ($(window).width() > 960) {
		$('body').parallax({
			'elements': [
			{
				'selector': '.ellipse',
				'properties': {
					'x': {
						'right': {
							'initial': 0,
							'multiplier': 0.04,
							'unit':'vh',
							'invert': false
						}
					},
					'y': {
						'bottom': {
							'initial': 30,
							'multiplier': 0.01,
							'unit':'vh',
							'invert': true
						}
					}
				}
			}]
		})
	}
}