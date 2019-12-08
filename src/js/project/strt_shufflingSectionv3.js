// STEPS
// 1. pin
// 2. init carousel
// 3. dots to move carousel


function strutShufflingSectionsv3() {

  const $html = $('html')
  const mobileScreenSize = 900
  let controller = null
  let $globaSlider = null



  function setUpDecoy($section, duration) {
    const $decoys = $section.find('.shflv3_decoy')

     $decoys
      .children()
      .each(function() {
        $(this).css({ 'height': `${duration}vh`})
      })
  }

  function pinContainer($section, duration, count) {
    const $container = $section.find('.shflv3_pinContainer')
    const pinScene = new ScrollMagic.Scene({
      triggerElement: $section[0] ,
      duration: `${(duration * count)}%`,
      triggerHook: 0,
      tweenChanges: true
    })
      .setPin($container[0])
      // .addIndicators({name: "pin container"})
      .addTo(controller)
  }

  function owlCarousel($section) {
    $globaSlider = $section.find('.shflv3_owl')
    const slide_options = {
        items: 1,
        loop: false ,
        nav: false ,
        dots: false ,
        autoplay : false , // testing
        animateIn: 'fadeInUp' ,
        animateOut: 'fadeOut' ,
        touchDrag: false,
        mouseDrag: false,
        pullDrag: false,
        freeDrag: false,
        autoplayHoverPause: true
    } 

    $globaSlider.owlCarousel({
      ...slide_options ,
      onChanged: function(e) {

        console.log('onchanged ==== ', e)
        const { index } = e.item
        const $activeOwlItem = $globaSlider.find(".owl-item").eq(index)
        const $activeSlide = $activeOwlItem.find('.shflv3_owlSlide')
        const activeKey = $activeSlide.data('sectionkey')

        // animation elements
        const $graphic = $activeSlide.find('.graphic')
        const $sectionContent = $activeSlide.find('.content')


        let animation = new TimelineMax({ delay: .5 })

        animation
          .add(TweenMax.fromTo(
            $graphic, .25, {
              x: -100,
              opacity: 0
            },{
              x: 0,
              opacity: 1,
              ease: Power3.easeOut
            }
          ), 0.5)
          .add(TweenMax.staggerFromTo(
            $sectionContent, .5, {
              y: 50,
            },{
              y: 0,
              ease: Power3.easeOut
            }, .15
          ), 0.13)
          .add(TweenMax.staggerFromTo(
            $sectionContent.children(), .5, {
              y: 50,
              opacity: 0
            },{
              y: 0,
              opacity: 1,
              ease: Power3.easeOut
            }, .15
          ), 0.15)
          .add(TweenMax.staggerFromTo(
            $sectionContent.find('.content_desc').children(), .5, {
              y: 50,
              opacity: 0
            },{
              y: 0,
              opacity: 1,
              ease: Power3.easeOut
            }, .15
          ), 0.25)
      }
    })
  }

  function triggerOwl($section, duration) {
    const $dots = $section.find('.shflv3_dots')
    const $decoys = $section.find('.shflv3_decoy').children()
    let activeKey = -1

    $decoys.each(function() {
      const $decoy = $(this) 
      const decoySectionKey = parseInt($decoy.data('sectionkey')) - 1
      const pinScene = new ScrollMagic.Scene({
        triggerElement: $decoy[0] ,
        duration: `${duration - 1}%`,
        triggerHook: 0,
        tweenChanges: true
      })
        .on("enter", (e) => {
          $globaSlider.trigger('to.owl.carousel',[decoySectionKey,1000])
          // find last active dot and remvoe
          $dots.find(`.dot.active`).removeClass('active')
          // declare new active dot
          $dots.find(`.dot[data-sectionkey^=${decoySectionKey + 1}]`).addClass('active')

          // console.log('pinContainer === ',e.type , $decoy)
          // if (activeKey !== decoySectionKey) {
          //   activeKey = decoySectionKey
          // }
        })
        // .addIndicators({name: "trigger decoy animation"})
        .addTo(controller)
    })
  }

  function triggerDots($section) {
    const $dots = $section.find('.shflv3_dots')
    const $decoys = $section.find('.shflv3_decoy')



    $dots.children().each(function() {
      const $dot = $(this)
      const dataKey = $dot.data('sectionkey') 

      const activeQry = `.shflv3_decoy_item[data-sectionkey^='${dataKey}']`
      const $activeDecoy = $decoys.find(activeQry)

      $dot.click(function() {
        console.log('atay', $activeDecoy)
        scrollToElement($activeDecoy,500,20)
      })
    })

  }

  function detectScreen() {
    $(window).resize(function() {

      if ($(window).width() <= mobileScreenSize) {
        $html.addClass('page-sm-strutShufflingSectionsv3-destroyed')
        $globaSlider.trigger('destroy.owl.carousel')
        controller.destroy(true)
        controller = null
      } else {
        if ($html.hasClass('page-sm-strutShufflingSectionsv3-destroyed')) {
          $html.removeClass('page-sm-strutShufflingSectionsv3-destroyed')
          initialize()
        }
      }
    })
  }


  function initialize() {
    controller = new ScrollMagic.Controller()
    if ($(window).width() > mobileScreenSize) {
      $('.shflv3').each(function(){
        const $section = $(this)
        const count = $section.data('section-count')
        const duration = 75

        console.log('shflv3', $section)

        setUpDecoy($section, duration)
        pinContainer($section, duration, count)
        owlCarousel($section)
        triggerOwl($section, duration)
        triggerDots($section)

      })
    } else {
      $html.addClass('page-sm-strutShufflingSectionsv3-destroyed')
    }
    detectScreen()
  }


   initialize()
}