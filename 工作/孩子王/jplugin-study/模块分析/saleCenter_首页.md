##访问首页时会请求不同的方法
```

比如

1.Request URL:
http://test.site.haiziwang.com/sso-web/site/getSiteMenuList.do?appType=1

Request Method:
POST

Resonpose:
     {data: [,…], errorCode: "0", msg: "成功", success: true}
data :  [,…]
0 :  {children: [{,…}, {,…}, {name: "促销管理", id: "123", parentId: "31|PRO",…},…], name: "PRO", id: "31|PRO",…}
1 :  {children: [{,…}, {,…}, {,…}, {,…}, {,…},…], name: "客服工单系统", id: "34|CustomerCenter", parentId: "0",…}
2 :  {,…}
3 :  {children: [{,…}, {,…},…], name: "孩子王仓储物流系统", id: "80|KWMS", parentId: "0",…}
errorCode :  "0"
msg :  "成功"
success :  true

2.Request URL:
http://test.site.haiziwang.com/sso-web/token/delayToken.do

Response:{"errorCode":"0","msg":"成功","success":true}

```

## 如果没有登录直接访问页面
比如访问main.html,会进入到login.js中






