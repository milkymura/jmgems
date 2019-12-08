function strutTwoColSectionSimple() {

  const $html = $('html')
  const mobileScreenSize = 900
  let controller = null


  function entranceAnimation($section) {

    console.log('entranceAnimation', $section)

    const $container = $section.find('.container'),
          $overlay = $section.find('.strt_home2ColGrid_simple_overlay'),
          $header = $section.find('.row-header'),
          $graphic = $section.find('.col-graphic_img'),
          $content = $section.find('.col-content_container')


    const isRight = ($container.hasClass('graphic-position-right'))

    const animation = new TimelineMax()



    animation
      .add(TweenMax.fromTo(
        $header, .75, {
          yPercent: -100,
          opacity: 0
        },{
          yPercent: 0,
          opacity: 1,
          ease: Power3.easeOut
        }
      ), 0)


    animation
      .add(TweenMax.fromTo(
        $content, .75, {
          yPercent: -100,
          opacity: 0
        },{
          yPercent: 0,
          opacity: 1,
          ease: Power3.easeOut
        }
      ), 0.2)

    animation
      .add(TweenMax.fromTo(
        $overlay, 1, {
          scaleX: 0,
        },{
          scaleX: 1,
          ease: Power3.easeOut
        }
      ), 0.25)
      .add(TweenMax.fromTo(
        $graphic, 1, {
          yPercent: 100,
          opacity: 0
        },{
          yPercent: 0,
          opacity: 1,
          ease: Power3.easeOut
        }
      ), 0.3)


    const pinScene = new ScrollMagic.Scene({
      triggerElement: $section[0] ,
      duration: `80%` ,
      triggerHook: 0.8,
      tweenChanges: true
    })
    .setTween(animation)
    // .addIndicators({name: "fucking animation"})
    .addTo(controller)

  }

  function detectScreen() {
    $(window).resize(function() {

      if ($(window).width() <= mobileScreenSize) {
        $html.addClass('page-sm-strutTwoColSectionSimple-destroyed')
        controller.destroy(true)
        controller = null
      } else {
        if ($html.hasClass('page-sm-strutTwoColSectionSimple-destroyed')) {
          $html.removeClass('page-sm-strutTwoColSectionSimple-destroyed')
          initialize()
        }
      }
    })
  }

  function initialize() {
    controller = new ScrollMagic.Controller()

    if ($(window).width() > mobileScreenSize) {
      $('.strt_home2ColGrid_simple').each(function() {
        const $section = $(this)
        entranceAnimation($section)
      })
    } else {
      $html.addClass('page-sm-strutTwoColSectionSimple-destroyed')
    }
    detectScreen()
  }

  initialize()
}