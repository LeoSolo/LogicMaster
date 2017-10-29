myApp.onPageInit('settings_page', function (page) {

    $$('.checkbox').on('click', function(){
        settings_page.changeSetting(this);
    });

    $$('.restorePurch').on('click', function(){
        buyer.restore();
    });

});

var settings_page = {
    changeSetting: function(checkbox){
        var obj = locStor.get('Lmt_all');
        var setting = $$(checkbox).parent().find('input').prop('id');

        switch (setting){
            case 'soundInput':
                switch (obj.settings.sound){
                    case true:
                        obj.settings.sound = false;
                        break;
                    case false:
                        obj.settings.sound = true;
                        break;
                }
                break;
            case 'musicInput':
                switch (obj.settings.music){
                    case true:
                        obj.settings.music = false;
                        break;
                    case false:
                        obj.settings.music = true;
                        break;
                }
                break;
        }

        locStor.set('Lmt_all', obj);
        setTimeout(function(){
            settings_page.checkSettings();
        },50);
    },
    checkSettings: function () {
        var obj = locStor.get('Lmt_all');

        if(obj.settings.sound){
            $$('#soundInput').prop('checked', true);
            right_sound.volume(0.7);
            wrong_sound.volume(0.7);
            result_sound.volume(0.7);
            record_sound.volume(0.7);
            ach_sound.volume(0.7);
            tap_sound.volume(0.7);
            $$('#settings_list li:first-child').removeClass('sound_off');
        }
        else{
            $$('#soundInput').prop('checked', false);
            right_sound.volume(0);
            wrong_sound.volume(0);
            result_sound.volume(0);
            record_sound.volume(0);
            ach_sound.volume(0);
            tap_sound.volume(0);
            $$('#settings_list li:first-child').addClass('sound_off');
        }

        if(obj.settings.music){
            $$('#musicInput').prop('checked', true);
            $$('#settings_list li:last-child').removeClass('music_off');
            music.volume(0.6);
        }
        else{
            $$('#musicInput').prop('checked', false);
            $$('#settings_list li:last-child').addClass('music_off');
            music.volume(0);
        }
    }
};