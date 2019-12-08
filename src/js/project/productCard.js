function initStickyCards() {
	$('.productcard--sticky').each(function(){
		const $card = $(this) ,
					$container = $card.parents('.d_home_productgrid_section').find('.collection_tab')

		const controller = new ScrollMagic.Controller()

		const stickyScene = new ScrollMagic.Scene({
			triggerElement: $card[0],
			triggerHook: .185,
			tweenChanges: true,
			duration: ($container.outerHeight() - ($card.outerHeight() + 100)) 
		})
		.setPin($card[0])
		// .addIndicators({name: "pin Card"})
		.addTo(controller)


		setInterval(function() {
			let dur = ($container.outerHeight() - ($card.outerHeight() + 100))

			if(dur < 0) {
				dur = 1
			}

			stickyScene.duration(dur);
		}, 100)

		// setInterval(function() {
		// 	console.log('$container.outerHeight() is', $container.outerHeight())
		// 	stickyScene.duration($container.outerHeight());
		// }, 1000000)

		// const stopStickyScene = new ScrollMagic.Scene({
		// 	triggerElement: $stopper[0],
		// 	triggerHook: .8,
		// 	tweenChanges: true,
		// 	duration: 
		// })
		// .addIndicators({name: "unpin Card"})
		// .on("enter leave", function(e){
		// 	if( e.type == "enter" ) {
		// 		console.log('ENTER position is ',$card.css('position'))

		// 		// $card.detach()
		// 		$card.css({ 'position': 'relative !important' })

		// 		console.log('ENTER CARD IS', $card.css('position', 'relative !important'))
		// 		// stickyScene.removePin()
		// 	} else {

		// 		console.log('LEAVE position is ',$card.css('position'))

		// 		$card.css({ 'position': 'fixed !important' })
		// 		// stickyScene.setPin($card[0])
		// 	}
		// })
		// .addTo(controller)

		// console.log($card)
	})

}
