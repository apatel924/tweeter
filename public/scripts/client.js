/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  /* Get jQuery elements */
  const $tweetContainer = $('#tweet-container');
  const $error = $("#error");
  const $form = $("form");
  const $newTweetSection = $(".new-tweet");
  const $newTweetWrite = $(".write-new-tweet");

  const escape = (str) => {
    let div = $("<div>").text(str);
    return div[0].innerHTML;
  };

  const createTweetElement = (tweetData) => {
    const user = tweetData.user;
    const content = tweetData.content;
    const timeStamp = tweetData.created_at;

    const tweetElement = $(`
      <article class="tweet">  
        <header class="tweet-header">
          <div>  
            <img src="${user.avatars}"/>
            <p>${user.name}</p>
          </div>
          <p>${user.handle}</p>
        </header>
        <p>${escape(content.text)}</p>
        <footer class="tweet-footer">
          <p>${timeago.format(timeStamp)}</p>
          <div>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
    `);
    return tweetElement;
  };

  const renderTweets = (tweets) => {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetContainer.prepend($tweet);
    }
  };

  const resetFrom = () => {
    $form.trigger("reset");
    console.log($form);

    $form[0][2].innerText = 140;
  };
  
  const formInputError = (message) => {
    $error.empty();
    $error.append('<i class="fa-solid fa-triangle-exclamation"></i>');
    $error.append(`<p>${message}</p>`);
  };

  const loadTweets = () => {
    $tweetContainer.empty();
    $.ajax({
      method: "GET",
      url: "/tweets",
      dataType: "JSON",
      success: (response) => {
        console.log("test", response)
        renderTweets(response);
      },
    });
  };

  $form.on("input", (event) => {
    event.preventDefault();
    $error.empty();
  });

  $form.on("submit", (event) => {
    event.preventDefault();
    const userInput = event.currentTarget[0].value;

    const noInput = "Please input message";

    const inputOverLimit = "Message too long";

    if (!userInput) {
      formInputError(noInput);
    } else if (userInput.length > 140) {
      formInputError(inputOverLimit);
    } else {
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: $form.serialize(),
        success:  (response) => {
          $error.empty();
          loadTweets();
          resetFrom();
        },
      });
    }
  });
  
  $newTweetWrite.on("click", (event) => {
    /* Display new tweet textarea */
    if ($newTweetSection.is(":hidden")) {
      $newTweetSection.slideDown();
      $("#tweet-text").focus();
      return;
    }
    $newTweetSection.slideUp();
  });
  loadTweets();
});
