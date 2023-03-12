(function ($) {
  let textLengthCount = 0;
  document.addEventListener("DOMContentLoaded", () => {
    $(".text-color").each((_, element) => {
      const $textColor = $(element);
      const text = $textColor.text().trim();
      $textColor.html("");
      for (var i = 0; i < text.length; i++) {
        $textColor.append("<span>" + text[i] + "</span>");
      }
      textLengthCount += text.length;
    });
  });

  var s = 0;
  var tim = setInterval(() => {
    $(".text-color span").eq(s++).css("color", getColor()).show();
    if (s == textLengthCount) {
      clearInterval(tim);
    }
  }, 400);

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
