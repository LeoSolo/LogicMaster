myApp.onPageInit('glory_page', function (page) {

    $$('.tap-link').on('click', function(){
        tap_sound.play();
    });

});

var glory_page = {
    buildPage: function(){
        $$('#glory_page_cont .swiper-wrapper').html('');
        $$('#glory_page_cont .itemSwiperPagination').html('');

        $$('.gloryItemTitle').html(achievements[0].name);

        var obj = locStor.get("Lmt_all");

        for(var i = 0; i < achievements.length; i++){
            if(obj.achs.indexOf(i) != -1){
                achievements[i].active = true;
            }
        }

        var template;
        var cont;
        var html;
        var arr = achievements;
        var new_obj = {
            xxx: arr
        };

        template =
            '{{#each xxx}}' +
                '<div class="swiper-slide {{#unless active}}not_active{{/unless}}">'+
                    '<span data-index="{{@index}}"></span>'+
                    '<div class="item">'+
                    '<div class="itemPicture" style="background: url(img/achs/{{img}}.png) center center no-repeat; background-size: 74%;"></div>'+
                    '</div>'+
                '</div>'+
            '{{/each}}';

        cont = Template7.compile(template);

        html = cont(new_obj);

        $$('#glory_page_cont .swiper-wrapper').append(html);

        var mySwiper = myApp.swiper('.swiper-container', {
            pagination:'.itemSwiperPagination'
        });

        if($$('.swiper-slide-active').hasClass('not_active')){
            $$('.achCheck').addClass('blocked');
        }else{
            $$('.achCheck').removeClass('blocked');
        }

        mySwiper.on('slideChangeStart', function () {
            var itemDescription = achievements[$$('.swiper-slide-active span').dataset().index].desc;
            var itemName = achievements[$$('.swiper-slide-active span').dataset().index].name;
            $$('.aboutItem .itemDescription').html(itemDescription);
            $$('.gloryItemTitle').html(itemName);

            if($$('.swiper-slide-active').hasClass('not_active')){
               $$('.achCheck').addClass('blocked');
            }else{
                $$('.achCheck').removeClass('blocked');
            }
        });
    }
};

var achievements = [
    {
        name: "Student's Bag",
        img: 'bag',
        desc: 'Get 3 stars in "Classic Test" to unlock this reward',
        active: false
    },
    {
        name: "Professor's Glasses",
        img: 'points',
        desc: 'Get 3 stars in "Classic Test" to unlock this reward',
        active: false
    },
    {
        name: "Pen",
        img: 'pen',
        desc: 'Get 3 stars in "Find The Odd" to unlock this reward',
        active: false
    },
    {
        name: "Cards",
        img: 'cards',
        desc: 'Get 3 stars in "Comparisons" to unlock this reward',
        active: false
    },
    {
        name: "Book",
        img: 'book',
        desc: 'Get 3 stars insh "Logic Test" to unlock this reward',
        active: false
    },
    {
        name: "Tie",
        img: 'tie',
        desc: 'Get 3 stars in "Sequences" to unlock this reward',
        active: false
    },
    {
        name: "Owl",
        img: 'owl',
        desc: 'Get 3 stars in "Count it" to unlock this reward',
        active: false
    },
    {
        name: "Professor's Mantle",
        img: 'mantle',
        desc: 'Get 3 stars in "Math Test" to unlock this reward',
        active: false
    },
    {
        name: "Academic Cap",
        img: 'cap',
        desc: 'Get 3 stars in "Coding Words" to unlock this reward',
        active: false
    },
    {
        name: "Smile",
        img: 'smile',
        desc: 'Get 3 stars in "Stupid Test" to unlock this reward',
        active: false
    },
    {
        name: "Tie's clip",
        img: 'clip',
        desc: 'Get 3 stars in "Detective Test" to unlock this reward',
        active: false
    },
    {
        name: "Ring",
        img: 'ring',
        desc: 'Get 3 stars in "Dictionary" to unlock this reward',
        active: false
    }
];