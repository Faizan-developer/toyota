(function (window, document, $, undefined) {
    var app = {
            windowHeight: $(window).height(),
            windowWidth: $(window).width(),
            isMobile: false,
            isTouch: false,
            isTablet: false,
            resizeTimeoutID: null,
            $body: $("body"),
            $html: $("html"),
            culture: "en",
            environmentLocal: $("body").hasClass("tt-local-environment"),
            isEditorMode: $("body").hasClass("on-page-editor"),
            isIe: false,
            listSwiper: null,
            detectDevice: function () {
                (function (a) {
                    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
                        app.isMobile = true;
                    }
                })(navigator.userAgent || navigator.vendor || window.opera);
                if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
                    app.isTouch = true;
                    app.$body.addClass("touch");
                } else {
                    app.$body.addClass("no-touch");
                }
                app.isTablet = (!app.isMobile && app.isTouch);


                if (app.isMobile) {
                    var ua = navigator.userAgent.toLowerCase();
                    var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
                    if (isAndroid) {
                        $('body').addClass('is-android');
                    }
                }


            },
            detectCulture: function () {
                if (window.location.href.match("-ar") != null || (window.location.href.match("/ar") != null) && $(".sflangSelected a").text().trim() === "ar") {
                    app.culture = "ar"
                }
            },
            _windowResize: function () {
                app.windowHeight = $(window).height();
                app.windowWidth = $(window).width();
            },
            adaptiveImages: function (context) {

                $('[data-mobile-src]').each(function () {
                    var $img = $(this);
                    var dataMobileSrc = $img.attr('data-mobile-src');
                    var dataDesktopSrc = $img.attr('data-desktop-src');
                    if ($img.is("img") === true) {
                        if (app.windowWidth <= 767) {
                            $img.attr('src', dataMobileSrc);
                        }
                        else {
                            $img.attr('src', dataDesktopSrc);
                        }
                    }
                    else {
                        if (app.windowWidth <= 767) {
                            $img.css('background-image', 'url(' + dataMobileSrc + ')');
                            //console.log($img.attr('data-mobile-src'));
                        }
                        else {
                            $img.css('background-image', 'url(' + dataDesktopSrc + ')');

                        }
                    }


                });

                return context;
            },
            resizeListner: function () {
                if (!app.isTouch) {
                    $(window).resize(function () {
                        clearTimeout(app.resizeTimeoutID);
                        app.resizeTimeoutID = setTimeout(app._windowResize, 500);
                    });
                } else {
                    window.addEventListener('orientationchange', function () {
                        app._windowResize();
                    });
                }
            },
            addEventListner: function () {
            },
            setCssOfElements: function () {

                if ($('.tt-forms').length && app.isMobile) {
                    $('footer').hide();
                }

                if (app.windowWidth <= 767) {
                    $('.tt-forms .swiper-container').height(app.windowHeight - 174)
                }

            },
            msIeVersion: function () {
                var ua = window.navigator.userAgent,
                    msie = ua.indexOf("MSIE");
                if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
                    $("body").addClass("ie");
                    app.isIe = true;
                }
                return false;
            },
            _getQueryStringParams: function (sParam) {
                var sPageURL = window.location.search.substring(1);
                var sURLVariables = sPageURL.split('&');
                for (var i = 0; i < sURLVariables.length; i++) {
                    var sParameterName = sURLVariables[i].split('=');
                    if (sParameterName[0] == sParam) {
                        return decodeURI(sParameterName[1]);
                    }
                }
            },
            _splitRows: function (elem, elemCounter) {
                var item = $(elem),
                    counter = 0,
                    length = item.length / elemCounter,
                    rowHtml = "<div class='row'></div>";
                for (var i = 0; i < length; i++) {
                    item.slice(counter, counter + elemCounter).wrapAll(rowHtml);
                    counter += elemCounter;
                }
            },
            customUl: function () {
                $(".custom-list-dropdown ul").on("click", ".init", function () {
                    $(this).closest(".custom-list-dropdown ul").children('li:not(.init)').toggle();
                });

                var allOptions = $(".custom-list-dropdown ul").children('li:not(.init)');
                $(".custom-list-dropdown ul").on("click", "li:not(.init)", function () {
                    allOptions.removeClass('selected');
                    $(this).addClass('selected');
                    $(".custom-list-dropdown ul").children('.init').html($(this).html());
                    allOptions.toggle();
                });
                $("html").click(function () {
                    $(".custom-list-dropdown ul li:not(.init)").hide();
                });
                $(".custom-list-dropdown ul").click(function (e) {
                    e.stopPropagation();
                })
            },
            regionDropdown: function () {
                $("header .middle-section .region").click(function () {
                    $(this).toggleClass("active");
                    $("header .middle-section .region-dropdown").toggle();
                });
                $("html").click(function () {
                    $("header .middle-section .region").removeClass("active");
                    $("header .middle-section .region-dropdown").hide();
                });
                $("header .middle-section .region, header .middle-section .region-dropdown").click(function (e) {
                    e.stopPropagation();
                })
            },
            modelsCarousel: function () {

                if (!$('.tt-latest-models-box').length)
                    return false;

                var swiper = new Swiper('.tt-latest-models-box .swiper-carousel.swiper-container', {
                    slidesToScroll: 1,
                    slidesPerView: 'auto',
                    centeredSlides: true,
                    dots: true,
                    loop: true,
                    centerMode: true,
                    focusOnSelect: true,
                    spaceBetween: 230,
                    init: false,

                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    breakpoints: {
                        1024: {
                            spaceBetween: 150
                        },
                        991: {
                            spaceBetween: 25
                        }
                    }
                });

                swiper.on('init', function () {
                    $(window).on("load", function () {
                        $('.tt-latest-models-box .swiper-button-next,.tt-latest-models-box .swiper-button-prev')
                            .css({
                                'top': $('.tt-latest-models-box .swiper-slide-active .banner-behind img').height() / 2,
                                'opacity': 1
                            });
                    });

                });
                swiper.init();

            },
            bannerSlider: function () {
                var banner = $(".tt-banner-t1");

                if (banner.length >= 1) {
                    var progress = '<span class="tt-progressing"></span>';


                    var properties = $('.tt-banner-t1').data('properties');
                    var validProperties = typeof properties !== 'undefined';
                    //debugger;

                    var progressSelector = $(".tt-banner-t1 .swiper-button-next .tt-progress-bar");
                    var swiper = new Swiper('.swiper-banner.swiper-container', {
                        loop: false,
                        init: false,
                        autoplay: {
                            disableOnInteraction: true,
                            waitForTransition: true,
                            delay: validProperties ? properties.autoplayTime : 4000,
                        },
                        autoHeight: true,
                        setWrapperSize: false,
                        slidesPerView: 'auto',
                        watchSlidesVisibility: true,
                        watchSlidesProgress: true,
                        preventClicks: false,
                        noSwipingClass: 'swiper-no-swiping',
                        lazyLoadingInPrevNext: true,
                        preloadImages: true,
                        stopOnLastSlide: false,
                        lazyLoading: true,
                        observer: true,
                        autoplayDisableOnInteraction: false,
                        observeParents: true,

                        pagination: {
                            el: '.swiper-pagination',
                            type: 'fraction'
                        },

                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev'
                        },
                        breakpoints: {
                            991: {
                                //autoplay: false,

                                pagination: {
                                    type: 'bullets'
                                }

                            }
                        },

                    });

                    swiper.on('init slideChange', function () {

                        var hasVideoElemet = $(swiper.slides[this.activeIndex]).find(".spotlight").hasClass("caption-video");
                        var videoItem = $(swiper.slides[this.activeIndex]).find('.video-js').get(0);


                        $('.video-js').each(function () {
                            videojs(this.id).ready(function () {
                                player = this;
                                player.pause();
                            });
                        });


                        if (hasVideoElemet && $(window).width() > 767) {

                            var video = videojs(videoItem).ready(function () {
                                var player = this;
                                swiper.autoplay.stop();
                                if (player.paused && swiper.slides[this.realIndex = 1]) {
                                    player.play();
                                    swiper.autoplay.stop();
                                    //console.log("puased now playing")
                                }
                                player.on('ended', function () {
                                    player.pause();
                                    swiper.slideNext();
                                    swiper.autoplay.start();
                                    //console.log("video ended");
                                });
                            });

                        } else {


                            swiper.autoplay.start();
                            $('.video-js').each(function () {
                                videojs(this.id).ready(function () {
                                    player = this;
                                    player.pause();
                                });

                            });


                        }

                    });
                    swiper.init();


                    function throttle(fn, threshhold, scope) {
                        threshhold || (threshhold = 250);
                        var last,
                            deferTimer;
                        return function () {
                            var context = scope || this;

                            var now = +new Date,
                                args = arguments;
                            if (last && now < last + threshhold) {
                                // hold on to it
                                clearTimeout(deferTimer);
                                deferTimer = setTimeout(function () {
                                    last = now;
                                    fn.apply(context, args);
                                }, threshhold);
                            } else {
                                last = now;
                                fn.apply(context, args);
                            }
                        };
                    }


                    function videoStopScroll() {
                        var validHeight = $(".tt-carousel.tt-banner-t1")[0].getBoundingClientRect().bottom - $('header .sticky').outerHeight();
                        if (validHeight < 0) {
                            //console.log("stop video");

                            app.stopAllVideoJS();

                        } else {

                            swiper.autoplay.start();
                            //console.log("resume");
                        }
                    }

                    $(window).scroll(throttle(videoStopScroll, 100));
                }
            },

            /*            bannerSlider: function () {
             var banner = $(".tt-banner-t1");
             if (banner.length <= 1) {
             var progress = '<span class="tt-progressing"></span>';

             var properties = $('.tt-banner-t1').data('properties');
             var progressSelector = $(".tt-banner-t1 .swiper-button-next .tt-progress-bar");
             var swiper = new Swiper('.swiper-banner.swiper-container', {
             loop: true,
             init: false,
             autoplay: {
             disableOnInteraction: true,
             waitForTransition: true,
             delay: properties.autoplayTime ? properties.autoplayTime : 4000,
             },
             // autoplay:false,
             autoHeight: true,
             setWrapperSize: false,
             slidesPerView: 'auto',
             watchSlidesVisibility: true,
             watchSlidesProgress: true,
             preventClicks: false,
             noSwipingClass: 'swiper-no-swiping',
             lazyLoadingInPrevNext: true,
             preloadImages: true,
             // stopOnLastSlide: false,
             lazyLoading: true,
             observer: false,
             preventInteractionOnTransition:true,
             autoplayDisableOnInteraction: true,
             observeParents: true,

             pagination: {
             el: '.swiper-pagination',
             type: 'fraction'
             },

             navigation: {
             nextEl: '.swiper-button-next',
             prevEl: '.swiper-button-prev'
             },
             breakpoints: {
             991: {
             //autoplay: false,

             pagination: {
             type: 'bullets'
             }

             }
             },

             });



             swiper.on('slideChangeTransitionStart', function () {

             $('.tt-banner-t1 .video-js').each(function () {
             videojs(this.id).ready(function () {
             var player = this;
             player.pause();
             });
             });

             });


             swiper.on('slideChangeTransitionEnd', function () {


             // console.log('slide: ', $('.tt-banner-t1 .swiper-slide-active'));

             var hasVideoElemet = $('.tt-banner-t1 .swiper-slide-active').find(".spotlight").hasClass("caption-video");
             var videoItem = $('.tt-banner-t1 .swiper-slide-active .video-js video').get(0);

             if (hasVideoElemet) {
             console.log('===== Has Video ====');

             videojs(videoItem).ready(function () {
             var player = this;

             if(player.paused){
             console.log('video is paused, play video');
             player.play();
             swiper.autoplay.stop();
             }

             player.on('ended', function () {
             console.log('video is ended, change slide');
             player.pause();
             swiper.slideNext();
             swiper.autoplay.start();
             });
             });

             } else {
             swiper.autoplay.start();
             console.log('===== Does Not Has Video ====');
             }
             });
             swiper.init();

             }
             },*/

            searchBoxToggle: function () {
                var searchBtn = $(".search-btn");
                var searchBox = $(".search-box");

                searchBtn.click(function () {
                    searchBtn.parent().toggleClass("active-search");
                    searchBox.animate({'width': 'toggle'});
                    searchBox.find('.search-input').focus();
                    console.log('search btn clicked');
                })

            },
            navMenuToggle: function () {

                var menu = $('.mega-menu');
                $(document).on('click', '.nav .dropdown-menu', function (e) {
                    e.stopPropagation();
                });
                /* hamburger menu */

                $(".menu-hamburger").on("click", function (e) {
                    e.stopPropagation();
                    this.classList.toggle("active");
                    $(".mobile-nav-box").toggleClass("active");
                    $("html").toggleClass("active-navigation");

                });

                var toggle = $(".vehicles-toggle");
                var box = $(".vehicles-toggle-box");
                toggle.click(function () {
                    $(this).parent().toggleClass("active");
                    box.toggleClass("active");
                    $("html").toggleClass("active-mobile-vehicles");
                    //box.toggle();
                });
                $('.short-top-nav li').each(function () {
                    if (window.location.href.indexOf($(this).find('a:first').attr('href')) > -1) {
                        $(this).addClass('active').siblings().removeClass('active');
                    }
                });
                $('.mobile-nav li a').each(function () {
                    /*if (window.location.href.indexOf($(this).find('a:first').attr('href')) > -1) {
                     $('.short-top-nav li:first-child').addClass('active').siblings().removeClass('active');
                     } else if (window.location.href.indexOf("Vehicles") > -1) {
                     $('.short-top-nav li:first-child').addClass('active').siblings().removeClass('active');
                     } else if (window.location.href.indexOf("vehicles") > -1 && location.pathname == "Vehicles") {
                     $('.short-top-nav li:first-child').addClass('active').siblings().removeClass('active');
                     }*/
                    if (window.location.href.indexOf($(this).find('a:first').attr('href')) > -1) {
                        $('.short-top-nav li:first-child').addClass('active').siblings().removeClass('active');
                    } else if (location.pathname == "/Vehicles/") {
                        $('.short-top-nav li:first-child').addClass('active').siblings().removeClass('active');
                    }
                });


            },
            notice: function () {
                $(".notice .close-x").click(function () {
                    $(".notice").fadeOut();
                })
            },
            blueOverlay: function () {
                $(".card-full .chevron-btn, .card-full .full-click").hover(
                    function () {
                        $(this).parents(".card-full").find(".chevron-btn").toggleClass("active");
                        $(this).parents(".card-full").find(".blue-overlay").stop().fadeIn(100);
                    }, function () {
                        $(this).parents(".card-full").find(".chevron-btn").removeClass("active");
                        $(".card").find(".blue-overlay").stop().fadeOut(100);
                    }
                );

                $(".card .chevron-btn, .card .full-click").hover(
                    function () {
                        $(this).parents(".card .col").find(".chevron-btn").toggleClass("active");
                        $(this).parents(".col").find(".blue-overlay").stop().fadeIn(100);
                    }, function () {
                        $(this).parents(".card .col").find(".chevron-btn").removeClass("active");
                        $(this).parents(".col").find(".blue-overlay").stop().fadeOut(100);
                    }
                )
            },

            navSticky: function () {
                $(window).scroll(function () {
                    navSticky();
                });

                var $nav2Offset = 0, pt = 0;

                var $nav2 = $('.inpage-nav-sec');
                if ($nav2.length) {
                    $nav2Offset = $nav2.offset().top;
                    pt = 0;
                }

                function navSticky() {

                    var scroll = $(window).scrollTop();
                    if ($(window).width() >= 991) {

                        if (scroll >= 40) {
                            $("body").addClass("padding-top");
                            $("nav").addClass("sticky");
                        } else {
                            $("body").removeClass("padding-top");
                            $("nav").removeClass("sticky");
                        }
                    }

                    if ($nav2.length) {
                        if (scroll >= $nav2Offset) {
                            app.$body.addClass('sticky-nav-two');
                        } else {
                            app.$body.removeClass('sticky-nav-two');
                        }
                    }

                    if ($(window).width() >= 993) {
                        if ($('.mega-menu > li:not(".tt-vehicles-item").open').length) {
                            $('.mega-menu > li.open').removeClass('open');
                        }
                    }

                }

                navSticky();
            },

            calendar: function (elem, elemCounter) {
                $.fn.datepicker.dates['en'].titleFormat = 'MM yyyy';
                $('.datetime-picker').datepicker({
                    viewMode: "months",
                    autoclose: true,
                    readonly: true,
                    disableTouchKeyboard: true,
                    todayHighlight: true,
                    orientation: "bottom auto",
                    format: 'yyyy-mm-dd'
                }).on('show', function (e) {
                    $(this).closest('.datepicker-field').addClass('datepicker-open');
                }).on('hide', function (e) {
                    $(this).closest('.datepicker-field').removeClass('datepicker-open');
                });
            },
            textExpend: function () {
                $(".read-more-btn").click(function () {
                    $(this).toggleClass("active");
                    $(this).prev(".text-expend").slideToggle("active");
                });
            },
            ttTabsFirstInit: function () {
                /*if ($(".tabs").length >= 1) {
                 $('.tab').each(function () {
                 //$(this).find('.tab-content').first().show();
                 $(this).find('.tab-pane').first().addClass('active')
                 //$('.tab .tab-pane:first').addClass('active')
                 });
                 //$('.tab .tab-content').first().show();

                 }*/
            },
            ttTabs: function () {
                if ($(".tabs").length >= 1) {

                    /*$(".tabs-menu a").click(function (event) {
                     var hash = $(this);

                     if (hash.attr("href").indexOf("#") !== -1) {
                     event.preventDefault();
                     $(this).parent().addClass("current");
                     $(this).parent().siblings().removeClass("current");
                     var tab = $(this).attr("href");
                     $(".tab-content").not(tab).css("display", "none");
                     $(tab).fadeIn();
                     }
                     });*/

                    if (window.location.hash.length) {
                        var hash = window.location.hash;
                        if (window.location.hash.indexOf('!') === 1) {
                            hash = hash.substr(0, 1) + hash.substr(2);
                        }
                        hash && $('.tabs-menu a[href="' + hash + '"]').tab('show');
                    }


                    $('.tabs-menu a').click(function (e) {

                        var hrefItem = $(this);
                        if (hrefItem.attr("href").indexOf("#") !== -1) {
                            $(this).tab('show');
                            e.preventDefault();
                            e.stopPropagation();
                            var scrollmem = $('body').scrollTop() || $('html').scrollTop();
                            var hash = this.hash;
                            hash = hash.substr(0, 1) + '!' + hash.substr(1);
                            window.location.hash = hash;
                            $('html,body').scrollTop(scrollmem);
                        }
                        /*return false;
                         var scrollmem = $('body').scrollTop();
                         $('html,body').scrollTop(scrollmem + 100);*/
                    });

                }

            },
            ttAccordion: function () {
                if ($(".tt-accordion").length >= 1) {
                    var allPanels = allTitles = null;

                    // Code to keep first accordian active on load
                    $('.tt-first-active')
                        .find('.accordion-inner:first-child').addClass('expand')
                        .find('> h4:first-child').addClass('active')
                        .end().find('.tt-content').addClass('show').show();

                    function accordianToggle() {
                        var $this = $(this);
                        var $target = $this.next();

                        allTitles = $(this).parent().siblings();
                        allPanels = allTitles.find('.tt-content');

                        if ($this.hasClass("active")) {
                            allTitles.removeClass('expand');
                            allPanels.removeClass('show').stop().slideUp();
                            $target.removeClass('show');
                            $target.stop().slideUp();
                            $this.removeClass("active");
                        } else {
                            //console.log(allTitles);
                            allTitles.removeClass('expand');
                            $(".tt-accordion .accordion-inner h4").removeClass("active");
                            allPanels.removeClass('show').stop().slideUp();
                            $(this).parent().addClass('expand');
                            $target.addClass('show').stop().slideDown().promise().done(function () {
                                app.scrollToPos($this.offset().top - app.getStickyTopOffset(true));
                            });
                            $this.addClass("active");
                        }
                        return false;
                    }


                    $('.tt-accordion .accordion-inner h4').unbind('click');
                    $('.tt-accordion .accordion-inner h4').on('click', accordianToggle);

                }
            },

            getStickyTopOffset: function () {
                var forSticky = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
                var offset = 0;

                if (app.$body.hasClass('sticky-nav-two')) {
                    offset = $('.inpage-nav-sec').height();
                } else if (app.$body.hasClass('padding-top') && app.windowWidth > 992) {
                    offset = $('header nav.sticky').height();
                } else {
                    if (forSticky) {
                        if ($('.inpage-nav-sec').length) {
                            offset = $('.inpage-nav-sec').height();
                        } else if (app.windowWidth > 992) {
                            offset = $('header nav').height();
                        } else {
                            offset = 0;
                        }
                    } else {
                        offset = 0;
                    }
                }
                return offset;
            },

            region: function () {
                if ($("header nav").length) {
                    $(".region-dropdown").addClass("align-nav");
                } else {
                    $(".region-dropdown").hasClass().removeClass("align-nav");
                }
            },
            supportDropdown: function () {
                $(".support-dropdown").click(function () {
                    $(this).toggleClass("active");
                });
                $("html").click(function () {
                    $(".support-dropdown").removeClass("active");
                });
                $(".support-dropdown, .support-dropdown ul").click(function (e) {
                    e.stopPropagation();
                })
            },
            initMutedVideo: function () {
                //$('.caption-video .caption').click(function () {
                //    this.paused ? this.play() : this.pause();
                //});
                $('.muted-video').each(function () {
                    var video = $(this).get(0);
                    video.muted = true;

                });
            }, initSlidePushMenu: function () {
            },
            carColorsSwitcher: function () {

                $('.color-list').each(function () {
                    $(this).data('image-list', $(this).closest('.car-colours-sec').find('.cars-colored'));
                    $(this).data('color-info', $(this).closest('.car-colours-sec').find('.color-info'));
                });

                var animating = false;


                $('.color-list').on('click', 'li', function () {
                    // $(this).parent().data('image-list')
                    //     .find('img').removeClass('active').eq($(this).index()).addClass('active');

                    var $this = $(this);

                    if (animating) {
                        return;
                    }


                    animating = true;
                    $(this).parent().data('image-list').find('img').fadeOut(150, "swing").promise().done(function () {
                        $this.parent().data('image-list').find('img').eq($this.index()).fadeIn(150, "swing");
                        animating = false;
                    });

                    $(this).parent().data('color-info')
                        .find('.info').removeClass('active').eq($(this).index()).addClass('active');

                    $(this).siblings().removeClass('active').end().addClass('active');
                });

            },
            initSmartMenuHover: function () {

                /*$(".tt-car-item").hover(function () {

                 $(".tt-car-item").removeClass("active");
                 $(this).addClass("active");
                 });*/
                var item = $(".tt-car-item");
                item.hover(
                    function () {
                        item.addClass('inactive');
                        $(this).removeClass('inactive');
                        $(this).addClass('active');
                    },
                    function () {
                        item.removeClass('active');
                        item.removeClass('inactive')
                    }
                )

            },
            linkListCarousel: function () {

                var length = 0;
                var width = app.windowWidth;


                if (width < 992 && width > 767) {
                    length = 3;
                } else if (width >= 992) {
                    length = 4;
                }

                if ($('.link-list-carousel .swiper-slide').length) {

                    var stabs = $('.spec-tabs .tab');
                    stabs.first().addClass('active');
                    function changeTabs(i) {
                        stabs.removeClass('active');
                        stabs.eq(i).addClass('active')
                    }


                    if ($('.link-list-carousel .swiper-slide').length > length && length != 0) {
                        $('.link-list-carousel .swiper-slide').first().addClass('swiper-slide-active');

                        $('.link-list-carousel').addClass('swiper-loaded');
                        app.listSwiper = new Swiper('.link-list-carousel .swiper-container', {
                            slidesPerView: length,
                            spaceBetween: 0,
                            loop: false,
                            slideToClickedSlide: true,
                            watchSlidesVisibility: true,
                            navigation: {
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev'
                            },
                            breakpoints: {
                                991: {
                                    slidesPerView: 3,
                                }
                            }
                        });

                        app.listSwiper.on('slideChange', function () {
                            changeTabs(app.listSwiper.realIndex)
                        });
                        $(".link-list-carousel").on('click', '.swiper-slide', function () {
                            changeTabs($(this).index());
                            $(this).siblings().removeClass('swiper-slide-active').end().addClass('swiper-slide-active');
                            //console.log($(this).index())
                        })

                    }
                    else {
                        if ($('.link-list-carousel .swiper-slide').length == 1) {
                            $('.link-list-carousel .swiper-slide').first().addClass('swiper-slide-active active-tt-style');
                        }

                        // $('.link-list-carousel .swiper-slide').first().find('.tt-car-item').addClass('active-tt-style');

                        $('.link-list-carousel').on('click', '.swiper-slide', function () {
                            $(this).siblings().removeClass('swiper-slide-active').end().addClass('swiper-slide-active');
                            changeTabs($(this).index());
                        })
                    }

                }

            },
            venobox: function () {


                if ($('.venobox').length >= 0) {

                    $('.venobox').venobox();

                }

            },
            galleryBlockVideo: function () {
                var markup;
                $('.tt-gallery-block.has-youtube-video').click(function () {
                    $(this).unbind('click');
                    $(this).addClass('video-played');
                    markup = '<iframe type="text/html"  class="youtube-iframe"  src="https://www.youtube.com/embed/' + $(this).attr('data-youtube') + '?autoplay=1&modestbranding=1&rel=0&showinfo=0" frameborder="0" allowfullscreen>';
                    $(this).find('.image').html(markup);
                });


                $('.tt-gallery-block.has-video').click(function () {
                    $(this).unbind('click');
                    $(this).addClass('video-played');
                    $(this).find('video')[0].play();
                });


            },
            carCompareOverlay: function () {

                // Initialize venobox
                var venobox = $('.venobox-choose-car').venobox({
                    overlayClose: false,
                    numeratio: false,
                });

                window.carSelectOverlay = venobox;


                // radio button seleted styles
                $(document).on('change', '.vbox-overlay .tt-links-radio .radio-button input', function () {
                    $('.vbox-overlay .tt-links-radio .active-check').removeClass('active-check');
                    $('.vbox-overlay .tt-links-radio .radio-button input:checked').closest('.tt-car-item').parent().addClass('active-check');

                    $('.vbox-overlay .btn-submit.disabled').removeClass('disabled');
                });

                $(document).on('click change', '.vbox-overlay .tt-car-item', function () {
                    $('.vbox-overlay .tt-links-radio .active-check').removeClass('active-check');
                    $(this).parent().addClass('active-check');

                    $('.vbox-overlay .btn-submit.disabled').removeClass('disabled');
                    // prop checked
                    $(this).find(".car-selector").addClass('active').prop('checked', true);

                    //console.log("clicked")
                });
                // close current item clicking on .closeme
                // this is now controlled from backend

                /*$(document).on('click', '.vbox-overlay .btn-cancel', function (e) {
                 window.carSelectOverlay.VBclose();
                 });

                 $(document).on('click', '.vbox-overlay .btn-submit:not(.disabled)', function (e) {
                 window.carSelectOverlay.VBclose();
                 });
                 */

            },
            initBookTestDrive: function () {

                function setMobileHeights() {
                    if (app.windowWidth <= 767) {
                        var vh = $(window).height();
                        $('.tt-forms .swiper-container').height(vh - 174);
                    }
                }


                if ($('.no-footer').length && app.isMobile) {
                    $('footer').hide();
                }

                if (!$('.tt-forms').length) {
                    return false;
                }


                if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {

                    $('.tt-forms .tt-form-input :input').on('focus', function () {
                        $(':input').not(this).attr("readonly", "readonly");
                    });

                    $('.tt-forms .tt-form-input :input').on('blur', function () {
                        $(':input').removeAttr("readonly");
                    });

                }

                // Initialize Swiper for form
                var swiper = new Swiper('.tt-forms .swiper-container', {
                    direction: 'vertical',
                    mousewheel: true,
                    spaceBetween: 30,
                    centeredSlides: true,
                    slidesPerView: 'auto',
                    autoHeight: true,
                    preventIntercationOnTransition: true,
                    allowTouchMove: false,
                    preventClicks: false,
                    allowSlidePrev: false,
                    allowSlideNext: false,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    keyboard: {
                        enabled: true,
                        onlyInViewport: false,
                    },
                    breakpoints: {
                        767: {
                            slidesPerView: 1,
                            spaceBetween: 0,
                            mousewheel: false,
                            allowTouchMove: false,
                        }
                    }
                });


                setMobileHeights();

                $(".scroll-to-continue-btn").click(function () {
                    swiper.slideNext();
                });


                var $percent = $('.custom-pagination');
                var $progressBar = $('.form-progress-bar');
                var currentSlide;
                var form = $('.tt-forms form');
                var errorLength = 0;
                var errorState = false;
                var slidesWIthErrors = [];
                var i = 0;
                var swiperLen = swiper.slides.length;
                var positionX = 0, positionY = 0;
                var cfbFIx = false;
                var hasAllValid = false;
                var requiredFormGroups = [];
                var moveTo = 0;
                var textFIelds = $('.tt-forms .tt-form-input input.form-control');
                var isDesktop = !app.isMobile;
                var $lastBtn = $('.tt-forms .swiper-slide.last-slide .text-field-controls .btn-primary');
                var mobileReviewBar = false;
                var submitFinal = false;
                var noErrorsFirstTime = true;
                var $textAreaFields = $('.tt-form-input textarea.auto-expanded');

                $textAreaFields.each(function () {
                    $(this).closest('.tt-form-input').addClass('slide-textarea');
                })


                $(document).on('click', '.custom-combobox-input', function () {
                    $(this).next('.custom-combobox-toggle').trigger('click');
                });

                form.validator({
                    focus: false,
                    disable: false,
                }).on('submit', function (e) {

                    if (e.isDefaultPrevented()) {

                        toggleSwipperMovement(true);
                        if (isDesktop) {
                            if ($('.controls-footer-box:visible').length) {
                                $('.controls-footer-box, .controls-box-spacer').slideUp();
                            }
                        } else {
                            if ($('.controls-footer-box:visible').length) {

                                $('.tt-forms').removeClass('review-bar-mobile');
                                setTimeout(function () {
                                    $('.tt-forms .controls-footer-box').css('opacity', 0);
                                }, 200);

                            }

                        }

                        errorState = true;
                        cfbFIx = true;

                        $('.tt-form-input select.form-control').trigger('input');

                        $('.controls-footer-box h4').text($('.controls-footer-box h4').attr('data-invalid'));
                        $('.text-field-controls .btn-submit').text($('.text-field-controls .btn-submit').attr('data-invalid'));
                        $('.error-details').slideDown();

                        if ($('.text-field-controls .btn-submit').hasClass('processed-once')) {
                            console.log('clicked processed once');
                            $('.tt-forms').removeClass('current-blur');
                            swiper.slideTo(slidesWIthErrors[0]);
                            if (isDesktop) {
                                app.scrollToPos(0);
                            } else {
                                app.scrollToPos($('#content').offset().top);
                            }
                        }

                    } else {

                        submitFinal = true;

                        if (isDesktop) {
                            if (!$('.controls-footer-box:visible').length) {
                                $('.controls-footer-box, .controls-box-spacer').slideDown();
                            }
                            if (errorState) {

                                $('.tt-forms').addClass('current-blur');
                                swiper.slideTo(swiperLen - 1);
                                ;


                                if ($('.footer-cols:visible').length) {
                                    app.scrollToPos(($('.footer-cols').offset().top + 60) - $(window).height());
                                } else {
                                    app.scrollToPos(($(document).height() + 60) - $(window).height());
                                }

                                $('.error-details').hide();
                                lastPaneSubmitStage();
                                setTimeout(function () {
                                    $('.controls-footer-box .btn-submit').focus();
                                }, 800);

                                toggleSwipperMovement(false);

                                errorState = false;
                                submitFinal = true;
                            } else {
                                if (noErrorsFirstTime) {
                                    submitFinal = true;
                                } else {
                                    submitFinal = false;
                                }
                            }
                        } else {
                            submitFinal = false;
                        }

                        if (submitFinal) {
                            return false;
                        }

                    }


                });


                function lastPaneSubmitStage() {
                    $('.error-details').slideUp();
                    $('.controls-footer-box h4').text($('.controls-footer-box h4').attr('data-valid'));
                    $('.text-field-controls .btn-submit').text($('.text-field-controls .btn-submit').attr('data-valid'));

                }

                function lastControlsDataAttributes() {
                    $('.controls-footer-box h4').attr('data-valid', $('.controls-footer-box h4').text());
                    $('.text-field-controls .btn-submit').attr('data-valid', $('.text-field-controls .btn-submit').text())
                }

                lastControlsDataAttributes();

                swiper.on('slideChange', function () {
                    removeButtonClass();
                    updatePagination();
                });

                swiper.on('slideChangeTransitionStart', function () {
                    validateField();
                });

                swiper.on('slideChangeTransitionEnd', function () {
                    focusElements();
                });


                if (!isDesktop) {
                    $lastBtn.text($lastBtn.attr('data-submit-text'));
                }

                $('.tt-forms .text-field-controls .btn:not(.btn-submit)').click(function (e) {

                    validateFieldCurrent();
                    if (!$(swiper.slides[swiper.realIndex]).find('.form-group.has-error').length) {
                        sp_next();
                    }

                    if ($(this).closest('.last-slide').length) {

                        if (isDesktop) {
                            activateLastPanel();
                        } else {
                            activateLastPanelMobile();
                        }

                    }

                });

                function activateLastPanelMobile() {

                    if ($('.tt-forms .has-error').length) {

                        updateErrorList();
                        toggleSwipperMovement(false);

                        // mobileReviewBar = true;
                        $('.tt-forms').addClass('current-blur');
                        $('.text-field-controls .btn-submit').addClass('processed-once');
                        $('.controls-footer-box h4').text($('.controls-footer-box h4').attr('data-invalid'));
                        $('.text-field-controls .btn-submit').text($('.text-field-controls .btn-submit').attr('data-invalid'));
                        $('.tt-forms').addClass('review-bar-mobile');
                        setTimeout(function () {
                            $('.tt-forms .controls-footer-box').css('opacity', 1);
                        }, 200);
                        app.scrollToPos($('header').height());


                    } else {
                        updateErrorList();
                    }

                }

                // set required formgroups in srray
                $('.tt-forms .swiper-slide').each(function () {
                    if ($(this).find('.is-required').length) {
                        requiredFormGroups.push($(this).find('.is-required'))
                    }
                });

                if ($('.tt-forms .progress-bar').length) {
                    updatePagination();
                }

                $('.radio-strip label.radio').click(function (e) {

                    if ($(this).closest('.splash-screen').length) {
                        $('.radio-strip.current-radio-strip').removeClass('current-radio-strip');
                        $('.checkbox-selection').removeClass('checkbox-selection');
                        $(this).find('.form-check-input').prop('checked', true);
                        splashScreenHide();
                        e.preventDefault();
                        return false;
                    } else {

                        $('.radio-strip.current-radio-strip').removeClass('current-radio-strip');
                        $(this).closest('.radio-strip').addClass('current-radio-strip');

                        $('.checkbox-selection').removeClass('checkbox-selection');
                        $(this).find('.form-check-input').trigger('change');


                        updatePagination();
                        requiredFillMove(this);

                        // e.preventDefault();
                        // return false;
                    }

                });

                if ($('.splash-screen .action-btn').length) {
                    if (isDesktop) {
                        $(document).keydown(splashScreenFormStart);
                    }
                } else if ($('.splash-screen .radio-group').length) {
                    if (isDesktop) {
                        var $rs = $('.splash-screen .radio-group').find('.radio-strip').first();
                        $rs.addClass('current-radio-strip');
                        $rs.closest('.tt-form-input').find('.radio-controls').focus();
                        $rs.find('label.radio').first().addClass('checkbox-selection');
                    }
                }

                $('.splash-screen .action-btn').click(function () {
                    splashScreenHide();
                });


                function requiredFillMove(el) {
                    //    move to next slide if all requred checkboxes are checked
                    if (isDesktop)
                        return;

                    var requiredFields = $(el).closest('.tt-form-input').find('.form-group.is-required');
                    var isSuccess = true;
                    requiredFields.each(function () {
                        if (!$(this).hasClass('has-success')) {
                            isSuccess = false;
                        }
                    });

                    if (isSuccess) {
                        sp_next();
                    }
                }

                function toggleSwipperMovement(state) {
                    swiper.allowSlidePrev = state;
                    swiper.allowSlideNext = state;
                }

                function validateFullForm() {
                    form.validator('validate');
                    $($('.tt-form-input .custom-combobox-input').closest('.form-group')).find('select.form-control').trigger('input');

                }

                function updateErrorList() {
                    validateFullForm();
                    slidesWIthErrors = [];
                    errorLength = $('.tt-forms .has-error').length;


                    if (errorLength == 0) {
                        $('.tt-forms form').submit();
                    }

                    $('.controls-footer-box').find('.num').text(errorLength);
                    for (i = 0; i < swiperLen; i++) {
                        if (swiper.slides.eq(i).find('.form-group.has-error').length) {
                            slidesWIthErrors.push(i)
                        }
                    }
                }

                function sp_next() {
                    if (errorState) {
                        // validateField();
                        updateErrorList();

                        moveTo = null;

                        for (i = 0; i < slidesWIthErrors.length; i++) {
                            if (slidesWIthErrors[i] > swiper.realIndex) {
                                moveTo = slidesWIthErrors[i];
                                break;
                            }
                        }
                        if (moveTo == null) {
                            if (swiper.realIndex > slidesWIthErrors[slidesWIthErrors.length - 1]) {
                                moveTo = slidesWIthErrors[0];
                            } else {
                                moveTo = slidesWIthErrors[slidesWIthErrors.length - 1];
                            }

                        }

                        if (moveTo != undefined) {
                            if (!$(swiper.slides[swiper.realIndex]).hasClass('last-slide')) {
                                swiper.slideTo(moveTo);
                            }
                        }

                    } else {
                        swiper.slideNext();
                    }

                }

                function sp_prev() {
                    return false;

                    if (errorState) {
                        moveTo = null;
                        for (i = 0; i < slidesWIthErrors.length; i++) {
                            if (slidesWIthErrors[i] >= swiper.realIndex) {
                                moveTo = slidesWIthErrors[i - 1];
                                break;
                            }
                        }
                        if (moveTo == null) {
                            moveTo = slidesWIthErrors[0];
                        }

                        swiper.slideTo(moveTo);
                    }

                }

                function calculateProgress() {
                    var num = 0;
                    requiredFormGroups.forEach(function (array, index) {
                        hasAllValid = true;
                        for (var i = 0; i < array.length; i++) {
                            if (!$(array[i]).hasClass('has-success')) {
                                hasAllValid = false;
                                break;
                            }
                        }
                        if (hasAllValid) {
                            num++;
                        }
                    });
                    return num;
                }

                function updatePagination() {
                    var num = calculateProgress();
                    num = Math.round(((num) / requiredFormGroups.length) * 100);
                    $percent.html(num + '%');
                    $progressBar.width(num + '%');
                }

                function removeButtonClass() {
                    currentSlide = $(swiper.slides[swiper.previousIndex]);
                    currentSlide.removeClass('show-btns');
                }

                function validateField() {
                    currentSlide = $(swiper.slides[swiper.previousIndex]);
                    if (currentSlide.find('.form-group.radio-group').length) {
                        currentSlide.find('input[type=radio]').trigger('input');
                    } else if (currentSlide.find('select').length) {
                        currentSlide.find('select.form-control').trigger('input');
                    } else {
                        currentSlide.find(':input').first().trigger('input');
                    }
                }

                function validateFieldCurrent() {
                    currentSlide = $(swiper.slides[swiper.realIndex]);

                    if (currentSlide.find('.form-group.radio-group').length) {
                        currentSlide.find('input[type=radio]').trigger('input');
                    } else if (currentSlide.find('select').length) {
                        currentSlide.find('select.form-control').trigger('input');
                    } else {
                        currentSlide.find(':input').first().trigger('input');
                    }
                    updatePagination();
                }

                function focusElements() {


                    $('.checkbox-selection').removeClass('checkbox-selection');
                    $('.radio-controls').blur();

                    currentSlide = $(swiper.slides[swiper.realIndex]);

                    if (currentSlide.find('.custom-combobox').length) {
                        // for combobox / dropdown
                        currentSlide.find('.custom-combobox-input').focus();
                        if (!isDesktop) {
                            // currentSlide.find('.custom-combobox-input').next().trigger('click');
                        }
                    } else if (currentSlide.find('.radio-group').length) {
                        // for radio buttons
                        radioSelection(currentSlide.find('.radio-strip').first());
                    } else if (currentSlide.find('input[type=checkbox].form-check-input').length) {
                        // for checkbox
                        if (currentSlide.find('input[type=checkbox]:checked').length) {
                            currentSlide.find('input[type=checkbox]:checked ~ .form-check-label').focus()
                        } else {
                            currentSlide.find('.form-check-label').first().focus();
                        }
                    } else {
                        currentSlide.find('.form-control').first().focus();
                    }


                }

                function radioSelection(currentSlide) {

                    $(document.activeElement).blur();
                    $('.current-radio-strip').removeClass('current-radio-strip');
                    currentSlide.addClass('current-radio-strip');
                    $('.checkbox-selection').removeClass('checkbox-selection');
                    if (currentSlide.find('input[type=radio]:checked').length) {
                        currentSlide.find('input[type=radio]:checked').closest('.radio').focus();
                    } else {
                        if (isDesktop) {
                            currentSlide.closest('.swiper-slide').find('.radio-controls').focus();
                        }
                        currentSlide.find('label.radio').first().addClass('checkbox-selection');
                    }

                }

                function activateLastPanel() {


                    if ($('.controls-footer-box:visible').length)
                        return;

                    updateErrorList();

                    if (noErrorsFirstTime && !$('.tt-forms .has-error').length) {
                        noErrorsFirstTime = false;

                        $('.tt-forms').addClass('current-blur');

                        if ($('.footer-cols:visible').length) {
                            app.scrollToPos(($('.footer-cols').offset().top + 60) - $(window).height());
                        } else {
                            app.scrollToPos(($(document).height() + 60) - $(window).height());
                        }

                        $('.controls-box-spacer').slideDown();
                        $('.controls-footer-box').slideDown();

                        positionX = window.scrollX;
                        positionY = window.scrollY;
                        $('.controls-footer-box .btn-submit').focus();
                        window.scrollTo(positionX, positionY);

                        toggleSwipperMovement(false);
                        return;
                    }


                    noErrorsFirstTime = false;

                    if (!$('.tt-forms .has-error').length)
                        return;

                    $('.controls-footer-box h4').text($('.controls-footer-box h4').attr('data-invalid'));
                    $('.text-field-controls .btn-submit').text($('.text-field-controls .btn-submit').attr('data-invalid'));
                    $('.error-details').show();


                    $('.tt-forms').addClass('current-blur');

                    if ($('.footer-cols:visible').length) {
                        app.scrollToPos(($('.footer-cols').offset().top + 60) - $(window).height());
                    } else {
                        app.scrollToPos(($(document).height() + 60) - $(window).height());
                    }

                    $('.controls-box-spacer').slideDown();
                    $('.controls-footer-box').slideDown();

                    positionX = window.scrollX;
                    positionY = window.scrollY;
                    $('.controls-footer-box .btn-submit').focus();
                    window.scrollTo(positionX, positionY);

                    $('.text-field-controls .btn-submit').addClass('processed-once');

                    toggleSwipperMovement(false);

                }


                function splashScreenHide() {
                    $('.splash-screen').fadeOut(function () {
                        $('body').addClass('form-start');
                        toggleSwipperMovement(true)
                    });
                    if (!isDesktop) {
                        app.scrollToPos($('#content').offset().top);
                    }
                    focusElements();
                }

                function splashScreenFormStart(e) {
                    var code = e.keyCode || e.which;
                    if (e.keyCode === 13) {
                        splashScreenHide();
                        $(document).unbind("keydown", splashScreenFormStart);
                        return false;
                    }
                }

                function moveInDirection(direction) {
                    if (direction == 1) {
                        sp_next();
                    } else {
                        swiper.slidePrev();
                    }
                }

                function multiTextKeyboardNav($field, direction) {
                    var x = $field.closest('.multi-text'),
                        list = $field.closest('.tt-form-input').find('.multi-text'),
                        length = list.length,
                        indexFound;
                    direction = (direction === 'up' ? -1 : 1);

                    list.each(function (index, item) {
                        if ($(item).is(x)) {
                            indexFound = index;
                        }
                    });

                    if (list[indexFound + direction] == undefined) {
                        moveInDirection(direction);
                    } else {
                        $(list[indexFound + direction]).find('.form-control').focus();
                    }
                }

                textFIelds.each(function () {
                    $(this).data('currentVal', $(this).val());
                });

                textFIelds.keyup(function (e) {
                    var code = e.keyCode || e.which;
                    if ($(this).val() != $(this).data('currentVal')) {
                        $(this).closest('.swiper-slide').addClass('show-btns');
                    }
                });


                textFIelds.keydown(function (e) {
                    var code = e.keyCode || e.which;

                    if ($(this).val() != $(this).data('currentVal')) {
                        $(this).closest('.swiper-slide').addClass('show-btns');
                    }

                    $(this).data('currentVal', $(this).val());


                    if (code === 13) {
                        // ENTER

                        validateFieldCurrent();
                        if (!$(swiper.slides[swiper.realIndex]).find('.form-group.has-error').length) {
                            $(this).trigger('blur');
                            $(this).blur();
                            sp_next();
                        }
                        e.preventDefault();

                        return false;
                    } else if (code === 38) {
                        // Up arrow

                        if ($(this).closest('.multi-text').length) {
                            multiTextKeyboardNav($(this), 'up');
                            return false;
                        } else {
                            swiper.slidePrev();
                            validateField();
                            return false;
                        }

                    } else if (code === 40) {
                        // Down arrow

                        if ($(this).closest('.multi-text').length) {
                            multiTextKeyboardNav($(this), 'down');
                            return false;
                        } else {
                            swiper.slideNext();
                            validateField();
                            return false;
                        }


                    } else if (code === 9) {
                        // Tab key
                        e.preventDefault();
                        return false;
                    }

                });


                $textAreaFields.each(function () {
                    $(this).data('currentVal', $(this).val());
                });

                $textAreaFields.keyup(function (e) {
                    var code = e.keyCode || e.which;
                    if ($(this).val() != $(this).data('currentVal')) {
                        $(this).closest('.swiper-slide').addClass('show-btns');
                    }
                });

                $textAreaFields.keydown(function (e) {
                    var code = e.keyCode || e.which;

                    if (code === 9) {
                        // Tab key
                        e.preventDefault();
                        return false;
                    }

                    if ($(this).val() != $(this).data('currentVal')) {
                        $(this).closest('.swiper-slide').addClass('show-btns');
                    }


                });

                $(document).on('keydown', '.tt-forms .tt-form-input .custom-combobox-input', function (e) {
                    var code = e.keyCode || e.which;

                    if (code === 9) {
                        // Tab key
                        e.preventDefault();
                        return false;
                    } else if (code === 13) {
                        // enter key
                        if (!$(this).closest('.form-group').hasClass('opened')) {

                            $(this).trigger('focusout');
                            $(this).blur();
                            validateFieldCurrent();
                            if (!$(swiper.slides[swiper.realIndex]).find('.form-group.has-error').length) {
                                sp_next();
                            } else {
                                $(swiper.slides[swiper.realIndex]).find('.custom-combobox-input').focus();
                            }
                        } else {
                            $(this).trigger('focusout');
                            $(this).blur();
                            validateFieldCurrent();
                            updatePagination();
                            if (!$(swiper.slides[swiper.realIndex]).find('.form-group.has-error').length) {
                                sp_next();
                            } else {
                                $(swiper.slides[swiper.realIndex]).find('.custom-combobox-input').focus();
                            }

                        }
                        e.preventDefault();
                        return false;
                    }


                });

                $(document).on('keydown', '.radio-controls', function (e) {
                    var code = e.keyCode || e.which;


                    if (code === 37) {
                        // left
                        if ($('.radio.checkbox-selection').prev('.radio').length) {
                            $('.radio.checkbox-selection')
                                .removeClass('checkbox-selection')
                                .prev('.radio')
                                .addClass('checkbox-selection');
                        } else {
                            $('.radio.checkbox-selection').removeClass('checkbox-selection').siblings().last().addClass('checkbox-selection');
                        }
                        e.preventDefault();
                        return false;

                    } else if (code === 39) {
                        // right
                        if ($('.radio.checkbox-selection').next('.radio').length) {
                            $('.radio.checkbox-selection')
                                .removeClass('checkbox-selection')
                                .next('.radio')
                                .addClass('checkbox-selection');

                        } else {
                            $('.radio.checkbox-selection').removeClass('checkbox-selection').siblings().first().addClass('checkbox-selection');
                        }
                        e.preventDefault();
                        return false;

                    } else if (code === 40) {
                        // down

                        if ($(this).closest('.splash-screen').length) {
                            e.preventDefault();
                            return false;
                        }

                        var rs = $('.radio.checkbox-selection').closest('.radio-group');
                        if (rs.next('.radio-group').length) {
                            radioSelection(rs.next('.radio-group').find('.radio-strip'));
                        } else {
                            $('.checkbox-selection').removeClass('checkbox-selection');
                            swiper.slideNext();
                        }
                        e.preventDefault();
                        return false;

                    } else if (code === 38) {
                        // up

                        if ($(this).closest('.splash-screen').length) {
                            e.preventDefault();
                            return false;
                        }

                        var rs = $('.radio.checkbox-selection').closest('.radio-group');
                        if (rs.prev('.radio-group').length) {
                            radioSelection(rs.prev('.radio-group').find('.radio-strip'));
                        } else {
                            $('.checkbox-selection').removeClass('checkbox-selection');
                            swiper.slidePrev();
                        }
                        e.preventDefault();
                        return false;

                    } else if (code === 13) {
                        // enter

                        if ($(this).closest('.splash-screen').length) {
                            var x = $('.splash-screen .radio.checkbox-selection');
                            x.trigger('click');
                            e.preventDefault();
                            return false;
                        }

                        if (isDesktop) {
                            validateFieldCurrent();
                            if (!$(swiper.slides[swiper.realIndex]).find('.form-group.has-error').length) {
                                sp_next();
                            }
                        }


                        e.preventDefault();
                        return false;

                    } else if (code === 32) {
                        // spacebar

                        var x = $('.radio.checkbox-selection');
                        $('.checkbox-selection').removeClass('checkbox-selection');
                        x.find('input[type=radio]').prop('checked', true).focus();


                        if ($(this).closest('.splash-screen').length) {

                            var x = $('.splash-screen .radio.checkbox-selection');
                            x.trigger('click');
                            e.preventDefault();
                            return false;
                        }


                        var rs = x.closest('.radio-group');

                        if (rs.next('.radio-group').length) {
                            radioSelection(rs.next('.radio-group').find('.radio-strip'));
                        }

                        validateFieldCurrent();
                        updatePagination();


                        e.preventDefault();
                        return false;

                    } else if (code === 9) {
                        // Tab key
                        e.preventDefault();
                        return false;
                    }

                });

                $(document).on('keydown', '.tt-forms .tt-form-input input[type=radio].form-check-input', function (e) {
                    var code = e.keyCode || e.which;

                    if (code === 38) {
                        // up


                        if ($(this).closest('.radio-group').prev('.radio-group').length) {
                            radioSelection($(this).closest('.radio-group').prev('.radio-group').find('.radio-strip'));
                        } else {
                            $(this).blur();
                            swiper.slidePrev();
                            validateField();
                        }
                        e.preventDefault();
                        return false;
                    } else if (code === 40) {
                        // down
                        if ($(this).closest('.radio-group').next('.radio-group').length) {
                            radioSelection($(this).closest('.radio-group').next('.radio-group').find('.radio-strip'));
                        } else {
                            $(this).blur();
                            swiper.slideNext();
                            validateField();
                        }
                        e.preventDefault();
                        return false;
                    } else if (code === 13) {
                        // enter
                        if (isDesktop) {
                            validateFieldCurrent();
                            if (!$(swiper.slides[swiper.realIndex]).find('.form-group.has-error').length) {
                                sp_next();
                            }
                        }
                        e.preventDefault();
                        return false;
                    } else if (code === 32) {
                        //space
                        if ($(this).closest('.radio-group').next('.radio-group').length) {
                            radioSelection($(this).closest('.radio-group').next('.radio-group').find('.radio-strip'));
                        }

                        e.preventDefault();
                        return false;
                    }

                });

                $(document).on('keydown', '.tt-forms .tt-form-input input[type=checkbox]', function (e) {
                    var code = e.keyCode || e.which;

                    if (code === 38) {
                        // up
                        if ($(this).closest('.form-check').prev('.form-check').length) {
                            $(this).closest('.form-check').prev('.form-check').find('input[type=checkbox]').focus();
                        } else {
                            $(this).blur();
                            swiper.slidePrev();
                            validateField();
                        }
                        e.preventDefault();
                        return false;
                    } else if (code === 40) {
                        // down
                        if ($(this).closest('.form-check').next('.form-check').length) {
                            $(this).closest('.form-check').next('.form-check').find('input[type=checkbox]').focus();
                        } else {
                            swiper.slideNext();
                            validateField();
                        }
                        e.preventDefault();
                        return false;
                    } else if (code === 9) {
                        // Tab key
                        e.preventDefault();
                        return false;
                    } else if (code === 13) {
                        // enter key
                        if (isDesktop) {
                            if ($(this).closest('.last-slide').length) {
                                activateLastPanel();
                            }
                            sp_next();
                            validateField();
                        }
                        e.preventDefault();
                        return false;
                    }


                });


                $(document).on('keydown', '.controls-footer-box .btn-submit', function (e) {
                    var code = e.keyCode || e.which;
                    if (code === 13) {
                        // enter key
                        if (isDesktop) {
                            $('.tt-forms form').submit();
                        }
                        e.preventDefault();
                        return false;
                    } else if (code === 9) {
                        // Tab key
                        e.preventDefault();
                        return false;
                    }

                });

                $(document).on('focusout', '.tt-forms .custom-combobox-input', function (e) {
                    $($(e.target).closest('.tt-form-input')).find('select.form-control').first().trigger('input');
                });

                // limit autocomoplete options on forms
                if ($('.tt-forms').length) {
                    var optionHeight = 47,
                        limit = 4;
                    app.$body.addClass('dropdown-limit');
                    $('.ui-autocomplete').css('max-height', limit * optionHeight);
                }

            },

            inpageNavMobile: function () {
                var $ipNav = $('.inpage-nav-sec');
                var $inpageNav = $('.inpage-nav-sec .inpage-nav'), $this;
                $('.inpage-nav-sec .car-title').click(function () {
                    $this = $(this);
                    if ($(window).width() <= 992) {
                        if ($this.hasClass('opened')) {
                            // $ipNav.removeClass('whitebg');
                            $this.removeClass('opened');
                            $inpageNav.stop().slideUp();
                        } else {
                            // $ipNav.addClass('whitebg');
                            $this.addClass('opened');
                            $inpageNav.stop().slideDown();
                        }
                    }
                });


                $('.inpage-nav li  a').click(function () {
                    if ($(window).width() < 768) {
                        $('.inpage-nav li.active').removeClass('active');
                        $(this).parent().addClass('active');
                    }
                })
            },
            selectize: function () {
                if ($(".custom.combobox").length >= 1) return true;

                $.widget("custom.combobox", {
                    _create: function () {
                        this.wrapper = $("<span>")
                            .addClass("custom-combobox")
                            .insertAfter(this.element);

                        this.element.hide();
                        this._createAutocomplete();
                        this._createShowAllButton();
                    },

                    _createAutocomplete: function () {
                        var selected = this.element.children(":selected"),
                            value = selected.val() ? selected.text() : "";

                        this.input = $("<input>")
                            .appendTo(this.wrapper)
                            .val(value)
                            .attr("title", "")
                            .addClass("custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left")
                            .autocomplete({
                                delay: 0,
                                minLength: 0,
                                source: $.proxy(this, "_source"),
                                open: function (event, ui) {
                                    $(event.target).closest('.form-group').addClass('opened');

                                    if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
                                        $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');
                                    }

                                },
                                close: function (event, ui) {
                                    setTimeout(function () {
                                        $(event.target).closest('.form-group').removeClass('opened');
                                    }, 10);
                                },
                            })
                            .tooltip({
                                classes: {
                                    "ui-tooltip": "ui-state-highlight"
                                }
                            });

                        this._on(this.input, {
                            autocompleteselect: function (event, ui) {
                                ui.item.option.selected = true;
                                this._trigger("select", event, {
                                    item: ui.item.option
                                });
                            },

                            autocompletechange: "_removeIfInvalid"
                        });
                    },

                    _createShowAllButton: function () {
                        var input = this.input,
                            wasOpen = false;

                        $("<a>")
                            .attr("tabIndex", -1)
                            .attr("title", "Show All Items")
                            .tooltip()
                            .appendTo(this.wrapper)
                            .button({
                                icons: {
                                    primary: "ui-icon-triangle-1-s"
                                },
                                text: false
                            })
                            .removeClass("ui-corner-all")
                            .addClass("custom-combobox-toggle ui-corner-right")
                            .on("mousedown", function () {
                                wasOpen = input.autocomplete("widget").is(":visible");
                            })
                            .on("click", function () {
                                input.trigger("focus");

                                // Close if already visible
                                if (wasOpen) {
                                    return;
                                }

                                // Pass empty string as value to search for, displaying all results
                                input.autocomplete("search", "");
                            });
                    },

                    _source: function (request, response) {
                        var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
                        response(this.element.children("option").map(function () {
                            var text = $(this).text();
                            if (this.value && (!request.term || matcher.test(text)))
                                return {
                                    label: text,
                                    value: text,
                                    option: this
                                };
                        }));
                    },

                    _removeIfInvalid: function (event, ui) {

                        // Selected an item, nothing to do
                        if (ui.item) {
                            return;
                        }

                        // Search for a match (case-insensitive)
                        var value = this.input.val(),
                            valueLowerCase = value.toLowerCase(),
                            valid = false;
                        this.element.children("option").each(function () {
                            if ($(this).text().toLowerCase() === valueLowerCase) {
                                this.selected = valid = true;
                                return false;
                            }
                        });

                        // Found a match, nothing to do
                        if (valid) {
                            return;
                        }

                        // Remove invalid value
                        this.input
                            .val("")
                            .attr("title", value + " didn't match any item")
                            .tooltip("open");
                        this.element.val("");
                        this._delay(function () {
                            this.input.tooltip("close").attr("title", "");
                        }, 2500);
                        this.input.autocomplete("instance").term = "";
                    },

                    _destroy: function () {
                        this.wrapper.remove();
                        this.element.show();
                    },


                });

                $(".select-combobox").combobox({
                    select: function (event, ui) {
                        changeEvent(event);
                        if (!isDesktop) {
                            setTimeout(function () {
                                $(event.currentTarget).blur();
                            }, 50);
                        }
                    }
                });
                var isDesktop = !app.isMobile;
                var ignoreFocusout = false;

                $('.custom-combobox-input').focusout(function (e) {

                    var value, selectVal;
                    value = $(this).val();
                    selectVal = $(this).closest('.form-group').find('.select-combobox').val();

                    if (value != selectVal) {
                        $(this).closest('.form-group').find('.select-combobox').val('');
                    }
                    changeEvent(e);

                });

                function changeEvent(event) {
                    var val, el = $(event.target).closest('.form-group').find('.select-combobox');
                    val = el.val();
                    el.trigger('input');
                    if (val != "") {
                        $(event.target).closest('.form-group').find('.car-selected-block').addClass('visible');
                        $(event.target).closest('.swiper-slide').addClass('show-btns');
                    } else {
                        $(event.target).closest('.form-group').find('.car-selected-block').removeClass('visible');
                        $(event.target).closest('.swiper-slide').removeClass('show-btns');
                    }
                }

                $('.select-combobox.has-placeholder').each(function () {
                    $(this).parent().find('.custom-combobox-input').attr('placeholder', $(this).attr('data-placeholder'));
                });

                $('.tt-forms .custom-combobox-input').attr('tabindex', '-1');

            },
            initLazyLoad: function () {
                $('.lazy').Lazy({
                    // your configuration goes here
                    scrollDirection: 'vertical',
                    effect: 'fadeIn',
                    visibleOnly: true,
                    onError: function (element) {
                        console.log('error loading ' + element.data('src'));
                    }
                });
            },
            navHashUpdate: function () {
                var hash = window.location.hash;
                hash && $('ul.nav a[href="' + hash + '"]').tab('show');

                $('.nav-tabs a').click(function (e) {
                    $(this).tab('show');
                    var scrollmem = $('body').scrollTop() || $('html').scrollTop();
                    window.location.hash = this.hash;
                    $('html,body').scrollTop(scrollmem);
                });
            },
            scrollToPos: function (pos) {

                if (pos == $(window).scrollTop())
                    return false;

                $('html,body').stop();

                $('html,body').animate({
                    scrollTop: pos
                }, 500);
                return false;
            },
            galleryBlockCarousel: function () {
                var $slider = $('.tt-gallery-block.has-slider'),
                    len = $slider.find('.swiper-slide').length;

                if (app.windowWidth <= 767) {
                    if (len < 2) {
                        return;
                    }
                } else {
                    if (len < 5) {
                        return;
                    }
                }
                $slider.find('.no-slider').removeClass('no-slider');

                var swiper = new Swiper('.tt-gallery-block.has-slider .swiper-container', {
                    slidesPerView: 4,
                    spaceBetween: 2,
                    loop: false,
                    slideToClickedSlide: false,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    breakpoints: {
                        // when window width is <= 320px
                        767: {
                            slidesPerView: 1,
                            spaceBetween: 0,
                            pagination: {
                                el: '.swiper-pagination',
                                type: 'bullets'
                            }
                        },
                    }
                });
            },

            singleSlider: function () {
                var $slider = $('.tt-single-slider');

                if ($slider.find(".swiper-slide").length < 2) {
                    return;
                }

                $slider.find('.no-slider').removeClass('no-slider');

                var swiper = new Swiper('.tt-single-slider:not(.video) .swiper-container', {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    loop: false,
                    slideToClickedSlide: false,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        type: 'fraction'
                    },
                    breakpoints: {
                        // when window width is <= 320px
                        767: {
                            pagination: {
                                el: '.swiper-pagination',
                                type: 'bullets'
                            }
                        },
                    }
                });

            },
            singleSliderVideo: function () {


                var $slider = $('.tt-single-slider.video');

                $slider.each(function () {
                    if ($(this).find('.swiper-slide').length > 1) {
                        $(this).find('no-slider').removeClass('.no-slider');
                    }
                });

                var swiper = new Swiper('.tt-single-slider.video:not(.no-slider) .swiper-container', {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    loop: false,
                    slideToClickedSlide: false,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        type: 'fraction'
                    },
                });

                $('.tt-single-slider .swiper-slide video').closest('.swiper-slide').addClass('local-video video-paused');
                $('.tt-single-slider .swiper-slide .yt-player').closest('.swiper-slide').addClass('youtube-video video-paused');

                $(document).on('click', '.tt-single-slider .local-video video', function () {
                    if (this.paused) {
                        this.play();
                    } else {
                        this.pause();
                    }
                });

                var interval;
                var youtubeVar, youtubeVarStatus;


                // swiper.
                var $lastSlide, $currentSlide;
                swiper.on('slideChange', function () {
                    $lastSlide = $(swiper.slides[swiper.previousIndex]);
                    $currentSlide = $(swiper.slides[swiper.realIndex]);


                    changeContentDirect(swiper.realIndex);

                    if ($lastSlide.hasClass('local-video')) {
                        $lastSlide.find('video').get(0).pause();
                    } else if ($lastSlide.hasClass('youtube-video')) {
                        clearInterval(interval);
                        $lastSlide.data('youtubeVar').pauseVideo();
                        $lastSlide.removeClass('video-playing').addClass('video-paused');
                        $lastSlide.closest('.tt-single-slider').removeClass('state-play').addClass('state-pause')
                    }

                    if ($currentSlide.hasClass('youtube-video')) {
                        youtubeVar = $currentSlide.data('youtubeVar');
                        interval = setInterval(function () {
                            youtubeVarStatus = youtubeVar.getPlayerState();
                            if (youtubeVarStatus == 3 || youtubeVarStatus == 1) {
                                if ($currentSlide.hasClass('video-paused')) {
                                    $currentSlide.removeClass('video-paused').addClass('video-playing');
                                    $currentSlide.closest('.tt-single-slider').removeClass('state-pause').addClass('state-play')
                                }
                            } else {
                                if ($currentSlide.hasClass('video-playing')) {
                                    $currentSlide.removeClass('video-playing').addClass('video-paused');
                                    $currentSlide.closest('.tt-single-slider').removeClass('state-play').addClass('state-pause')
                                }
                            }

                        }, 50);
                    }
                });

                $('.tt-single-slider .swiper-slide video').on('play', function () {
                    $(this).closest('.swiper-slide').removeClass('video-paused').addClass('video-playing');
                    $(this).closest('.tt-single-slider').removeClass('state-pause').addClass('state-play');
                });

                $('.tt-single-slider .swiper-slide video').on('pause', function () {
                    $(this).closest('.swiper-slide').removeClass('video-playing').addClass('video-paused');
                    $(this).closest('.tt-single-slider').removeClass('state-play').addClass('state-pause');
                });

                $('.video-sec .vid-item').on('click', function () {
                    swiper.slideTo($(this).index());
                });

                function changeContentDirect(index) {
                    changeContent(index);
                }

                function changeContent(index) {
                    $("#videoContentMain").html('');
                    var info = $($('.video-sec .vid-item').get(index)).find(".info-padd").html();
                    $("#videoContentMain").html(info);
                }


            },


            initBranchLocator: function () {
                if ($('.no-footer').length && app.isMobile) {
                    $('footer').hide();
                }
                var inputSearch = $('.bh-sl-address');
                inputSearch.keyup(function () {
                    if (inputSearch.val().length >= 1) {
                        $(this).parent().parent().addClass("active");
                    } else {
                        $(this).parent().parent().removeClass("active");
                    }
                });
                var locator = $('#bh-sl-map-container');
                var list = $(".bh-sl-container .bh-sl-loc-list");
                var showList = false;
                $(function () {
                    if (locator.length == true) {
                        app.$body.addClass('is-branchlocator');

                        if (app.environmentLocal == false) {
                            // Dev Environment
                            locator.storeLocator({
                                storeLocationData: null,
                                addressID: 'bh-sl-address',
                                searchID: 'bh-sl-address',
                                nameSearch: true,
                                autoGeocode: true,
                                autoComplete: false,
                                sessionStorage: true,
                                autoCompleteOptions: {},
                                disableDefaultUI: false,
                                mileLang: $('#distanceMile').val(),
                                milesLang: $('#distanceMiles').val(),
                                noResultsTitle: $('#NoResultsFoundTitle').val(),
                                noResultsDesc: $('#NoResultsFoundDescription').val(),
                                slideMap: false,
                                defaultLoc: true,
                                fullscreenControl: false,
                                dataLocation: '/api/feature/findcenter/getcenters?parentID=' + $('#FindCenterID').val(),
                                //Templates
                                infowindowTemplatePath: '/Common/theme/js/plugins/storeLocator/templates/infowindow-description.html',
                                listTemplatePath: '/Common/theme/js/plugins/storeLocator/templates/location-list-description.html',
                                KMLinfowindowTemplatePath: '/Common/theme/js/plugins/storeLocator/templates/kml-infowindow-description.html',
                                KMLlistTemplatePath: '/Common/theme/js/plugins/storeLocator/templates/kml-location-list-description.html',
                                markerImg: '/Common/theme/images/icons/pin-location.svg',
                                //markerIcon: '/Common/theme/images/icons/pin-location.svg',
                                selectedMarkerImg: '/Common/theme/images/icons/pin-location-active.svg',
                                scaledSize: new google.maps.Size(22, 32),
                                defaultLat: $('#defaultLatitude').val(),
                                defaultLng: $('#defaultLongitude').val(),
                                //defaultLat: '44.9207462',
                                //defaultLng: '-93.3935366',
                                callbackMarkerClick: function () {


                                },
                                taxonomyFilters: {
                                    'category': 'category-filters-container1',
                                },
                            });
                        }
                        // Local Environment
                        locator.storeLocator({
                            autoComplete: true,
                            autoCompleteOptions: {},
                            disableDefaultUI: false,
                            slideMap: false,
                            defaultLoc: true,
                            fullscreenControl: false,
                            KMLlistTemplatePath: '../needreplace/media/Project/ToyotaTheme/Common/js/plugins/storeLocator/templates/local-location-list-description.html',
                            //markerIcon: '../needreplace/media/Project/ToyotaTheme/Common/images/icons/pin-location.svg',
                            markerImg: '../needreplace/media/Project/ToyotaTheme/Common/images/icons/pin-location.svg',
                            selectedMarkerImg: '../needreplace/media/Project/ToyotaTheme/Common/images/icons/pin-location-active.svg',
                            scaledSize: new google.maps.Size(22, 32),
                            defaultLat: '44.9207462',
                            defaultLng: '-93.3935366',
                        });
                    }
                });


            },
            initAdaptativeDesign: function () {
                var desktopItem = $(".tt-vehicles-item");
                var mobileItem = $(".tt-title-vehicles");
                if (app.windowWidth <= 992) {
                    desktopItem.remove();
                    //console.log("mobile")
                } else {
                    mobileItem.remove();
                    //console.log("desktop")
                }
            },
            windowResize: function () {

                var width = $(window).width();
                if (!app.environmentLocal) {
                    $(window).on('resize', function () {
                        if ($(this).width() != width) {
                            width = $(this).width();
                            //console.log(width);
                            console.log('rotate');
                            if (window.RT) clearTimeout(window.RT);
                            window.RT = setTimeout(function () {
                                this.location.reload(false);
                            }, 100);
                        }
                    });
                }

            },
            initFullBoxClickable: function () {
                /*$(".myBox").click(function () {
                 window.location = $(this).find("a").attr("href");
                 return false;
                 });*/
            },
            initFixErrorPageHeight: function () {

                function fixAboutUsboxes() {
                    var count = $('.about-us-box-container').length;
                    var itemWidth = $('.about-us-box-container').innerWidth() + 30;
                    // $('.about-us-boxes-listing').width(count * itemWidth);
                }

                function fixErrorPageHeight() {
                    var wh = $(window).height();
                    var headerHeight = $('header').height();
                    var footerHeight = $('footer').height();
                    $('.error-page').height(wh - headerHeight - footerHeight);
                }

                if (window.innerWidth <= 991) {
                    fixAboutUsboxes();
                }
                else {
                    $('.about-us-boxes-listing').removeAttr('style')
                }
                //fixErrorPageHeight();
            },
            initStoreLocatorMobile: function () {

                var scrollLocation = 0;

                if (window.innerWidth <= 991) {
                    $(document).on('click', '.tt-maps-accordion .accordion-inner', function () {
                        scrollLocation = $(window).scrollTop();
                    }).on('click', '.accordion-mobile-header-controls', function () {
                        $(window).scrollTop(scrollLocation);
                    });
                }


                // show find center filter on mobile
                $('.mobile-filter').on('click', function () {
                    /*    app.$body.removeClass('force-show-list');
                     if (app.$body.hasClass('scroll-attached')) {
                     // $(document).unbind("scroll", scrollBlur);
                     app.$body.removeClass('scroll-attached');
                     }*/

                    app.$body.addClass('mob-filters-open');

                    $('.tt-form-input-inline:nth-child(2)').show();
                    $('.map-filter-heading').show();
                    if ($('.pac-container').hasClass('show')) {
                        $('.tt-branch-locator-form-sec').removeClass('filterScroll');
                        $('.filter-mobile-header-controls').removeClass('show');
                        $('.pac-container').removeClass('show');
                    }
                });

                // close icon for filter modal
                $('.filter-modal-close, .applyFilter-close').on('click', function () {

                    if (app.$body.hasClass('mob-filter-show')) {
                        app.$body.removeClass('mob-filter-show');
                        $('.ui-autocomplete').hide();

                        var $target = $('html,body');
                        $target.animate({scrollTop: $target});
                    }

                    app.$body.removeClass('mob-filters-open');


                    $('.tt-form-input-inline:nth-child(2)').hide();
                    $('.map-filter-heading').hide();
                    $('.tt-branch-locator-form-sec').removeClass('show-mobile-filter');

                    app.$body.addClass('mob-filter-show');
                    $('.tt-branch-locator-form-sec').addClass('show-mobile-filter');
                    $('.filter-mobile-header-controls').addClass('show');
                    $('.pac-container').addClass('show');
                    $('.tt-branch-locator-form-sec .form-input.hidden-md-up').hide();
                });

                // fixed search bar to top on scroll in mobile
                /*$(document).on('scroll', function () {
                 if ($(this).scrollTop() >= 100) {
                 $('.tt-branch-locator-form-sec').addClass('filter-scroll');
                 }
                 else {
                 if (!$('.tt-branch-locator-form-sec').hasClass('show-mobile-filter')) {
                 $('.tt-branch-locator-form-sec').removeClass('filter-scroll');
                 }
                 }
                 })*/


                if ($(".bh-sl-loc-list").length) {
                    $(window).scroll(function () {
                        if ($('.bh-sl-loc-list').length >= 1) {

                            var offset = $(".bh-sl-loc-list").offset().top - 157;

                            if ($(window).scrollTop() >= offset) {
                                //$("body").addClass("filter-scroll-show");
                                setTimeout(function () {

                                    $("body").addClass("filter-scroll-show");

                                }, 10);
                            }
                            else {
                                if (!$('.tt-branch-locator-form-sec').hasClass('show-mobile-filter')) {
                                    setTimeout(function () {
                                        $('body').removeClass('filter-scroll-show');
                                    }, 10);

                                }
                            }
                        }
                    });
                }


                /* $(window).on('touchstart', function(e) {
                 if(app.$body.hasClass('scroll-attached')) {
                 if ($(e.target).closest('.tt-branch-locator-form-sec .form-input:first-child').length == 1) {
                 console.log('touch event');

                 alert(true);

                 $('html,body').animate({
                 scrollTop: 0
                 }, 200);

                 setTimeout(function(){
                 console.log('callback');
                 // $('.bh-sl-address').addClass('pointer-allow');
                 $('.bh-sl-address').trigger('click');
                 // $('.bh-sl-address').trigger('focus');
                 $('.bh-sl-address').focus();
                 },250);

                 e.preventDefault();
                 e.stopPropagation();
                 e.stopImmediatePropagation()

                 }
                 }
                 });*/

                // click filter input box
                $(document).on('click touchstart', '#bh-sl-address', function (e) {

                    if (window.innerWidth <= 990) {

                        app.$body.addClass('mob-filter-show');
                        $('.tt-branch-locator-form-sec').addClass('show-mobile-filter');
                        $('.filter-mobile-header-controls').addClass('show');
                        $('.pac-container').addClass('show');
                        $('.tt-branch-locator-form-sec .form-input.hidden-md-up').hide();

                        /*setTimeout(function () {
                         app.$body.addClass('force-show-list');

                         if (!app.$body.hasClass('scroll-attached') && window.innerWidth <= 991) {
                         app.$body.addClass('scroll-attached');
                         // $(document).bind("scroll", scrollBlur);
                         }
                         }, 400);*/

                    }


                });

                /*
                 function scrollBlur(e){
                 console.log('scrolling event running');
                 if($('.mob-filter-show').length && $(document.activeElement).is('#bh-sl-address')){
                 $('#bh-sl-address').blur();
                 console.log('blurring');
                 }
                 }
                 */

                /*$(document).on('click', '.tt-page-findacenter .ui-autocomplete .ui-menu-item', function (e) {
                 $('body').removeClass('force-show-list');
                 if (app.$body.hasClass('scroll-attached')) {
                 // $(document).unbind("scroll", scrollBlur);
                 app.$body.removeClass('scroll-attached');
                 }
                 });
                 */

                // show back bar on filter input click
                $('.filter-mobile-header-controls').on('click', function () {

                    /*app.$body.removeClass('force-show-list');
                     if (app.$body.hasClass('scroll-attached')) {
                     // $(document).unbind("scroll", scrollBlur);
                     app.$body.removeClass('scroll-attached');
                     }
                     */

                    $('#bh-sl-address').val('');
                    $('#bh-sl-address-btn').trigger('click');

                    app.$body.removeClass('mob-filter-show');
                    $('.ui-autocomplete').hide();


                    $('.tt-branch-locator-form-sec .form-input.hidden-md-up').show();
                    $('.tt-branch-locator-form-sec').removeClass('show-mobile-filter').css({top: '0'});
                    $(this).removeClass('show');
                    //$("body").removeClass('filter-scroll-show');
                    $('.pac-container').removeClass('show');
                    //$('.bh-sl-loc-list').removeClass('no-result-found');
                    //$('.bh-sl-container .bh-sl-loc-list ul').hide();
                    // scroll to top on click to back button
                    var $target = $('html,body');
                    $target.animate({scrollTop: $target});

                });

                $('.tt-subscription-box').find('.tt-success').hide();
                $('.submit-newsletter').on('click', function () {
                    if ($('.tt-subscription-box .form-control').val() === '') {
                        $('.tt-subscription-box .form-control').addClass('input-validation-error');
                        return true;
                    }
                    if ($(this).parent().find('.input-validation-error').length != 0) {
                        event.preventDefault();
                        return false;
                    }
                    else {
                        $('.tt-subscription-box').find('.tt-form').hide();
                        $('.tt-subscription-box').find('.tt-success').show();
                        return true;

                    }
                });


                /*if(window.innerWidth <= 991){
                 $('#bh-sl-address').click(function(){
                 app.$body.addClass('force-show-autocomplete');
                 setTimeout(function(){
                 $(document).bind("scroll", scrollBlur);
                 },500);
                 });
                 }


                 function scrollBlur(){
                 console.log('event binded')
                 if($('.mob-filter-show').length && $(document.activeElement).is('#bh-sl-address')){
                 $('#bh-sl-address').blur();
                 console.log('blurring');
                 }
                 }
                 */

            },
            hideStoreListOnClose: function () {
                $(".bh-sl-address-close-btn").on("click", function () {
                    $(".bh-sl-address").val("");
                    $(".tt-form-input-inline").removeClass("active");
                    $(".bh-sl-loc-list").hide();
                    $("body").removeClass("bh-search-done");
                });
            },
            StopAjaxSCFormUpdate: function () {
                $.each(document.forms, function (index, value) {
                    $(this).removeAttr('data-ajax-update');
                });
            },
            autoExpandedTextarea: function () {
                var textarea = $('.auto-expanded');
                textarea.on('keydown keyup', autosize);
                function autosize() {
                    var el = this;
                    setTimeout(function () {
                        el.style.cssText = 'height:auto; padding:0';
                        el.style.cssText = 'height:' + el.scrollHeight + 'px';
                    }, 0);
                }
            },
            backToTopMobile: function () {
                var backToBtn = $('.back-to-top');
                if (backToBtn.length) {
                    var scrollTrigger = 100, // px
                        backToTop = function () {
                            var scrollTop = $(window).scrollTop();
                            if (scrollTop > scrollTrigger) {
                                backToBtn.addClass('show');
                            } else {
                                backToBtn.removeClass('show');
                            }
                        };
                    backToTop();
                    $(window).on('scroll', function () {
                        backToTop();
                    });
                    backToBtn.on('click', function (e) {
                        e.preventDefault();
                        $('html,body').animate({
                            scrollTop: 0
                        }, 700);
                    });
                }
            },
            stopAllVideoJS: function () {
                var videoJS = $('.video-js');
                if (videoJS.length >= 1) {
                    videoJS.each(function () {
                        videojs(this.id).ready(function () {
                            player = this;
                            player.pause();
                        });
                    });
                }

                /*jQuery.each(window.vjs.players, function (i, player) {
                 player.pause();
                 });*/


            },
            stopAllVideos: function (element) {

                $('video').each(function () {
                    $(this)[0].pause();
                });
                //console.log("stopAllVideos")

            }

            ,
            random: function () {
                $(".image").each(function () {
                    if ($(this).children("img").length == 0 || $(this).children("img").attr('src') == ""  ) {
                        $(this).addClass("empty");
                        $(this).parent().addClass("empty");
                    }
                });
                $(".tt-car-item .image").each(function () {
                    if ($(this).children("img").length == 0) {
                        $(this).parent().addClass("empty-car-item");
                    }
                });


            },
            init: function () {

                // console.clear();
                app.detectCulture();
                app.detectDevice();
                app.setCssOfElements();
                app.resizeListner();
                app.adaptiveImages();
                app.addEventListner();
                app.msIeVersion();
                app._splitRows('.test', 3);
                /*  app.customUl();
                 app.regionDropdown();
                 app.notice();
                 app.bluOverlay();*/
                app.navSticky();
                app.modelsCarousel();
                app.bannerSlider();
                app.searchBoxToggle();
                app.navMenuToggle();
                //app.mobileMenu();
                //app.calendar();
                app.textExpend();
                app.ttTabsFirstInit();
                app.ttTabs();
                /*app.region();*/
                app.supportDropdown();
                app.initMutedVideo();
                app.ttAccordion();
                app.initSlidePushMenu();
                app.carColorsSwitcher();
                app.linkListCarousel();
                app.initSmartMenuHover();
                app.venobox();
                app.galleryBlockVideo();
                app.carCompareOverlay();

                app.inpageNavMobile();
                app.selectize();
                app.initLazyLoad();
                //app.navHashUpdate();
                app.galleryBlockCarousel();
                app.singleSlider();
                app.singleSliderVideo();
                app.initBranchLocator();
                app.initAdaptativeDesign();
                app.initFullBoxClickable();

                app.initFixErrorPageHeight();
                app.initStoreLocatorMobile();
                app.hideStoreListOnClose();
                app.StopAjaxSCFormUpdate();
                app.autoExpandedTextarea();
                // app.stopAllVideos();
                if (app.environmentLocal == true) {
                    app.initBookTestDrive();

                }
                if (app.windowWidth <= 767) {
                    app.backToTopMobile();
                }
                app.random();
                //app.windowResize();
            }
        }
        ;
    window.app = app;


})
(window, document, jQuery);
$(document).ready(function () {
    app.init();
    /* testing */

    window.onload = function () {
        if (location.hash) {
            window.scrollTo(0, 0);
        }
    };
});

$(window).resize(function () {
    app.initFixErrorPageHeight();
});

$(document).ajaxComplete(function () {
    app.ttAccordion();
    app.ttTabs();

    //console.log("Triggered ajaxComplete handler.");
});


// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var ytPlayer;

function onYouTubeIframeAPIReady() {

    $('.yt-player').each(function (index, item) {

        var parent = null;

        if ($(item).closest('.swiper-slide').length) {
            parent = $(item).closest('.swiper-slide');
        }


        ytPlayer = new YT.Player(item, {
            videoId: $(item).attr('data-video-id').trim(),
            playerVars: {
                autoplay: 0,
                mute: 0,
                rel: 0,
                controls: 1,
                playsinline: 1,
                loop: 1,
                version: 3,
                playlist: $(item).attr('data-video-id').trim()

            }
        });

        parent.data({
            'youtubeVar': ytPlayer,
        });

    });

}


function ConvertTimeformatGetHour(format, str) {
    var time = str;
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/\s(.*)$/)[1];
    if (AMPM == "PM" && hours < 12) hours = hours + 12;
    if (AMPM == "AM" && hours == 12) hours = hours - 12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;
    return sHours;
}

function ConvertTimeformatGetMinutes(format, str) {
    var time = str;
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/\s(.*)$/)[1];
    if (AMPM == "PM" && hours < 12) hours = hours + 12;
    if (AMPM == "AM" && hours == 12) hours = hours - 12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;
    return sMinutes;
}

function UpdateHours(selectedLocation) {

    //Get Users Current Day
    var dt = new Date();
    var dayNames = ["0", "1", "2", "3", "4", "5", "6"];

    var todaysDay = dayNames[dt.getDay()];

    var showClosingHoursAfterMinutes = $('#ShowClosingHoursAfterMinutes').val();

    $('.closingSoon').hide();

    if (showClosingHoursAfterMinutes && parseInt(showClosingHoursAfterMinutes) > 0) {

        showClosingHoursAfterMinutes = parseInt(showClosingHoursAfterMinutes);
        if (selectedLocation[0].getElementsByClassName("tt-toyotaCenterTiming") && selectedLocation[0].getElementsByClassName("dayTitle")) {

            var isConditionMatch = false;
            var allDayTimings = selectedLocation[0].getElementsByClassName("tt-toyotaCenterTiming");
            for (var dayTimings = 0; dayTimings < allDayTimings.length; dayTimings++) {
                if (!isConditionMatch) {
                    var dayTime = allDayTimings[dayTimings].getElementsByClassName("tt-time-value");
                    if (dayTime[0].innerHTML.indexOf('-') > -1) {
                        var dayTimeSplit = dayTime[0].innerHTML.split('-');
                        var startDayParsed = parseInt(dayTimeSplit[0]);
                        var endDayParsed = parseInt(dayTimeSplit[1]);
                        if (startDayParsed >= 0 && endDayParsed < 8) {
                            if (todaysDay >= startDayParsed && todaysDay <= endDayParsed) {
                                if (!isConditionMatch) {
                                    var currentUserTime = dt.getHours() + ":" + dt.getMinutes();
                                    var toyotaStoreClosingTime = allDayTimings[dayTimings].getElementsByClassName("dayclosingtime")[0];
                                    if (toyotaStoreClosingTime) {
                                        var storeClosingTimeHour = ConvertTimeformatGetHour("24", toyotaStoreClosingTime.innerHTML);
                                        var storeClosingTimeMinutes = ConvertTimeformatGetMinutes("24", toyotaStoreClosingTime.innerHTML);

                                        //Now we need to compare when to show the closing tim
                                        //Create date object and set the time to that
                                        var startTimeObject = new Date();
                                        startTimeObject.setHours(storeClosingTimeHour, storeClosingTimeMinutes, 0);

                                        //Create date object and set the time to that
                                        var endTimeObject = new Date(startTimeObject);
                                        endTimeObject.setHours(dt.getHours(), dt.getMinutes(), 0);

                                        var minutes = (endTimeObject - startTimeObject) / (60 * 1000);

                                        if (minutes >= -showClosingHoursAfterMinutes && minutes < 0) {
                                            $('.closingSoonTime').html(toyotaStoreClosingTime.innerHTML);
                                            $('.closingSoon').show();
                                            isConditionMatch = true;
                                            return true;
                                        } else {
                                            $('.closingSoon').hide();
                                            return true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else {
                        //Int Parse
                        var iNum = parseInt(dayTime[0].innerHTML);
                        if (iNum && todaysDay == iNum) {
                            //Show Closing
                            //Now we need to compare when to show the closing time

                            var currentUserTime = dt.getHours() + ":" + dt.getMinutes();
                            var toyotaStoreClosingTime = allDayTimings[dayTimings].getElementsByClassName("dayclosingtime")[0];
                            if (toyotaStoreClosingTime) {
                                var storeClosingTimeHour = ConvertTimeformatGetHour("24", toyotaStoreClosingTime.innerHTML);
                                var storeClosingTimeMinutes = ConvertTimeformatGetMinutes("24", toyotaStoreClosingTime.innerHTML);

                                //Create date object and set the time to that
                                var startTimeObject = new Date();
                                startTimeObject.setHours(storeClosingTimeHour, storeClosingTimeMinutes, 0);

                                //Create date object and set the time to that
                                var endTimeObject = new Date(startTimeObject);
                                endTimeObject.setHours(dt.getHours(), dt.getMinutes(), 0);

                                var minutes = (endTimeObject - startTimeObject) / (60 * 1000);

                                if (minutes >= -showClosingHoursAfterMinutes && minutes < 0) {
                                    $('.closingSoonTime').html(toyotaStoreClosingTime.innerHTML);
                                    $('.closingSoon').show();
                                    isConditionMatch = true;
                                    return true;
                                } else {
                                    $('.closingSoon').hide();
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}





