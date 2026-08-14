var _____WB$wombat$assign$function_____=function(name){return (globalThis._wb_wombat && globalThis._wb_wombat.local_init && globalThis._wb_wombat.local_init(name))||globalThis[name];};if(!globalThis.__WB_pmw){globalThis.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opener = _____WB$wombat$assign$function_____("opener");
/*! jQuery Validation Plugin TIP客製版 */
! function (a) {
    "function" == typeof define && define.amd ? define(["jquery", "../jquery.validate.min"], a) : "object" == typeof module && module.exports ? module.exports = a(require("jquery")) : a(jQuery)
}(function (a) {
    return a.extend(a.validator.messages, {
        required: "必須填寫",
        selectRequired: "至少需選擇一項",
        remote: "請修正此欄位",
        email: "請輸入有效的電子郵件",
        url: "請輸入有效的網址",
        date: "請輸入有效的日期",
        dateISO: "請輸入有效的日期 <p>(YYYY/MM/DD)",
        number: "請輸入正確的數值",
        digits: "只可輸入數字",
        creditcard: "請輸入有效的信用卡號碼",
        equalTo: "請重複輸入一次",
        extension: "請輸入有效的後綴",
        maxlength: a.validator.format("最多 {0} 個字"),
        minlength: a.validator.format("最少 {0} 個字"),
        rangelength: a.validator.format("請輸入長度為 {0} 至 {1} 之間的字串"),
        range: a.validator.format("請輸入 {0} 至 {1} 之間的數值"),
        max: a.validator.format("請輸入不大於 {0} 的數值"),
        min: a.validator.format("請輸入不小於 {0} 的數值"),
        twid: "身分證字號錯誤",
        checkPid:"欄位長度錯誤", //訂票用的證號欄位檢查錯誤訊息
        bookCheckMbrId : "欄位長度錯誤",
        mobileBookCheckMbrId : "欄位長度錯誤",
        checkTWPid: "身分證字號錯誤",
        bookCheckTWPid: "身分證字號錯誤" ,
        mobileBookCheckTWPid: "身分證字號錯誤" ,
        checkTrainNo:"車次格式錯誤",  //檢查車次格式用的錯誤訊息
        checkTrainNoWithParam: a.validator.format("車次{0} 格式錯誤"),
        pwdcheck:"密碼請輸入8-12英數字元，僅可輸入英文與數字且至少1個英文與1個數字",
        twphone:"手機號碼請輸入09開頭共10位數字",		//台灣手機號碼檢查錯誤訊息
        checkDate:"請輸入正確日期",	//格式:yyyy/MM/dd
        checkDateTime:"請輸入有效的日期",
        checkDateTimeGroup:"請輸入有效的日期",
        fixNum: a.validator.format("請輸入 {0} 位數字"),	//固定數字位數
        typeBtn:"請至少選擇1項車種",	//搭乘偏好車種未選擇
        checkTicketSum: a.validator.format(" 總票數至少 {0} 張，至多 {1} 張"), //訂票總票數檢查
        mobileCheckTicketSum: a.validator.format(" 總票數至少 {0} 張，至多 {1} 張"), //訂票總票數檢查
        otherAnswer: "請勿空白",	//問卷其他選項輸入欄位必填時空值驗證
        answerCheck: "尚未作答",	//必填欄位未填驗證
        pidCorporate: "統一編號錯誤",
        ckDate: "日期格式錯誤(請使用日曆)",
        transferStationCheck: "必須填寫",
        checkEditPreferenceTrainNo : "車次格式錯誤",
        checkEditPreferenceTrainType : "必須填寫",
        checkEditPreferenceStations : "請選擇站名",
        validStartAndEndTime : "查詢時段<br>最長可接受 8 個小時",
        selectTrainRequired: a.validator.format("行程 {0} 尚未選擇搭乘車次"),
        checkStation:"車站格式錯誤",
        checkBikeQty:"自行車輛數，超過一般座票數",
        checkQueryTimeRangeValid:"開始時間與結束<br>時間不可以相同",
        mobileCheckBikeQty:"自行車輛數，超過一般座票數",
        validStartAndEndDate: "請檢查查詢區間是否正確",
        checkGroupTicketTwid: "請檢查身分證號是否重複輸入",
        checkGroupTicketQty: "請檢查票數總和是否與總票數相同",
        checkGroupQueryTicketQty: "票數低於10張",
        checkGroupBikeTicketQty: "請檢查自行車票數總和是否與自行車總票數相同",
        checkGroupBikeTicketQty_mobile: "請檢查自行車票數總和是否與自行車總票數相同",
        checkGroupBikeTicketWithNormTicket: "自行車票數必須小於一般票數",
        checkGroupBikeTicketWithNormTicket_mobile: "自行車票數必須小於一般票數",
        checkGroupTicketQty_cruise_mobile: "請檢查票數總和<br>是否與總票數相同",
        checkGroupTicketQty_cruise: "請檢查票數總和<br>是否與總票數相同",
        checkGroupTicketQty_mobile: "請檢查票數總和是否與總票數相同",
        checkGroupBentoQty: "請檢查便當總和是否大於總便當數量",
        checkGroupBentoQty_mobile: "請檢查便當總和是否大於總便當數量",
        traCorpLogin: "統一編號或會員編號格式不符",
        pwNotEqual: "新密碼不能與原密碼相同",
        checkTelAreaCode: "區碼長度錯誤",
        checkTel:"電話號碼長度錯誤",
        traEmail:"E-mail格式錯誤",
        checkTelExt:"分機號碼長度錯誤",
        checkTnoArray:"最少需輸入一筆車次，最多不可超過三筆",
        checkStartAndEndStation:"出發站與抵達站不可相同",
        time24:"時間格式錯誤",
        notEqualStation:"出發與抵達站不得相同",
        unique:"輸入值不得重複",
        addrSelectedCheck:"請選擇",
        mobileWheelChairAgree:"* 購買輪椅座位必須勾選",
        mobileParentChildAgree:"* 購買親子座位必須勾選"
    }), a
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
  capture_cache.get: 0.326
  captures_list: 0.363
  exclusion.robots: 0.049
  exclusion.robots.policy: 0.043
  esindex: 0.006
  cdx.remote: 16.386
  LoadShardBlock: 52.951 (3)
  PetaboxLoader3.datanode: 82.297 (5)
  load_resource: 818.518 (2)
  PetaboxLoader3.resolve: 750.806 (2)
*/