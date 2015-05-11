var onlinesites = onlinesites ||  {};

onlinesites.core = (function(window, document, ofx){
    "use strict";
    ofx.noConflict();
    
    var isDebug = false;

    var constants = {
        'isiPad': /ipad/i.test(navigator.userAgent.toLowerCase()),
        'isiPhone': /iphone/i.test(navigator.userAgent.toLowerCase()),
        'isiPod': /ipod/i.test(navigator.userAgent.toLowerCase()),
        'isiDevice': /ipad|iphone|ipod/i.test(navigator.userAgent.toLowerCase()),
        'isAndroid': /android/i.test(navigator.userAgent.toLowerCase()),
        'isBlackBerry': /blackberry/i.test(navigator.userAgent.toLowerCase()),
        'isWebOS': /webos/i.test(navigator.userAgent.toLowerCase()),
        'isWindowsPhone': /windows phone/i.test(navigator.userAgent.toLowerCase()) 
    };
    
    function init(){
        if(isDebug){console.log("scripts iniciado"); }
        
    }
    
    //ações para serem feitas após o carregamento
    ofx(window).load(function(){
   
    });
    
    //ações para serem feitas no resize
    ofx(window).resize(function(){
        if(!isMobile) {
   
        }
    });
    
   
    
    
    function isMobile(){
        return constants.isiPad || constants.isiPhone || constants.isiPod || constants.isiDevice || constants.isAndroid || constants.isBlackBerry || constants.isWebOS || constants.isWindowsPhone;
    }
        
    
    
    
    return {
        constants: constants,
        init: init,
        isMobile: isMobile,
        isDebug: isDebug
    };                    
}(window, document, jQuery)); //core




