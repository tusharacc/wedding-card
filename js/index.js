var nbDrop = 900;
var nbCloud = 3;
var count = 0;
var lastMile, moveToZero, cloud2Timer, cloud3Timer, diff, boyPos, girlPos;
var boy = document.getElementById('boy');

boy.addEventListener("webkitAnimationEnd", animation_end);
boy.addEventListener("animationend", animation_end);
boy.addEventListener("oanimationend", animation_end);

// Make it rain
createRain();
cloud2Timer = setTimeout(changeDisplayCloud2, 2000);
cloud3Timer = setTimeout(changeDisplayCloud3, 6000);
// function to generate a random number range.
function randRange(minNum, maxNum) {
  return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
}

// function to generate drops
function createRain() {

  for (i = 1; i < nbDrop; i++) {
    var dropLeft = randRange(0, 500);
    var dropTop = randRange(-500, 500);

    $('#rain').append('<div class="drop" id="drop' + i + '"></div>');
    $('#drop' + i).css('left', dropLeft + '%');
    $('#drop' + i).css('top', dropTop + '%');
    $('#drop' + i).css('z-index', randRange(-1000,100000));
  }
}

function animation_end() {
  boy.removeEventListener("webkitAnimationEnd", animation_end);
  boy.removeEventListener("animationend", animation_end);
  boy.removeEventListener("oanimationend", animation_end);
  $('#boy-right-leg').css('-webkit-animation-play-state', 'paused');
  $('#boy-left-hand').css('-webkit-animation-play-state', 'paused');
  $('#boy-left-leg').css('-webkit-animation-play-state', 'paused');
  $('#boy-right-leg').css('-webkit-transform', 'rotate(0deg)');
  $('#boy-left-leg').css('-webkit-transform', 'rotate(0deg)');
  $('#boy-right-leg').css('animation', 'none');
  $('#boy-left-leg').css('animation', 'none');
  lastMile = setInterval(moveBody, 3000);
}

function calculateDistance() {
  boyPos = $('#boy-right-hand').offset().left;
  girlPos = $('#girl-left-hand').offset().left;
  diff = girlPos - boyPos;
}

function moveBody() {

  calculateDistance();
  //console.log(" Position "+ boyPos + girlPos);
  $('#boy-right-leg').css('-webkit-animation', 'move 1s linear 1 forwards');
  setTimeout(moveBoyBody, 1000);
  
  
  if (diff < 50) {
    clearInterval(lastMile);
    window.requestAnimationFrame(updateWorld);
    $("#rain").hide("slow", function() {
      //$('#more-info').show("slow", function() {
        //$('#venue').show("slow", function() {
          /*$('#venue').addClass('animated bounceInDown');*/
          $('#butterfly-1').show("slow",function(){
            $('#save-the-date').show("slow",function(){
              //$('#save-the-date').addClass('animated bounceInDown');
            })
            $('#butterfly-1').css('-webkit-animation', 'move-butterfly-1 6s linear 1 forwards');
          });
          $('#butterfly-2').show("slow",function(){
            $('#butterfly-2').css('-webkit-animation', 'move-butterfly-2 6s linear 1 forwards');
          });
        //});
      //});
    });
    //setTimeout(additionalInfoVenue, 1000);
  }
}

function moveBoyBody() {
  //console.log(" Position Again "+ boyPos + ' '+ girlPos);
  //console.log(boyPos + diff / (16));
  $('#boy').animate({
    left: '+=' + diff / (16)
  }, "slow",function(){
    calculateDistance();
  });
  $('#boy-right-leg').css('-webkit-animation', 'movetozero 1s linear 1 forwards');  
}

function additionalInfoVenue() {

  $('#venue').animate({
    "left": "+=200px"
  }, "slow", function() {
    $("#muhurtham").show();
    $('#muhurtham').addClass('animated bounceInDown');
    setTimeout(additionalInfoWedding, 1000);
  });
}

/*function additionalInfoWedding() {
  $('#muhurtham').animate({
    "left": "+=100px"
  }, "slow", function() {
    $("#reception").show();
    $('#reception').addClass('animated bounceInDown');
    $("#save-the-date").show("slow",function(){
      $("#save-the-date").slideDown("slow");
    });
  });
}*/

function moveTheBody() {
  $('#boy').css('-webkit-animation', animationName + ' 1s linear 1 forwards');
}

function straightLeg() {
  $('#boy-right-leg').css('-webkit-animation', 'movetozero 1s linear 1 forwards');
}
var text = "Once upon a time, a boy met a girl..........for the rest of the story join us at our wedding";

var i = 0;

var elem = document.getElementById("text");

var timerFunc = window.setInterval(writeText, 150);

function writeText() {
  elem.innerHTML = elem.innerHTML + text[i];
  i++;

  if (i >= text.length) {

    if (text == "Priya & Tushar") {
      clearInterval(timerFunc);
    } else {
      i = 0;
      text = "Priya & Tushar";
      elem = document.getElementById("signature");
    }
  }
}

function changeDisplayCloud2() {
  $('#cloud-2').css('display', 'block');
  $('#cloud-2').css('-webkit-animation', 'across 20s linear infinite');
}

function changeDisplayCloud3() {
  $('#cloud-3').css('display', 'block');
  $('#cloud-3').css('-webkit-animation', 'across 19s linear infinite');
}
var moreInfo = 'Engagement is on 8th March 2016 from 8:00 AM onwards, Reception is on 8th March from 7:00 PM onwards, and Muhurtam is on 9th March from 8:00 AM ............ ';

function movingText() {

  var elem = document.getElementById('more-info');
  elem.style.position = 'relative';
  //elem.style.left='100%';
  elem.innerHTML = moreInfo;
  $('#more-info').css('-webkit-animation', 'scrolltext 25s linear infinite');
}

//movingText();

/*$(document).on('mousemove', function(e) {
  $('#message').css({
    left: e.pageX,
    top: e.pageY
  });
});*/

window.addEventListener("resize", resizeCanvas, false);
window.addEventListener("DOMContentLoaded", onLoad, false);

window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };

var canvas, ctx, w, h, particles = [],
  probability = 0.04,
  xPoint, yPoint;

function onLoad() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  resizeCanvas();
}

function resizeCanvas() {
  if (!!canvas) {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
}

function updateWorld() {
  update();
  paint();
  window.requestAnimationFrame(updateWorld);

}

function update() {
  if (particles.length < 500 && Math.random() < probability) {
    createFirework();
  }
  var alive = [];
  for (var i = 0; i < particles.length; i++) {
    if (particles[i].move()) {
      alive.push(particles[i]);
    }
  }
  particles = alive;
}

function paint() {
  ctx.globalCompositeOperation = 'source-over';

  var grd = ctx.createLinearGradient(0, 0, 0, 170);
  grd.addColorStop(0, "#004466");
  grd.addColorStop(1, "#1a8cff");

  ctx.fillStyle = "rgba(0, 0, 0, 1)";;

  ctx.fillRect(0, 0, w, h);
  ctx.clearRect(0, 0, w, h);
  ctx.globalCompositeOperation = 'lighter';
  for (var i = 0; i < particles.length; i++) {
    particles[i].draw(ctx);
  }
}

function createFirework() {
  xPoint = Math.random() * (w) + 500;
  yPoint = Math.random() * (h - 200) + 100;
  var nFire = Math.random() * 50 + 100;
  var c = "rgb(" + (~~(Math.random() * 200 + 55)) + "," +
    (~~(Math.random() * 200 + 55)) + "," + (~~(Math.random() * 200 + 55)) + ")";
  for (var i = 0; i < nFire; i++) {
    var particle = new Particle();
    particle.color = c;
    var vy = Math.sqrt(25 - particle.vx * particle.vx);
    if (Math.abs(particle.vy) > vy) {
      particle.vy = particle.vy > 0 ? vy : -vy;
    }
    particles.push(particle);
  }
}

function Particle() {
  this.w = this.h = Math.random() * 4 + 1;

  this.x = window.innerWidth - 400;
  this.y = yPoint - this.h / 2;

  this.vx = (Math.random() - 0.5) * 10;
  this.vy = (Math.random() - 0.5) * 10;

  this.alpha = Math.random() * .5 + .5;

  this.color;
}

Particle.prototype = {
  gravity: 0.05,
  move: function() {
    this.x += this.vx;
    this.vy += this.gravity;
    this.y += this.vy;
    this.alpha -= 0.0;
    if (this.x <= -this.w || this.x >= screen.width ||
      this.y >= screen.height ||
      this.alpha <= 0) {
      return false;
    }
    return true;
  },
  draw: function(c) {
    c.save();
    c.beginPath();

    c.translate(this.x + this.w / 2, this.y + this.h / 2);
    c.arc(0, 0, this.w, 0, Math.PI * 2);
    c.fillStyle = this.color;
    c.globalAlpha = this.alpha;

    c.closePath();
    c.fill();
    c.restore();
  }
}