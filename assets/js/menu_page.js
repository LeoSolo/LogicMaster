myApp.onPageInit('menu_page', function (page) {

    $$('.arrow').on('click', function () {
        tap_sound.play();
        var arrow = $$(this).hasClass('arrow_left');
        $$('.slide_points div').removeClass('active');
        switch (arrow) {
            case true:
                $$('.slide_points div:first-child').addClass('active');
                break;
            case false:
                $$('.slide_points div:last-child').addClass('active');
                break;
        }
    });

    $$('.menuTable').on('click', function(){
        // var id = "#"+$$(this).prop('id');
        // console.log(id);
        menu_page.showLastTest($$(this));
    });

});

var menu_page = {
    averageScore: 0,
    title: 'Kindergartener',
    buildPage: function () {
        $$('.menuTable td.btn').html('');

        var thatTd,
            obj,
            html,
            thatTdData,
            td;

        obj = locStor.get('Lmt_all');

        for(var i = 0; i < $$('.menuTable td.btn').length; i++){
            thatTd = $$('.menuTable td.btn')[i];
            thatTdData = $$(thatTd).dataset().test;
            $$(thatTd).html(obj.records[thatTdData].name);

            td = $$('.menuTable td.btn').eq(i);
            if(obj.records[$$(td).dataset().test].stars == 0){
                $$(td).addClass('blocked');
            }else{
                $$(td).removeClass('blocked');
            }
        }

        html = '<table class="stars">'+
            '<tr>'+
            '<td></td>'+
            '<td></td>'+
            '<td></td>'+
            '</tr>'+
            '</table>';

        $$('.menuTable td.btn').append(html);

        $$('.menuTable td.btn').on('click', function () {
            tap_sound.play();
            test_page.test = $$(this).dataset().test;
            animateChangePage('test_page');
        });

        $$('.menuTable td.btn').eq(0).removeClass('blocked');

        this.checkStars();

        this.printIq();

        this.checkInnaps();
    },
    checkInnaps: function(){
        var obj = locStor.get('Lmt_all');

        if(obj.newInapps.allTests){
            $$('.shadowForTestsBuy').hide();
        }
    },
    checkStars: function(){
        var obj = locStor.get('Lmt_all');

        var td,
            stars,
            star;

        for(var i = 0; i < $$('.menuTable td.btn').length; i++){
            td = $$('.menuTable td.btn').eq(i);
            if(obj.records[$$(td).dataset().test].stars != 0){
                $$(td).attr("data-stars", obj.records[$$(td).dataset().test].stars);
                stars = obj.records[$$(td).dataset().test].stars;
                $$('.menuTable td.btn').eq(i+1).removeClass('blocked');

                for(var y = 0; y < stars; y++){
                    star = $$(td).find('.stars td')[y];
                    $$(star).addClass('active');
                }
            }
        }
    },
    printIq: function () {
        var summ = 0;
        var count = 0;
        var obj = locStor.get('Lmt_all');
        var list = [obj.records.classic, obj.records.odd, obj.records.comparisons, obj.records.logic, obj.records.sequence, obj.records.math, obj.records.more, obj.records.code, obj.records.stupid, obj.records.detective, obj.records.dictionary, obj.records.wits];

        for (var i = 0; i < list.length; i++) {
            if (list[i].score != '-') {
                summ += list[i].score;
                count += 1;
            }
        }

        this.averageScore = summ / count;

        if (this.averageScore != 0 && this.averageScore) {
            $$('#averageScore span').html(Math.round(this.averageScore));
        }
        else {
            $$('#averageScore span').html('???');
        }

        if (this.averageScore <= 28) {
            this.title = 'Kindergartener';
        }
        else if (this.averageScore > 28 && this.averageScore <= 56) {
            this.title = 'Preschooler';
        }
        else if (this.averageScore > 56 && this.averageScore <= 84) {
            this.title = 'Schooler';
        }
        else if (this.averageScore > 84 && this.averageScore <= 112) {
            this.title = 'Collegian';
        }
        else if (this.averageScore > 112) {
            this.title = 'Professor';
        }

        $$('#iqTitle').html(this.title);
    },
    showLastTest: function(table){
        var td,
            lastTdCount,
            blockedCount = 0;

        for(var i = 0; i < $$(table).find('.chooseTestBtn').length; i++){
            td = $$(table).find('.chooseTestBtn')[i];
            if($$(td).hasClass('blocked')){
                blockedCount++;
            }
        }

        lastTdCount = 5-blockedCount;
        td = $$(table).find('.chooseTestBtn')[lastTdCount];

        if(!$$(td).hasClass('animate')){
            $$(td).addClass('animate');
            setTimeout(function(){
                $$(td).removeClass('animate');
            },650);
        }
    }
};