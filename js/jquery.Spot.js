/*==============================================================================

 //	jquery.Spot.js

 //	Version: 0.0.1
 //	Date: 21.07.2014
 //	Author: Unicorn-IT
 //	Mail: kontakt@unicorn-it.de

 //	License: Free distribution

 //	Tested with:
 //	FF-3.6.x, Chrome-5.x

 ==============================================================================*/

;if(window.jQuery)
(function($) {

    $.Spot = function(el, options) {

        var base = this;

        base.$el = $(el);
        base.el = el;

        base.oldIE = !jQuery.support.leadingWhitespace;

        base.$el.data("Spot", base);

        base.init = function(){
            base.options = $.extend({},$.Spot.defaultOptions, options);

            var hex = base.options.spot_color.replace(/#/, '0x');
            var r = hex >> 16;
            var g = (hex & 0x00FF00) >> 8;
            var b = hex & 0x0000FF;
            var a = base.options.spot_alpha;
            var sr = base.options.radius;
            var gradient = base.options.gradient;
            var f = base.options.spot_auto_val;
            var l = base.options.spot_luminosity;
            if(l <= 1.004) { l = 3; }

            var paddingLeft = parseInt(base.$el.css('padding-left'));
            var paddingTop = parseInt(base.$el.css('padding-top'));

            var left = base.$el.offset().left + paddingLeft;
            var top = base.$el.offset().top + paddingTop;
            var width = base.$el.width();
            var height = base.$el.height();

            if(!base.options.left) {
                base.options.left = base.$el.width()/2 - sr;
            }
            if(!base.options.top) {
                base.options.top = base.$el.height()/2 - sr;
            }

            if(sr == 'auto') { if(width < height) { sr = parseInt(width/f); } else { sr = parseInt(height/f); } }

            var no = '-'+Math.floor(new Date());
            var shading = 'shading'+no;
            var spot_light = 'spot-light'+no;
            var spot_mask = 'spot-mask'+no;

            base.spot_mask = spot_mask;
            base.spot_light = spot_light;

            base.$el.wrap('<div id="'+spot_light+'"></div>');
            base.spotLight = $('#'+spot_light);
            base.spotLight.wrap('<div id="'+shading+'">');
            base.shading = $('#'+shading);
            base.shading.append('<div id="'+spot_mask+'">');
            base.spotMask = $('#'+spot_mask);

            base.shading.css({
                'position' : 'relative',
                'left' : left,
                'top' : top,
                'width' : width,
                'height' : height,
                'overflow' : 'hidden',
                'cursor' : 'none',
                'background-color' : 'rgba('+r+', '+g+', '+b+', '+a+')'
            });

            base.spotLight.css({
                'display' : 'none',
                'position' : 'absolute',
                'left' : base.options.left,
                'top' : base.options.top,
                'width' : sr*2,
                'height' : sr*2,
                'overflow' : 'hidden',
                'z-index' : 998
            });
            base.spotLight.show();

            base.spotMask.css({
                'position' : 'absolute',
                'left' : base.options.left,
                'top' : base.options.top,
                'width' : sr*2,
                'height' : sr*2,
                'z-index' : 999,
                'background': '-moz-radial-gradient(center, ellipse cover,  rgba(0,0,0,0) 0px, rgba(0,0,0,0) '+(sr/2)+'px, rgba('+r+','+g+','+b+',1) '+(sr/2+gradient)+'px, rgba('+r+','+g+','+b+',1) '+sr+'px)',
                'background': '-webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0px,rgba(0,0,0,0)), color-stop('+(sr/2)+'px,rgba(0,0,0,0)), color-stop('+(sr/2+gradient)+'px,rgba('+r+','+g+','+b+',1)), color-stop('+sr+'px,rgba('+r+','+g+','+b+',1)))',
                'background': '-webkit-radial-gradient(center, ellipse cover,  rgba(0,0,0,0) 0px,rgba(0,0,0,0) '+(sr/2)+'px,rgba('+r+','+g+','+b+',1) '+(sr/2+gradient)+'px,rgba('+r+','+g+','+b+',1) '+sr+'px)',
                'background': '-o-radial-gradient(center, ellipse cover,  rgba(0,0,0,0) 0px,rgba(0,0,0,0) '+(sr/2)+'px,rgba('+r+','+g+','+b+',1) '+(sr/2+gradient)+'px,rgba('+r+','+g+','+b+',1) '+sr+'px)',
                'background': '-ms-radial-gradient(center, ellipse cover,  rgba(0,0,0,0) 0px,rgba(0,0,0,0) '+(sr/2)+'px,rgba('+r+','+g+','+b+',1) '+(sr/2+gradient)+'px,rgba('+r+','+g+','+b+',1) '+sr+'px)',
                'background': 'radial-gradient(ellipse at center,  rgba(0,0,0,0) 0px,rgba(0,0,0,0) '+(sr/2)+'px,rgba('+r+','+g+','+b+','+a+') '+(sr/2+gradient)+'px,rgba('+r+','+g+','+b+','+a+') '+sr+'px)',
                'filter': 'progid:DXImageTransform.Microsoft.gradient( startColorstr="#00000000", endColorstr="#000000",GradientType=1 )'
            });

            base.spotImage = base.$el;
            base.spotImage.css({
                position: 'absolute',
                left: -base.options.left - paddingLeft,
                top: -base.options.top - paddingTop,
                width: width + paddingLeft*2,
                height: height + paddingTop*2
            });

            if(base.options.mouseEnabled) {
                $('body').mousemove( function(e){
                    var l = e.pageX - left - sr;
                    var t = e.pageY - top - sr;
                    base.spotLight.css({'display' : 'block', 'left' : l, 'top' : t});
                    base.spotMask.css({'left' : l, 'top' : t});
                    base.spotImage.css({'margin-left' : -l, 'margin-top' : -t});
                });
            }

            if(base.options.spot_switch) {
                $('#'+shading).toggle(
                    function () {
                        $(this).animate({'opacity' : 0}, 600).css('cursor', 'pointer');
                    },
                    function () {
                        if($.browser.msie){
                            $(this).animate({'opacity' : a}, 600).css('cursor', 'none');
                        } else {
                            $(this).animate({'opacity' : 1}, 600).css('cursor', 'none');
                        }
                    }
                );
            }
        };

        if(!base.oldIE) {
            base.init();
        }

        // ---------------------------------- Declarations ----------------------------------

        base.spotOn = function(timeInMillis) {

            if(base.oldIE) {
                return;
            }

            var fromLeft = base.spotMask.position().left;
            var fromTop = base.spotMask.position().top;
            var imgWidth = base.spotImage.width();
            var imgHeight = base.spotImage.height();
            var scaleWidth = (fromLeft < imgWidth/2) ? imgWidth-fromLeft : fromLeft;
            var scaleHeight = (fromTop < imgHeight/2) ? imgHeight-fromTop : fromTop;
            var maxScale = scaleWidth > scaleHeight ? scaleWidth : scaleHeight;
            maxScale *= 3;
            base.radius(maxScale, timeInMillis, function() {
                base.spotMask.remove();
                base.spotImage.unwrap();
                base.spotImage.unwrap();
                console.log(base.spotImage);
                console.log(base.$el);
                base.spotImage.removeAttr('style');
            });
        };

        base.radius = function(radius, animateTime, cb) {

            if(base.oldIE) {
                return;
            }

            var res = (radius - base.spotMask.width()) / 2;
            var left = base.spotMask.position().left - res;
            var top = base.spotMask.position().top - res;
            var paddingLeft = parseInt(base.$el.css('padding-left'));
            var paddingTop = parseInt(base.$el.css('padding-top'));

            var options = {
                width: radius,
                height: radius,
                left: left,
                top: top
            };

            if(animateTime) {
                base.spotMask.stop().animate(options, animateTime);
                base.spotLight.stop().animate(options, animateTime);
                base.spotImage.stop().animate({
                    'left' : -(left + paddingLeft),
                    'top' : -(top + paddingTop)
                }, animateTime, cb);
            }
            else {
                base.spotMask.css(options);
                base.spotLight.css(options);
                base.spotImage.css({
                    'left' : -left,
                    'top' : -top
                });
            }
        };

        base.move = function(x, y) {

            if(base.oldIE) {
                return;
            }

            //var l = e.pageX - left - sr;
            //var t = e.pageY - top - sr;

            var curWidth = base.spotMask.width();

            var l = x-curWidth/2;
            var t = y-curWidth/2;

            console.log(l);
            console.log(t);

            base.spotLight.css({'display' : 'block', 'left' : l, 'top' : t});
            base.spotMask.css({'left' : l, 'top' : t});
            base.spotImage.css({'margin-left' : -l, 'margin-top' : -t});
        };

        base.scale = function(scale) {
            options.radius = base.options.radius * scale;
            base.init();
        };

    };

    $.Spot.defaultOptions = {
        radius: 100,
        gradient: 1,
        spot_auto_val: 6.5,
        spot_luminosity: 3,
        spot_color: '#000000',
        spot_alpha: 1,
        spot_switch: 1,
        mouseEnabled: false
    };

    $.fn.Spot = function(options){
        return this.each(function(){
            (new $.Spot(this, options));
        });
    };

    $.fn.SpotScale = function(scale) {
        this.data("Spot").scale(scale);
    };

    $.fn.SpotRadius = function(radius, animateTime) {
        this.data("Spot").radius(radius, animateTime);
    };

    $.fn.SpotOn = function(timeInMillis) {
        this.data("Spot").spotOn(timeInMillis);
    };

    $.fn.SpotMove = function(x, y) {
        this.data("Spot").move(x, y);
    };

    $.fn.getSpot = function() {
        return this.data("Spot");
    };

})(jQuery);