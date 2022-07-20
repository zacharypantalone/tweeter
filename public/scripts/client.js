/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(async function () {
  $(".form-inline").on("submit", onSubmit);

  const data = await loadTweets();
  console.log(data);
  renderTweets(data);
});

const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = (tweetData) => {
  const ago = timeago.format(tweetData.created_at);
  const tweetHtml = `<article class="tweet">
        <div class="tweet-content">
          <div class="name-and-user-img">
            <img class="user-img" src="${tweetData.user.avatars}">
          <h3>${tweetData.user.name}</h3>
          <h5>${tweetData.user.handle}</h5>  
        </div>
        <div class="tweet-text">
          <p>${escape(tweetData.content.text)}</p>
        </div>
      </div>
      <footer class="time-stamp">
      <span>${ago}</span>
        <div class="bottom-right-buttons">
          <i class="fa-solid fa-flag" onMouseOver="this.style.color='rgb(250, 128, 114)'" onMouseOut="this.style.color='rgb(78, 81, 83)'"></i>
          <i class="fa-solid fa-retweet" onMouseOver="this.style.color='rgb(250, 128, 114)'" onMouseOut="this.style.color='rgb(78, 81, 83)'"></i>
          <i class="fa-solid fa-heart" onMouseOver="this.style.color='rgb(250, 128, 114)'" onMouseOut="this.style.color='rgb(78, 81, 83)'"></i>
        </div>
      </footer>  
      </article>`;
  return tweetHtml;
};

const loadTweets = async function () {
  let tweets = [];
  await $.get("/tweets").then((array) => {
    console.log(array);
    tweets = [...array];
  });

  return tweets;
};

const renderTweets = function (tweets) {
  
  for (let tweet of tweets) {
    const text = createTweetElement(tweet);
    $("#tweets-container").append(text);
  }
};

const onSubmit = async function(event) {
  event.preventDefault();
  const form = $(this);
  const data = form.serialize();

  if (data.length <= 5) {
    $('#error').slideDown();
    setTimeout(() => $('#error').slideUp(), 3000);
    return;
  }
    
  
  if (data.length > 145) {
    $('#errorTwo').slideDown();
    setTimeout(() => $('#errorTwo').slideUp(), 3000);
    return;
  }


  

  $.post("/tweets", data).then(async () => {
    
    const data = await loadTweets();
    renderTweets(data);
    this.reset();
  });

  
};

  
  
  
