const kuromoji = require("kuromoji");
const builder = kuromoji.builder({
  dicPath: "https://cdn.jsdelivr.net/npm/kuromoji@0.1.2/dict/",
});
var regexp =
  /([\u{3005}\u{3007}\u{303b}\u{3400}-\u{9FFF}\u{F900}-\u{FAFF}\u{20000}-\u{2FFFF}][\u{E0100}-\u{E01EF}\u{FE00}-\u{FE02}]?)/mu;

(function ($) {
  $.fn.kanji_reading_helper = function (options) {
    this.each(function () {
      const text = $(this).text().trim();
      if (!text) return false;
      $(this).html("");
      builder.build((error, tokenizer) => {
        const tokens = tokenizer.tokenize(text);
        tokens.forEach((token) => {
          const word = token.surface_form;
          const isKanji = regexp.test(word);
          const $s = $("<span>").append(
            isKanji
              ? "<ruby>" +
                  word +
                  "<rt>" +
                  kanaToHira(token.reading) +
                  "</rt></ruby>"
              : word
          );
          if (isKanji && options.addColor) {
            $s.css("color", getColor());
          }
          $(this).append($s);
        });
      });
    });
  };

  function kanaToHira(str) {
    return str.replace(/[\u30a1-\u30f6]/g, function (match) {
      var chr = match.charCodeAt(0) - 0x60;
      return String.fromCharCode(chr);
    });
  }

  function getColor() {
    return (
      "rgb(" +
      Math.floor(Math.random() * 255) +
      "," +
      Math.floor(Math.random() * 255) +
      "," +
      Math.floor(Math.random() * 255) +
      ")"
    );
  }
})(jQuery);
