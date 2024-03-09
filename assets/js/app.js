$(function() {

    /* Nav Toggle on mobile
    ==========================================*/

    let navToggle = $('#navToggle');
    let nav = $('#nav');

    navToggle.on('click', function (event) {
        event.preventDefault();
        $(this).toggleClass('active');
        nav.toggleClass('show');
    });

    $(window).on("resize", function() {
        navToggle.removeClass('active');
        nav.removeClass('show');
    });


    let intro = $("#intro");
    let introH = intro.innerHeight();
    let header = $("#header");
    let headerH = header.innerHeight();
    let scrollTop = $(window).scrollTop();


    /* Header class on scroll 
    ==========================================*/

    headerScroll();

    $(window).on("scroll resize", function() {
        headerScroll();
    });


    function headerScroll() {
        introH = intro.innerHeight();
        headerH = header.innerHeight();
        scrollTop = $(this).scrollTop();
        
        if (scrollTop >= (introH - headerH)) {
            header.addClass("header--dark");
        }
        else {
            header.removeClass("header--dark");
        }
    }


    /* Smooth Scroll to section 
    ==========================================*/

    $("[data-scroll]").on("click", function(event) {
        event.preventDefault();

        let scrollEl = $(this).data("scroll");
        let scrollElPos = $(scrollEl).offset().top;

        navToggle.removeClass('active');
        nav.removeClass('show');

        $("html, body").animate({
            scrollTop: scrollElPos - headerH 
        }, 500)

    });


    /* ScrollSpy 
    ==========================================*/

    let windowH = $(window).height();
    ScrollSpy(scrollTop);

    $(window).on("scroll", function() {

    scrollTop = $(this).scrollTop();
    ScrollSpy(scrollTop);

    });

    function ScrollSpy(scrollTop) {

        $("[data-scrollspy]").each(function() {

            let $this = $(this);
            let sectionId = $(this).data('scrollspy');
            let sectionOffset = $this.offset().top;
            sectionOffset = sectionOffset - (windowH * 0.33333);
    
            if(scrollTop >= sectionOffset) {
                $('#nav [data-scroll]').removeClass('active');
                $('#nav [data-scroll = "' + sectionId + '"]').addClass('active');
            }
    
            if(scrollTop == 0) {
                $('#nav [data-scroll]').removeClass('active');
            }

        });

    }


    /* Slick Slider https://kenwheeler.github.io/slick/ 
    =================================================*/

    let introSlider = $("#introSlider");

    introSlider.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 2500
    });

    $("#introSliderPrev").on('click', function () {
        introSlider.slick('slickPrev');
    });
    $("#introSliderNext").on('click', function () {
        introSlider.slick('slickNext');
    });



    /* Aos.js  https://github.com/michalsnik/aos/
    ===========================================*/

    AOS.init({
        // Global settings:
        disable: 'mobile', // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
        startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
        initClassName: 'aos-init', // class applied after initialization
        animatedClassName: 'aos-animate', // class applied on animation
        useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
        disableMutationObserver: false, // disables automatic mutations' detections (advanced)
        debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
        throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
        
        // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
        offset: 120, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 400, // values from 0 to 3000, with step 50ms
        easing: 'ease', // default easing for AOS animations
        once: false, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
    });




});

