##批量保存，组织列表数据
```
<tr><td><input type="text" name="store_code" onblur="javascript:checkEntity(this);"></td><td><select><option value="1">线上</option><option value="2">线下</option></select></td><td>xx供应商</td><td></td><td width="200px"><input name="price_check" placeholder="10" type="text" onblur="javascript:checkNumber(this,1);"></td><td style="border-top-style:none;border-bottom-style:none;border-right-style:none"><a class="btn green" onclick="javascript:addNewRow(this,1);">添加</a></td><td style="border-top-style:none;border-bottom-style:none;border-right-style:none"><a class=" btn red del_rows" onclick="javascript:;">删行</a></td></tr>



//参与实体列表信息
     function  getEntityList(){
         var  resList = [];
         var  tag = $( 'input[name="disType"]:checked' ).val();
         var  trs = $( "#skuTable" +tag+ " tbody tr" );
        console.log( 'trs:' +trs.length);
        
         //添加的参与实体
         for ( var  i=1; i<trs.length; i++){
             var  res = {};
             var  storeCode = $(trs[i]).children().first().find( 'input' ).first().val();
             var  saleWay = $(trs[i]).children().eq(1).find( 'select' ).first().val();
             var  suppName = $(trs[i]).children().eq(2).html();
             var  skuPrice = $(trs[i]).children().eq(3).html();
             var  setPrice = $(trs[i]).children().eq(4).find( 'input' ).first().val();
            
            res.storeCode = storeCode;
            res.saleWay = saleWay;
            res.suppName = suppName;
            res.skuPrice = skuPrice;
            res.setPrice = setPrice;
            resList.push(res);
        }
         //默认的参与实体
        
         return  resList;     
     }   



function  addNewRow(ele,tag){
        
         var  listLength = storeCodeList.length;
         var  rows = $( "#skuTable" +tag+ " tbody tr" ).length;
         if (rows > listLength){
            console.log( "AddNewRow当前行数大于已选门店数" );
             return ;
        }
        
         var  dom =  "" ;
         var  skuPrice = $( "#skuPriceHidden" ).val();
         if (tag== "1" ){
            dom +=  "<tr><td><input type='text' name='store_code' onblur='javascript:checkEntity(this);'></td><td><select><option value='1'>线上</option><option value='2'>线下</option></select></td><td>xx供应商</td><td>" +skuPrice+ "</td><td width='200px'><input name='price_check' placeholder='10' type='text' onblur='javascript:checkNumber(this,1);' /></td><td style='border-top-style:none;border-bottom-style:none;border-right-style:none'><a class='btn green' onclick='javascript:addNewRow(this,1);'>添加</a></td><td style='border-top-style:none;border-bottom-style:none;border-right-style:none'><a class=' btn red del_rows' onclick='javascript:;'>删行</a></td></tr>" ;
        } else {
            dom +=  "<tr><td><input type='text' name='store_code' onblur='javascript:checkEntity(this);'></td><td><select><option value='1'>线上</option><option value='2'>线下</option></select></td><td>xx供应商</td><td>" +skuPrice+ "</td><td width='200px'><input name='price_check' placeholder='10' type='text' onblur='javascript:checkNumber(this,2);' /></td><td style='border-top-style:none;border-bottom-style:none;border-right-style:none'><a class='btn green' onclick='javascript:addNewRow(this,2);'>添加</a></td><td style='border-top-style:none;border-bottom-style:none;border-right-style:none'><a class=' btn red del_rows' onclick='javascript:;'>删行</a></td></tr>" ;
        }
        tbody=$(ele).parents( "table" ).find( "tbody" );
        tbody.append(dom);
        
       //删除当前行
        $( ".del_rows" ).on( "click" , function (){
             var  ff = $( this ).parent().parent();
             var  td1 = ff.find( "td" ).eq(0).find( "input" ).val();
            skuInfoList.remove(td1);
             var  self=$( this ),
            parent = self.parents( 'tr' );
            parent.remove();
             var  hang = $( '#operowno' ).val();
            dbList.remove(hang);
            dbList = getNewList(dbList,hang);
        });
        
        $( "#skuTable" +tag).find( "a:gt(0)" ).hover( function () {
             var  hang = $( this ).parent().parent().prevAll().length;
              $( "#operowno" ).val(hang);
        })     }  


//验证两小数
     function  checkNumber(ele,tag){
         var  num = ele.value;
         var  tip =  "" ;
         if (tag== "1" ){
            tip =  "特供价" ;
        } else {
            tip =  "供应商承担比例" ;
        }
         if (!isPositiveNum(accMul(num,100))||num == "" ){
            console.log(tip+ "请输入正整数或两位小数" );
            ele.value =  "" ;
             //ele.focus();
             return ;
        }
    }
     function  isPositiveNum(s){ //是否为正整数
         var  re = /^[0-9]*[1-9][0-9]*$/ ;
         return  re.test(s)
    }
    
     function  accMul(num1,num2){
         var  m=0,s1=num1.toString(),s2=num2.toString(); 
          try {m+=s1.split( "." )[1].length} catch (e){};
          try {m+=s2.split( "." )[1].length} catch (e){};
          return  Number(s1.replace( "." , "" ))*Number(s2.replace( "." , "" ))/Math.pow(10,m);
    }  

``` 

##select 动态分页
##输入url后的加载过程
计算机网络体系结构

应用层(HTTP、SMTP、FTP、POP3)
运输层(TCP、UDP)
网络层(IP(路由器))
数据链路层(网桥(CSMA/CD、PPP))
物理层(集线器)
1. 查找域名对应IP地址
这一步包括 DNS 具体的查找过程，包括：浏览器缓存->系统缓存->路由器缓存...
(1) 浏览器搜索自己的 DNS 缓存（维护一张域名与 IP 地址的对应表）；
(2) 搜索操作系统中的 DNS 缓存（维护一张域名与 IP 地址的对应表）；
(3) 搜索操作系统的 hosts 文件（ Windows 环境下，维护一张域名与 IP 地址的对应表）；
(4) 操作系统将域名发送至 LDNS（本地区域名服务器），LDNS 查询 自己的 DNS 缓存（一般查找成功率在 80% 左右），查找成功则返回结果，失败则发起一个迭代 DNS 解析请求：

① LDNS 向 Root Name Server （根域名服务器，如 com、net、org等的解析的顶级域名服务器的地址）发起请求，此处，Root Name Server 返回 com 域的顶级域名服务器的地址；

② LDNS 向 com 域的顶级域名服务器发起请求，返回 baidu.com 域名服务器地址；

③ LDNS 向 baidu.com 域名服务器发起请求，得到 www.baidu.com 的 IP 地址；
(5) LDNS 将得到的 IP 地址返回给操作系统，同时自己也将 IP 地址缓存起来；

(6) 操作系统将 IP 地址返回给浏览器，同时自己也将 IP 地址缓存起来；

2. 建立连接(TCP的三次握手)
(1) 主机向服务器发送一个建立连接的请求；

(2) 服务器接到请求后发送同意连接的信号；

(3) 主机接到同意连接的信号后，再次向服务器发送了确认信号 ;

注意：这里的三次握手中主机两次向服务器发送确认，第二次是为了防止已失效的连接请求报文段传至服务器导致错误。
3. 构建网页
(1) 浏览器根据 URL 内容生成 HTTP 请求，请求中包含请求文件的位置、请求文件的方式等等；

(2) 服务器接到请求后，会根据 HTTP 请求中的内容来决定如何获取相应的 HTML 文件；

(3) 服务器将得到的 HTML 文件发送给浏览器；

(4) 在浏览器还没有完全接收 HTML 文件时便开始渲染、显示网页；

(5) 在执行 HTML 中代码时，根据需要，浏览器会继续请求图片、音频、视频、CSS、JS等文件，过程同请求 HTML ；

浏览器渲染展示网页过程

HTML代码转化为DOM(DOM Tree)
CSS代码转化成CSSOM（CSS Object Model）
结合DOM和CSSOM，生成一棵渲染树（包含每个节点的视觉信息）(Render Tree)
生成布局（layout），即将所有渲染树的所有节点进行平面合成
将布局绘制（paint）在屏幕上
4. 断开连接(TCP的四次挥手)
(1) 主机向服务器发送一个断开连接的请求；

(2) 服务器接到请求后发送确认收到请求的信号；(此时服务器可能还有数据要发送至主机)

(3) 服务器向主机发送断开通知；(此时服务器确认没有要向主机发送的数据)

(4) 主机接到断开通知后断开连接并反馈一个确认信号，服务器收到确认信号后断开连接；

注意：这里的四次挥手中服务器两次向主机发送消息，第一次是回复主机已收到断开的请求，第二次是向主机确认是否断开，确保数据传输完毕。






