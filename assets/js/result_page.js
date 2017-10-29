myApp.onPageInit('result_page', function (page) {

    $$('.repeatBtn').on('click', function () {
        tap_sound.play();
        animateChangePage('test_page');
    });

    $$('.menuBtn').on('click', function () {
        tap_sound.play();
        animateChangePage('index');
    });

    $$('.emptyBtn').on('click', function(){
        tap_sound.play();
        animateChangePage('index');
    });

    $$('.resultScreenBtn').on('click', function(){
        tap_sound.play();
        switch ($$('.resultScreenBtn').hasClass('nextTest_btn')){
            case true:
                test_page.test = allTests[result_page.findTestNumb(test_page.test)+1];
                animateChangePage('test_page');
                break;
            case false:
                buyer.checkConnection('allTests');
                break;
        }
    });

    $$('.okBtn').on('click', function(){
        tap_sound.play();
        $$('.studentShadow').css({'opacity': 0});
        setTimeout(function(){
            $$('.studentShadow').hide();
        },300);
        buyer.checkConnection('allTests');
    });

    $$('.cancelBtn').on('click', function(){
        tap_sound.play();
        $$('.studentShadow').css({'opacity': 0});
        setTimeout(function(){
            $$('.studentShadow').hide();
        },300);
    });
});

var allTests = ['classic','odd','comparisons','logic','sequence','more','math','code','stupid','detective','dictionary','wits'];

var result_page = {
    score: 0,
    stars: 0,
    resultName: '',
    buildPage: function () {
        result_sound.play();
        var obj = locStor.get('Lmt_all');

        $$('#result').html('IQ = ' + this.score);

        if (result_page.score <= 28) {
            result_page.resultName = 'kinder';
            result_page.stars = 1;
        }
        else if (result_page.score > 28 && result_page.score <= 56) {
            result_page.resultName = 'preschooler';
            result_page.stars = 1;
        }
        else if (result_page.score > 56 && result_page.score <= 84) {
            result_page.resultName = 'schooler';
            result_page.stars = 2;
        }
        else if (result_page.score > 84 && result_page.score <= 112) {
            result_page.resultName = 'student';
            result_page.stars = 2;
        }
        else if (result_page.score > 112) {
            result_page.resultName = 'professor';
            result_page.stars = 3;
        }

        this.getPicture();
        this.getText();
        this.getAch();

        if((this.findTestNumb(test_page.test)+1) > 5 && (this.findTestNumb(test_page.test)+1) < 11){
            if(obj.newInapps.allTests){
                $$('.resultScreenBtn').addClass('nextTest_btn').removeClass('buyTests_btn');
                $$('.resultScreenBtn.nextTest_btn').html('Next');
            }else{
                $$('.resultScreenBtn').addClass('buyTests_btn').removeClass('nextTest_btn');
                $$('.resultScreenBtn.buyTests_btn').html('Unlock Tests - 9.99$');
            }
        }else if((this.findTestNumb(test_page.test)+1) > 5 && (this.findTestNumb(test_page.test)+1) > 11){
            $$('.resultScreenBtn').hide();
        }
        else{
            $$('.resultScreenBtn').addClass('nextTest_btn').removeClass('buyTests_btn');
            $$('.resultScreenBtn.nextTest_btn').html('Next');
        }

        $$('#resultImg').hide();
        $$('#resultImg').css({'opacity': 0});
        $$('#result').hide();
        $$('#result').css({'opacity': 0});
    },
    getStars: function(stars){
        var time;
        $$('.resultStarsCont tr td').removeClass('active');
        $$('.getStarDiv').html('<div class="firstActiveStar"></div>');
        $$('.firstActiveStar').addClass('firstStarWithAnimation');

        setTimeout(function(){
            $$('.resultStarsCont tr td:first-child').addClass('active');
            $$('.getStarDiv').html('');
        }, 800);

        if(stars > 1) {
            setTimeout(function () {
                $$('.getStarDiv').html('<div class="secondActiveStar"></div>');
                $$('.secondActiveStar').addClass('secondStarWithAnimation');
            }, 800);

            setTimeout(function() {
                $$('.resultStarsCont tr td:nth-child(2)').addClass('active');
                $$('.getStarDiv').html('');
            }, 1600)
        }

        time = 1000;

        if(stars > 2){
            setTimeout(function(){
                $$('.resultStarsCont tr td:nth-child(2)').addClass('active');
                $$('.getStarDiv').html('<div class="thirdActiveStar"></div>');
                $$('.thirdActiveStar').addClass('thirdStarWithAnimation');
            },1600);
            setTimeout(function(){
                $$('.resultStarsCont tr td:last-child').addClass('active');
                $$('.getStarDiv').html('');
            },2400);

            time = 2500;
        }

        setTimeout(function(){
            $$('#result').show();
            setTimeout(function(){
                $$('#result').css({'opacity': 1});
            },50)
        },time);
        setTimeout(function(){
            $$('#resultImg').show();
            setTimeout(function(){
                $$('#resultImg').css({'opacity': 1});
            },50)
        },(time+300));

        setTimeout(function(){
            result_page.getStudent();
        },(time+300)*2);

    },
    getPicture: function () {
        $$('#resultImg').css({
            'background': 'url(img/' + this.resultName + '.png) center center no-repeat',
            'background-size': 'contain'
        });
    },
    getStudent: function(){
        if($$('.resultScreenBtn').hasClass('buyTests_btn')){
            $$('.studentShadow').show();
            setTimeout(function(){
                $$('.studentShadow').css({'opacity': 1});
            },300);

            var obj = locStor.get('Lmt_all');

            $$('.student').css({
                'background': 'url(img/student' + obj.achs.length + '.png) center bottom no-repeat',
                'background-size': 'contain'
            });

            setTimeout(function(){
                $$('.student').addClass('move');
                $$('.student').show();
            },500);
            setTimeout(function(){
                $$('.studentDialog').css({'opacity': 1});
                $$('.okBtn').css({'opacity': 1});
                $$('.cancelBtn').css({'opacity': 1});
            },1500)
        }else{
            $$('.studentShadow').hide();
        }
    },
    getOldStars: function(stars){
        $$('.resultStarsCont tr td:first-child').addClass('active');
        if(stars > 2){
            $$('.resultStarsCont tr td:nth-child(2)').addClass('active');
        }
        if(stars > 3){
            $$('.resultStarsCont tr td:last-child').addClass('active');
        }
    },
    getText: function () {
        var text;

        var obj = locStor.get('Lmt_all');

        if(obj.records[test_page.test].stars != 0){
            if (result_page.stars > obj.records[test_page.test].stars) {
                obj.records[test_page.test].stars = result_page.stars;
                text = 'New high score!';
                setTimeout(function(){
                    result_page.getStars(result_page.stars);
                }, 350);
            }
            else {
                text = 'Test completed!';

                result_page.getOldStars(result_page.stars);

                setTimeout(function(){
                    $$('#result').show();
                    setTimeout(function(){
                        $$('#result').css({'opacity': 1});
                    },50);
                },300);
                setTimeout(function(){
                    $$('#resultImg').show();
                    setTimeout(function(){
                        $$('#resultImg').css({'opacity': 1});
                    },50);
                },600);

                setTimeout(function(){
                    result_page.getStudent();
                },1200);
            }
        }else{
            obj.records[test_page.test].stars = result_page.stars;
            text = 'New high score!';
            setTimeout(function(){
                result_page.getStars(result_page.stars);
            }, 350);
        }

        if (obj.records[test_page.test].score != '-') {
            if (result_page.score > obj.records[test_page.test].score) {
                obj.records[test_page.test].score = result_page.score;

            }
        }
        else {
            obj.records[test_page.test].score = result_page.score;
        }

        $$('.pinkTitle').html(text);

        console.log('YOU HAVE '+  obj.records[test_page.test].stars +' STARS FOR THIS TEST!!!');

        if(!obj.records[test_page.test].complete){
            obj.records[test_page.test].complete = true;
        }

        console.log(result_page.findTestNumb(test_page.test)+"   -----   "+obj.lastPassedTest);
        if(this.findTestNumb(test_page.test) > obj.lastPassedTest){
            obj.lastPassedTest = this.findTestNumb(test_page.test);
        }

        locStor.set('Lmt_all', obj);
    },
    findTestNumb: function(test){
        for(var i = 0; i < allTests.length; i++){
            if(allTests[i] == test){
                return i;
            }
        }
    },
    getAch: function () {
        var obj = locStor.get('Lmt_all');

        if (result_page.score > 112 && obj.afterAch.indexOf(test_page.test) == -1) {
            // this.showAchModal(result_page.findTestNumb(test_page.test));
            // obj.achs.push(result_page.findTestNumb(test_page.test));
            obj.afterAch.push(test_page.test);
            this.showAchModal(obj.achs.length);
            obj.achs.push(obj.achs.length);

            locStor.set('Lmt_all', obj);
        }
    },
    showAchModal: function(ach){
        ach_sound.play();
        myApp.modal({
            title: 'Congratulations!',
            text: 'You have earned the item: '+ achievements[ach].name,
            afterText: '<img class="ach_img_plus" src="img/achs/' + achievements[ach].img + '.png">',
            buttons: [
                {
                    text: 'OK',
                    onClick: function () {
                        tap_sound.play();
                    }
                }
            ]
        })
    }
};