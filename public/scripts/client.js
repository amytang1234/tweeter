/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  const loadTweets = function() {
    
    $.ajax({
        url: '/tweets',
        method: 'GET',
        dataType: 'JSON',
        success: function (data) {
         createTweetElements(data);
        },    
    });
  }

  loadTweets();


  const createTweetElement = function(tweet){
    const $postsContainer = $('#posts-container');
    const date = tweet.created_at;
    const $post = $('<article class="tweet"></article>');
    
    const $header = $(`<div class="tweet-header"><img class="profile" src="${tweet.user.avatars}">
                           <label class="tweet-user">${tweet.user.name}</label>
                           <label class="tweet-handle">${tweet.user.handle}</label>
                         </div>`)  ;
    const $content =$(`<div ><p class="tweet-content">${tweet.content.text}</p></div>`);
   
    const $footer =$(`<div class="tweet-footer">
                            <label class="post-date">${timeago.format(date)}</label>
                            <span class="tweet-footer-span">
                            <a class="icons" href="#"><i class="fa fa-flag" aria-hidden="true"></i></a>
                        <a class="icons" href="#"><i class="fa fa-retweet" aria-hidden="true"></i></a>
                        <a class="icons" href="#"><i class="fa fa-heart" aria-hidden="true"></i></a>
                    </span>
                  </div>`);

    $post.append($header,$content,$footer);
    $postsContainer.append($post).append('<br>');
   };

   const createTweetElements = function(tweets){
    tweets = tweets.reverse();
    const $postsContainer = $('#posts-container');
    $postsContainer.empty();
    for (const post of tweets) {
       const $post = createTweetElement(post);
       $postsContainer.prepend($post);
    };
}

   let pass;
   $("#frtweet").submit(function( event ) {
     event.preventDefault();
     const check = validation($('#text').val())
     if (check) {
         
        const serializedData = $(this).serialize();
        $.post('/tweets',serializedData,()=>{
           
            $(".container").toggle("slow");
            loadTweets();
         });
    } 
     
   });
  
});

function validation(tweet) {
    let len = tweet.length;
     if (len === 0) {
        pass = false;
         $('#error').text("The tweet can't be empty!");
     } else if(len >140 ) {
        pass = false;
        $('#error').text("The tweet is too long!");
     } else {
         pass =true;
     }
     return pass;
    
}
$(document).ready(function () {
  $('#write-tweet').click(function(){
    $('#error').text("");
    $(".container").toggle("slow");
    $("textarea").focus();
   
  });
  
 
});

