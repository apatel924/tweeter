$(document).ready(() => {
  $(".new-tweet form textarea").on("input", function() {
    const userInput = $(this).val();
    const charLimit = 140;
    const counter = $(this).parents().find(".counter");
    const remainingChars = charLimit - userInput.length;

    counter.text(remainingChars);

    if (remainingChars < 0) {
      counter.css("color", "red");
    } else {
      counter.css("color", "");
    }
  });
});




