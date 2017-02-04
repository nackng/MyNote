[TOC]
##判断第2个日期比第1个日期大
```
如何用脚本判断用户输入的的字符串是下面的时间格式 2017-11-21 必须要保证用
户的输入是此格式，并且是时间，比如说月份不大于 12 等等，另外我需要用户输
入两个，并且后一个要比前一个晚.
<body>
<script type="text/javascript">
    function compareDate(d1, d2) {
        var arrayD1 = d1.split("-");
        var date1 = new Date(arrayD1[0], arrayD1[1], arrayD1[2]);
        var arrayD2 = d2.split("-");
        var date2 = new Date(arrayD2[0], arrayD2[1], arrayD2[2]);
        if (date1 > date2) return false;
        return true;
    }

    function verifyDate(d) {
        var datePattern = /^\d{4}-(0?[1-9]|1[0-2])-(0?[1-9]|[1-2]\d|3[0-1])$/;
        return datePattern.test(d);
    }

    window.onload = function(){
        document.getElementById("frm1").onsubmit = function() {
            var d1 = this.d1.value;
            var d2 = this.d2.value;
            if (!verifyDate(d1)) {
                alert("第一个日期格式不对");
                return false;
            }
            if (!verifyDate(d2)) {
                alert("第二个日期格式不对");
                return false;
            }
            if (!compareDate(d1, d2)) {
                alert("第二个日期比第一日期小");
                return false;
            }
        };
    }
</script>
    <form id="frm1" action="xxx.html">
        <input type="text" name="d1" />
        <input type="text" name="d2" />
        <input type="submit"/>
    </form>
</body>

```
##验证文本框的内容全部为数字
```
1.form表单提交时
<body>
    <form id='chkFrom1' onsubmit='return chkForm(this)'>
        <input type="text" id="d1" />
        <input type="submit" />
    </form>
    <script type="text/javascript">
       
        window.onload = function(){
            document.getElementById("chkFrom1").onsubmit = function() {
                var value = this.d1.value;
                var len = value.length;
                for (var i = 0; i < len; i++) {
                    if (value.charAt(i) > "9" || value.charAt(i) < "0") {
                        alert("含有非数字字符");
                        return false;
                    }
                }
                return true;
            };
        }
    </script>
</body>

2.焦点离开时blur事件
<script type="text/javascript">
        function chkNumber(eleText) {
                var value = eleText.value;
                var len = value.length;
                for (var i = 0; i < len; i++) {
                    if (value.charAt(i) > "9" || value.charAt(i) < "0") {
                        alert("含有非数字字符");
                        eleText.focus();
                        break;
                    }
                }
            }
    </script>
<input type="text" id="d1" onblur=" chkNumber (this)"/>
```

##java 校验只能输入数字
```
if (!NormalUtil.isNumeric(ruleId)) {
    resjon.setResultCode("0");
    resjon.setMsg("规则编号请输入数字");
    renderJson(JSON.toJSONString(resjon));
}
promotionQueryPo.setRuleId(Integer.parseInt(ruleId));

public static boolean isNumeric(String str) {
    for (int i = 0; i < str.length(); i++) {
        System.out.println(str.charAt(i));
        if (!Character.isDigit(str.charAt(i))) {
            return false;
        }
    }
    return true;
}
```