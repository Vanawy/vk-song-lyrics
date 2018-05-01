// ==UserScript==
// @name         Vk song lyrics
// @namespace    vanawy
// @version      1.2
// @description  Add search lyrics buttons for songs in vk
// @author       @Vanawy [Vanawy Firo]
// @match        https://vk.com/*
// @require      http://code.jquery.com/jquery-latest.js
// @updateURL    https://github.com/Vanawy/vk-song-lyrics/blob/master/vk-song-lyrics.user.js?raw=true
// ==/UserScript==

(function() {
    var i = 0;
    $(document).on("mouseenter",".audio_row",function() {
        //audio_row__title_inner - title
        //audio_row__performer   - artist
        var attr = $(this).parent().attr('id');

        // For some browsers, `attr` is undefined; for others,
        // `attr` is false.  Check for both.
        if (typeof attr === typeof undefined || attr === false) {
            $( this ).wrap( "<div class='song' id='song"+i+"'></div>" );
            var artist = $("#song"+i).find('.audio_row__performer').text();
            var title = $("#song"+i).find('.audio_row__title_inner').text();
            $("#song"+i)
                .append("<div style='' id='sl_song"+i+"'><a target='_blank' href='https://genius.com/search?q="+encodeURI(artist+" - "+title)+"'> [Genius Lyrics]</a><a target='_blank' href='https://www.google.com/search?q="+encodeURI(artist+" - "+name+" lyrics")+"'> [Search Lyrics]</a><a target='_blank' href='https://www.google.com/search?q="+encodeURI(artist+" - "+name+" перевод")+"'> [Перевод]</a></div>");
            i++;
        }else{
            $("#sl_"+attr).css("display", "contents");
        }
    });
    $(document).on("mouseleave",".song",function() {
        var attr = $(this).attr('id');
        $("#sl_"+attr).css("display", "none");
    });
    $(document).on("mouseenter",".song",function() {
        var attr = $(this).attr('id');
        $("#sl_"+attr).css("display", "contents");
    });
})();
