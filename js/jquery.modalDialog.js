//参考
//http://swip.codylindley.com/DOMWindowDemo.html
//
(function($){

    var shortcut = {};
    shortcut.viewPortHeight = function(){ return self.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;};
    shortcut.viewPortWidth = function(){ return self.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;};
    shortcut.scrollOffsetHeight = function(){ return self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;};
    shortcut.scrollOffsetWidth = function(){ return self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;};
    
    $.modalDialogClose = function(){
        var $DOMWindowOverlay = $("#DOMWindowOverlay");
        $DOMWindowOverlay.fadeOut('fast',function(){
            $DOMWindowOverlay.remove();																	  
        });
        
        $DOMWindow = $("#DOMWindow");
        $DOMWindow.fadeOut('fast',function(){
            $DOMWindow.remove();																	  
        });
    }
    
    $.modalDialog = function(windowSourceURL){
        //config
        var overlayOpacity = "50";
        var windowPadding = "10";
        var windowHeight = "500";
        var windowWidth = "500";
        var fixedWindowY = "100";
        
        //オーバーレイ作成
        $('body').append('<div id="DOMWindowOverlay" style="z-index:10000;display:none;position:absolute;top:0;left:0;background-color:#000;filter:alpha(opacity=' + overlayOpacity + ');-moz-opacity: 0.' + overlayOpacity + ';opacity: 0.' + overlayOpacity + ';"></div>');
        var $DOMWindowOverlay = $("#DOMWindowOverlay");
        $DOMWindowOverlay.css({'height':'100%','width':'100%','position':'fixed'});
        $DOMWindowOverlay.fadeIn('fast');
        $DOMWindowOverlay.on("click.DOMWindowOverlay", function(){
        });
        
        //オーバーレイクリック時にclose
        $DOMWindowOverlay.click(function(){$.modalDialogClose();});

        //ダイアログ作成
        $('body').append('<div id="DOMWindow" style="background-repeat:no-repeat;overflow:auto;padding:'+windowPadding+'px;display:none;height:'+windowHeight+'px;width:'+windowWidth+'px;background-color:#fff;border:4px solid #ccc; position:absolute;z-index:10001"></div>');
        var $DOMWindow = $('#DOMWindow');
        
        //ダイアログのwindowサイズ調整(調整)
        $DOMWindow.css('left',Math.round(shortcut.viewPortWidth()/2) + shortcut.scrollOffsetWidth() - Math.round(($DOMWindow.outerWidth())/2));
        $DOMWindow.css('top',Math.round(shortcut.viewPortHeight()/2) + shortcut.scrollOffsetHeight() - Math.round(($DOMWindow.outerHeight())/2));
       

        //URL読み込み
        if(windowSourceURL.indexOf("?") == -1){ //no query string, so add one
            windowSourceURL += '?';
        }
        $DOMWindow.load(
            windowSourceURL + '&random=' + (new Date().getTime()),function(){
				//$('#DOMWindowLoader').remove();
				$('#DOMWindow').fadeIn('fast');
				$('#DOMWindow .closeDOMWindow').click(function(){						
					$.closeDOMWindow();
					return false;
				});
            }
        );
    };

}(jQuery));
