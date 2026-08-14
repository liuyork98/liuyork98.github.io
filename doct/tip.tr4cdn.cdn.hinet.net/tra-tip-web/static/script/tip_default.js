var _____WB$wombat$assign$function_____=function(name){return (globalThis._wb_wombat && globalThis._wb_wombat.local_init && globalThis._wb_wombat.local_init(name))||globalThis[name];};if(!globalThis.__WB_pmw){globalThis.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opener = _____WB$wombat$assign$function_____("opener");

$(function(){

    $("[data-toggle='popover']").popover();
    $('[data-toggle="tooltip"]').tooltip();

    tipSwitchMenu();
    tipSwitchStationSelector();
//    tipDatepickSett("1990/01/01", null);    // 各頁面依需求使用小日曆，並傳入可選起訖日期
//    tipDatepickYear("1990", null);          // 各頁面依需求使用年份小日曆，傳入可選起訖日期
//    tipDatepickMonth();                     // 各頁面依需求使用月份小日曆
    tipSwitchSelectSeat();
    tipRadioTabBtn();
    tipSlideshowCycle();
    tipFooterOnBottom();
    setHomeBannerSlide();
    $(".select2-container").css("padding","0")
    
});

//視窗改變尺寸事件
$(window).resize(function(event) {

    tipFooterOnBottom();

});

// 頂端次選單的顯示與關閉
function tipSwitchMenu(){
    $('.menu .container > ul > li > a').on({
        click: function(){
            return false;
        },
        mouseover: function(){
            $('.menu li').removeClass('active').find('a').blur();
        },
        focus: function(){
            $('.menu li').removeClass('active');
            $(this).parent('li').addClass('active');
        }
    });

    //判斷是否離開主選單區域
    $(document).delegate('a','focusin', function(event){
        if ( $(this).parents('.menu').length < 1 ) {
            $('.menu li').removeClass('active').find('a').blur();
        };
    });

    //頂端凍結
    $(window).scroll(function(){
        if ( $(window).scrollTop() > parseInt($('.header').height()) ) {
            $('.menu').css('position','fixed');
        } else {
            $('.menu').css('position','static');
        }
    });

    return false;
}


// 出發抵達站點選單開關(首頁)
function tipSwitchStationSelector()
{
        var buttonTxt = -1; //文字站點最後點擊的按鈕索引
        var buttonImg = -1; //圖片站點最後點擊的按鈕索引

        //文字站點
        $(document).on('click', '.icon-list, .icon-map', function(event){        	
            //文字站點區塊
            var block = $(this).hasClass('icon-map') ? $('#stationSelectImg') : $('#stationSelectTxt');
            var which = $(this).hasClass('icon-map') ? 'img' : 'txt';

            //關閉站點區塊
            if(which=='img'){
                tipClearStactionSelector('txt');
            } else {
                tipClearStactionSelector('img');
            }

            //當前點擊的按鈕索引
            var buttonCur = $( event.target );
            var buttonTxtInd = $('.icon-list').index( buttonCur );
            var buttonImgInd = $('.icon-map').index( buttonCur );

            //當前按鈕的位置(parent=body)
            var buttonOffset = buttonCur.offset();

            //判斷瀏覽器版本(getComputedStyle不支援IE8)
            if (tipUserAgent()=='IE8') {

                var property_left = (which=='img') ? 130 : 125;

            } else {

                //取得箭頭符號:before偽類的left值=125.008px
                var property = window.getComputedStyle(document.getElementById('stationSelectTxt'), ':before');
                var property_left = parseInt(property.left);
            }

            //進行定位
            block.css({
                'left': buttonOffset.left - property_left,
                'top': buttonOffset.top + buttonCur.height()*2.5
            });

            //樣式
            if ( which=='txt' && buttonTxt==buttonTxtInd ) {

                buttonImg = -1;

                //重覆點擊本身
                block.toggleClass('active');

            } else if( which=='img' && buttonImg==buttonImgInd ){

                buttonTxt = -1;

                //重覆點擊本身
                block.toggleClass('active');

            } else {

                //開啟
                block.addClass('active');
            }

            //紀錄按鈕索引
            buttonTxt = buttonTxtInd;
            buttonImg = buttonImgInd;

            var inputid = $(this).attr("data-type")

            $('.tipStation').attr("data-type",inputid);
            return false;
        });
        //點擊縣市
        $('.tipCity').click(function(){
            var tmp =  $(this).attr("data-type");
            $('.cityHr').hide();
            $('#'+tmp).show();
            $('.tipCity').removeClass("active");
            $(this).addClass("active");
        });
        //點擊車站
        $('.tipStation').click(function(){
            var tmp =  $(this).attr("data-type");
            var title =  $(this).attr("title");
            var inputData = searchAutoArray(title, availableTags);
            $('input[id="'+tmp+'"]').val(inputData);
            $('#stationSelectTxt').removeClass('active')
        });
        //點擊支線線別
        $('.tipLine').click(function(){
            var tmp =  $(this).attr("data-type");
            $('.lineHr').hide();
            $('#'+tmp).show();
            $('.tipLine').removeClass("active");
            $(this).addClass("active");
        });

        //點擊其他元件時關閉站點
        $(document).on('click',function(event){
            var target = $(event.target);
            var curTxt = target.parents('#stationSelectTxt').length;
            var curImg = target.parents('#stationSelectImg').length;
            if (curTxt<1 && curImg<1) {
                tipClearStactionSelector();
            }
        });


        //改變視窗大小時關閉全部
        $(window).resize(function(){
            tipClearStactionSelector();
        });

}


//站點關閉並清除定位
function tipClearStactionSelector(obj){
    if (obj=='txt') {
        $('#stationSelectTxt').removeClass('active');
    }else if (obj=='img') {
        $('#stationSelectImg').removeClass('active');
    }else{
        $('#stationSelectTxt').removeClass('active');
        $('#stationSelectImg').removeClass('active');
    }
}


//日期選擇器(完整日期)
function tipDatepickSett(className, startDate, endDate){
	
	if (!className) {
		className = 'datepicker';     // 預設CSS class為datepicker
	}
	var startDay = new Date();
	var startDayResult = new Date();
	var endDay = new Date();
	var endDayResult = new Date();
	
	if(startDate != null){
		var startCount = startDate.substring(0,startDate.length-1)
		startDayResult.setDate(startDay.getDate() + parseInt(startCount));
	} else{
		startDayResult = new Date(1970,01,01)
	}
	
	if(endDate != null){
		var endCount = endDate.substring(0,endDate.length-1)
		endDayResult.setDate(endDay.getDate() + parseInt(endCount));
	} else{
		endDayResult = '+180d'
	}
	
	
	if ( $('.' + className).length>0 ) {
        if (!startDate) {
            startDate = '1990/01/01'; // 預設可從1990/01/01開始選擇日期

        }
        if (!endDate) {
            endDate = '';             // 預設可選未來所有時間
        }

        $('.' + className).datepicker({
            language: 'zh-TW',
            autoclose: true,
            format: 'yyyy/mm/dd',
            startDate: startDayResult,
            endDate: endDayResult,
            maxViewMode: 'years'      // 新增 完整日期選單 最多可增減10年 設定
        });
        
        //修正樣式
        $('.' + className).css('padding', 0);
        $('.' + className + '.dropdown-menu').css('padding', '4px');
        //按鈕事件
        $('.' + className).on('changeDate', function() {
            $(this).prev('input[data-plugin="datepicker"]').val(
                $(this).datepicker('getFormattedDate')
            );
        });
    };
}

function tipDatepickSettByDate(className, startDate, endDate,locale){
	
	if (!className) {
		className = 'datepicker';     // 預設CSS class為datepicker
	}
	
	if ( $('.' + className).length>0 ) {
		if (!startDate) {
			startDate = '1990/01/01'; // 預設可從1990/01/01開始選擇日期
			
		}
		if (!endDate) {
			endDate = '';             // 預設可選未來所有時間
		}
		
		$('.' + className).datepicker({
			language: 'zh-TW',
			autoclose: true,
			format: 'yyyy/mm/dd',
			startDate: new Date(startDate),
			endDate: new Date(endDate),
			maxViewMode: 'years'      // 新增 完整日期選單 最多可增減10年 設定
		});
		
		//修正樣式
		$('.' + className).css('padding', 0);
		$('.' + className + '.dropdown-menu').css('padding', '4px');
		//按鈕事件
		$('.' + className).on('changeDate', function() {
			$(this).prev('input[data-plugin="datepicker"]').val(
					$(this).datepicker('getFormattedDate')
			);
		});
	};
}
function tipDatepickSettByDate(className, startDate, endDate){
	
	if (!className) {
		className = 'datepicker';     // 預設CSS class為datepicker
	}
	
	if ( $('.' + className).length>0 ) {
		if (!startDate) {
			startDate = '1990/01/01'; // 預設可從1990/01/01開始選擇日期
			
		}
		if (!endDate) {
			endDate = '';             // 預設可選未來所有時間
		}
		
		$('.' + className).datepicker({
			language: 'zh-TW',
			autoclose: true,
			format: 'yyyy/mm/dd',
			startDate: new Date(startDate),
			endDate: new Date(endDate),
			maxViewMode: 'years'      // 新增 完整日期選單 最多可增減10年 設定
		});
		
		//修正樣式
		$('.' + className).css('padding', 0);
		$('.' + className + '.dropdown-menu').css('padding', '4px');
		//按鈕事件
		$('.' + className).on('changeDate', function() {
			$(this).prev('input[data-plugin="datepicker"]').val(
					$(this).datepicker('getFormattedDate')
			);
		});
	};
}
function tipDatepickSettByDate(className, startDate, endDate,locale){
	
	if (!className) {
		className = 'datepicker';     // 預設CSS class為datepicker
	}
	
	if ( $('.' + className).length>0 ) {
		if (!startDate) {
			startDate = '1990/01/01'; // 預設可從1990/01/01開始選擇日期
			
		}
		if (!endDate) {
			endDate = '';             // 預設可選未來所有時間
		}
		
		$('.' + className).datepicker({
			language: 'zh-TW',
			autoclose: true,
			format: 'yyyy/mm/dd',
			startDate: new Date(startDate),
			endDate: new Date(endDate),
			maxViewMode: 'years'      // 新增 完整日期選單 最多可增減10年 設定
		});
		
		//修正樣式
		$('.' + className).css('padding', 0);
		$('.' + className + '.dropdown-menu').css('padding', '4px');
		//按鈕事件
		$('.' + className).on('changeDate', function() {
			$(this).prev('input[data-plugin="datepicker"]').val(
					$(this).datepicker('getFormattedDate')
			);
		});
	};
}

function tipDatepickSettByDate(className, startDate, endDate,locale,freezeDates){
	
	if (!className) {
		className = 'datepicker';     // 預設CSS class為datepicker
	}
	
	if ( $('.' + className).length>0 ) {
		if (!startDate) {
			startDate = '1990/01/01'; // 預設可從1990/01/01開始選擇日期
			
		}
		if (!endDate) {
			endDate = '';             // 預設可選未來所有時間
		}
		
		$('.' + className).datepicker({
			language: 'zh-TW',
			autoclose: true,
			format: 'yyyy/mm/dd',
			startDate: new Date(startDate),
			endDate: new Date(endDate),
			datesDisabled: freezeDates,
			maxViewMode: 'years'      // 新增 完整日期選單 最多可增減10年 設定
		});
		
		//修正樣式
		$('.' + className).css('padding', 0);
		$('.' + className + '.dropdown-menu').css('padding', '4px');
		//按鈕事件
		$('.' + className).on('changeDate', function() {
			$(this).prev('input[data-plugin="datepicker"]').val(
					$(this).datepicker('getFormattedDate')
			);
		});
	};
}


//日期選擇器(年)
function tipDatepickYear(startYear, endYear){
    if ( $('.datepickerYear').length>0 ) {
        if (!startYear) {
            startYear = '1990';       // 預設可從1990/01/01開始選擇日期
        }
        if (!endYear) {
            endYear = '';             // 預設可選未來所有時間
        }

        $('.datepickerYear').datepicker({
            language: 'zh-TW',
            autoclose: true,
            format: 'yyyy',
            startDate: startYear,
            endDate: endYear,
            viewMode: 'years',
            minViewMode: 'years',    // 新增 僅可選擇年份 設定
            maxViewMode: 'decades'   // 新增 僅可選擇年份 設定
        });
        //修正樣式
        $('.datepickerYear').css('padding', 0);
        $('.datepickerYear.dropdown-menu').css('padding', '4px');
        //按鈕事件
        $('.datepickerYear').on('changeDate', function() {
            $(this).prev('input[data-plugin="datepickerYear"]').val(
                $(this).datepicker('getFormattedDate')
            );
        });
    };
}


//日期選擇器(月)
function tipDatepickMonth(){
    if ( $('.datepickerMonth').length>0 ) {
        $('.datepickerMonth').datepicker({
            language: 'zh-TW',
            autoclose: true,
            format: 'mm',
            viewMode: 'months',
            minViewMode: 'months',    // 新增 僅可選擇月份 設定
            maxViewMode: 'months'     // 新增 僅可選擇月份 設定
        });
        //修正樣式
        $('.datepickerMonth').css('padding', 0);
        $('.datepickerMonth.dropdown-menu').css('padding', '4px');
        //按鈕事件
        $('.datepickerMonth').on('changeDate', function() {
            $(this).prev('input[data-plugin="datepickerMonth"]').val(
                $(this).datepicker('getFormattedDate')
            );
        });
    };
}

//日期選擇器(月)
function tipDatepickMonths(startMonth, endMonth){
    if ( $('.datepickerMonth').length>0 ) {
        $('.datepickerMonth').datepicker({
            language: 'zh-TW',
            autoclose: true,
            format: 'mm',
            startDate: startMonth,
            endDate: endMonth,
            viewMode: 'months',
            minViewMode: 'months',    // 新增 僅可選擇月份 設定
            maxViewMode: 'months'     // 新增 僅可選擇月份 設定
        });
        //修正樣式
        $('.datepickerMonth').css('padding', 0);
        $('.datepickerMonth.dropdown-menu').css('padding', '4px');
        //按鈕事件
        $('.datepickerMonth').on('changeDate', function() {
            $(this).prev('input[data-plugin="datepickerMonth"]').val(
                $(this).datepicker('getFormattedDate')
            );
        });
    };
}

//檢查瀏覽器版本
function tipUserAgent()
{
    var BrowserDetect = {
        init: function () {
            this.userAgent = navigator.userAgent;
            this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
            this.version = this.searchVersion(navigator.userAgent)
                || this.searchVersion(navigator.appVersion)
                || "an unknown version";
            this.OS = this.searchString(this.dataOS) || "an unknown OS";
        },
        searchString: function (data) {
            for (var i=0;i<data.length;i++)    {
                var dataString = data[i].string;
                var dataProp = data[i].prop;
                this.versionSearchString = data[i].versionSearch || data[i].identity;
                if (dataString) {
                    if (dataString.indexOf(data[i].subString) != -1)
                        return data[i].identity;
                }
                else if (dataProp)
                    return data[i].identity;
            }
        },
        searchVersion: function (dataString) {
            var index = dataString.indexOf(this.versionSearchString);
            if (index == -1) return;
            return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
        },
        dataBrowser: [
            {
                string: navigator.userAgent,
                subString: "Edge",
                identity: "Edge"
            },
            {
                string: navigator.userAgent,
                subString: "Chrome",
                identity: "Chrome"
            },
            {
                string: navigator.userAgent,
                subString: "OmniWeb",
                versionSearch: "OmniWeb/",
                identity: "OmniWeb"
            },
            {
                string: navigator.vendor,
                subString: "Apple",
                identity: "Safari",
                versionSearch: "Version"
            },
            {
                prop: window.opera,
                identity: "Opera",
                versionSearch: "Version"
            },
            {
                string: navigator.vendor,
                subString: "iCab",
                identity: "iCab"
            },
            {
                string: navigator.vendor,
                subString: "KDE",
                identity: "Konqueror"
            },
            {
                string: navigator.userAgent,
                subString: "Firefox",
                identity: "Firefox"
            },
            {
                string: navigator.vendor,
                subString: "Camino",
                identity: "Camino"
            },
            {
                // for newer Netscapes (6+)
                string: navigator.userAgent,
                subString: "Netscape",
                identity: "Netscape"
            },
            {
                string: navigator.userAgent,
                subString: "MSIE",
                identity: "IE",
                versionSearch: "MSIE"
            },
            {
                string: navigator.userAgent,
                subString: "Gecko",
                identity: "Mozilla",
                versionSearch: "rv"
            },
            {
                // for older Netscapes (4-)
                string: navigator.userAgent,
                subString: "Mozilla",
                identity: "Netscape",
                versionSearch: "Mozilla"
            }
        ],
        dataOS : [
        ]
    };

    BrowserDetect.init();

    //完整瀏覽器訊息
    //console.log(BrowserDetect.userAgent);

    //瀏覽器簡要資訊+版本
    //console.log(BrowserDetect.browser + '' + BrowserDetect.version);

    return BrowserDetect.browser + '' + BrowserDetect.version;
}


//更換座位
function tipSwitchSelectSeat()
{
    //空座位被選取
    if ($('.btn-seat.seat-c0').length>0) {
        $('.btn-seat.seat-c0').click(function(event) {
            $(this).toggleClass('seat-c0').toggleClass('seat-c1 active');
//            return false;
        });
    };
    //已分配的座位被選取
    if ($('.btn-seat.seat-c1.active').length>0) {
        $('.btn-seat.seat-c1.active').click(function(event) {
            $(this).toggleClass('seat-c1 active').toggleClass('seat-c0');
//            return false;
        });
    };

    //愛心座位
    if ($('#loveseat .btn-seat.seat-hover').length>0) {
        $('#loveseat .btn-seat.seat-hover').click(function(event) {
            $(this).toggleClass('seat-hover').toggleClass('active');
            return false;
        });
    };
}



//收合指定區塊
//onclick="tipDivToggleHideShow(this, 'chevron-down', 'chevron-up')"
//按鈕的class必須有toggleBtn, 區塊class必須有toggleDiv
function tipDivToggleHideShow(button, closeClass, openClass)
{
    var $button = $(button);
    var $index  = $('body .toggleBtn').index($button);
    var $block  = $('[class*="toggleDiv"]');
    if ( $button!=undefined && $block.length>0 )
    {
        $button.toggleClass(closeClass).toggleClass(openClass);
        $block.eq($index).slideToggle(100, function(){
            tipFooterOnBottom();
            tipAllFooterOnBottom();
        });
    }
    return;
}



//使用input[radio]作為tabs切換鍵
function tipRadioTabBtn()
{
    if ($('a[data-toggle="tab"]').length>0) {
        $('a[data-toggle="tab"]').click(function(event){
            if ($(this).data('target')!='' && $(this).find('input[type="radio"]').length>0) {
                $(this).find('input[type="radio"]').prop('checked', true);
            };
        });
    };
}



//圖片輪播(小圖換大圖)
function tipSlideshowCycle(){

    if ($('.slideshow-box').length>0) {
        $('#slideshow').cycle({
            speed:  'fast',
            timeout: 5000,
            pager:  '#slideNav',
            pagerAnchorBuilder: function(idx, slide) {
                return '#slideNav li:eq(' + idx + ') a';
            }
        });
    };

}

//內容高度不足時，簡式footer緊貼bottom
function tipFooterOnBottom(){
    var h_footer = $('.footer.sticky').outerHeight();
    var h_header = $('.header').outerHeight();
    var h_mainwrap = $('.main-wrap').outerHeight();
    if ($('.footer.sticky').length>0) {
        if($(window).height()<(h_mainwrap+h_header+h_footer)){
            $('.footer.sticky').css('position', 'static');
        }else{
            $('.footer.sticky').css({
                'position': 'relative',
                'left': 0,
                'right': 0,
                'bottom': 0
            });
        }
    };
}

//日期選擇器-限定開始與結束日期(格式: yyyy/mm/dd 或是 跟今天比+-n日/月/年 ex:+0d, -dm )
//ref: https://bootstrap-datepicker.readthedocs.io/en/latest/options.html#startdate
function datepickWithDateRange(startDate,endDate){
	$('.datepicker').datepicker({
		language: 'zh-TW',
      autoclose: true,
      format: 'yyyy/mm/dd',
      startDate: startDate,
      endDate: endDate,
      maxViewMode:3
  });
}

//首頁輪播秒數
function setHomeBannerSlide(time){
    $('.carousel').carousel({
        interval: time
    });
}

//大的footer置底
function tipAllFooterOnBottom(){
    var h_footer = $('.footer').outerHeight();
    var h_header = $('.header').outerHeight();
    var h_mainwrap = $('.main-wrap').outerHeight();
//	    var h_table=$("#table1").outerHeight();
    if ($('.footer').length>0) {
//	        if($(window).height()<(h_mainwrap+h_header+h_footer+h_table)){
		if($(window).height()<(h_mainwrap+h_header+h_footer)){
            $('.footer').css('position', 'static');
        }else{
            $('.footer').css({
                'position': 'absolute',
                'left': 0,
                'right': 0,
                'bottom': 0
            });
        }
    };
}
}

/*
     FILE ARCHIVED ON 03:13:39 May 09, 2021 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 08:07:50 Aug 14, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  capture_cache.get: 0.407
  captures_list: 0.452
  exclusion.robots: 0.057
  exclusion.robots.policy: 0.048
  esindex: 0.006
  cdx.remote: 8.462
  LoadShardBlock: 123.332 (3)
  PetaboxLoader3.datanode: 118.685 (4)
  load_resource: 25.502
*/