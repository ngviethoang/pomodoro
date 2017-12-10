$(document).ready(function() {
  
  const IMGS_NUMBER = 15

  let countS = 25
  $('#session').html(countS)
  
  let countB = 5
  $('#break').html(countB)

  //change background
  setInterval(() => {
    const FADE_TIME = 1000
    $('.background').fadeOut(FADE_TIME, function() {
      let random =  Math.floor((Math.random() * IMGS_NUMBER) + 1)
      $(this).css('background-image', `url('img/${random}.jpg')`)
              .fadeIn(FADE_TIME)
    })
  }, parseInt($('#session').html()) * 60 * 1000 / 2)
  
  let pos = 'pomodoro'
  let countLama
  let posLama
  let count
  $('#stats').html(pos)
  
  let clock = $('.timer').FlipClock(0, {
    countdown: true,
    clockFace: 'MinuteCounter',
    autoStart: false,
    callbacks: {
      interval: function() {
        if (clock.getTime() == 0) {
          (new Audio('sounds/pink_panther.mp3')).play()
          
          if (pos == 'session') {
            clock.setTime(countB * 60)
            clock.start()
            pos = 'break'
            $('#stats').html(pos)
          } else if (pos == 'break') {
            clock.setTime(countS * 60)
            clock.start()
            pos = 'session'
            $('#stats').html(pos)
          }
        }        
      }
    }
  })  

  //SESSION
  $('#sessInc').on('click', function() {
    if ($('#session').html() > 0) {
      countS = parseInt($('#session').html())
      countS++
      $('#session').html(countS)
      //clock.setTime(countS*60)
    }
  })
  $('#sessDec').on('click', function() {
    if ($('#session').html() > 1) {
      countS = parseInt($('#session').html())
      countS--
      $('#session').html(countS)
      //clock.setTime(countS*60)
    }
  })
  
  //BREAK
  $('#breakInc').on('click', function() {
    if ($('#break').html() > 0) {
      countB = parseInt($('#break').html())
      countB++
      $('#break').html(countB)
    }    
  })
  $('#breakDec').on('click', function() {
    if ($('#break').html() > 1) {
      countB = parseInt($('#break').html())
      countB--
      $('#break').html(countB)
    }
  })  
  
  //
  $('#start').on('click', function() {
    if (count != countS || clock.getTime() == 0) {
      clock.setTime(countS * 60)
      pos = 'session'
      $('#stats').html(pos)
    } else {
      pos = posLama
      $('#stats').html(pos)
    }
    count = countS    
    clock.start()    
  })
  
  $('#stop').on('click', function() {
    clock.stop()
    countLama = clock.getTime()
    posLama = $('#stats').html()
  })
  
  $('#clear').on('click', function() {
    clock.stop()
    pos = 'pomodoro'
    $('#stats').html(pos)
    clock.setTime(0)
  })
})