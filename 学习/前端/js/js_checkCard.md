```
function checkCarid() {
    var userName = document.getElementsByName("userName")[0].value;
    var cardid = document.getElementsByName("cardid")[0].value;
    var cardiddiv = document.getElementById("cardiddiv");
    $.ajax({
        type: "POST",
        url: '/njga/persionRegister.do?method=checkCardid',
        data: {
            'cardid': cardid,
            'userName': userName
        },
        success: function(data) {
            if (data == "1") {
                cardiddiv.innerHTML = "身份证号码已经注册过，请重新输入!";
            } else {
                cardiddiv.innerHTML = "";
            }
        }
    });
}

function ev_submit() {

    var yourname = document.getElementsByName("yourName")[0].value;
    var sex = document.getElementsByName("sex")[0].value;
    var birthday = document.getElementsByName("birthday")[0].value;
    var cardid = document.getElementsByName("cardid")[0].value;
    var mobile = document.getElementsByName("mobile")[0].value;
    var fixtel = document.getElementsByName("fixtel")[0].value;
    var address = document.getElementsByName("address")[0].value;
    var workplace = document.getElementsByName("workplace")[0].value;
    var msn = document.getElementsByName("msn")[0].value;
    var userName = document.getElementsByName("userName")[0].value;
    var qq = document.getElementsByName("qq")[0].value;
    var email = document.getElementsByName("email")[0].value;

    if (userName.length <= 0 || userName == null) {
        alert("你的登录用户名为空,请进行第一步后在进行该步骤!");
        return false;
    }
    if (yourname.length <= 0) {
        alert("姓名不能为空!");
        return false;
    }
    var patrn = /^\s*[\u4e00-\u9fa5]{1,}[\u4e00-\u9fa5.·]{0,15}[\u4e00-\u9fa5]{1,}\s*$/;
    if (!patrn.exec(yourname)) {
        alert('格式不对:姓名必须为汉字!');
        return false;
    }
    // var reg = new RegExp("/^\s*[\u4e00-\u9fa5]{1,}[\u4e00-\u9fa5.·]{0,15}[\u4e00-\u9fa5]{1,}\s*$/","g");
    // if(!reg.test(yourname))
    // {
    //   alert('格式不对:姓名必须为汉字!');
    //   return false;
    // }
    var sscheck = checkIdcard(cardid.toUpperCase(), birthday);
    if (sscheck.length > 0) {
        alert(sscheck);
        return false;
    }

    if (sex.length <= 0) {
        alert("性别不能为空!");
        return false;
    }
    if (birthday.length <= 0) {
        alert("出生日期不能为空!");
        return false;
    }
    // if(isIdCardNo(cardid,birthday,'身份证')==false)
    // {
    // return false;
    // }

    if (mobile.length <= 0) {
        alert("手机号码不能为空!");
        return false;
    }
    if (checkMobile(mobile) == false) {
        return false;
    }
    if (fixtel.length <= 0) {
        alert("固定电话不能为空!");
        return false;
    }
    if (address.length <= 0) {
        alert("居住地不能为空!");
        return false;
    }
    if (email.length <= 0) {
        alert("邮箱不能为空!");
        return false;
    }

    if (checkEmail(email) == false) {
        return false;
    }
    $("select").attr("disabled", "");
    return true;
}

function isIdCardNo(num, birthday, tagName) {
    if (num.length != 15 && num.length != 18) {
        alert(tagName + '位数不对!');
        return false;
    }
    aCity = {
        11 : "北京",
        12 : "天津",
        13 : "河北",
        14 : "山西",
        15 : "内蒙古",
        21 : "辽宁",
        22 : "吉林",
        23 : "黑龙江",
        31 : "上海",
        32 : "江苏",
        33 : "浙江",
        34 : "安徽",
        35 : "福建",
        36 : "江西",
        37 : "山东",
        41 : "河南",
        42 : "湖北",
        43 : "湖南",
        44 : "广东",
        45 : "广西",
        46 : "海南",
        50 : "重",
        51 : "四川",
        52 : "贵州",
        53 : "云南",
        54 : "西藏",
        61 : "陕西",
        62 : "甘肃",
        63 : "青海",
        64 : "宁夏",
        65 : "新疆",
        71 : "台湾",
        81 : "香港",
        82 : "澳门",
        91 : "国外"
    };
    if (aCity[parseInt(num.substr(0, 2))] == null) {
        alert(tagName + "前2位地区错误!");
        return false;
    }

    var len = num.length,
    re;
    if (len == 15) {
        if (isNaN(num)) {
            alert(tagName + "输入的不是数字！");
            return false;
        }
        re = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{3})$/);
    } else if (len == 18) {
        if (isNaN(num.substr(0, 17))) {
            alert(tagName + "前17位输入的不是数字！");
            return false;
        }
        re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\d)$/);
    } else {
        alert(tagName + "输入的位数不对！");
        return false;
    }
    var a = num.match(re);
    if (a != null) {
        if (len == 15) {
            var sBirthday = num.substr(6, 2) + "-" + num.substr(8, 2) + "-" + num.substr(10, 2);
            if (birthday.substr(2, 8) != sBirthday) {
                alert(tagName + "里出生日期和输入的生日不符！");
                return false;
            }
            var D = new Date("19" + a[3] + "/" + a[4] + "/" + a[5]);
            var B = D.getYear() == a[3] && (D.getMonth() + 1) == a[4] && D.getDate() == a[5];
        } else {
            var sBirthday = num.substr(6, 4) + "-" + num.substr(10, 2) + "-" + num.substr(12, 2);
            if (birthday != sBirthday) {
                alert(tagName + "里出生日期和输入的生日不符！");
                return false;
            }
            var D = new Date(a[3] + "/" + a[4] + "/" + a[5]);
            var B = D.getFullYear() == a[3] && (D.getMonth() + 1) == a[4] && D.getDate() == a[5];
        }
        if (!B) {
            alert("输入的" + tagName + "" + a[0] + " 里出生日期不对！");
            return false;
        }
    }
    return true;
}

function checkIdcard(idcard, birthday) {
    var Errors = new Array("", "身份证号码位数不对!", "身份证号码出生日期超出范围或含有非法字符!", "身份证号码最后一位校验码错误!", "身份证地区非法!", "身份证号码出生日期和选择的出生日期不符!");
    var area = {
        11 : "北京",
        12 : "天津",
        13 : "河北",
        14 : "山西",
        15 : "内蒙古",
        21 : "辽宁",
        22 : "吉林",
        23 : "黑龙江",
        31 : "上海",
        32 : "江苏",
        33 : "浙江",
        34 : "安徽",
        35 : "福建",
        36 : "江西",
        37 : "山东",
        41 : "河南",
        42 : "湖北",
        43 : "湖南",
        44 : "广东",
        45 : "广西",
        46 : "海南",
        50 : "重庆",
        51 : "四川",
        52 : "贵州",
        53 : "云南",
        54 : "西藏",
        61 : "陕西",
        62 : "甘肃",
        63 : "青海",
        64 : "宁夏",
        65 : "新疆",
        71 : "台湾",
        81 : "香港",
        82 : "澳门",
        91 : "国外"
    }
    var idcard, Y, JYM;
    var S, M;
    var idcard_array = new Array();
    idcard_array = idcard.split("");
    //地区检验
    if (area[parseInt(idcard.substr(0, 2))] == null) return Errors[4];
    //身份号码位数及格式检验
    switch (idcard.length) {
    case 15:
        if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0)) {
            ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/; //测试出生日期的合法性
        } else {
            ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/; //测试出生日期的合法性
        }
        if (ereg.test(idcard)) {
            var sBirthday = idcard.substr(6, 2) + "-" + idcard.substr(8, 2) + "-" + idcard.substr(10, 2);
            if (birthday.substr(2, 8) != sBirthday) {
                return Errors[5];
            } else {
                return Errors[0];
            }

        } else {
            return Errors[2];
        }
        break;
    case 18:
        //18位身份号码检测
        //出生日期的合法性检查
        //闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
        //平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
        if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
            ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; //闰年出生日期的合法性正则表达式
        } else {
            ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; //平年出生日期的合法性正则表达式
        }
        if (ereg.test(idcard)) { //测试出生日期的合法性
            //计算校验位
            S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 + parseInt(idcard_array[7]) * 1 + parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9]) * 3;
            Y = S % 11;
            M = "F";
            JYM = "10X98765432";
            M = JYM.substr(Y, 1); //判断校验位
            if (M == idcard_array[17]) {
                var sBirthday = idcard.substr(6, 4) + "-" + idcard.substr(10, 2) + "-" + idcard.substr(12, 2);
                if (birthday != sBirthday) {
                    return Errors[5];
                } else {
                    return Errors[0]; //检测ID的校验位
                }
            } else {
                return Errors[3];
            }
        } else return Errors[2];
        break;
    default:
        return Errors[1];
        break;
    }
}

function checkEmail(email) {
    if (email != null && email != "") {
        //var pattern = /(\w+[\.\w+]*@\w+\.\w+)(\.{0,1}\w*)(\.{0,1}\w*)/;
        var pattern = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (!pattern.test(email)) {
            alert("邮箱格式不正确！");
            return false;
        }
    }
    return true;

}

function checkMobile(mobile) {
    var reg = /^(13|15|17|18)\d{9}$/;
    if (!reg.test(mobile)) {

        alert("非法的手机号码");
        return false;
    }
    return true;
}

function check() {
    if (ev_submit()) {
        var userName = document.getElementsByName("userName")[0].value;
        if (userName.length <= 0 || userName == null) {
            alert("你的登录用户名为空,请进行用户名注册后在进行该提交!");
            $("select").attr("disabled", "disabled");
        } else {
            //判断在2、3、5状态是否有数据
            var cardid = document.getElementsByName("cardid")[0].value;
            $.ajax({
                type: "POST",
                url: '/njga/persionRegister.do?method=checkCardid',
                data: {
                    'cardid': cardid,
                    'userName': userName
                },
                success: function(data) {
                    if (data == "1") {
                        alert("该身份证号码已经注册，或您输入了错误的身份证号码!");
                        $("select").attr("disabled", "disabled");
                        return false;
                    } else {
                        document.forms[0].action = "/njga/persionRegister.do?method=persionRegisterUpdateState";
                        document.forms[0].submit();
                    }
                }
            });

        }
    }
}

$(function() {
    $("select").attr("disabled", "disabled");
});

function changeCardid() {
    var cardiddiv = document.getElementById("cardiddiv");
    cardiddiv.innerHTML = "";
    document.getElementsByName("sex")[0].value = "";
    document.getElementsByName("birthday")[0].value = "";

    var cardid = document.getElementsByName("cardid")[0].value;
    var len = cardid.length;

    if (len == 15 || len == 18) {
        if (len == 15) {
            if ((parseInt(cardid.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(cardid.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(cardid.substr(6, 2)) + 1900) % 4 == 0)) {
                ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/; //测试出生日期的合法性
            } else {
                ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/; //测试出生日期的合法性
            }
            if (ereg.test(cardid)) {
                var sBirthday = cardid.substr(6, 2) + "-" + cardid.substr(8, 2) + "-" + cardid.substr(10, 2);
                document.getElementsByName("birthday")[0].value = "19" + sBirthday;
                if (parseInt(cardid.charAt(14) / 2) * 2 != cardid.charAt(14)) document.getElementsByName("sex")[0].value = 0;
                else document.getElementsByName("sex")[0].value = 1;
            } else {

                cardiddiv.innerHTML = "身份证格式不正确!";
            }
        } else {
            if (parseInt(cardid.substr(6, 4)) % 4 == 0 || (parseInt(cardid.substr(6, 4)) % 100 == 0 && parseInt(cardid.substr(6, 4)) % 4 == 0)) {
                ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; //闰年出生日期的合法性正则表达式
            } else {
                ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; //平年出生日期的合法性正则表达式
            }
            if (ereg.test(cardid)) {
                var sBirthday = cardid.substr(6, 4) + "-" + cardid.substr(10, 2) + "-" + cardid.substr(12, 2);
                document.getElementsByName("birthday")[0].value = sBirthday;
                if (parseInt(cardid.charAt(16) / 2) * 2 != cardid.charAt(16)) document.getElementsByName("sex")[0].value = 0;
                else document.getElementsByName("sex")[0].value = 1;
            } else {
                cardiddiv.innerHTML = "身份证格式不正确!";
            }

        }
    }

}
```