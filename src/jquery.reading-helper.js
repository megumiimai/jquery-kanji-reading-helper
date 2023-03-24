const kuromoji = require("kuromoji");
const REGEXP =
  /([\u{3005}\u{3007}\u{303b}\u{3400}-\u{9FFF}\u{F900}-\u{FAFF}\u{20000}-\u{2FFFF}][\u{E0100}-\u{E01EF}\u{FE00}-\u{FE02}]?)/mu;

(function ($) {
  $.fn.kanji_reading_helper = function (options) {
    const defaults = {
      addColor: false,
    };
    options = $.extend({}, defaults, options);

    return this.each(async function () {
      const tokenizer = await tokenizerPromise;
      replaceText($(this), tokenizer, options);
    });
  };

  const tokenizerPromise = new Promise((resolve, reject) => {
    kuromoji
      .builder({ dicPath: "https://cdn.jsdelivr.net/npm/kuromoji@0.1.2/dict/" })
      .build((err, tokenizer) => {
        if (err) {
          reject(err);
        } else {
          resolve(tokenizer);
        }
      });
  });

  const kanaToHira = (str) => {
    return str.replace(/[\u30a1-\u30f6]/g, (match) => {
      const chr = match.charCodeAt(0) - 0x60;
      return String.fromCharCode(chr);
    });
  };

  const randomColor = () => {
    return `rgb(${Math.floor(Math.random() * 255)},${Math.floor(
      Math.random() * 255
    )},${Math.floor(Math.random() * 255)})`;
  };

  const replaceText = ($element, tokenizer, options) => {
    const text = $element.text().trim();
    if (!text) return;
    $element.html("");
    const tokens = tokenizer.tokenize(text);
    for (const token of tokens) {
      const word = token.surface_form;
      const isKanji = REGEXP.test(word);
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
        $s.css("color", randomColor());
      }
      $element.append($s);
    }
  };
})(jQuery);
