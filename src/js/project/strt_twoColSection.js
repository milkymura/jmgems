function strutTwoColSection() {

  const $html = $('html')
  const mobileScreenSize = 900
  let controller = null


  function pinPinnedSection(controller, $section, sectionDuration) {
    const $sectionPin = $section.find('.pinContainer')

    const pinScene = new ScrollMagic.Scene({
      triggerElement: $section[0] ,
      duration: `${sectionDuration - (sectionDuration * .5)}%` ,
      triggerHook: 0,
      tweenChanges: true
    })
    .setPin($sectionPin[0])
    // .addIndicators({name: "pin section"})
    .addTo(controller)
  }

  function entranceAnimation(controller, $section, sectionDuration) {

    // items to animate
    const $container = $section.find('.container') ,
          $content = $section.find('.col-content') ,
          $productGrfx = $section.find('.col-graphic_img') ,
          $productCurtainX = $section.find('.col-graphic_curtain_x'),
          $productCurtainY = $section.find('.col-graphic_curtain_y'),
          $contentCurtainX = $section.find('.col-content_curtain_x'),
          $contentCurtainY = $section.find('.col-content_curtain_y'),
          $productBg = $section.find('.col-graphic_src')

    const $contentChildren = [
      $content.find('.col_title'),
      $content.find('.col_description'),
      $content.find('.strt_buttons')
    ]

    const isRight = ($container.hasClass('graphic-position-right'))

    const animation = new TimelineMax()

    // scene 1 : content shows
    animation
      .add(TweenMax.fromTo(
        $content, .25, {
          y: 200,
        },{
          y: 0,
          ease: Power3.easeOut
        }
      ),0)
      .add(TweenMax.staggerFromTo(
        $contentChildren, .25, {
          y: 50,
          opacity: 0,
        },{
          y: 0,
          opacity: 1,
          ease: Power3.easeOut
        },.1
      ),.1)

    // scene 2 : content moves to original position
    animation
      .add(TweenMax.fromTo(
        $content, 1, {
          xPercent: isRight ? 70 : -70,
        },{
          xPercent: 0,
          ease: Power3.easeOut
        }
      ),.5)

    // scene 3: product image shows up
    animation
      .add(TweenMax.fromTo(
        $productGrfx, .5, {
          yPercent: 100,
        },{
          yPercent: 0,
          ease: Power3.easeOut
        }
      ), .55)

    // scene 4: curtain opens
    // and product background moves
    animation
      .add(TweenMax.fromTo(
        $productCurtainX, 1, {
          scaleX: 1,
        },{
          scaleX: 0,
          ease: Power3.easeOut
        }
      ), .6)
      .add(TweenMax.fromTo(
        $productBg, .5, {
          xPercent: isRight ? 10 : -10,
        },{
          xPercent: 0, 
          ease: Power3.easeOut
        }
      ), .6)

    //scene 5: content hides
    // animation
    //   .add(TweenMax.fromTo(
    //     $contentCurtainX, 1, {
    //       scaleX: 0,
    //     },{
    //       scaleX: 1,
    //       ease: Power3.easeOut
    //     }
    //   ), 1.5)

    //scene 6: product hides
    // animation
    //   .add(TweenMax.fromTo(
    //     $productCurtainY, 1, {
    //       scaleY: 0,
    //     },{
    //       scaleY: 1,
    //       ease: Power3.easeOut
    //     }
    //   ), 1.56)




    const pinScene = new ScrollMagic.Scene({
      triggerElement: $section[0] ,
      duration: `${sectionDuration}%` ,
      triggerHook: 0.8,
      tweenChanges: true
    })
    .setTween(animation)
    // .addIndicators({name: "entrance animation"})
    .addTo(controller)

  }

  function detectScreen() {
    $(window).resize(function() {

      if ($(window).width() <= mobileScreenSize) {
        $html.addClass('page-sm-strutTwoColSection-destroyed')
        controller.destroy(true)
        controller = null
      } else {
        if ($html.hasClass('page-sm-strutTwoColSection-destroyed')) {
          $html.removeClass('page-sm-strutTwoColSection-destroyed')
          initialize()
        }
      }
    })
  }

  function initialize() {
    const sectionDuration = 150
    controller = new ScrollMagic.Controller()

    if ($(window).width() > mobileScreenSize) {
      $('.strt_home2ColGrid').each(function() {
        const $section = $(this)
        // initialize pinning of background section
        pinPinnedSection(controller, $section, sectionDuration)
        entranceAnimation(controller, $section, sectionDuration)
      })
    } else {
      $html.addClass('page-sm-strutTwoColSection-destroyed')
    }
    detectScreen()
  }

  initialize()
}