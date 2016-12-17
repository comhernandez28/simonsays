$( document ).ready(function() {
//start
//variables
var sequenceArr = [];
var userClicks = [];
var userClicksCopy = [];
var sequenceCount = 0;
var correct = true;
var strict = false;
var easyGame = false;
var score = 0;
var easyGameCount = 0;
var randomLight = "";
var green = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var red = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var yellow = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var blue = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
//functions
var generateLight = function(){
  randomLight = 'data-num = ' + '"' + (Math.floor(Math.random() * 4) + 1) + '"';
  sequenceArr.push(randomLight);
  sequenceCount++;
}
var lightUp = function(randomLight){
    switch (randomLight) {
//if green
      case 'data-num = "1"':
        $("div[" + randomLight + "]").css("background-color", "#66FF00");
        green.play();
          setTimeout(function (){
            $("div[" + randomLight + "]").css("background-color", "#008000");
          }, 500);
        break;
//if red
      case 'data-num = "2"':
      $("div[" + randomLight + "]").css("background-color", "red");
      red.play();
        setTimeout(function (){
          $("div[" + randomLight + "]").css("background-color", "#AA0114");
        }, 500);
        break;
//if yellow
      case 'data-num = "3"':
      $("div[" + randomLight + "]").css("background-color", "#FFFF00");
      yellow.play();
        setTimeout(function (){
          $("div[" + randomLight + "]").css("background-color", "#C69200");
        }, 500);
        break;
//if blue
      case 'data-num = "4"':
      $("div[" + randomLight + "]").css("background-color", "blue");
      blue.play();
        setTimeout(function (){
          $("div[" + randomLight + "]").css("background-color", "#172D40");
        }, 500);
        break;
      default:;

    }
}
var restart = function(){
  sequenceArr = [];
  userClicks = [];
  userClicksCopy = [];
  sequenceCount = 0;
  correct = true;
  strict = false;
  easyGame = false;
  score = 0;
  easyGameCount = 0;
  randomLight = "";
  document.getElementById("score-holder").innerText = score;
  $("#overlay-container").addClass("overlay");
}
var checkGame = function(){

  for(var k = 0; k < userClicks.length; k++){
    if(sequenceArr[k] != userClicks[k]){
      //easyGame settings
      if(easyGame){
        easyGameCount++;
        if(easyGameCount == 1){
          userClicks = [];
          document.getElementById("score-holder").innerText = "Try Again!";
          setTimeout(function(){
              displaySequence();
          }, 500);
        }else if(easyGameCount == 2){
          document.getElementById("score-holder").innerText = "You lost!";
          setTimeout(function(){
              restart();
              easyGame = true;

          }, 500);
          setTimeout(function(){
            startSequence();
          }, 900);
          correct = false;
        }
      }

      if(strict){
      //strict settings
      document.getElementById("score-holder").innerText = "You lost!";
      setTimeout(function(){
          restart();
          strict = true;
          startSequence();
      }, 500);

      correct = false;
    }
  }
}
//easy game rules


}
var displaySequence = function(){
$("#overlay-container").addClass("overlay");
//display then add
var i = 0;
var interval = setInterval(function() {
  lightUp(sequenceArr[i]);
     i++;
     if (i >= sequenceArr.length) {
       clearInterval(interval);
       $("#overlay-container").removeClass("overlay");
     }
}, 1000);


}
var startSequence = function(){
    document.getElementById("score-holder").innerText = score;
    generateLight();
    displaySequence();
    $('#top-left, #top-right, #bottom-left, #bottom-right').click(function(e){
      var idClicked = e.target.id;
        switch (idClicked) {
          case "top-left":
            userClicks.push('data-num = "1"');
            lightUp('data-num = "1"');
            break;
            case "top-right":
              userClicks.push('data-num = "2"');
              lightUp('data-num = "2"');
              break;
              case "bottom-left":
                userClicks.push('data-num = "3"');
                lightUp('data-num = "3"');
                break;
                case "bottom-right":
                  userClicks.push('data-num = "4"');
                  lightUp('data-num = "4"');
                  break;
          default:
        }
        e.stopImmediatePropagation();
        checkGame();
        if(sequenceCount == 20){
          document.getElementById("score-holder").innerText = "You Won!";
          setTimeout(function(){
              restart();
              document.getElementById("score-holder").innerText = "Click a Mode!";
          }, 500);

        }
        if(userClicks.length == sequenceCount){
          //checkGame();
            if(correct){
            userClicks = [];
            score++;
            document.getElementById("score-holder").innerText = "Next Round!";
            setTimeout(function(){
                startSequence();
            }, 500);

          }
        }
    });

}

//events
$("#strict, #start").on("click" , function(e){
  var startOrStrict = e.target.id;
  if(startOrStrict == "start"){
    easyGame = true;
  }else{
    strict = true;
  }
  $("#overlay-container").removeClass("overlay");
  startSequence();
  correct = true;
});

//restart events
$("#restart").on("click" , function(){
  restart();
});
//end of document ready
});
