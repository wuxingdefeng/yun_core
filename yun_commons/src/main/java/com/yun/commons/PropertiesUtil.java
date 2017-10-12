package com.yun.commons;

import java.io.FileInputStream;
import java.io.IOException;
import java.net.URLDecoder;
import java.util.Properties;

public class PropertiesUtil {
		private static String path="basic.properties";
		private static Properties p = new Properties();
		public PropertiesUtil(){}
		static{
			FileInputStream fis = null;
			String ff=null;
			try{
				ff = Thread.currentThread().getContextClassLoader().getResource("/").getPath();
			}catch(Exception e){
				ff=PropertiesUtil.class.getResource("/").getPath();
			}
			try {
				ff=URLDecoder.decode(ff,"utf-8");
				fis = new FileInputStream(ff+path);
				p.load(fis);
			} catch (Exception e) {
				//  Auto-generated catch block
				e.printStackTrace();
			}//属性文件流
			finally{
				try {
					fis.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		public static String get(String key) {
			String value = null;
			if (p.containsKey(key)) {
				value = p.getProperty(key);
			}
			return value;
		}

}
