##点击字体变大5u次后再变小
```
<html>
<head>
<script type="text/javascript" src="/jquery/jquery.js"></script>
<script type="text/javascript">
$(document).ready(function(){
  var x = 0;
  var tag = true; // 是否要执行
  $("p").click(function(e){
    if(x == 5){
        tag = false;
    }
    if(x == 0){
        tag = true;
    }
    if(tag){
        x++;
        $("p").animate({fontSize:"+=5px"});
    }else{
        x--;
        $("p").animate({fontSize:"-=5px"});
    }
  });
});
</script>
</head>
<body>
<p style="font-size:20px;">点击这个段落可以增加其大小。只能增加两次。</p>
</body>
</html>
```