package com.yun.commons;


import com.yun.commons.entity.JGUser;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;



public class PushUtils {
	private String URL="https://api.im.jpush.cn";
	//测试
	private String appkey="169d09aec3b350629fe11222";
	private String masterSecret="f0f254b7189118fb6342fea6";
	//极光注册用户
	public Object registerJGUser(JGUser user){
		Map<String,Object> headerMap=new HashMap<String,Object>();
		Map<String,String> userM=new HashMap<String,String>();
		userM.put("username", user.getNickname());
		userM.put("password", user.getPassword());
		userM.put("nickname", user.getNickname());
		userM.put("birthday", DateUtil.getDateFormats(DateUtil.date1, new Date()));
		userM.put("signature", UUIDUtil.getUUid());
		userM.put("region","重庆");
		userM.put("address", "");
		//userM.put("appkey", appkey);
		try {
			headerMap.put("User-Agent","JPush-API-Java-Client");
			headerMap.put("Connection","Keep-Alive");
			headerMap.put("Accept-Charset","UTF-8");
			headerMap.put("Charset","UTF-8");
			headerMap.put("Content-Type", "application/json");
			headerMap.put("Authorization","Basic "+Base64Utils.jiaMi(appkey+":"+masterSecret));

			//Basic MTY5ZDA5YWVjM2IzNTA2MjlmZTExMjIyOmYwZjI1NGI3MTg5MTE4ZmI2MzQyZmVhNg==
			// Basic MTY5ZDA5YWVjM2IzNTA2MjlmZTExMjIyOmYwZjI1NGI3MTg5MTE4ZmI2MzQyZmVhNg==
			return HttpClientUtils.sendHttpsPost(URL+"/v1/users", userM, headerMap);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	public static void main(String[] args) throws Exception{
		PushUtils utils=new PushUtils();
		JGUser user=new JGUser();
		user.setNickname("riguang");
		user.setPassword("jiuzhekan");
		System.out.println(utils.registerJGUser(user));
		//System.out.println(Base64Utils.jiaMi("jiuzhekan"));
	}
}
