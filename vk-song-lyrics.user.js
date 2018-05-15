// ==UserScript==
// @name         Vk song lyrics
// @namespace    vanawy
// @version      1.1.0
// @description  Add search lyrics buttons for songs in vk
// @author       @Vanawy [Vanawy Firo]
// @match        https://vk.com/*
// @require      http://code.jquery.com/jquery-latest.js
// @updateURL    https://github.com/Vanawy/vk-song-lyrics/blob/master/vk-song-lyrics.user.js?raw=true
// ==/UserScript==

(function() {
    let i = 0;
    $(document).on("mouseenter",".audio_row",function() {
        //audio_row__title_inner - title
        //audio_row__performer   - artist
        let attr = $(this).parent().attr('id');

        // For some browsers, `attr` is undefined; for others,
        // `attr` is false.  Check for both.
        if (typeof attr === typeof undefined || attr === false) {
            $( this ).wrap( "<div class='song' id='song"+i+"'></div>" );
            let current_song = $("#song"+i);
            let artist = escapeHTML(current_song.find('.audio_row__performers a').text());
            let title = escapeHTML(current_song.find('.audio_row__title_inner').text());
            let buttons = "<div style='' id='sl_song"+i+"'>" +
                "<a target='_blank' href='https://www.google.com/search?q="+encodeURI(artist+" - "+title+" lyrics")+"'> [Search Lyrics]</a>" +
                "<a target='_blank' href='https://genius.com/search?q="+encodeURI(artist+" - "+title)+"'> [Genius Lyrics]</a>" +
                "<a target='_blank' href='https://www.google.com/search?q="+encodeURI(artist+" - "+title+" перевод")+"'> [Перевод]</a>" +
                "</div>";
            current_song
                .append(buttons);
            i++;
        }else{
            $("#sl_"+attr).css("display", "contents");
        }
    });
    $(document).on("mouseleave",".song",function() {
        let attr = $(this).attr('id');
        $("#sl_"+attr).css("display", "none");
    });
    $(document).on("mouseenter",".song",function() {
        let attr = $(this).attr('id');
        $("#sl_"+attr).css("display", "contents");
    });
})();

function escapeHTML(text) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };

  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}
