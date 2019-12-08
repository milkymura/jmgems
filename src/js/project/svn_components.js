

function heroSectionProductSlider() {
	const $section = $('#shopify-section-svn-sliderproduct-hero'),
				slider = $section.find(),
				controller = new ScrollMagic.Controller()
				triggerPoint = {
					hide : '#triggerHide'
				}

	if(slider.children().length > 1) {
		// just fade up the whole carousel
	} else {
		// fade side ways

		$section.addClass('one_item')
		// find graphic and content
		const content = $section.find('.s_content'),
					graphic = $section.find('.s_graphic')

		const fadeElems = new TimelineMax()
			// fade content
			.add(TweenMax.fromTo(
				content,1,
				{
					opacity:1,
					x:0
				},
				{
					opacity:0,
					x:-100,
					ease: Power3.easeOut
				}),0
			)
			// fade graphic
			.add(TweenMax.fromTo(
				graphic,1,
				{
					opacity:1,
					x:0
				},
				{
					opacity:0,
					x:100,
					ease: Power3.easeOut
				}),0
			)

		const scenes = new ScrollMagic.Scene({
			triggerElement: triggerPoint.hide,
			triggerHook: .2,
			duration: 500,
			tweenChanges: true
		})
		.setTween(fadeElems)
		// .addIndicators({name: "fade two items"})
		.addTo(controller)
	}
}

function headphoneColorSection() {
	const $section = $('.heroheadphonecolor_section'),
				$container = $section.find('.container'),
				controller = new ScrollMagic.Controller(),
				triggerPoint = {
					container : '#headphoneColorContainer'
				}


		const fadeElems = new TimelineMax()
			// fade content
			.add(TweenMax.fromTo(
				$container,.5,
				{
					opacity:0,
					y:50
				},
				{
					opacity:1,
					y:0
				}),0
			)

		// const scene_ = new ScrollMagic.Scene({
		// 	triggerElement: triggerPoint.container,
		// 	duration: 300,
		// 	tweenChanges: true
		// })
		// .setTween(fadeElems)
		// .addIndicators({name: "fade container"})
		// .addTo(controller)
}

function headphonePartsSection() {
	const controller = new ScrollMagic.Controller(),
				line_anim = new TimelineMax(),
				$keyfeatures = $('#key_features'),
				$keyfeatures_header = $('.kfeatures_header'),
				$dot = $('.k_point-dot'),
				$popup = $('.k_point-popup'),
				triggerPoint = {
					lines : '#triggerShowLines'
				},
				$line1 = $('#line_1_svg-path'),
				$line2 = $('#line_2_svg-path'),
				$line3 = $('#line_3_svg-path'),
				$line4 = $('#line_4_svg-path'),
				$line5 = $('#line_5_svg-path'),
				$line6 = $('#line_6_svg-path'),
				$line7 = $('#line_7_svg-path');

	pathPrepare($line1)
	pathPrepare($line2)
	pathPrepare($line3)
	pathPrepare($line4)
	pathPrepare($line5)
	pathPrepare($line6)
	pathPrepare($line7)

	line_anim
		.add(TweenMax.to(
			$line1, 1,
			{
				strokeDashoffset: 0,
				ease: Power3.easeOut
			}
		),0)
		.add(TweenMax.to(
			$line2, 1,
			{
				strokeDashoffset: 0,
				ease: Power3.easeOut
			}
		),0)
		.add(TweenMax.to(
			$line3, 1,
			{
				strokeDashoffset: 0,
				ease: Power3.easeOut
			}
		),0)
		.add(TweenMax.to(
			$line4, 1,
			{
				strokeDashoffset: 0,
				ease: Power3.easeOut
			}
		),0)
		.add(TweenMax.to(
			$line5, 1,
			{
				strokeDashoffset: 0,
				ease: Power3.easeOut
			}
		),0)
		.add(TweenMax.to(
			$line6, 1,
			{
				strokeDashoffset: 0,
				ease: Power3.easeOut
			}
		),0)
		.add(TweenMax.to(
			$line7, 1,
			{
				strokeDashoffset: 0,
				ease: Power3.easeOut
			}
		),0)

	const keyfeatures_scene = new ScrollMagic.Scene({
		triggerElement: triggerPoint.lines,
		triggerHook: .2,
		duration: '60%',
		tweenChanges: true
	})
	.setTween(line_anim)
	// .addIndicators({name: "line animation"})
	.addTo(controller);


	const headphones_anim = new TimelineMax()
		.add(TweenMax.fromTo(
			$keyfeatures, 1,
			{
				y: 200,
				opacity: 0
			},{
				y: 0,
				opacity: 1,
				ease: Power3.easeOut
			}
		),0)
		.add(TweenMax.fromTo(
			$keyfeatures_header, 1,
			{
				y: 50,
				opacity: 0
			},{
				y: 0,
				opacity: 1,
				ease: Power3.easeOut
			}
		),0)
		


	const show_headphones_scene = new ScrollMagic.Scene({
		triggerElement: triggerPoint.lines,
		triggerHook: .9,
		duration: '100%',
		tweenChanges: true
	})
	.setTween(headphones_anim)
	// .addIndicators({name: "line headphones"})
	.addTo(controller);



	$dot.hover(function(){
		$(this).parents('.k_point').toggleClass('hovered')
	})
	$popup.hover(function(){
		$(this).parents('.k_point').toggleClass('hovered dot_emphasize')
	})
}

function ctaSection() {
	const controller = new ScrollMagic.Controller(),
				$section = $('.shopify-section.cta_section'),
				$bg = $('#cta-bg').find('img'),
				$content = $section.find('.col-content'),
				cta_bg_anim = new TimelineMax(),
				show_cta_scene = new ScrollMagic.Scene({
					triggerElement: $section[0],
					triggerHook: .8,
					duration: '50%',
					tweenChanges: true
				})

	cta_bg_anim
		.add(TweenMax.fromTo(
			$bg, 1,
			{
				scale: 1.2
			},{
				scale: 1,
				ease: Power3.easeOut
			}
		),0)
		.add(TweenMax.fromTo(
			$content, 1,
			{
				y: 50,
				opacity: 0
			},{
				y: 0,
				opacity: 1,
				ease: Power3.easeOut
			}
		),0)


		show_cta_scene
			.setTween(cta_bg_anim)
			// .addIndicators({name: "cta show"})
			.addTo(controller);
}

function cSectionAnimation() {
	const $section = $('.c_section') ,
				controller = new ScrollMagic.Controller()

	$('.c_section').each(function(){
		const $elem = $(this),
					$container = $elem.find('.content'),
					section_scene = new ScrollMagic.Scene({
						triggerElement: $elem[0],
						triggerHook: .5,
						duration: 0,
						tweenChanges: true
					}),
					showcontent_scene = new ScrollMagic.Scene({
						triggerElement: $elem[0],
						triggerHook: 1,
						duration: '20%',
						tweenChanges: true
					}),
					showContentTween = new TimelineMax()


		section_scene
			.addTo(controller)
			// .addIndicators({name: "section colors"})
			.on("enter leave", function(e){
				if( e.type == "enter" ) {
					$elem.addClass('show')
				} else {
					$elem.removeClass('show')
				}
			})




		showContentTween
			.add(TweenMax.fromTo(
				$container,1,
				{
					opacity:0,
					y:200
				},
				{
					opacity:1,
					y:0
				}),0
			)

		showcontent_scene
			.setTween(showContentTween)
			// .addIndicators({name: "section show content"})
			.addTo(controller)
	})
}

function initSvnComponents() {
	// heroSectionProductSlider()
	headphoneColorSection()
	headphonePartsSection()
	cSectionAnimation()
	ctaSection()
}