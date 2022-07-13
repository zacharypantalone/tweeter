"use strict";

$(document).ready(function() {

  $("#tweet-text").on("keyup", function(event) {

    const inputLength = $(this).val().length;
    const counter = $(this).siblings(".tweetButton-counter").children(".counter");
    const currentLength = 140 - inputLength;
    
    counter.html(currentLength);

    if (currentLength <= 0) {
      counter.css("color", "red");
    } else {
      counter.css("color", "#545149");
    }

  });
});