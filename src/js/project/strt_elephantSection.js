function strutElephantSection() {
  const $html = $('html')
  const mobileScreenSize = 900
  let controller = null

  function detectScreen() {
    $(window).resize(function() {
      if ($(window).width() <= mobileScreenSize) {
        $html.addClass('page-sm-elephantSection-destroyed')
        controller.destroy(true)
        controller = null
      } else {
        if ($html.hasClass('page-sm-elephantSection-destroyed')) {
          $html.removeClass('page-sm-elephantSection-destroyed')
          animateSection()
        }
      }
    })
  }

  function animateSection($section) {
    controller = new ScrollMagic.Controller()
    const $content = $section.find('.col-content')

    const animation = new TimelineMax()
    animation
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
    const $section =  $('.strt_cta-elephant')

    if ($(window).width() > mobileScreenSize ) {
      $section.each(function() {
        animateSection($section)
      })
    } else {
      $html.addClass('page-sm-elephantSection-destroyed')
    }
  }

  initialize()
}