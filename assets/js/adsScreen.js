var adsCountInt,
    adsCount = 0;

function adsCounter(){
    adsCount++;
}

$$('.popupRemoveAds').on('click', function(){
    tap_sound.play();
    if(navigator.onLine){
        myApp.closeModal();
        JSAPI.purchase('removeAds');
    }else{
        myApp.closeModal();
        buyer.showModal();
        setTimeout(function(){
            JSAPI.showAd();
        },1000);
    }
});

$$('.closeAdPopup').on('click', function(){
    myApp.closeModal();
    JSAPI.showAd();
});

window.addEventListener('videoAdWillAppear', function(){
    adsCount = 0;
});

window.addEventListener('videoAdDidDisappear', function(){
    adsCount = 0;
});
