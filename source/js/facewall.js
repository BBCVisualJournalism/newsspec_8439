define(['lib/news_special/bootstrap'], function (news) {

    var Facewall = function () {
        this.FACEWALL_CONTAINER = '#facewall__list';

        this.init = function () {
            this.setLayout();
            this.waitForBackgroundSpriteToLoad();
            news.$(this.FACEWALL_CONTAINER).addClass('facewall--thumbs-enabled');
            this.setThumbPositions();
            this.reorderListItems();
            this.prepareSmartTooltip();
            this.subscribeToEvents();
        };

        this.waitForBackgroundSpriteToLoad = function () {
            var imageSrc = news.$('.facewall__list-background_image').attr('data-src');
            var image = new Image();
            image.onload = function () {
                $('.facewall__thumb').css('background-image', 'url(' + imageSrc + ')');
                news.sendMessageToremoveLoadingImage();
            };
            image.src = imageSrc;
        };

        this.setThumbPositions = function () {
            var multipleDecimalsSupported = this.supportsMultipleDecimals(),
                thumb,
                bgPosition;

            for (var i = 0; document.getElementById('facewall--' + i) !== null; i++) {

                thumb = news.$('#facewall--' + i + ' .facewall__thumb');

                if (multipleDecimalsSupported) {
                    bgPosition = thumb.attr('data-offset') + '%';
                } else {
                    bgPosition = -70.855 * i + 'px';

                    if (news.$('.facewall--grid-layout--large_thumbs').length > 0) {
                        bgPosition = -82.995 * i + 'px';
                    }
                }

                thumb.css('background-position', '0 ' + bgPosition);
            }
        };

        // IE rounds to 2 dp, so facewall breaks. Must specify exact px instead.
        this.supportsMultipleDecimals = function () {
            var supports = true,
                testBgPosition = '0.33333333333333%',
                div;
            
            news.$('body').append('<div id="tmp"></div>');
            div = news.$('#tmp');
            div.css('background-position', testBgPosition);

            if (div.css('background-position').length < testBgPosition.length) {
                supports = false;
            }

            div.remove();

            // cache the result for increased efficiency
            this.supportsMultipleDecimals = function () {
                return supports;
            };

            return this.supportsMultipleDecimals();
        };

        this.reorderListItems = function () {
            this.orderThumbsBy([
                '.facewall__list-item--crew[data-has-picture="true"]',
                '.facewall__list-item--passenger[data-has-picture="true"]',
                '.facewall__list-item--crew[data-has-picture="false"]',
                '.facewall__list-item--passenger[data-has-picture="false"]'
            ]);
        };

        this.orderThumbsBy = function (filter) {
            var newThumbOrder = [],
                facewall = news.$(this.FACEWALL_CONTAINER),
                i;

            for (i = 0; i < filter.length; i++) {
                newThumbOrder.push(news.$(filter[i]));
            }

            for (i = 0; i < newThumbOrder.length; i++) {
                newThumbOrder[i].appendTo(facewall);
            }
        };

        this.prepareSmartTooltip = function () {
            news.$('.facewall__list-item').each(function (i) {
                i++;
                if (i % 6 < 1) {
                    news.$(this).addClass('facewall__list-item--end_of_row');
                }
                if (i > 288) {
                    news.$(this).addClass('facewall__list-item--bottom_row');
                }
            });
        };

        this.setLayout = function () {
            var BREAKPOINT_OFFSET = 16,
                application = news.$(this.FACEWALL_CONTAINER).parent();

            if (document.body.clientWidth >= (990 - BREAKPOINT_OFFSET)) {
                application.addClass('facewall--grid-layout').addClass('facewall--grid-layout--large_thumbs');
            }
            else if (document.body.clientWidth >= (768 - BREAKPOINT_OFFSET)) {
                application.addClass('facewall--grid-layout').removeClass('facewall--grid-layout--large_thumbs');
            }
            else {
                application.removeClass('facewall--grid-layout').removeClass('facewall--grid-layout--large_thumbs');
            }
        };

        this.subscribeToEvents = function () {

            var facewall = this,
                isTouch = !!('ontouchstart' in window) || window.navigator.msMaxTouchPoints > 0;

            if (isTouch) {
                news.$('.facewall__thumb').on('click', function (ev) {
                    var alreadyClicked = news.$(this).parent().hasClass('facewall__list-item--hover');
                    
                    facewall.hideTooltip();
                    if (!alreadyClicked) {
                        facewall.showTooltip(news.$(this));
                    }
                });
            } else {
                news.$('.facewall__thumb')
                    .on('mouseover', function (ev) {
                        facewall.showTooltip(news.$(this));
                    })
                    .on('mouseout', function (ev) {
                        facewall.hideTooltip();
                    });
            }

            window.addEventListener('resize', function () {
                facewall.setLayout();
                if (!facewall.supportsMultipleDecimals()) {
                    facewall.setThumbPositions();
                }
            });
        };

        this.showTooltip = function (thumb) {
            news.$('.facewall__list-item').addClass('facewall__list-item--obscured');
            thumb.parent().addClass('facewall__list-item--hover');
        };

        this.hideTooltip = function () {
            news.$('.facewall__list-item--obscured').removeClass('facewall__list-item--obscured');
            news.$('.facewall__list-item--hover').removeClass('facewall__list-item--hover');
        };
    };

    return Facewall;
});