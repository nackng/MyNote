
在 Java 开发中通常我们会存储配置参数信息到属性文件，这样的属性文件可以是拥有键值对的属性文件，也可以是XML文件，关于XML文件的操作，请参考博文 【Java编程】DOM XML Parser 解析、遍历、创建XML 。在该篇博文中，我将展示如何向属性文件写入键值对，如何读取属性文件中的键值对，如何遍历属性文件。

1、向属性文件中写入键值对




特别注意：

Properties类调用setProperty方法将键值对保存到内存中，此时可以通过getProperty方法读取，propertyNames()方法进行遍历，但是并没有将键值对持久化到属性文件中，故需要 调用store()方法持久化键值对到属性文件中 ，这里的store方法 类似于 Android SharedPreferences的commit()方法 。
[java] view plain copy
print ?
package  com.andieguo.propertiesdemo;  
  
import  java.io.FileInputStream;  
import  java.io.FileOutputStream;  
import  java.io.IOException;  
import  java.io.InputStream;  
import  java.io.OutputStream;  
import  java.util.Date;  
import  java.util.Enumeration;  
import  java.util.Properties;  
  
import  junit.framework.TestCase;  
  
public   class  PropertiesTester  extends  TestCase {  
  
     public   void  writeProperties() {  
        Properties properties =  new  Properties();  
        OutputStream output =  null ;  
         try  {  
            output =  new  FileOutputStream( "config.properties" );  
            properties.setProperty( "url" ,  "jdbc:mysql://localhost:3306/" );  
            properties.setProperty( "username" ,  "root" );  
            properties.setProperty( "password" ,  "root" );  
            properties.setProperty( "database" ,  "bbs" ); //保存键值对到内存   
            properties.store(output,  "andieguo modify"  +  new  Date().toString()); // 保存键值对到文件中   
        }  catch  (IOException io) {  
            io.printStackTrace();  
        }  finally  {  
             if  (output !=  null ) {  
                 try  {  
                    output.close();  
                }  catch  (IOException e) {  
                    e.printStackTrace();  
                }  
            }  
        }  
    }  
}  

package com.andieguo.propertiesdemo;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Date;
import java.util.Enumeration;
import java.util.Properties;

import junit.framework.TestCase;

public class PropertiesTester extends TestCase {

	public void writeProperties() {
		Properties properties = new Properties();
		OutputStream output = null;
		try {
			output = new FileOutputStream("config.properties");
			properties.setProperty("url", "jdbc:mysql://localhost:3306/");
			properties.setProperty("username", "root");
			properties.setProperty("password", "root");
			properties.setProperty("database", "bbs");//保存键值对到内存
			properties.store(output, "andieguo modify" + new Date().toString());// 保存键值对到文件中
		} catch (IOException io) {
			io.printStackTrace();
		} finally {
			if (output != null) {
				try {
					output.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
}
 执行单元测试后，属性文件内容如下：


2、读取属性文件中的键值对



[java] view plain copy
print ?
public   class  PropertiesTester  extends  TestCase {  
  
     public   void  loadProperties() {  
        Properties properties =  new  Properties();  
        InputStream input =  null ;  
         try  {  
            input =  new  FileInputStream( "config.properties" ); //加载Java项目根路径下的配置文件   
            properties.load(input); // 加载属性文件   
            System.out.println( "url:"  + properties.getProperty( "url" ));  
            System.out.println( "username:"  + properties.getProperty( "username" ));  
            System.out.println( "password:"  + properties.getProperty( "password" ));  
            System.out.println( "database:"  + properties.getProperty( "database" ));  
        }  catch  (IOException io) {  
        }  finally  {  
             if  (input !=  null ) {  
                 try  {  
                    input.close();  
                }  catch  (IOException e) {  
                    e.printStackTrace();  
                }  
            }  
        }  
    }  
}  

public class PropertiesTester extends TestCase {

	public void loadProperties() {
		Properties properties = new Properties();
		InputStream input = null;
		try {
			input = new FileInputStream("config.properties");//加载Java项目根路径下的配置文件
			properties.load(input);// 加载属性文件
			System.out.println("url:" + properties.getProperty("url"));
			System.out.println("username:" + properties.getProperty("username"));
			System.out.println("password:" + properties.getProperty("password"));
			System.out.println("database:" + properties.getProperty("database"));
		} catch (IOException io) {
		} finally {
			if (input != null) {
				try {
					input.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
}


执行单元测试方法，console输出的output如下：


3、遍历属性文件中的键值对
[java] view plain copy
print ?
package  com.andieguo.propertiesdemo;  
  
import  java.io.IOException;  
import  java.io.InputStream;  
import  java.util.Enumeration;  
import  java.util.Map.Entry;  
import  java.util.Properties;  
import  java.util.Set;  
  
import  junit.framework.TestCase;  
  
public   class  PropertiesTester  extends  TestCase {  
  
     public   void  printAll() {  
        Properties prop =  new  Properties();  
        InputStream input =  null ;  
         try  {  
            String filename =  "config.properties" ;  
            input = getClass().getClassLoader().getResourceAsStream(filename);  
             if  (input ==  null ) {  
                System.out.println( "Sorry, unable to find "  + filename);  
                 return ;  
            }  
            prop.load(input);  
             //方法一：   
            Set<Object> keys = prop.keySet(); //返回属性key的集合   
             for (Object key:keys){  
                System.out.println( "key:" +key.toString()+ ",value:" +prop.get(key));  
            }  
             //方法二：   
            Set<Entry<Object, Object>> entrys = prop.entrySet(); //返回的属性键值对实体   
             for (Entry<Object, Object> entry:entrys){  
                System.out.println( "key:" +entry.getKey()+ ",value:" +entry.getValue());  
            }  
             //方法三：   
            Enumeration<?> e = prop.propertyNames();  
             while  (e.hasMoreElements()) {  
                String key = (String) e.nextElement();  
                String value = prop.getProperty(key);  
                System.out.println( "Key:"  + key +  ",Value:"  + value);  
            }  
        }  catch  (IOException ex) {  
            ex.printStackTrace();  
        }  finally  {  
             if  (input !=  null ) {  
                 try  {  
                    input.close();  
                }  catch  (IOException e) {  
                    e.printStackTrace();  
                }  
            }  
        }  
    }  
      
}  

package com.andieguo.propertiesdemo;

import java.io.IOException;
import java.io.InputStream;
import java.util.Enumeration;
import java.util.Map.Entry;
import java.util.Properties;
import java.util.Set;

import junit.framework.TestCase;

public class PropertiesTester extends TestCase {

	public void printAll() {
		Properties prop = new Properties();
		InputStream input = null;
		try {
			String filename = "config.properties";
			input = getClass().getClassLoader().getResourceAsStream(filename);
			if (input == null) {
				System.out.println("Sorry, unable to find " + filename);
				return;
			}
			prop.load(input);
			//方法一：
			Set<Object> keys = prop.keySet();//返回属性key的集合
			for(Object key:keys){
				System.out.println("key:"+key.toString()+",value:"+prop.get(key));
			}
			//方法二：
			Set<Entry<Object, Object>> entrys =	prop.entrySet();//返回的属性键值对实体
			for(Entry<Object, Object> entry:entrys){
				System.out.println("key:"+entry.getKey()+",value:"+entry.getValue());
			}
			//方法三：
			Enumeration<?> e = prop.propertyNames();
			while (e.hasMoreElements()) {
				String key = (String) e.nextElement();
				String value = prop.getProperty(key);
				System.out.println("Key:" + key + ",Value:" + value);
			}
		} catch (IOException ex) {
			ex.printStackTrace();
		} finally {
			if (input != null) {
				try {
					input.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
	
}
 4、其他方法

public void list(PrintStream out)

将属性列表输出到指定的输出流。此方法对调试很有用。

public void storeToXML(OutputStream os,Stringcomment) throws IOException

发出一个表示此表中包含的所有属性的 XML 文档。 5、参考

Java Properties File Examples (推荐)

Java Property File example with write, read, load from Classpath and property xml file

Java - The Properties Class 6、你可能感兴趣的文章

【Java编程】DOM XML Parser解析、遍历、创建XML

【Java编程】SAX XML Parser解析、生成XML文件