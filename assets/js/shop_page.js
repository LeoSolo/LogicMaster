var buyer = {
    checkConnection: function (purchase) {
        if(navigator.onLine){
            JSAPI.purchase(purchase);
            myApp.showPreloader();
        }else{
            buyer.showModal();
        }
    },
    showModal: function () {
        var modal = myApp.modal({
            title: '',
            text: '',
            afterText: '<div class="noconnect-icon">' +
            '</div>',
            buttons: [
                {
                    text: 'ОК',
                    onClick: function () {
                        JSAPI.showAd();
                    }
                }
            ]
        })
    },
    restore: function () {
        if(navigator.onLine){
            JSAPI.refreshPurchases();
            myApp.showPreloader();
            setTimeout(function () {
                myApp.hidePreloader();
            }, 3000);
        }else{
            buyer.showModal();
        }
    }
};

window.addEventListener('purchaseEvent', function (e) {
    myApp.hidePreloader();
    var purchase = e.detail.purchase;
    var obj = locStor.get('Lmt_all');

    switch (purchase) {
        case 'removeAds':
            obj.newInapps.removeAds = true;
            adsCount = 0;
            $$('.shopBtn').hide();
            clearInterval(adsCountInt);
            JSAPI.disableAd();
            break;
        case 'allTests':
            obj.newInapps.allTests = true;
            $$('.shadowForTestsBuy').hide();
            $$('.resultScreenBtn').removeClass('buyTests_btn').addClass('nextTest_btn').html('Next');
            break;
    }
    locStor.set('Lmt_all', obj);
    JSAPI.confirmReceipt(e.detail.receiptId);
    myApp.hidePreloader();
}, false);

window.addEventListener('purchaseExitEvent', function (e) {
    myApp.hidePreloader();
    JSAPI.showAd();
}, false);

window.addEventListener('productDataEvent', function () {
    var products = getBufferEventVar().products;
}, false);

window.addEventListener('adCrossClickedEvent', function () { //срабатывает при нажатии на крестик
    buyer.checkConnection('removeAds');
});

window.addEventListener('onAdDisableError', function () { //срабатывает при возникновении ошибки закрытия баннера
});

window.addEventListener('onAdDisabled', function () { //срабатывает при успешном закрытии баннера
    $$('.topRemoveAds_btn').hide();
});

window.addEventListener('videoAdWillAppear', function(){
    adsCount = 0;
});

window.addEventListener('videoAdDidDisappear', function(){
    adsCount = 0;
});