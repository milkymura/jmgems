function strutCarSection() {
  const $html = $('html')
  const mobileScreenSize = 900
  let controller = null

  function detectScreen() {
    $(window).resize(function() {
      if ($(window).width() <= mobileScreenSize) {
        $html.addClass('page-sm-strutCarSection-destroyed')
        controller.destroy(true)
        controller = null
      } else {
        if ($html.hasClass('page-sm-strutCarSection-destroyed')) {
          $html.removeClass('page-sm-strutCarSection-destroyed')
          animateSection()
        }
      }
    })
  }

  function animateSection($section) {
    controller = new ScrollMagic.Controller()
    const $car = $section.find('.col-graphic img') ,
          $content = $section.find('.col-content')


    const animation = new TimelineMax()
    animation
      .add(TweenMax.fromTo(
        $car, 1, {
          xPercent: -300,
        },{
          xPercent: 0,
          ease: Power3.easeOut
        }
      ))
      .add(TweenMax.staggerFromTo(
        $content.children(), .5, {
          y: 50,
          opacity: 0
        },{
          y: 0,
          opacity: 1,
          ease: Power3.easeOut
        },.1
      ))


    const animationScene = new ScrollMagic.Scene({
      triggerElement: $section[0] ,
      duration: '60%',
      triggerHook: 0.8,
      tweenChanges: true
    })
    .setTween(animation)
    // .addIndicators({name: "car section"})
    .addTo(controller)
  }

  function initialize() {
    const $section =  $('.strt_cta-automotive ')

    if ($(window).width() > mobileScreenSize ) {
      $section.each(function() {
        animateSection($section)
      })
    } else {
      $html.addClass('page-sm-strutCarSection-destroyed')
    }
  }

  initialize()
}