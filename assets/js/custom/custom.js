/*!
 * Template Functions
*/

let isRecaptchaInit = false;
let appSent = false;

(function($){

    "use strict";

    /* ---------------------------------------------- /*
     * Preloader
    /* ---------------------------------------------- */

    $(window).on('load', function() {

        if($('div').is('.page-loader')) {
            $('.page-loader').delay(500).fadeOut(800);
        }

    });

    turnstile.ready(function () {
        isRecaptchaInit = true;			
    });

    setSubmitHandler("email_up");    

    $(document).ready(function() {

        var header             = $('.header'),
            one_page_nav       = $('.onepage-nav'),
            parallax           = $('.parallax'),
            bloggrid           = $('.row-post-masonry'),
            background         = $('[data-background]'),
            module_slides      = $('.module-cover-slides'),
            margin_y           = $('[data-mY]'),
            progress           = $('.progress-item'),
            counter_timer      = $('.counter-timer'),
            pie_chart          = $('.chart'),
            twitter_feed       = $('.twitter-feed'),
            stiky_sidebar      = $('.sticky-sidebar'),
            map                = $('.map'),
            smoothscroll       = $('.smoothscroll'),
            play_btn           = $('.play-button'),
            gallery            = $('.gallery'),
            shop_gallery       = $('.shop-single-item-popup'),
            portfolio_carousel = $('.portfolio-carousel'),
            shop_carousel      = $('.shop-carousel'),
            clients_carousel   = $('.clients-carousel'),
            review_slides      = $('.review-slides'),
            review_carousel    = $('.review-carousel'),
            image_slider       = $('.image-slider'),
            contact_form       = $('#contact-form');

        /* ---------------------------------------------- /*
         * Collapse navbar on click
        /* ---------------------------------------------- */

        $(document).on('click', '.inner-navigation.show', function(e) {
            if ($(e.target).is('span')  && !$(e.target).parent().parent().hasClass('menu-item-has-children')) {
                $(this).collapse('hide');
            }
        });

        /* ---------------------------------------------- /*
         * One Page Nav
        /* ---------------------------------------------- */

        $('a', one_page_nav).filter(function() {
            if ($(this).is(':not([href^="#"])')) {
                $(this).addClass('external');
            }
        });

        one_page_nav.singlePageNav({
            filter:       ':not(.external)',
            currentClass: 'active',
            offset:       '58',
        });

        /* ---------------------------------------------- /*
         * Header animation
        /* ---------------------------------------------- */

        $(window).scroll(function() {
            var scroll = $(window).scrollTop();
            if (scroll >= 5) {
                header.addClass('header-small');
                header.addClass('header-shadow');
            } else {
                header.removeClass('header-small');
                header.removeClass('header-shadow');
            }
        }).scroll();

        module_slides.each(function () {
            $(this).superslides($.extend({
                play:            10000,
                animation:       'slide',
                animation_speed: 800,
                pagination:      true,
                scrollable:      true,
            }, $(this).data('module-cover-slides-options')));
        });

        /* ---------------------------------------------- /*
         * Setting background of modules
        /* ---------------------------------------------- */

        parallax.each(function() {
            if ($(this).attr('data-gradient') == 1) {
                $(this).append('<div class="overlay-background overlay-gradient"></div>');
                $(this).find('.overlay-background').css('opacity', $(this).attr('data-overlay'));
            } else if ($(this).attr('data-overlay') > 0) {
                $(this).append('<div class="overlay-background"></div>');
                $(this).find('.overlay-background').css('opacity', $(this).attr('data-overlay'));
            }
        });

        background.each(function() {
            $(this).css('background-image', 'url(' + $(this).attr('data-background') + ')');
        });

        margin_y.each(function() {
            $(this).css('margin-top', $(this).attr('data-mY') );
        });

        /* ---------------------------------------------- /*
         * Off-canvas
        /* ---------------------------------------------- */

        $('.off-canvas-open, .off-canvas-close').on('click', function() {
            $('body').toggleClass('off-canvas-sidebar-open');
            return false;
        }).resize();

        $(document).on('click', function(e) {
            var container = $('.off-canvas-sidebar');
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                $('body').removeClass('off-canvas-sidebar-open');
            }
        }).resize();

        function getScrollBarWidth() {
            var inner = document.createElement('p');
            inner.style.width = "100%";
            inner.style.height = "200px";
            var outer = document.createElement('div');
            outer.style.position = "absolute";
            outer.style.top = "0px";
            outer.style.left = "0px";
            outer.style.visibility = "hidden";
            outer.style.width = "200px";
            outer.style.height = "150px";
            outer.style.overflow = "hidden";
            outer.appendChild (inner);
            document.body.appendChild (outer);
            var w1 = inner.offsetWidth;
            outer.style.overflow = 'scroll';
            var w2 = inner.offsetWidth;
            if (w1 == w2) w2 = outer.clientWidth;
            document.body.removeChild (outer);
            return (w1 - w2);
        };

        $('.off-canvas-sidebar-wrapper').css('margin-right', '-' + getScrollBarWidth() + 'px');

        $(window).on('resize', function() {
            var width    = Math.max($(window).width(), window.innerWidth);

            if ( width <= 991 ) {
                $('body').removeClass('off-canvas-sidebar-open');
            }
        });

        /* ---------------------------------------------- /*
         * Portfolio masonry
        /* ---------------------------------------------- */

        var filters   = $('.filters'),
            worksgrid = $('.row-portfolio');

        $('a', filters).on('click', function() {
            var selector = $(this).attr('data-filter');
            $('.current', filters).removeClass('current');
            $(this).addClass('current');
            worksgrid.isotope({
                filter: selector
            });
            return false;
        });

        $(window).on('resize', function() {
            worksgrid.imagesLoaded(function() {
                worksgrid.isotope({
                    layoutMode: 'masonry',
                    itemSelector: '.portfolio-item',
                    transitionDuration: '0.4s',
                    masonry: {
                        columnWidth: '.grid-sizer',
                    },
                });
            });
        });

        /* ---------------------------------------------- /*
         * Blog masonry
        /* ---------------------------------------------- */

        $(window).on('resize', function() {
            setTimeout(function() {
                bloggrid.isotope({
                    layoutMode: 'masonry',
                    transitionDuration: '0.5s',
                });
            }, 1000);
        }).resize();

        /* ---------------------------------------------- /*
         * Carousel/Sliders
        /* ---------------------------------------------- */

        image_slider.each(function () {
            $(this).owlCarousel($.extend({
                dots:       1,
                nav:        1,
                center:     1,
                items:      1,
                loop:       1,
                autoHeight: 0,
                margin:     0,
                navText: [
                    '<span class="ti-arrow-left"></span>',
                    '<span class="ti-arrow-right"></span>'
                ],
            }, $(this).data('carousel-options')));
        });

        review_slides.each(function () {
            $(this).owlCarousel($.extend({
                autoplay:   5000,
                nav:        1,
                items:      1,
                loop:       1,
                navText: [
                    '<span class="ti-arrow-left"></span>',
                    '<span class="ti-arrow-right"></span>'
                ],
            }, $(this).data('carousel-options')));
        });

        review_carousel.each(function () {
            $(this).owlCarousel($.extend({
                nav:      0,
                dots:     1,
                autoplay: 1,
                items:    1,
                loop:     1,
                margin:   30,
                responsive: {
                    768: {
                        items: 2
                    },
                    1025: {
                        items: 3
                    }
                },
                navText: [
                    '<span class="ti-angle-left"></span>',
                    '<span class="ti-angle-right"></span>'
                ],
            }, $(this).data('carousel-options')));
        });

        clients_carousel.each(function () {
            $(this).owlCarousel($.extend({
                nav:      0,
                dots:     1,
                autoplay: 1,
                items:    2,
                loop:     1,
                responsive: {
                    768: {
                        items: 4
                    }
                },
                navText: [
                    '<span class="ti-arrow-left"></span>',
                    '<span class="ti-arrow-right"></span>'
                ],
            }, $(this).data('carousel-options')));
        });

        shop_carousel.each(function () {
            $(this).owlCarousel($.extend({
                nav:      0,
                dots:     1,
                autoplay: 1,
                items:    1,
                loop:     1,
                margin:   30,
                responsive: {
                    768: {
                        items: 2
                    },
                    1025: {
                        items: 4
                    }
                },
                navText: [
                    '<span class="ti-angle-left"></span>',
                    '<span class="ti-angle-right"></span>'
                ],
            }, $(this).data('carousel-options')));
        });

        portfolio_carousel.each(function () {
            $(this).owlCarousel($.extend({
                nav:      1,
                dots:     0,
                autoplay: 1,
                items:    1,
                loop:     1,
                margin:   30,
                responsive: {
                    768: {
                        items: 2
                    },
                    1025: {
                        items: 4
                    }
                },
                navText: [
                    '<span class="ti-angle-left"></span>',
                    '<span class="ti-angle-right"></span>'
                ],
            }, $(this).data('carousel-options')));
        });

        /* ---------------------------------------------- /*
         * Popup
        /* ---------------------------------------------- */

        play_btn.magnificPopup({
            type: 'iframe',
        });

        gallery.magnificPopup({
            type: 'image',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0,1]
            },
            image: {
                titleSrc: 'title',
                tError: 'The image could not be loaded.',
            }
        });

        shop_gallery.magnificPopup({
            type: 'image',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0,1]
            },
            image: {
                titleSrc: 'title',
                tError: 'The image could not be loaded.',
            }
        });

        /* ---------------------------------------------- /*
         * Progress bars, counters, pie charts animations
        /* ---------------------------------------------- */

        progress.each(function() {
            $(this).appear(function() {
                var percent = $(this).find('.progress-bar').attr('aria-valuenow');
                $(this).find('.progress-bar').animate({'width' : percent + '%'});
                $(this).find('.progress-number').countTo({
                    from: 0,
                    to: percent,
                    speed: 900,
                    refreshInterval: 30
                });
            });
        });

        counter_timer.each(function() {
            $(this).appear(function() {
                var number = $(this).find('strong').attr('data-to');
                $(this).countTo({
                    from:            0,
                    to:              number,
                    speed:           1500,
                    refreshInterval: 10,
                    formatter: function (number, options) {
                        number = number.toFixed(options.decimals);
                        number = number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        return number;
                    }
                });
            });
        });

        pie_chart.each(function() {
            $(this).appear(function() {
                $(this).easyPieChart($.extend({
                    barColor:   '#000000',
                    trackColor: '#eeeeee',
                    scaleColor: false,
                    lineCap:    'round',
                    lineWidth:  3,
                    size:       150,
                }, $(this).data('chart-options')));
            });
        });

        /* ---------------------------------------------- /*
         * Twitter
        /* ---------------------------------------------- */

        twitter_feed.each(function (index) {
            $(this).attr('id', 'twitter-' + index);
            var twitterID      = $(this).data('twitter');
            var twitterMax     = $(this).data('number');
            var twitter_config = {
                'id':             twitterID,
                'domId':          'twitter-' + index,
                'maxTweets':      twitterMax,
                'enableLinks':    true,
                'showPermalinks': false
            };
            twitterFetcher.fetch(twitter_config);
        });

        /* ---------------------------------------------- /*
         * Sticky Sidebar
        /* ---------------------------------------------- */

        stiky_sidebar.imagesLoaded(function() {
            stiky_sidebar.stick_in_parent({
                offset_top: 80,
                recalc_every: 1
            })
            .on('sticky_kit:bottom', function(e) {
                $(this).parent().css('position', 'relative');
            })
            .on('sticky_kit:unbottom', function(e) {
                $(this).parent().css('position', 'relative');
            }).scroll();
        });

        /* ---------------------------------------------- /*
         * Tooltip
        /* ---------------------------------------------- */

        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })

        /* ---------------------------------------------- /*
         * A jQuery plugin for fluid width video embeds
        /* ---------------------------------------------- */

        $('body').fitVids();

        /* ---------------------------------------------- /*
         * Contact form ajax
        /* ---------------------------------------------- */

        contact_form.find('input,textarea').jqBootstrapValidation({
            preventSubmit: true,
            submitError: function($form, event, errors) {
                // additional error messages or events
            },
            submitSuccess: function($form, event) {
                event.preventDefault();

                var submit            = $('submit', contact_form);
                var ajaxResponse      = $('#contact-response');
                var name              = $('[name="name"]', contact_form).val();
                var email             = $('[name="email"]', contact_form).val();
                var subject           = $('[name="subject"]', contact_form).val();
                var message           = $('[name="message"]', contact_form).val();

                $.ajax({
                    type: 'POST',
                    url: 'assets/php/contact.php',
                    dataType: 'json',
                    data: {
                        name: name,
                        email: email,
                        subject: subject,
                        message: message,
                    },
                    cache: false,
                    beforeSend: function(result) {
                        submit.empty();
                        submit.append('<i class="fa fa-cog fa-spin"></i> Wait...');
                    },
                    success: function(result) {
                        if(result.sendstatus == 1) {
                            ajaxResponse.html(result.message);
                            $form.fadeOut(500);
                        } else {
                            ajaxResponse.html(result.message);
                        }
                    }
                });
            }
        });

        /* ---------------------------------------------- /*
         * Google Map
        /* ---------------------------------------------- */

        map.each(function() {

            var reg_exp = /\[[^(\]\[)]*\]/g;

            var map_div        = $(this);
            var is_draggable   = Math.max($(window).width(), window.innerWidth) > 736 ? true : false;
            var is_street_view = ( map_div.data('street-view') ) ? true : false;

            if (map_div.length > 0) {

                var markers_addresses = map_div[0].getAttribute('data-addresses').match(reg_exp),
                    markers_info      = map_div[0].getAttribute('data-info').match(reg_exp),
                    markers_icon      = map_div.data('icon'),
                    map_zoom          = map_div.data('zoom');

                var	markers_values = [], map_center;

                markers_addresses.forEach( function(marker_address, index) {
                    var marker_value = '{'
                    marker_value    += '"latLng":' + marker_address;
                    if (index == 0) {
                        map_center = JSON.parse(marker_address);
                    };
                    if (markers_info[index]) {
                        var marker_data = markers_info[index].replace(/\[|\]/g, '');
                        marker_value   += ', "data":"' + marker_data + '"';
                    };
                    marker_value += '}';
                    markers_values.push(JSON.parse(marker_value));
                });

                var map_options = {
                    scrollwheel: false,
                    styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}]
                };

                map_options.center    = map_center;
                map_options.zoom      = map_zoom;
                map_options.draggable = is_draggable;

                var markers_options = {
                    icon: markers_icon,
                };

                var map_config = {
                    map: {
                        options: map_options,
                    },
                    streetviewpanorama: {
                        options: {
                            container: $(this),
                            opts: {
                                visible:  is_street_view,
                                position: map_center,
                                enableCloseButton: true,
                                scrollwheel: false,
                            }
                        }
                    },
                    marker: {
                        values:  markers_values,
                        options: markers_options,
                        events: {
                            click: function(marker, event, context) {
                                if (context.data) {
                                    var map        = $(this).gmap3("get"),
                                        infowindow = $(this).gmap3({get:{name:"infowindow"}});
                                    if (infowindow) {
                                        infowindow.open(map, marker);
                                        infowindow.setContent(context.data);
                                    } else {
                                        $(this).gmap3({
                                            infowindow:{
                                                anchor:marker,
                                                options:{content: context.data}
                                            }
                                        });
                                    }
                                }
                            }
                        }
                    }
                };
                map_div.gmap3(map_config);
            };
        });

        /* ---------------------------------------------- /*
         * Scroll Animation
        /* ---------------------------------------------- */

        smoothscroll.on('click', function(e) {
            var target  = this.hash;
            var $target = $(target);
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top - 58
            }, 600, 'swing');
            e.preventDefault();
        });

        /* ---------------------------------------------- /*
         * Scroll top
        /* ---------------------------------------------- */

        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                $('.scroll-top').addClass('scroll-top-visible');
            } else {
                $('.scroll-top').removeClass('scroll-top-visible');
            }
        });

        $('a[href="#top"]').on('click', function() {
            $('html, body').animate({ scrollTop: 0 }, 'slow');
            return false;
        });

        /* ---------------------------------------------- /*
         * Parallax
        /* ---------------------------------------------- */

        parallax.jarallax({
            speed: 0.4,
        });

    });

})(jQuery);

function sendApplicationData(form_id, token)
{
	let min_type = "";
	if ($(form_id).find('input[name="min_type_1"]').is(":checked")) {
		min_type = "/서비스문의";
	}

	if ($(form_id).find('input[name="min_type_2"]').is(":checked")) {
		min_type = min_type + "/제휴및협업";
	}

	if ($(form_id).find('input[name="min_type_3"]').is(":checked")) {
		min_type = min_type + "/SW개발";
	}

	if ($(form_id).find('input[name="min_type_4"]').is(":checked")) {
		min_type = min_type + "/기타문의";
	}

	if (min_type == "") {
		showDialog("문의 종류를 선택해 주세요.", null);
		hideLoader();
		return false;
	}

	let form_content = $("#form_content").val();
	if (form_content == "") {
		showDialog("문의 내용을 입력해 주세요.", null);
		hideLoader();
		return false;
	}

	let form_phone = $(form_id).find('input[name="form_phone"]').val();
	if (form_phone == "") {
		showDialog("전화번호를 입력해 주세요.", null);
		hideLoader();
		return false;
	}

	let form_email = $(form_id).find('input[name="form_email"]').val();
	if (form_email == "") {
		showDialog("이메일을 입력해 주세요.", null);
		hideLoader();
		return false;
	}

	if ($(form_id).find("#agree_1").length > 0 && $(form_id).find("#agree_1").is(":checked") == false) {
		showDialog("개인정보 처리방침에 동의해주세요.", null);
		hideLoader();
		return false;
	}	
	
	let ref = $('<input type="hidden" value="' + document.referrer + '" name="ref">');	
	$(form_id).append(ref);	
	ref = $('<input type="hidden" value="' + min_type + '" name="min_type">');	
	$(form_id).append(ref);	
	ref = $('<input type="hidden" value="catchmecontact" name="form_kind">');	
	$(form_id).append(ref);

	if (isRecaptchaInit == false) {
        turnstile.ready(function () {
			isRecaptchaInit = true;
			turnstile.render('#turnstileWidget', {
				sitekey: '0x4AAAAAAA62_43H2MO9goDN',
				callback: function(token) {
					$(form_id).find('input[name="form_token"]').val(token);
                    let fed = new FormData($(form_id)[0]);
                    ajaxRequestForContact(form_id, fed);
				},
			});
		});
	}
	else {
        turnstile.render('#turnstileWidget', {
			sitekey: '0x4AAAAAAA62_43H2MO9goDN',
			callback: function(token) {
				$(form_id).find('input[name="form_token"]').val(token);
                let fed = new FormData($(form_id)[0]);
                ajaxRequestForContact(form_id, fed);
			},
		});
	}	
}

function ajaxRequestForContact(form_id, fed) {
	$.ajax({
		type: "POST",
		url: 'https://aply.biz/contact/handler.php',
		crossDomain: true,
		dataType: "json",
		data:fed,
		enctype: 'multipart/form-data', // 필수
		processData: false,
		contentType: false,
		cache: false,
		success: function (data) {
			hideLoader();
			if (data.result == "success") {
				$(form_id + " input").last().remove();
				showDialog("전송이 완료되었습니다. APLY가 연락 드리겠습니다.", function() {
					location.href="/index.html";
				});
				return;
			}
			else {				
				showDialog("오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.", null);
				return;
			}
		},
		error: function(jqXHR, text, error){
			showDialog("죄송합니다, 일시적인 오류가 발생하였습니다. 다시 시도 부탁드립니다.", null);
			hideLoader();
		}
	});
}

function showDialog(msg, callback) {
	$('#askModalContent').text(msg);
	$('#askModal').modal('show');

	if (callback == null) return;

	$('#askModalOKButton').off('click');
	$('#askModalOKButton').click(function () {
			$('#askModal').modal('hide');
			callback();
	});
}

function showPrivacyDialog() {	
	$('#modal_title_content').text("APLY 개인정보처리방침");
    $('#modal_body_content').load("privacy_for_email.html");
    $('#modal-3').modal('show');
}

function GATAGM(event_name, category, label) {    
    gtag(
        'event', event_name, {
        'event_category': category,
        'event_label': label        
    }
    );
}

function setSubmitHandler(form_p_id) {
	var form_id = "#" + form_p_id;

	$(form_id + "_send").on("click", function(e) {
		e.preventDefault();

		if (appSent == true) {
			if (confirm('이미 전송한 내용이 있습니다. 다시 진행 하시겠습니까?')) {	}
			else {
			  return;
			}
		}

		showLoader();

		sendApplicationData(form_id);				
	});

	$('[name^=form_phone]').keypress(validateNumber);
}

function showLoader() {	
    $('.page-loader').show();
}

function hideLoader() {
	$('.page-loader').hide();
}

function validateNumber(event) {
    var key = window.event ? event.keyCode : event.which;
    if (event.keyCode === 8 || event.keyCode === 46) {
        return true;
    } else if ( key < 48 || key > 57 ) {
        return false;
    } else {
        return true;
    }
}

function isSet(value) {
  if (value == "" || value == null || value == "undefined") return false;

  return true;
}
