var _____WB$wombat$assign$function_____=function(name){return (globalThis._wb_wombat && globalThis._wb_wombat.local_init && globalThis._wb_wombat.local_init(name))||globalThis[name];};if(!globalThis.__WB_pmw){globalThis.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opener = _____WB$wombat$assign$function_____("opener");
/** TIP前端表單校驗規則 */
// 統一編號
$.validator.addMethod("pidCorporate", function(value, element) {
	// 建立編號分數陣列
	var cx = new Array(1, 2, 1, 2, 1, 2, 4, 1);
	// 非8位數字剃除
	if (value.length != 8) {
		return false;
	}
	var valueArr = value.split("");
	// 乘出來的值為二位數則將十位數和個位數相加
	var cc = function(multiValue) {
		if (multiValue > 9) {
			var valueStr = multiValue + "";
			var v1 = valueStr.substring(0, 1) * 1;
			var v2 = valueStr.substring(1, 2) * 1;
			multiValue = v1 + v2;
		}
		return multiValue;
	};
	// 數值加總
	var resultSum = 0;
	for (var i = 0; i < valueArr.length; i++) {
		resultSum += cc(valueArr[i] * cx[i]);
	}
	// 檢測加總結果
	// 1.能被10整除 => pass
	if (resultSum % 10 == 0) {
		return true;
		// 2.無法被10整除,但第7碼為7且加總結果加1後能被10整除 => pass
	} else if (valueArr[6] == 7 && (resultSum + 1) % 10 == 0) {
		return true;
	} else {
		return false;
	}

});

// 會員密碼最短 8 碼，且至少包含一個英文和一個數字，不強制變更頻率和時間=>銘彥2017/09/20
$.validator.addMethod("pwdcheck", function(value, element) {
	var re = /(?=^.{8,12}$)(?=(.*\d){1})(?=(.*[a-zA-Z]){1})/;
	return value.match(re);
});

// 手機號碼
$.validator.addMethod("twphone", function(value, element) {
	var re = /^09\d{8}$/;
	return value.match(re);
});

// 身份證字號格式驗證
$.validator.addMethod("twid", function(id, element) {

	if (id == null || id == '') { // 次處只檢查格式是否符合，不檢查是否必填(實名制定票有不需要必填的狀況)
		return true;
	}
	// 建立字母分數陣列(A~Z)
	var city = new Array(1, 10, 19, 28, 37, 46, 55, 64, 39, 73, 82, 2, 11, 20,
			48, 29, 38, 47, 56, 65, 74, 83, 21, 3, 12, 30)
	id = id.toUpperCase();

	// 使用「正規表達式」檢驗格式
	if (id.search(/^[A-Z](1|2)\d{8}$/i) == -1) {
		// console.log('基本格式錯誤');
		return false;
	} else {
		// 將字串分割為陣列(IE必需這麼做才不會出錯)
		id = id.split('');
		// 計算總分
		var total = city[id[0].charCodeAt(0) - 65];
		for (var i = 1; i <= 8; i++) {
			total += eval(id[i]) * (9 - i);
		}
		// 補上檢查碼(最後一碼)
		total += eval(id[9]);
		// 檢查比對碼(餘數應為0);
		return ((total % 10 == 0));
	}
});

// 身分證號 / 護照號碼:英文數字長度8-15
$.validator.addMethod("pidPersonal", function(value, element) {
	var re = /^[a-zA-Z0-9]{8,15}$/;
	return value.match(re);
});

// 居住地區有無選擇
$.validator.addMethod("addrSelectedCheck", function(value, element) {
	return (value != '0');
});

// 日期驗證
$.validator.addMethod("ckDate", function(value, element) {
	var re = /^(19|20)[0-9]{2}\/(0[1-9]|1[012])\/([012]\d|3[01])$/;
	if (value.length == 0)
		return true;
	else
		return value.match(re);
});

// 月份驗證
$.validator.addMethod("ckMonth", function(value, element) {
	var re = /^(0[1-9]|1[012])$/;
	if (value.length == 0)
		return true;
	else
		return value.match(re);
});

// 年份驗證
$.validator.addMethod("ckYear", function(value, element) {
	var re = /^(19|20)[0-9]{2}$/;
	if (value.length == 0)
		return true;
	else
		return value.match(re);
});

// 證號欄位驗證:不判斷證號屬性(身分證/統編/護照/會員編號)，只檢查格式是否為a~z,0~9組成，長度為8~15位數的字串
$.validator.addMethod("checkPid", function(value, element) {
	var re = /^[0-9a-z]{6,15}$/i; // a~z與數字0~9 8到15位數
	return value.match(re);
});

// 證號欄位驗證
$.validator.addMethod("checkTWPid", function(value, element) {
	if (!(/^[a-z][0-9]{9}$/i.test(value))) {
		return true;
	} else {
		return jQuery.validator.methods.twid.call(this, value, element);
	}
});

// 證號欄位驗證
$.validator
		.addMethod(
				"bookCheckMbrId",
				function(value, element) {
					if ($('input[name="custIdTypeEnum"]:checked').val() == 'MEMBER_NO') {
						if (/^[0-9]{12,12}$/i.test(value)) {
							return true;
						}
					} else if ($('input[name="custIdTypeEnum"]:checked').val() == 'PASSPORT_NO') {
						if (/^[0-9a-z]{6,10}$/i.test(value)) {
							return true;
						}
					} else {
						return true;
					}
				});

// 訂票證號欄位驗證
$.validator.addMethod("bookCheckTWPid", function(value, element) {
	if ($('input[name="custIdTypeEnum"]:checked').val() != 'PERSON_ID') {
		return true;
	}
	return jQuery.validator.methods.twid.call(this, value, element);
});

// mobile證號欄位驗證
$.validator.addMethod("mobileBookCheckMbrId", function(value, element) {
	var pidRadioType = $('a.changePidType.active')
	var targetType = pidRadioType.data('target')
	if (targetType == 'MEMBER_NO') {
		if (/^[0-9]{12,12}$/i.test(value)) {
			return true;
		}
	} else if (targetType == 'PASSPORT_NO') {
		if (/^[0-9a-z]{6,10}$/i.test(value)) {
			return true;
		}
	} else {
		return true;
	}

});

// mobile訂票證號欄位驗證
$.validator.addMethod("mobileBookCheckTWPid", function(value, element) {
	var pidRadioType = $('a.changePidType.active')
	var targetType = pidRadioType.data('target')
	if (targetType != 'PERSON_ID') {
		return true;
	}
	return jQuery.validator.methods.twid.call(this, value, element);
});

// 日期格式驗證:只驗是否符合yyyy/mm/dd格式)
$.validator.addMethod("checkDate", function(value, element) {
	var re = /^\d{4}\/\d{1,2}\/\d{1,2}$/; // yyyy/mm/dd 不管是否正確
	return value.match(re);
});

// / 日期驗證：不能輸入過往日期(團體票、需判斷對號、非對號)
$.validator
		.addMethod(
				"checkDateTimeGroup",
				function(value, element, param) {
					try {
						var isReserve = $('input[name="isReserve"]:checked')
								.val() == 'YES', inputValue = new Date(value), startDate = new Date(
								isReserve ? param[0] : param[1]);
						if (!(inputValue instanceof Date && !isNaN(inputValue))) {
							throw 'error Date pattern';
						}
						return !(inputValue.getTime() < startDate.getTime());
					} catch (e) {
						return false;
					}
				});

// / 日期驗證：不能輸入過往日期(個人票、時刻表、臺高轉乘用)
$.validator.addMethod("checkDateTime", function(value, element, param) {
	try {
		var inputValue = new Date(value), startDate = new Date(param);
		if (!(inputValue instanceof Date && !isNaN(inputValue))) {
			throw 'error Date pattern';
		}
		return !(inputValue.getTime() < startDate.getTime());
	} catch (e) {
		return false;
	}
});

// 車次欄位驗證:只驗是否為1~5位數字格式
$.validator.addMethod("checkTrainNo", function(value, element) {
	var re = /^[\d|a-zA-Z]{1,9}$/; // 1~9位英數字
	if (value.length === 0)
		return true;
	else
		return value.match(re);
});

// 車次欄位驗證:只驗是否為1~5位數字格式
$.validator.addMethod("checkTrainNoWithParam", function(value, element, param) {
	var re = /^[\d|a-zA-Z]{1,9}$/; // 1~9位英數字
	if (value.length === 0)
		return true;
	else
		return value.match(re);
});

// 檢查車次陣列，是否最少填入一項
$.validator.addMethod('checkTnoArray', function(value, element, className) {
	var tNoList = $('.' + className);
	for (var i = 0; i < tNoList.length; i++) {
		if ($(tNoList[i]).val().length !== 0) {
			return true;
		}
	}
	return false;
});

// 固定數字位數驗證
$.validator.addMethod("fixNum", function(value, element, param) {
	if (value.length == 0)
		return true;
	else
		return (value.length == param);
});

// 總票數檢查 params傳入限制數量
$.validator
		.addMethod(
				"checkTicketSum",
				function(value, element, params) {
					var min = Number(params[0]), max = Number(params[1]), sumQty = 0, parent = $(
							element).parents('div.column');
					$(parent).find('.seatQty').each(function() {
						sumQty += Number($(this).val());
					});
					if (sumQty < min || sumQty > max) {
						return false;
					}
					return true;
				});

// 總票數檢查(行動版) params傳入限制數量 要相加的乘客數量class加ticketQty
$.validator.addMethod("mobileCheckTicketSum", function(value, element, params) {
	var min = Number(params[0]), max = Number(params[1]), sumQty = 0;
	$('select.ticketQty').each(function() {
		sumQty += Number($(this).val());
	});
	// console.log(sumQty);
	if (sumQty < min || sumQty > max) {
		return false;
	}
	return true;
});

// 輪椅座位打勾檢查(行動版)
$.validator.addMethod("mobileWheelChairAgree", function(value, element, params) {
	var wheelQty = $('#wheelChairQty').val();
	if (wheelQty > 0) {
		return $('#isWheelAgree').prop('checked')
	}
	return true;
});

//親子座位打勾檢查(行動版)
$.validator.addMethod("mobileParentChildAgree", function(value, element, params) {
	var parentChildQty = $('#parentChildQty').val();
	if (parentChildQty > 0) {
		return $('#isParentChildAgree').prop('checked')
	}
	return true;
});

// 自行車票數檢查
$.validator.addMethod("checkBikeQty", function(value, element) {
	var normQtyStr = $(element).closest('div.zone').prev().find(
			'input.normalSeat').val();
	var normQty = parseInt(normQtyStr);
	var bikeQty = parseInt(value);
	return !(bikeQty > normQty);
});

// 自行車票數檢查
$.validator.addMethod("mobileCheckBikeQty", function(value) {
	var normQty = parseInt($('#normQty').val());
	var bikeQty = parseInt($('#bikeQty').val());
	return !(bikeQty > normQty);
});

// 自訂轉乘站驗證:有勾選才驗證(傳入勾選checkbox的id)
$.validator.addMethod("transferStationCheck", function(value, element, param) {
	if ($("#" + param).prop("checked")) {
		if (value.length == 0)
			return false;
	}
	return true;
});

// 訂票選擇車次驗證
// TODO 帶入行程變數
$.validator.addMethod("selectTrainRequired", $.validator.methods.required);

/**
 * 車站格式驗證 (4碼-站名(2~10個字(暫) ex:1000-臺北)
 */
$.validator.addMethod("checkStation", function(value, element) {
	var reg = /^[0-9]{4}-.{2,20}$/i;
	return value.match(reg);
});

/**
 * 出發抵達站驗證 (使用id抓要驗的元素)
 * 
 * @param params
 *            要驗的id
 * @returns 是否通過驗證
 */
$.validator.addMethod("checkStartAndEndStation", function(value, element,
		params) {
	var field_1 = $('#' + params[0]).val(), field_2 = $('#' + params[1]).val();
	console.log('1:', field_1, ',2:', field_2);
	if (field_1.length === 0 || field_2.length === 0) {
		return true;
	}
	return field_1 !== field_2;
});

/**
 * 起迄日期驗證 (使用class name抓要驗的元素)
 * 
 * @param value
 *            被掛上要驗證的元素的值
 * @param element
 *            被掛上要驗證的元素
 * @param params
 *            要驗的class name
 * @returns 是否通過驗證
 */
$.validator.addMethod("validStartAndEndDate", function(value, element, params) {
	var field_1 = $('input[name="' + params[0] + '"]').val(), field_2 = $(
			'input[name="' + params[1] + '"]').val();
	var date1 = str2Date(field_1);
	var date2 = str2Date(field_2);
	return date2 >= date1
});

$.validator
		.addMethod(
				"validStartAndEndTime",
				function(value, element, params) {
					var trip = $(element).data('trip')
					var time1arr = $('#startTime' + trip).val().split(':'), time2arr = $(
							'#endTime' + trip).val().split(':'), startTime = new Date, endTime = new Date;
					startTime.setHours(time1arr[0]);
					startTime.setMinutes(time1arr[1]);
					endTime.setHours(time2arr[0]);
					endTime.setMinutes(time2arr[1]);
					var during = endTime - startTime;
					if ($('#tosite' + trip).val() != ''
							|| $('#fromsite' + trip).val() != '') {
						if (during <= 0 || during > 28800000) {
							return false;
						}
					}
					return true;
				});

// 郵輪式列車總票數檢查(行動版)
$.validator
		.addMethod(
				"checkGroupTicketQty_cruise_mobile",
				function(value, element) {
					var parentDiv = $(element).closest('div.mainDiv'), limit = parseInt(parentDiv
							.data('limit')), sum = 0;
					parentDiv.find('select.ticketCount').each(function() {
						sum += parseInt($(this).val());
					});
					if (sum != limit) {
						return false;
					}
					return true;
				});

// 郵輪式列車總票數檢查(網頁版)
$.validator.addMethod("checkGroupTicketQty_cruise", function(value, element) {
	var parentDiv = $(element).closest('div.column'), limit = parseInt($(
			element).closest('.cartlist-box').data('limit')), sum = 0;
	parentDiv.find('.calculateTktCount').each(function() {
		sum += parseInt($(this).val());
	});
	if (sum != limit) {
		return false;
	}
	return true;
});

// 團體總票數檢查(網頁版)
$.validator.addMethod("checkGroupTicketQty", function(value, element) {
	var parentDiv = $(element).closest('div.column'), limit = parseInt($(
			element).closest('.cartlist-box').data('limit')), sum = 0;
	parentDiv.find('.ticketCount').each(function() {
		sum += parseInt($(this).val());
	});
	if (sum != limit) {
		return false;
	}
	return true;
});

// 團體兩鐵自行車票數檢查(網頁版)
$.validator.addMethod("checkGroupBikeTicketQty", function(value, element) {
	var parentDiv = $(element).closest('div.column'), limit = parseInt($(
			parentDiv).data('limit')), sum = 0;
	parentDiv.find('.bikeTicketCount').each(function() {
		sum += parseInt($(this).val());
	});
	if (sum != limit) {
		return false;
	}
	return true;
});

// 團體兩鐵自行車票數檢查-自行車票數少於一般票數(網頁版)
$.validator.addMethod("checkGroupBikeTicketWithNormTicket",
		function(value, element) {
			var bikeTicketId = $(element).attr('id'), ticketId = bikeTicketId
					.substring(14);
			if (parseInt($(element).val()) > parseInt($(
					'#ticketType' + ticketId).val())) {
				return false;
			}
			return true;
		});

// 團體兩鐵自行車票數檢查-自行車票數少於一般票數(行動版)
$.validator.addMethod("checkGroupBikeTicketWithNormTicket_mobile", function(
		value, element) {
	var bikeTicketId = $(element).attr('id'), trip = bikeTicketId.substring(4,
			5), ticketId = bikeTicketId.substring(11);
	if (parseInt($(element).val()) > parseInt($(
			'#trip' + trip + 'ticketId' + ticketId).val())) {
		return false;
	}
	return true;
});

// 團體身分證號重複檢查(網頁版)
$.validator.addMethod("checkGroupTicketTwid", function(value, element) {
	var parentDiv = $(element).parents('td'), twidArrays = [];

	parentDiv.find('.twid:enabled').each(function() {
		twidArrays.push($(this).val())
	})
	var repeat = twidArrays.filter(function(element, index, arr) {
		return arr.indexOf(element) !== index;
	});
	if (repeat.length != 0) {
		return false;
	}
	return true;
});

// 時段相同檢查(網頁版)
$.validator.addMethod("checkQueryTimeRangeValid", function(value, element) {
	var startTime = $(element), trip = $(startTime).data('trip'), endTime = $(
			'#endTime' + trip).val(), startTimeId = $(startTime).attr('id')
	if (startTimeId.startsWith('endTime')) {
		return true;
	}
	if (startTime.val() == endTime) {
		return false;
	}
	return true;
});

// 團體查詢總票數檢查(網頁版)
$.validator.addMethod("checkGroupQueryTicketQty", function(value, element) {
	var trip = $(element).attr('id').substring(9);
	if ($('#isNeedWheelchair' + trip).prop('checked')) {
		var wheelCount = $('#wheelChairQty' + trip).val();
		if (parseInt(value) + parseInt(wheelCount) < 10) {
			return false;
		}
	} else if (value < 10) {
		return false;
	}
	return true;
});

// 團體總票數檢查(行動版)
$.validator
		.addMethod(
				"checkGroupTicketQty_mobile",
				function(value, element) {
					var parentDiv = $(element).parents('div.mainDiv'), limit = parseInt(parentDiv
							.data('limit')), sum = 0;
					parentDiv.find('select.ticketCount').each(function() {
						sum += parseInt($(this).val());
					});
					if (sum != limit) {
						return false;
					}
					return true;
				});

// 團體自行車總票數檢查(行動版)
$.validator
		.addMethod(
				"checkGroupBikeTicketQty_mobile",
				function(value, element) {
					var parentDiv = $(element).parents('div.bikeTicketsDiv'), limit = parseInt(parentDiv
							.data('limit')), sum = 0;
					parentDiv.find('select.bikeTicketCount').each(function() {
						sum += parseInt($(this).val());
					});
					if (sum != limit) {
						return false;
					}
					return true;
				});

// 團體總便當數檢查
$.validator
		.addMethod(
				"checkGroupBentoQty",
				function(value, element) {
					var parentDiv = $(element).closest('div.column'), limit = parseInt(parentDiv
							.data('limit')), sum = 0;
					parentDiv.find('.bentoCount').each(function() {
						sum += parseInt($(this).val());
					});

					if (sum > limit) {
						return false;
					}
					return true;
				});

// 團體總便當數檢查(行動版)
$.validator.addMethod("checkGroupBentoQty_mobile",
		function(value, element) {
			var parentDiv = $('div.bentoDiv'), limit = parseInt(parentDiv
					.data('limit')), sum = 0;
			parentDiv.find('select.bentoCount').each(function() {
				sum += parseInt($(this).val());
			});

			if (sum > limit) {
				return false;
			}
			return true;
		});

/**
 * 多選項目最少需要選擇一項 規則同required,但錯誤訊息不同
 */
$.validator.addMethod("selectRequired", $.validator.methods.required);

// EMAIL驗證 (與後台規則相同。jQuery Validator Email規則，如有+號可通過，但後端不行。故統一規則 )
$.validator
		.addMethod(
				"traEmail",
				function(value, element) {
					var re = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/; // yyyy/mm/dd
					// 不管是否正確
					return value.match(re);
				});

/**
 * 統一編號與會員編號驗證 8碼->統編,12碼->會員編號 兩項皆只有數字
 */
$.validator.addMethod("traCorpLogin",
		function(value, element) {
			if (/^[0-9]{8}$/i.test(value)) {
				return jQuery.validator.methods.pidCorporate.call(this, value,
						element);
			}
			if (/^[0-9]{12}$/i.test(value)) {
				return true;
			}
			return false;
		});

/**
 * 檢查會員新密碼與原密碼是否相同 ＠param param 原密碼id
 */
$.validator.addMethod("pwNotEqual", function(value, element, param) {
	return this.optional(element) || value != $('#' + param).val();
});

// 判斷是否要顯示錯誤DIV
function showErrDiv(event, validator, msg) {
	var errors = validator.numberOfInvalids();
	if (errors) {
		$("#errorDiv").html('<p class="icon-fa mag-error">' + msg + '</p>');
		$("#errorDiv").show();
	} else {
		$("#errorDiv").hide();
	}
}

/**
 * 檢查區碼位數 僅檢查長度2-4，如不輸入則不檢查
 */
$.validator.addMethod('checkTelAreaCode', function(value, element) {
	if (!value || 0 === value.length) {
		return true;
	} else {
		if (value.length < 2 || value.length > 4) {
			return false;
		} else {
			return true;
		}
	}
});

/**
 * 檢查電話號碼長度 僅檢查長度6-10，如不輸入則不檢查
 */
$.validator.addMethod('checkTel', function(value, element) {
	if (!value || 0 === value.length) {
		return true;
	} else {
		if (value.length < 6 || value.length > 10) {
			return false;
		} else {
			return true;
		}
	}
});

/**
 * 檢查電話分機號碼長度 僅檢查長度1-10，如不輸入則不檢查
 */
$.validator.addMethod('checkTelExt', function(value, element) {
	if (!value || 0 === value.length) {
		return true;
	} else {
		if (value.length > 10) {
			return false;
		} else {
			return true;
		}
	}
});

// 檢查時間格式 hh:mm (24小時)
$.validator.addMethod("time24", function(value, element) {
	return /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(value);
});

/**
 * 檢查起訖站是否相同
 * 
 * @param 目標ID
 *            #endStation
 */
jQuery.validator.addMethod("notEqualStation", function(value, element, param) {
	return this.optional(element) || value != $(param).val();
});

/**
 * 檢查欄位是否不重複 用法:要檢查不重複的N個欄位，加上自定義Tag unique="xxxxx" 如此，在驗證時會檢查所有含有unique="xxxxx"
 * 的input。如果有重複就會回false
 */
jQuery.validator.addMethod("unique", function(value, element, params) {
	var prefix = params;
	var selector = jQuery.validator.format("[name!='{0}'][unique='{1}']",
			element.name, prefix);
	var matches = new Array();
	$(selector).each(function(index, item) {
		if (value == $(item).val()) {
			matches.push(item);
		}
	});

	return matches.length == 0;
});

/**
 * 搭乘偏好設定(車站判斷)
 */
$.validator.addMethod("checkEditPreferenceStations", function(value, element) {
	var colDiv = $(element).parents('div.column')
	var startSta = $(colDiv).find('input[name^="startStation"]').val()
	var endSta = $(colDiv).find('input[name^="endStation"]').val()
	if (startSta != '' || endSta != '') {
		if (value == '') {
			return false;
		}
	}
	return true;
});

/**
 * 搭乘偏好設定(車次判斷)
 */
$.validator.addMethod("checkEditPreferenceTrainNo", function(value, element) {
	var colDiv = $(element).parents('div.column')
	var startSta = $(colDiv).find('input[name^="startStation"]').val()
	var endSta = $(colDiv).find('input[name^="endStation"]').val()
	if (startSta != '' || endSta != '') {
		var re = /^[\d|a-zA-Z]{1,9}$/; // 1~9位英數字
		return value.match(re);
	}
	return true;
});

/**
 * 搭乘偏好設定(車次判斷)
 */
$.validator.addMethod("checkEditPreferenceTrainType",
		function(value, element) {
			var colDiv = $(element).parents('div.zone')
			var startSta = $(colDiv).find('input[name^="startStation"]').val()
			var endSta = $(colDiv).find('input[name^="endStation"]').val()
			if (startSta != '' || endSta != '') {
				var trainTypeDiv = $(element).parents('div.typeDiv')
				var checkedLength = trainTypeDiv
						.find('input[type="checkbox"]:checked').length
				if (checkedLength == '0') {
					return false;
				}
			}
			return true;
		});

}

/*
     FILE ARCHIVED ON 09:42:08 May 01, 2021 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 08:07:51 Aug 14, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  capture_cache.get: 0.339
  captures_list: 0.401
  exclusion.robots: 0.074
  exclusion.robots.policy: 0.067
  esindex: 0.006
  cdx.remote: 4.19
  LoadShardBlock: 91.272 (3)
  PetaboxLoader3.datanode: 149.947 (5)
  load_resource: 513.603 (2)
  PetaboxLoader3.resolve: 371.659 (2)
*/