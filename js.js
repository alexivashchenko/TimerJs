





function _Timer( deadline ){

    var deadline = new Date("Jan 5, 2018 15:37:25").getTime();

    var x = setInterval(function() {

        var now = new Date().getTime();
        var t = deadline - now;
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        var hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60));
        var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((t % (1000 * 60)) / 1000);
        document.getElementById("demo").innerHTML = days + "d "
        + hours + "h " + minutes + "m " + seconds + "s ";
            if (t < 0) {
                clearInterval(x);
                document.getElementById("demo").innerHTML = "EXPIRED";
            }

    }, 1000);


}


class Timer {


    time = {
        days : 0,
        hours : 0,
        minutes : 0,
        seconds : 0,
    };

    constructor( selector, deadline ) {

      this.selector = selector;
      this.deadline = new Date(deadline).getTime();
      console.log('this.deadline', this.deadline);

    }

    start(){

        let log = {};
        log.foo = 'start';

        let deadline = this.deadline;
        let selector = this.selector;
        let time = this.time;


        let timerInnerHtml = '';
        Object.keys(time).forEach(function(key){
            timerInnerHtml+= '<span class="'+key+'"></span>';
        });

        log.timerInnerHtml = timerInnerHtml;

        let timerHtml = document.querySelectorAll(selector);
        log.timerHtml = timerHtml;

        timerHtml.forEach(function(element){
            element.innerHTML = timerInnerHtml;
            element.className += ' timer';
        });


        let interval = setInterval(function(){

            log.interval = 'setInterval';

            let now = new Date().getTime();

            log.deadline = deadline;
            log.now = now;

            let t = deadline - now;

            log.t = t;


            time = {
                days : Math.floor(t / (1000 * 60 * 60 * 24)),
                hours : Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60)),
                minutes : Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)),
                seconds : Math.floor((t % (1000 * 60)) / 1000),
            };
            log.time = time;
            console.log('time', time);

            Object.keys(time).forEach(function(key){
                document.querySelector(selector + ' .' + key).innerHTML = time[key];
            });





            if( t < 0 ){
                clearInterval(interval);
                log.interval = 'clearInterval';
                //document.getElementById("demo").innerHTML = "EXPIRED";
            }


        }, 1000);

        console.log(log);

    }



}


window.addEventListener('load', function(){


    let timer1 = new Timer('#timer1', '2019-03-30 14:52:33');

    timer1.start();

}, false);



