// Initialize your app
var myApp = new Framework7({
    init: false,
    swipeBackPage: false,
    router: true,
    animateNavBackIcon: true,
    cache: false,
    precompileTemplates: true,
    template7Pages: true,
    statusbarOverlay: false,
    animatePages: false
});
var $$ = Dom7;

var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true,
    domCache: true
});

/* start functions */

function sorting(arr){
    arr.sort(function (a, b) {
        return a.price.split('$')[1] - b.price.split('$')[1];
    });
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var locStor = {
    set: function (key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    get: function (key) {
        return JSON.parse(localStorage.getItem(key));
    }
};

function getText(url, callback, params) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'content/text.txt', false);
    xhr.send();

    var text = xhr.responseText;

    return text;
}

function animateChangePage(page) {
    $$('.page-content').addClass('hideAnimation');
    $$('.navbar-inner').addClass('hideAnimation');
    var obj = locStor.get('Lmt_all');
    if(!obj.inapps.removeAds){
         if(adsCount > 65){
             adsCount = 0;
             myApp.popup('.popup-ad');
         }
    }
    setTimeout(function () {
        if (page) {
            mainView.router.load({pageName: page});
        }
        else {
            mainView.router.back();
        }
        setTimeout(function () {
            $$('.page-content').removeClass('hideAnimation');
            $$('.navbar-inner').removeClass('hideAnimation');
        }, 50)
    }, 300);
}

/* end functions */

/* start global clicks */

$$('.backBtn').on('click', function () {
    tap_sound.play();
    $$('.navbar').removeClass('withSub');
    animateChangePage();
});

$$('.backBtnTest').on('click', function () {
    tap_sound.play();
    myApp.modal({
        text: 'Do you really want to quit?',
        buttons: [
            {
                text: 'Yes',
                onClick: function () {
                    tap_sound.play();
                    animateChangePage('menu_page');
                }
            },
            {
                text: 'Cancel',
                onClick: function () {
                    tap_sound.play();
                }
            }
        ]
    });
});

$$('.backBtnMain').on('click', function () {
    tap_sound.play();
    animateChangePage('index');
});

$$('.settingsBtn').on('click', function () {
    tap_sound.play();
    animateChangePage('settings_page');
});

$$('.achsBtn').on('click', function () {
    tap_sound.play();
    animateChangePage('glory_page');
});

$$('.topRemoveAds_btn').on('click', function () {
    buyer.checkConnection('removeAds');
});

$$('.buyTests_btn').on('click', function(){
    buyer.checkConnection('allTests');
});


/* Start Ads Screen */



/* End Ads Screen */

/* end global clicks */

myApp.onPageBeforeAnimation('*', function (page) {
    switch (page.url) {
        case '#index':
            index.getStudent();
            index.continueTest();
            break;
        case '#menu_page':
            menu_page.buildPage();
            break;
        case '#settings_page':
            pageFrom = mainView.activePage.fromPage.name;
            settings_page.checkSettings();
            break;
        case '#test_page':
            if(page.fromPage.name != "settings_page"){
                test_page.buildPage();
            }
            break;
        case '#result_page':
            result_page.buildPage();
            break;
        case '#glory_page':
            // pageFrom = mainView.activePage.fromPage.name;
            glory_page.buildPage();
            break;
    }
});

/* start pages */

myApp.onPageInit('index', function (page) {
    setTimeout(function () {
        music.play();
    }, 600);

    $$('.page-content').addClass('trueAnimation');
    $$('.navbar-inner').addClass('trueAnimation');

    setTimeout(function(){
        $$('#playBtn').on('click', function () {
            tap_sound.play();
            var obj = locStor.get('Lmt_all');
            if(obj.firstCome){
                test_page.test = "classic";
                animateChangePage('test_page');
                obj.firstCome = false;
                locStor.set('Lmt_all', obj);
            }else{
                animateChangePage('menu_page');
            }
        });
    },300);

    $$('.indexDialogBtn').on('click', function(){
        tap_sound.play();
        var obj = locStor.get('Lmt_all');
        if($$('.indexDialogBtn').hasClass('continueLastGame_Btn')){
            test_page.test = allTests[obj.lastPassedTest + 1];
            animateChangePage('test_page');
        }else if($$('.indexDialogBtn').hasClass('buyTestsToContinue')){
            buyer.checkConnection('allTests');
        }else if($$('.indexDialogBtn').hasClass('orderTests')){
            myApp.alert("To make our app better for you, we'll add more tests in the next update!", "Thanks for playing Logic Master Test!", function () {
                JSAPI.pushCustomEvent("User_want_more_tests!");
            });
        }
    });
});

var index = {
    firstCome: function () {
        setTimeout(function(){
            $$('.starterBlock').hide();
        },200);
        var obj;
        if (!locStor.get('Lmt_all')) {
            $$('.navbar').hide();
            $$('#splashScreen').show();

            $$('.splashRemoveAds_Btn').on('click', function(){
                $$('.navbar').show();
                $$('#splashScreen').hide();
                clearInterval(splashCountdownInterval);
                buyer.checkConnection('removeAds');
            });

            splashCountdown = 11;
            splashCountdownInterval = setInterval(index.splashCountdown, 1000);
            adsCountInt = setInterval(adsCounter, 1000);
            obj = {
                firstCome: true,
                settings: {
                    sound: true,
                    music: true
                },
                achs: [],
                inapps: {
                    mathTest: false,
                    codeAndStupidTest: false,
                    pack: false
                },
                newInapps:{
                    removeAds: false,
                    allTests: false
                },
                records: {
                    classic: {
                        name: 'Classic Test',
                        score: '-',
                        stars: 0
                    },
                    odd: {
                        name: 'Find The Odd',
                        score: '-',
                        stars: 0
                    },
                    comparisons: {
                        name: 'Comparisons',
                        score: '-',
                        stars: 0
                    },
                    logic: {
                        name: 'Logic Test',
                        score: '-',
                        stars: 0
                    },
                    sequence: {
                        name: 'Sequences',
                        score: '-',
                        stars: 0
                    },
                    more: {
                        name: 'Count it',
                        score: '-',
                        stars: 0
                    },
                    math: {
                        name: 'Math Test',
                        score: '-',
                        stars: 0
                    },
                    code: {
                        name: 'Coding Words',
                        score: '-',
                        stars: 0
                    },
                    stupid: {
                        name: 'Stupid Test',
                        score: '-',
                        stars: 0
                    },
                    detective: {
                        name: 'Detective Test',
                        score: '-',
                        stars: 0
                    },
                    dictionary: {
                        name: 'Dictionary',
                        score: '-',
                        stars: 0
                    },
                    wits: {
                        name: 'Wits',
                        score: '-',
                        stars: 0
                    }
                },
                stars: [],
                lastPassedTest: -1,
                afterAch: []
            };
            locStor.set('Lmt_all', obj);
        }else{
            obj = locStor.get('Lmt_all');

            if(!obj.newInapps.removeAds){  // Если реклама включена
                $$('.navbar').hide();
                $$('#splashScreen').show();

                $$('.splashRemoveAds_Btn').on('click', function(){
                    $$('.navbar').show();
                    $$('#splashScreen').hide();
                    clearInterval(splashCountdownInterval);
                    buyer.checkConnection('removeAds');
                });

                splashCountdown = 11;
                splashCountdownInterval = setInterval(index.splashCountdown, 1000);
                adsCountInt = setInterval(adsCounter, 1000);
            }else{
                $$('.topRemoveAds_btn').hide();
            }

            setTimeout(function(){
                index.continueTest();
            },150);
        }
    },
    getStudent: function () {
        var obj = locStor.get('Lmt_all');

        $$('#student').css({
            'background': 'url(img/student' + obj.achs.length + '.png) 90% 100% no-repeat',
            'background-size': 'contain'
        })
    },
    continueTest: function(){
        var obj = locStor.get('Lmt_all');

        if(obj.lastPassedTest != -1) {
            $$('#index_cont').addClass('withStudentDialogToContinue');
        }

        if(obj.lastPassedTest >= 5 && obj.lastPassedTest < 11){
            if(obj.newInapps.allTests) {
                $$('.indexDialogBtn').addClass('continueLastGame_Btn').removeClass('buyTestsToContinue');
                $$('.continueLastGame_Btn').html('Continue');
            }else{
                $$('.indexDialogBtn').addClass('buyTestsToContinue').removeClass('continueLastGame_Btn');
                $$('.buyTestsToContinue').html('Buy Tests - 9.99$');
            }
        }else if(obj.lastPassedTest >= 5 && obj.lastPassedTest >= 11){
            $$('.indexDialogBtn').addClass('orderTests').removeClass('buyTestsToContinue').removeClass('continueLastGame_Btn');
            $$('.indexDialogBtn').html('More Tests');
        }else{
            $$('.indexDialogBtn.continueLastGame_Btn').html('Continue');
        }
    },
    splashCountdown: function(){
        if(splashCountdown < 2){
            JSAPI.showAd();
            $$('.navbar').show();
            $$('#splashScreen').hide();
            clearInterval(splashCountdownInterval);
        }else{
            splashCountdown--;

            adsProgressWidth += 10;
            $$('.adsProgressBar div').css({
                width: adsProgressWidth+'%'
            });

            $$('.splashCount span').html(splashCountdown);
            if($$('.circuit').hasClass('open')){
                setTimeout(function() {
                    $$('.circuit').removeClass('open');
                    $$('.circuit').addClass('close');
                    setTimeout(function(){
                        $$('.splashRemoveAds_Btn').css({
                            background: 'rgb(30,176,49)',
                            '-webkit-box-shadow': '0px 0px 19px 5px rgba(30,176,49,0.75)'
                        });

                    },300);
                },400);
            }else{
                setTimeout(function() {
                    $$('.circuit').addClass('open');
                    $$('.circuit').removeClass('close');
                    $$('.splashRemoveAds_Btn').css({
                        background: 'rgb(77,98,74)',
                        '-webkit-box-shadow': 'none'
                    });
                },800);
            }
        }
    }
};

var circuitInterval,
    adsProgressWidth = 0;


/* end pages */

var right_sound,
    wrong_sound,
    tap_sound,
    ach_sound,
    result_sound,
    record_sound,
    music,
    splashCountdownInterval,
    splashCountdown;

document.addEventListener('DOMContentLoaded', ready, false);

function ready() {
    JSAPI.keepScreenOn();

    myApp.sizeNavbars('.view');

    index.firstCome();
    setTimeout(function(){
        index.getStudent();
    },120);
    setTimeout(function () {
        right_sound = new Sound('sounds/right.mp3');
        wrong_sound = new Sound('sounds/wrong.mp3');
        tap_sound = new Sound('sounds/tap.mp3');
        ach_sound = new Sound('sounds/achievements.mp3');
        result_sound = new Sound('sounds/result.mp3');
        record_sound = new Sound('sounds/record.mp3');

        music = new Media('sounds/music.mp3');
        music.loop('on');

        settings_page.checkSettings();
    }, 500);
}

myApp.init();
