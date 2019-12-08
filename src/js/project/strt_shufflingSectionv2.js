

function strutShufflingSectionsv2() {

  const $html = $('html')
  const mobileScreenSize = 900
  let controller = null

  function pinPinnedSection( $section,sectionDuration) {
    const $sectionPin = $section.find('.shflv2_pinned') ,
          $sectionPinContainer = $section.find('.shflv2_pinned_container')

    const count = $section.data('section-count')
    const duration = ((sectionDuration + (sectionDuration * .7)) * count) + '%'

    // console.log('duration', duration)

    const pinScene = new ScrollMagic.Scene({
      triggerElement: $sectionPin[0] ,
      duration ,
      triggerHook: 0,
      tweenChanges: true
    })
    .setPin($sectionPinContainer[0])
    // .addIndicators({name: "pin section"})
    .addTo(controller)
  }

  function sectionPin( $parentSection, $sections, sectionDuration) {
    $sections.each(function() {
      const $fakeSection = $(this) ,
            $sectionDots = $parentSection.find('.shflv2_dots'),
            $sectionGraphics = $parentSection.find('.shflv2_graphic'),
            $sectionPin = $fakeSection.find('.shflv2_section_container'),
            key = $fakeSection.data('sectionkey')

      const $activeDot = $sectionDots.find(`.dot[data-sectionkey="${key}"]`)
      const $activeGraphic = $sectionGraphics.find(`.shflv2_graphic_item[data-sectionkey="${key}"]`)

      const pinScene = new ScrollMagic.Scene({
        triggerElement: $fakeSection[0] ,
        duration: `${sectionDuration}%`,
        triggerHook: 0,
        tweenChanges: true
      })
      .setPin($sectionPin[0])
      // .addIndicators({name: "pin section"})
      .on("progress", (e) => {
        // find dot last active and remove
        $sectionDots.find('.active').removeClass('active')
        // add active to new
        $activeDot.addClass('active')
      })
      .addTo(controller)
    })
  }

  function sectionAnimation( $parentSection, $sections, sectionDuration) {
    $sections.each(function() {

      const animation = new TimelineMax()

      const $fakeSection = $(this) ,
            $content = $fakeSection.find('.shflv2_section_content .content'),
            $graphicCurtainX = $fakeSection.find('.graphic_curtain_x'),
            $graphicCurtainY = $fakeSection.find('.graphic_curtain_y'),
            $contentCurtainX = $fakeSection.find('.content_curtain_x'),
            $contentCurtainY = $fakeSection.find('.content_curtain_y'),
            $bgAccent = $fakeSection.find('.shflv2_section_bgAccent .title'),
            $graphicAccent = $fakeSection.find('.shflv2_section_graphicAccent .title'),
            $graphicImg = $fakeSection.find('.graphic_img')

      const $contentChildren = [
        $content.find('.content_header'),
        $content.find('.content_desc'),
        $content.find('.content_actions')
      ]

      // scene 1 : content shows
      animation
        // .add(TweenMax.fromTo(
        //   $content, .25, {
        //     y: 200,
        //   },{
        //     y: 0,
        //     ease: Power3.easeOut
        //   }
        // ),0)
        .add(TweenMax.fromTo(
          $contentCurtainY, 1, {
            scaleY: 1,
          },{
            scaleY: 0,
            ease: Power3.easeOut
          }
        ),.1)
        .add(TweenMax.staggerFromTo(
          $contentChildren, .25, {
            y: 50,
            opacity: 0,
          },{
            y: 0,
            opacity: 1,
            ease: Power3.easeOut
          },.15
        ),.15)

      // scene 2 : content moves to original position
      animation
        .add(TweenMax.fromTo(
          $content, 1, {
            xPercent: 50,
          },{
            xPercent: 0,
            ease: Power3.easeOut
          }
        ),.2)

      // scene 2.5 : accent moves up
      animation
        .add(TweenMax.fromTo(
          $bgAccent, 1, {
            xPercent: -20,
            opacity: 1
          },{
            xPercent: 0,
            opacity: 0,
            ease: Power3.easeOut
          }
        ),.2)

      // scene 3 : graphic curtain opens
      // and graphic shows
      animation
        .add(TweenMax.fromTo(
          $graphicCurtainX, 1, {
            scaleX: 1,
          },{
            scaleX: 0,
            ease: Power3.easeOut
          }
        ), 0.3)
        .add(TweenMax.fromTo(
          $graphicImg, .5, {
            xPercent: 10,
            opacity: 0
          },{
            xPercent: 0,
            opacity: 1,
            ease: Power3.easeOut
          }
        ), 0.4)
        .add(TweenMax.fromTo(
          $graphicAccent, .5, {
            xPercent: -20,
            opacity: 0
          },{
            xPercent: 0,
            opacity: 1,
            ease: Power3.easeOut
          }
        ), 0.4)



      const animationScene = new ScrollMagic.Scene({
        triggerElement:  $fakeSection[0] ,
        duration: `${sectionDuration + (sectionDuration * .6) }%` ,
        triggerHook: 0.9,
        tweenChanges: true
      })
      .setTween(animation)
      // .addIndicators({name: "entrance animation"})
      .addTo(controller)

    })
  }

  function detectScreen() {
    $(window).resize(function() {

      if ($(window).width() <= mobileScreenSize) {
        $html.addClass('page-sm-strutShufflingSectionsv2-destroyed')
        controller.destroy(true)
        controller = null
      } else {
        if ($html.hasClass('page-sm-strutShufflingSectionsv2-destroyed')) {
          $html.removeClass('page-sm-strutShufflingSectionsv2-destroyed')
          initialize()
        }
      }
    })
  }

  function initialize() {
    const sectionDuration = 100
    controller = new ScrollMagic.Controller()

    if ($(window).width() > mobileScreenSize) {
      $('.shflv2').each(function() {
        const $section = $(this) ,
              $fakeSections = $section.find('.shflv2_section')

        // initialize pinning of background section
        pinPinnedSection($section, sectionDuration)

        // section pin
        sectionPin($section, $fakeSections, sectionDuration)

        // section animation
        sectionAnimation($section, $fakeSections, sectionDuration)
      })
    } else {
      $html.addClass('page-sm-strutShufflingSectionsv2-destroyed')
    }
    detectScreen()
  }

  initialize() 
}