function initNav() {

  function adjustMainWithNavHeight() {
    const $nav = $('.tgs_nav')
    const navHeight = $nav.innerHeight()
    const $main = $('main.main-content')

    console.log('[>> adjustMainWithNavHeight][navHeight] ==== ' , navHeight )
    $main.css({ marginTop: navHeight + 'px' })

  }

  function navScroll() {
    const controller = new ScrollMagic.Controller(),
          $header = $('#shopify-section-svn-header')

    const snapnav_scene = new ScrollMagic.Scene({
      triggerElement: "#snapNavigation",
      triggerHook: 0,
      duration: 0
    })
    .addTo(controller)
    .on("enter leave", function(e){
      if( e.type == "enter" ) {
        $header.addClass('show')
      } else {
        $header.removeClass('show')
      }
    })
  }

  function showMobileMenuItems(isOpenNav) {

    // const timelineOptions = {
    //   onComplete:function() {
    //       this.restart();
    //   }
    // }

    const timelineOptions = {}

    const animation = new TimelineLite(timelineOptions)

    const $nav = $('.d_mobilenav') ,
          $navContainer = $('.d_mobilenav_container') ,
          $navList = $nav.find('.menubarlist') ,
          $navListItems = $nav.find('.menubarlist_item ')


    if (isOpenNav) {
      animation
        .add(TweenMax.fromTo(
          $nav, 1, {
            height: '0vh',
          },{
            height: '100vh',
            ease: Power3.easeOut
          }
        ),0)
        .add(TweenMax.fromTo(
          $navList, 1, {
            y: -100,
          },{
            y: 0,
            ease: Power3.easeOut
          }
        ),0.15)
        .add(TweenMax.staggerFromTo(
          $navListItems, .5, {
            y: -20,
            opacity: 0
          },{
            y: 0,
            opacity: 1,
            ease: Power3.easeOut
          },.15
        ),0.25)
    } else {
      animation
        .add(TweenMax.staggerFromTo(
          $navListItems, .5, {
            y: 0,
            opacity: 1
          },{
            y: -20,
            opacity: 0,
            ease: Power3.easeOut
          },.15
        ))
        .add(TweenMax.fromTo(
          $nav, .5, {
            height: '100vh',
          },{
            height: '0vh',
            ease: Power3.easeOut
          }
        ))
    }
  }

  function toggleMobileNav() {
    const $button = $('#menuburger-toggle')
    const $html = $('html')

    // showMobileMenuItems(true)

    $button.click(function() {
      $(this).toggleClass('active')
      $html.toggleClass('show-mobile-nav')

      showMobileMenuItems($html.hasClass('show-mobile-nav'))
    })
  }

  adjustMainWithNavHeight()
  navScroll()
  toggleMobileNav()
}