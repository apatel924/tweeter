/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(() => {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1677536197452
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1677622597452
    }
  ]
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
        <p>${content.text}</p>
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
  }
  const renderTweets = (tweets) => {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    }
  }
  renderTweets(data);
  const $form = $("form");
  $form.on("submit", (event) => {
    event.preventDefault();
    const urlencoded = $form.serialize();
    console.log(urlencoded);

    $.ajax({
      method: "POST",
      url: "/tweets",
      data: urlencoded,
      success:  (response) => {
        console.log("Created Tweet");
      }, 
    });
  });

  const loadTweets = $.ajax({
    method: "GET",
    url: "/tweets",
    dataType: "JSON",
    success: (responseData) => {
      renderTweets(responseData);
    },
  });
  loadTweets;
});