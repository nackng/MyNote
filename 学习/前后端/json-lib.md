##创建JsonObject对象
```
package com.allen.common.json.json_lib;


import java.util.ArrayList;
import java.util.HashMap;


import org.junit.Test;


import net.sf.json.JSONArray;
import net.sf.json.JSONObject;


public class CreateJsonObject {


/**
* JsonObject和JsonArray区别就是JsonObject是对象形式，JsonArray是数组形式
*/
// 创建JsonObject第一种方法
@Test
public void jsonObject_1() {
JSONObject jsonObject = new JSONObject();
jsonObject.put("UserName", "ZHULI");
jsonObject.put("age", "30");
jsonObject.put("workIn", "ALI");
System.out.println("jsonObject1：" + jsonObject);
}
jsonObject1：{"UserName":"ZHULI","age":"30","workIn":"ALI"}


// 创建JsonObject第二种方法
@Test
public void jsonObject_2() {
HashMap<String, String> hashMap = new HashMap<String, String>();
hashMap.put("UserName", "ZHULI");
hashMap.put("age", "30");
hashMap.put("workIn", "ALI");
System.out.println("jsonObject2：" + JSONObject.fromObject(hashMap));
// 如果JSONArray解析一个HashMap，则会将整个对象的放进一个数组的值中
System.out.println("jsonArray FROM HASHMAP：" + JSONArray.fromObject(hashMap));
}
jsonObject2：{"UserName":"ZHULI","workIn":"ALI","age":"30"} jsonArray FROM HASHMAP：[{"UserName":"ZHULI","workIn":"ALI","age":"30"}]  
 



// 创建一个JsonArray方法1
@Test
public void jsonArray_1() {
JSONArray jsonArray = new JSONArray();
jsonArray.add(0, "ZHULI");
jsonArray.add(1, "30");
jsonArray.add(2, "ALI");
System.out.println("jsonArray1：" + jsonArray);
}

jsonArray1：["ZHULI","30","ALI"]


// 创建JsonArray方法2
@Test
public void jsonArray_2() {
ArrayList<String> arrayList = new ArrayList<String>();
arrayList.add("ZHULI");
arrayList.add("30");
arrayList.add("ALI");
System.out.println("jsonArray2：" + JSONArray.fromObject(arrayList));
// 组装一个复杂的JSONArray
JSONObject jsonObject2 = new JSONObject();
jsonObject2.put("UserName", "ZHULI");
jsonObject2.put("age", "30");
jsonObject2.put("workIn", "ALI");
jsonObject2.element("Array", arrayList);
System.out.println("jsonObject2：" + jsonObject2);
}
jsonArray2：["ZHULI","30","ALI"] jsonObject2：{"UserName":"ZHULI","age":"30","workIn":"ALI","Array":["ZHULI","30","ALI"]}  
 
}


``` ##解析Json字符串
```
package  com.allen.common.json.json_lib;
import  org.junit.Test;
import  net.sf.json.JSONArray;
import  net.sf.json.JSONObject;
public   class  ParseJsonString {
     @Test
     public   void  parse_1() {
        String  jsonString  =  "{\"UserName\":\"ZHULI\",\"age\":\"30\",\"workIn\":\"ALI\",\"Array\":[\"ZHULI\",\"30\",\"ALI\"]}" ;
         // 将Json字符串转为java对象
        JSONObject  obj  = JSONObject. fromObject ( jsonString );
         // 获取Object中的UserName
         if  ( obj .has( "UserName" )) {
            System. out .println( "UserName:"  +  obj .getString( "UserName" ));
        }
         // 获取ArrayObject
         if  ( obj .has( "Array" )) {
            JSONArray  transitListArray  =  obj .getJSONArray( "Array" );
             for  ( int   i  = 0;  i  <  transitListArray .size();  i ++) {
                System. out .print( "Array:"  +  transitListArray .getString( i ) +  " " );
            }
        }
    }
}
//结果：
UserName:ZHULI Array:ZHULI Array:30 Array:ALI    

```