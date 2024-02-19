$(function() {

    let header = $("#header");
    let introH = $("#intro").innerHeight();
    let scrollOffset = $(window).scrollTop();
    checkScroll(scrollOffset);

    /* Fixed Header */
    $(window).on("scroll", function () { 
        scrollOffset = $(this).scrollTop();    
        checkScroll(scrollOffset);
    });

    function checkScroll(scrollOffset) {
        if(scrollOffset >= introH) {
            header.addClass("fixed");
        } else {
            header.removeClass("fixed");
        }
    }

    /* Fixed Header */
    $("[data-scroll]").on("click", function (event) {
        event.preventDefault();   //если используется ссылка

        let $this = $(this);
        let blockId = $this.data('scroll');
        let blockOffset = $(blockId).offset().top;

        $("#nav a").removeClass("active");
        $this.addClass("active");

        $("html, body").animate({
            scrollTop: blockOffset
        }, 500);
    });

    /* Menu nav toggle */
    $("#nav-toggle").on("click", function(event) {
        event.preventDefault();   //если используется ссылка

        $(this).toggleClass("active");
        $("#nav").toggleClass("active");

    });

    //$("#nav-link").on("click", function(event) {
        //event.preventDefault();
        //$("#nav").removeClass("active");
    //});

    /* Collapse Accordion */
    $("[data-collapse]").on("click", function(event) {
        event.preventDefault();

        let $this = $(this);
        let blockId = $this.data('collapse');

        //$(this).toggleClass("active");
        $(blockId).slideToggle();
    });

    /* Slider */
    $("[data-slider]").slick({
        infinity: true,
        fade: false,
        slidesToShow: 1,
        slidesToScroll: 1
    });

});