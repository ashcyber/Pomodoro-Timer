
$(document).ready(function($) {
    $('#reset_btn').hide(); 
});
var total_time = 60; 
var break_time = 60; 


function inc_break_length(){
    clock_clear();
    var cur = $("#break_length").text(); 
    if(cur < 60){
        cur++;
        $("#break_length").html(cur); 
        break_time = cur * 60; 
    }
}


function dec_break_length(){
    clock_clear();
    var cur = $("#break_length").text(); 
    if(cur > 1){
        cur--; 
        $("#break_length").html(cur); 
        break_time = cur * 60; 
    }
}


function inc_session_length(){
    clock_clear();
    var cur = $("#session_length").text(); 
    if(cur < 60){
        cur++; 
        $("#session_length").html(cur); 
        $("#time_text").html(cur + ":00"); 
        total_time = cur * 60; 
    }
}


function dec_session_length(){
    clock_clear();
    var cur = $("#session_length").text(); 
    if(cur >  1){
        cur--; 
        $("#session_length").html(cur);
        $("#time_text").html(cur + ":00"); 
        total_time = cur * 60; 


    }
}



function clock_init() {
    $('#control_btn').hide(); 
    $('#reset_btn').show(); 
    countdown_number = 0;
    trigger_clock();
}

function trigger_clock() {
    if(countdown_number <= total_time) {
        var minutes = Math.floor((total_time - countdown_number) / 60);
        var seconds = total_time - countdown_number- minutes * 60;
        var angle = 45 + Math.round((countdown_number/total_time)*360);
        console.log(angle); 
        if(seconds == 0){
            seconds = '00'; 
        }
        $('#time_text').html(minutes + ":" + seconds); 

        if(angle <= 225){
            var val = 'rotate(' + angle + 'deg)'; 
            $('#pomodoro_radial').css({
                    transform: val
            }); 
        }

        if(angle > 225){

            if(angle >= 225){
                $('#pomodoro_clock_filler').css({
                      'border': '4px solid #ef6228',
                      'border-right-color': 'transparent',
                      'border-top-color': 'transparent',
                });
            }

            $('#pomodoro_clock_mask').css('z-index', 10); 
            $('#pomodoro_clock_filler').css('z-index', 20);
            var val = 'rotate(' + angle + 'deg)'; 
            $('#pomodoro_clock_filler').css({
                transform: val
            }); 

        }

        countdown_number++;

        if(countdown_number <= total_time) {
            countdown = setTimeout('trigger_clock()', 1000);
        }
    }

    if(countdown_number > total_time){
        reset_dials(); 
        countdown_number = 0; 
        trigger_break_clock();
    }
}

function trigger_break_clock() {
    if(countdown_number == 0){
            $('#pomodoro_radial').css({
              'z-index': '3',
              'border': '4px solid #2979FF', 
              'border-radius': '100%',
              'border-right-color': 'transparent',
              'border-top-color': 'transparent',
              'transform': 'rotate(45deg)'
        });
    }



    if(countdown_number <= break_time) {
        var minutes = Math.floor((break_time - countdown_number) / 60);
        var seconds = break_time - countdown_number- minutes * 60;
        var angle = 45 + Math.round((countdown_number/break_time)*360);
        console.log(angle); 
        if(seconds == 0){
            seconds = '00'; 
        }
        $('#time_text').html(minutes + ":" + seconds); 

        if(angle <= 225){
            var val = 'rotate(' + angle + 'deg)'; 
            $('#pomodoro_radial').css({
                    transform: val
            }); 
        }

        if(angle > 225){

            if(angle >= 225){
                $('#pomodoro_clock_filler').css({
                      'border': '4px solid #2979FF',
                      'border-right-color': 'transparent',
                      'border-top-color': 'transparent',
                });
            }

            $('#pomodoro_clock_mask').css('z-index', 10); 
            $('#pomodoro_clock_filler').css('z-index', 20);
            var val = 'rotate(' + angle + 'deg)'; 
            $('#pomodoro_clock_filler').css({
                transform: val
            }); 

        }

        countdown_number++;

        if(countdown_number <= break_time) {
            countdown = setTimeout('trigger_break_clock()', 1000);
        }
    }
}

function clock_clear() {
    $('#reset_btn').hide(); 
    $('#control_btn').show();
    countdown_number = total_time;
    var minutes = Math.floor((countdown_number) / 60);
    var seconds = total_time - minutes * 60;
    var angle = 0; 
    if(seconds == 0){
        seconds = "00"; 
    }
    $('#time_text').html(minutes + ":" + seconds); 
    clearTimeout(countdown);
    reset_dials(); 

}

function reset_dials(){
    $('#pomodoro_radial').css({
          'z-index': '3',
          'border': '4px solid #ef6228', 
          'border-radius': '100%',
          'border-right-color': 'transparent',
          'border-top-color': 'transparent',
          'transform': 'rotate(45deg)'
    });

    $('#pomodoro_clock_mask').css({
          'z-index': '20',
              'border': '10px solid white',
          'border-right-color': 'transparent',
              'border-top-color': 'transparent',
              'transform': 'rotate(45deg)'
    });
    $('#pomodoro_clock_filler').css({
        'z-index': '1',
        'border': '4px solid white',
        'border-right-color': 'transparent',
        'border-top-color': 'transparent',
        'transform': 'rotate(225deg)'
    });
}