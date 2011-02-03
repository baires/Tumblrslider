/*
Copyright (c) 2011 Alexis Sgavel, https://github.com/baires

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


; (function($) {

    var defaults = {
        photoSize: 1280
    };

    $.fn.tumblrslider = function(options) {

        var o = $.extend(defaults, options);

        return this.each(function() {

            var t = $(this);

            t.empty();

            var set = t.attr("id");
            var id = set.split("_")[1];

            $.getJSON("/api/read/json?id=" + id + "&callback=?", function(slidephotoset) {

                var wrap = t.wrapAll('<div id="' + id + '" class="tumblrslider" />');

                var control = $('<ol id="controller" />');

                var pix = slidephotoset["posts"][0]["photos"];
                for (var i = 0; i < pix.length; i++) {

                    var img = pix[i]["photo-url-" + o.photoSize];
                    var full = pix[i]["photo-url-1280"];
                    var slug = pix[i]['offset'];
                    var caption = pix[i]["caption"];
                    var imgWrapper = control.append('<li><a href="#slide-' + slug + '">' + slug + '</a></li>');
                    t.append('<a href="' + full + '"><img id="slide-' + slug + '" src="' + img + '" /></a>');

                    imgWrapper.insertAfter('.tumblrslider');
                    control.wrap('<div class="controller_container" />');

                    var imagesingle = $('#photoset_' + id + ' > a img');

                    imagesingle.hide().filter(':first').show();
                    var controla = $('ol#controller li a');
					controla.filter(':first').addClass('current');
                    controla.click(function(e) {
                        e.stopPropagation();

                        if (this.className.indexOf('current') == -1) {
                            imagesingle.hide();
                            imagesingle.filter(this.hash).fadeIn(500);

                            controla.removeClass('current');
                            $(this).addClass('current');
                        }
                        return false;
                    });
                }

            });
        });
    };
})(jQuery);