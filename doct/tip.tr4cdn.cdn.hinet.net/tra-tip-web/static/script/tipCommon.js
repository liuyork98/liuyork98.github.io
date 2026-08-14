var _____WB$wombat$assign$function_____=function(name){return (globalThis._wb_wombat && globalThis._wb_wombat.local_init && globalThis._wb_wombat.local_init(name))||globalThis[name];};if(!globalThis.__WB_pmw){globalThis.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opener = _____WB$wombat$assign$function_____("opener");
/**
 * TIP前端共用 JS
 */

//轉大寫:add class = to-uppercase
/**
 * 轉大寫
 * @param customClass 要轉換的目標class,如未帶入值，則用預設的to-uppercase
 * */
function convToUpperCase(customClass){
	var target = $(".to-uppercase");
	if(customClass != null ){
		target = $("." + customClass);
	}
	target.keyup(function(){
		var inputStr = $(this).val();
		repStr = inputStr.toUpperCase();
		$(this).val(repStr);
	});
}

//顯示/隱藏密碼:add class = SHBtn
function showHidePwd(showStr, hideStr){
	$(".SHBtn").click(function(){
		var pwdInput = $(this).parent().find("input");
		if(pwdInput.attr("type") == "password"){
			$(this).removeClass("icon-eye");
			$(this).addClass("icon-eyeclose");
			pwdInput.attr("type", "text");
			pwdInput.attr("autocomplete", "off");
			$(this).attr("title", hideStr);
		}else{
			$(this).removeClass("icon-eyeclose");
			$(this).addClass("icon-eye");
			pwdInput.attr("type", "password");
			pwdInput.attr("autocomplete", "off");
			$(this).attr("title", showStr);
		}
	});
}

//轉換日期(yyyy/mm/dd到Date物件)
function str2Date(dateStr){
	//console.log(dateStr);
	var strArr = dateStr.split("/");
	var date = new Date(strArr[0],strArr[1]-1,strArr[2]);
	//console.log(strArr);
	//console.log(date);
    return date;
}

//建立FORM物件
function createFrom(action,method,isNewWindow){
    var form = $(document.createElement('form'));
    $(document.body).append(form);
    $(form).attr("action", action);
    $(form).attr("method", method);
    if(isNewWindow){
        $(form).attr("target", "_blank");
    }
    return form;
}

function testErrorStyle(element, msg) {
	if (typeof element === undefined || element == null) {
		return;
	}
	var ary = [];
	if ($.isArray(element)) {
		ary = element;
	} else {
		ary.push(element);
	}
	var css = 'is-error';
	var isError = msg!= null && msg != '';
	$(ary).each(function(i,obj) {
		// 還原
		$(obj).next('p.form-input-hint').remove();
		$(obj).removeClass(css);
		if (isError) {
			$('<p class="form-input-hint mb-0">'+msg+'</p>').insertAfter(obj);
			$(obj).addClass(css);
		}
	});
	return isError;
}

function addErrorClass(element, isError) {
	if (typeof element === undefined || element == null) {
		return;
	}
	var css = 'is-error';
	var ary = [];
	if ($.isArray(element)) {
		ary = element;
	} else {
		ary.push(element);
	}
	$(ary).each(function(i,obj) {
		if ($.type(obj)=='object') {
			// 還原
			$(obj).removeClass(css);
			if (isError) {
				$(obj).addClass(css);
			}
		}
	});
}

function testErrorMessage(obj,msg) {
	if ($.type(obj)!='object') {
		return false;
	}
	var isError = msg!= null && msg != '';
	// 還原
	$(obj).next('p.form-input-hint').remove();
	if (isError) {
		$('<p class="form-input-hint mb-0">'+msg+'</p>').insertAfter(obj);
	}
	return isError;
}

function initDdatepicker(input, btn, startDate, endDate, locale) {
	if (!startDate) {
		startDate = '1990/01/01'; // 預設可從1990/01/01開始選擇日期
	}
	if (!endDate) {
		endDate = '';             // 預設可選未來所有時間
	}
	switch (locale) {
	case 'zh_TW':
		locale = 'zh-TW';
		break;
	case 'zh_CN':
		locale = 'zh-CN';
		break;
	case 'en_US':
		locale = 'en-GB';
		break;
	case 'ja_JP':
		locale = 'ja';
		break;
	case 'ko_KA':
		locale = 'ko';
		break;
	default:
		break;
	}
	// popup calendar
	if ($.type(btn)=='object') {
		$(btn).datepicker({
			language: locale,
			autoclose: true,
			format: 'yyyy/mm/dd',
			startDate: new Date(startDate),
			endDate: new Date(endDate),
			maxViewMode: 'years'      // 新增 完整日期選單 最多可增減10年 設定
		});
		//修正樣式
		$(btn).css('padding', 0);
		//按鈕事件
		$(btn).on('changeDate', function() {
			$(this).prev(input).val(
					$(this).datepicker('getFormattedDate')
			);
		});
	}
	// input keypress
	if ($.type(input)=='object') {
		$(input).keypress(function(){
			$(this).attr('maxlength',10);
			if($(this).val().length == 4||$(this).val().length == 7){
				var rideDateValue = $(this).val();
				$(this).val(rideDateValue.concat('/'))
			}
		});
	}
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
  capture_cache.get: 0.322
  captures_list: 0.357
  exclusion.robots: 0.043
  exclusion.robots.policy: 0.035
  esindex: 0.005
  cdx.remote: 7.424
  LoadShardBlock: 62.177 (3)
  PetaboxLoader3.datanode: 88.995 (4)
  load_resource: 72.387
  PetaboxLoader3.resolve: 43.683
*/