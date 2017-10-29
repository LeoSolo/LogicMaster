myApp.onPageInit('test_page', function (page) {

    $$('#answers_list li').on('click', function(){
        $$('.test_container').css({'pointer-events':'none'});
        test_page.checkAnswer(this);
    });

});

var test_page = {
    test: '',
    questions: [],
    score: 0,
    rightAnswer: '',
    questionsCount: 0,
    buildPage: function () {
        this.score = 0;
        this.questionsCount = 0;
        $$('#question_count').html('1/10');

        $$('.maybe').show();

        $$('#question').css({'font-size':'1.4em'});

        var title;
        switch (test_page.test) {
            case 'classic':
                title = 'Classic Test';
                break;
            case 'odd':
                title = 'Find The Odd';
                break;
            case 'comparisons':
                title = 'Comparisons';
                break;
            case 'logic':
                title = 'Logic Test';
                break;
            case 'sequence':
                title = 'Sequences';
                break;
            case 'more':
                title = 'Count it';
                break;
            case 'math':
                title = 'Math Test';
                break;
            case 'code':
                title = 'Coding Words';
                break;
            case 'stupid':
                title = 'Stupid Test';
                break;
            case 'detective':
                title = 'Detective Test';
                break;
            case 'dictionary':
                title = 'Dictionary';
                break;
            case 'wits':
                $$('#question').css({'font-size':'1.3em'});
                title = 'Wits';
                break;
        }
        $$('#test_title').html(title);

        this.getText();
        setTimeout(function () {
            test_page.getQuestion();
        }, 50);
    },
    getText: function () {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'content/' + test_page.test + '.txt', false);
        xhr.send();

        var text = xhr.responseText;

        test_page.questions = [];
        var obj;

        if(test_page.test == 'detective'){
            for (var i = 0; i < text.split('\n').length; i++) {
                obj = {
                    question: text.split('\n')[i].split('#')[0].replace("$", "<br>").replace("$", "<br>"),
                    answer1: text.split('\n')[i].split('#')[1].toString(),
                    answer2: text.split('\n')[i].split('#')[2].toString(),
                    answer3: text.split('\n')[i].split('#')[3].toString(),
                    answer4: text.split('\n')[i].split('#')[4].toString()
                };
                test_page.questions.push(obj);
            }
        }else{
            for (var i = 0; i < text.split('\n').length; i++) {
                obj = {
                    question: text.split('\n')[i].split('#')[0],
                    answer1: text.split('\n')[i].split('#')[1].toString(),
                    answer2: text.split('\n')[i].split('#')[2].toString(),
                    answer3: text.split('\n')[i].split('#')[3].toString(),
                    answer4: text.split('\n')[i].split('#')[4].toString()
                };
                test_page.questions.push(obj);
            }
        }
    },
    getQuestion: function (count) {
        test_page.questionsCount ++;

        $$('#answers_list li').removeClass('right');
        $$('#answers_list li').removeClass('wrong');

        if (!count) {
            var randomQuestionCount = random(0, (test_page.questions.length - 1));
            count = randomQuestionCount;
        }

        test_page.rightAnswer = test_page.questions[count].answer1;

        $$('#question').html(test_page.questions[count].question);

        // if (test_page.test != 'more') {
        var answers = [test_page.questions[count].answer1, test_page.questions[count].answer2, test_page.questions[count].answer3, test_page.questions[count].answer4];
        var randomAnswerCount;

        for (var i = 0; i <= 3; i++) {
            randomAnswerCount = random(0, (answers.length-1));
            $$('#answers_list li').eq(i).html(answers[randomAnswerCount]);
            answers.splice(randomAnswerCount, 1);
        }
        //}
        // else {
        //     $$('.maybe').hide();
        //
        //     var answers = [test_page.questions[count].answer1, test_page.questions[count].answer2];
        //     var randomAnswerCount;
        //
        //     for (var i = 0; i <= 1; i++) {
        //         randomAnswerCount = random(0, (answers.length-1));
        //         $$('#answers_list li').eq(i).html(answers[randomAnswerCount]);
        //         answers.splice(randomAnswerCount, 1);
        //     }
        // }

        $$('#question_count').html(test_page.questionsCount + '/10');

        test_page.questions.splice(count, 1);
    },
    checkAnswer: function(btn){

        if($$(btn).html() == test_page.rightAnswer){
            $$(btn).addClass('right');
            test_page.score += 14;
            right_sound.play();
        }
        else{
            $$(btn).addClass('wrong');
            wrong_sound.play();

            for(var i = 0; i < $$('#answers_list li').length; i++){
                if($$('#answers_list li').eq(i).html() == test_page.rightAnswer){
                    $$('#answers_list li').eq(i).addClass('right');
                }
            }
        }
        setTimeout(function(){
            test_page.nextQuestion();
        },800);
    },
    nextQuestion: function(){
        setTimeout(function() {
            $$('.test_container').addClass('hideAnimation');
        },500);

        setTimeout(function(){
            if(test_page.questions.length != 0 && test_page.questionsCount < 10){
                test_page.getQuestion();
            }
            else{
                result_page.score = test_page.score;
                $$('#answers_list li').removeClass('right').removeClass('wrong');
                animateChangePage('result_page');
            }
            setTimeout(function(){
                $$('.test_container').removeClass('hideAnimation');
                setTimeout(function(){
                    $$('.test_container').css({'pointer-events':'auto'});
                },200)
            },200);
        },800);
    }
};