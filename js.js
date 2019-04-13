


class TimerJs {


    time = {
        days : 0,
        hours : 0,
        minutes : 0,
        seconds : 0,
    };

    timerElements = {
        days : 'Days',
        hours : 'Hours',
        minutes : 'Minutes',
        seconds : 'Seconds',
    };

    timerSubElementTemplate = '<span><span class="{{KEY}}"></span><span>{{VALUE}}</span></span>';

    log = false;

    constructor( selector, deadline ) {

      this.selector = selector;
      this.deadline = new Date(deadline).getTime();

    }

    getTimerInnerHtml(){

        let t = this;

        let timerInnerHtml = '';

        Object.keys(t.timerElements).forEach(function(key){

            timerInnerHtml+= t.timerSubElementTemplate.replace('{{KEY}}', key).replace('{{VALUE}}', t.timerElements[key]);

        });

        return timerInnerHtml;
    }


    init(){

        let t = this;

        let log = { foo :'init' };


        let timerInnerHtml = this.getTimerInnerHtml();

        log.timerInnerHtml = timerInnerHtml;

        let timerHtml = document.querySelectorAll(t.selector);
        log.timerHtml = timerHtml;

        timerHtml.forEach(function(element){
            element.innerHTML = timerInnerHtml;
            element.className += ' timer';
        });


        let interval = setInterval(function(){

            log.interval = 'setInterval';

            let now = new Date().getTime();

            log.deadline = t.deadline;
            log.now = now;

            let time = t.deadline - now;

            log.time = time;


            t.time = {
                days : Math.floor(time / (1000 * 60 * 60 * 24)),
                hours : Math.floor((time%(1000 * 60 * 60 * 24))/(1000 * 60 * 60)),
                minutes : Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)),
                seconds : Math.floor((time % (1000 * 60)) / 1000),
            };
            log.time = t.time;

            if( t.log === true ){ console.log(t.time); }


            Object.keys(t.time).forEach(function(key){
                var element = document.querySelector(t.selector + ' .' + key);
                if( typeof(element) != 'undefined' && element != null ){
                    element.innerHTML = t.time[key];
                }
            });





            if( t < 0 ){
                clearInterval(interval);
                log.interval = 'clearInterval';
                //document.getElementById("demo").innerHTML = "EXPIRED";
            }


        }, 1000);

        if( t.log === true ){ console.log(log) }

    }



}






