function strutShufflingSections() {
  const $html = $('html')
  const mobileScreenSize = 900
  let controller = null

  function pinPinnedSection( $section, sectionDuration) {
    const $sectionPin = $section.find('.shfl_pinned') ,
          $sectionPinContainer = $section.find('.shfl_pinned_container')

    const count = $section.data('section-count')
    const duration = ((sectionDuration) * count) + '%'

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

  function entranceSectionAnimation( $section ) {
    const $sectionBg = $section.find('.shfl_background'),
          $sectionBg_title = $section.find('.shfl_background_title'),
          $sectionBg_accent = $section.find('.shfl_background_accent'),
          $sectionBg_graphic = $section.find('.shfl_graphic')

    const animation = new TimelineMax()
    animation
      .add(TweenMax.fromTo(
        $sectionBg_accent, .5, {
          scaleX: 0,
        },{
          scaleX: 1,
          ease: Power3.easeOut
        }
      ), 0)
      .add(TweenMax.fromTo(
        $sectionBg_title, .5, {
          yPercent: -20,
          opacity: 0,
        },{
          yPercent: 0,
          opacity: 1,
          ease: Power3.easeOut
        }
      ), 0.25)
      .add(TweenMax.fromTo(
        $sectionBg_graphic, .5, {
          xPercent: -20,
          opacity: 0,
        },{
          xPercent: 0,
          opacity: 1,
          ease: Power3.easeOut
        }
      ), 0.5)

    const entranceScene = new ScrollMagic.Scene({
      triggerElement: $section[0] ,
      duration: '40%',
      triggerHook: 0.8,
      tweenChanges: true
    })
    .setTween(animation)
    // .addIndicators({name: "entrance section"})
    .addTo(controller)
  }

  function sectionAnimations( $parentSection , $sections, sectionDuration) {
    $sections.each(function(index) {
      const $fakeSection = $(this) ,
            $fakeSectionContainer = $fakeSection.find('.shfl_section_container'),
            $shopifySection = $parentSection.closest('.shopify-section'),
            $sectionDots = $parentSection.find('.shfl_dots'),
            key = $fakeSection.data('sectionkey'),
            total = $sections.length

      const $graphic = $fakeSection.find('.graphic_container')
      const $graphicSrc = $graphic.find('.graphic_src')

      const $fakeSectionContent = $fakeSection.find('.shfl_section_content')
      const $activeDot = $sectionDots.find(`.dot[data-sectionkey="${key}"]`)

      const isLastKey = (index === $sections.length - 1)

      // pin and move to next section movement
      const entrancePin = new ScrollMagic.Scene({
        triggerElement: $fakeSection[0] ,
        duration: `${sectionDuration}%`,
        triggerHook: 0,
        tweenChanges: true
      })
      .setPin($fakeSectionContainer[0])
      // .addIndicators({name: "pin section"})
      .addTo(controller)


      // FOR DOTS
      const triggerDotsSection = new ScrollMagic.Scene({
        triggerElement: $fakeSection[0] ,
        duration: `${sectionDuration}%`,
        triggerHook: 0.1,
        tweenChanges: true
      })
      .on("progress", (e) => {
        // find dot last active and remove
        $sectionDots.find('.active').removeClass('active')
        // add active to new
        $activeDot.addClass('active')
      })
      // .addIndicators({name: "trigger Dots Section"})
      .addTo(controller)


      // FOR ACTIVE SECTIONS
      let animation = new TimelineMax()

      // ENTRANCE
      animation
        .add(TweenMax.staggerFromTo(
          $fakeSectionContent.children(), .5, {
            y: 50,
            opacity: 0
          },{
            y: 0,
            opacity: 1,
            ease: Power3.easeOut
          }, .15
        ))
        .add(TweenMax.staggerFromTo(
          $fakeSectionContent.find('.content_desc').children(), .5, {
            y: 50,
            opacity: 0
          },{
            y: 0,
            opacity: 1,
            ease: Power3.easeOut
          }, .15
        ),.15)
        .add(TweenMax.fromTo(
          $graphic, 1, {
            xPercent: 50,
            opacity: 0
          },{
            xPercent: 0,
            opacity: 1,
            ease: Power3.easeOut
          }
        ),.35)

      if (!isLastKey) {
        // EXIT
        animation
          .add(TweenMax.fromTo(
            $fakeSectionContent, 1, {
              yPercent: 0,
              opacity: 1,
            },{
              yPercent: -50,
              opacity: 0,
              ease: Power3.easeOut
            }
          ), 1)
          .add(TweenMax.fromTo(
            $graphicSrc, 1, {
              xPercent: 0,
              opacity: 1,
            },{
              xPercent: -50,
              opacity: 0,
              ease: Power3.easeOut
            }
          ), 1.15)

      }

      const triggerContentAnimation = new ScrollMagic.Scene({
        triggerElement: $fakeSection[0] ,
        duration: '200%',
        triggerHook: 0.5,
        tweenChanges: true
      })
      .setTween(animation)
      // .addIndicators({name: "section animation"})
      .addTo(controller)
    })
  }

  function detectScreen() {

    $(window).resize(function() {

      if ($(window).width() <= mobileScreenSize) {
        $html.addClass('page-sm-strutShufflingSections-destroyed')
        controller.destroy(true)
        controller = null
      } else {
        if ($html.hasClass('page-sm-strutShufflingSections-destroyed')) {
          $html.removeClass('page-sm-strutShufflingSections-destroyed')
          initialize()
        }
      }
    })
  }

  function initialize() {
    const sectionDuration = 100
    controller = new ScrollMagic.Controller()

    if ($(window).width() > mobileScreenSize) {
      $('.shfl').each(function(i) {
        const $section = $(this) ,
              $fakeSections = $section.find('.shfl_section')


        // initialize pinning of background section
        pinPinnedSection( $section, sectionDuration)

        // entrance
        entranceSectionAnimation( $section)

        // section animations
        sectionAnimations( $section, $fakeSections, sectionDuration)
      })
    } else {
      $html.addClass('page-sm-strutShufflingSections-destroyed')
    }

    detectScreen()
  }

  initialize()
}



