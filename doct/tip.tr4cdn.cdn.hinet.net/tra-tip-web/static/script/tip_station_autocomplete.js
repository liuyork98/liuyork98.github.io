var _____WB$wombat$assign$function_____=function(name){return (globalThis._wb_wombat && globalThis._wb_wombat.local_init && globalThis._wb_wombat.local_init(name))||globalThis[name];};if(!globalThis.__WB_pmw){globalThis.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opener = _____WB$wombat$assign$function_____("opener");
/* 設定站點自動完成&呼叫出站點面板時取得文字站點id */
function setAutoComplete() {
    $('.input-wrapper').each(function(i) {
        var parentTab = $(this);
        //綁定autocomplete
        parentTab.find("input").autocomplete({
            //來源字庫
            source: availableTags,
            //自動選擇
            autoFocus: false,
            //搜尋時event
            search: function(event, ui) {
                //取得search key
                searchStr = $(this).val();
            },
            //生成選項event
            create: function() {
                $(this).data('ui-autocomplete')._renderItem = function(ul, item) {
                    var targetStr = item.label;
                    var replaceStr = "<kw>" + searchStr + "</kw>"
                    var showStr = targetStr.replace(new RegExp(searchStr, 'g'), replaceStr);
                    return $("<li>")
                        .attr("data-value", item.value)
                        .append(showStr)
                        .appendTo(ul);
                };
            },
            //離開欄位後event
            change: function(event, ui) {
                /* 自動完成欄位離開後自動選擇第一個結果,如無結果清空 */
                var inputData = searchAutoArray($(this).val(), availableTags);
                $(this).val(inputData);
            }
        });
        //呼叫出站點面板時取得文字站點id
        parentTab.on('click', 'button.icon-list', function(event) {
            inputId = $(this).parent().find("input").attr("id");
        });
    });
}

/* 自動完成欄位離開後自動選擇第一個結果,如無結果清空 */
function searchAutoArray(inputStr, autoArray) {
	var result = "";
	var inputStrTW = "";
	if (inputStr == null || inputStr == "") {
		return result;
	}
	
	inputStrTW = inputStr.replace("台" , "臺");
	
	for ( var i in autoArray) {
		var resultNumTW = autoArray[i].search(inputStrTW);
		var resultNum = autoArray[i].search(inputStr);
		if (resultNumTW != -1) {
			result = autoArray[i];
			break;
		}
		if (resultNum != -1) {
			result = autoArray[i];
			break;
		}
	}
	return result;
}

/* 站點點擊後改變 input value */
function inputStaValue() {
	$('.stationA').click(function(i) {
		// var targetInput = localStorage.getItem("iid");
		$("#" + inputId).val($(this).attr("title"));
		// 關閉文字站點
		tipClearStactionSelector('txt');
	});
}

/* 傳入特定input物件，設定該input的車站自動完成 */
function setInputAutoComplete(inputItem) {
	$(inputItem).autocomplete(
			{
				source : function(request, response) {
					var matcher = new RegExp(request.term.replace("台", "臺"), "i");
					response($.grep(availableTags, function(item) {
						return matcher.test(item);
					}));
				},
				autoFocus : false,
				search : function(event, ui) {
					searchStr = $(this).val();
				},
				create : function() {
					$(this).data('ui-autocomplete')._renderItem = function(ul,
							item) {
						var targetStr = item.label;
						var replaceStr = "<kw>" + searchStr + "</kw>"
						var showStr = targetStr.replace(new RegExp(searchStr,
								'g'), replaceStr);
						return $("<li>").attr("data-value", item.value).append(
								showStr).appendTo(ul);
					};
				},
				change : function(event, ui) {
					var inputData = searchAutoArray($(this).val(),
							availableTags);
					$(this).val(inputData);
				}
			});
}
}

/*
     FILE ARCHIVED ON 04:42:11 May 09, 2021 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 08:07:51 Aug 14, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  capture_cache.get: 0.519
  captures_list: 0.454
  exclusion.robots: 0.056
  exclusion.robots.policy: 0.048
  esindex: 0.006
  cdx.remote: 7.917
  LoadShardBlock: 184.223 (3)
  PetaboxLoader3.datanode: 441.537 (4)
  PetaboxLoader3.resolve: 124.094 (2)
  load_resource: 406.431
*/