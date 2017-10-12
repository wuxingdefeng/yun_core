package com.yun.commons.interImpl;

import com.yun.commons.HttpClientUtils;
import com.yun.commons.intferce.SendIntferce;

import java.util.HashMap;
import java.util.Map;



/**
 * SuBmail 平台发送短信
 * @author QinBin
 *
 */
public class SubmailImpl implements SendIntferce {
	//在 SUBMAIL 应用集成中创建的短信应用 ID
	private static final String appid="10068";
	//应用密匙 或 数字签名
	private static final String signature="3c3d34fdfae8ef52c7c49831992954e5";

	@Override
	public Object send(Map<String,Object> params) {
		// TODO Auto-generated method stub
		return sendMessage(params);
	}
	/**
	 * 发送国内短信
	 * @param params
	 * @return
	 */
	public Object sendMessage(Map<String,Object> params){
		String url="http://api.submail.cn/message/xsend.json";
		Map<String,String> paramsM=new HashMap<String,String>();
		paramsM.put("appid", appid);
		paramsM.put("to", params.get("phone").toString());
		paramsM.put("project", "sZS0m1");//模板标记
		paramsM.put("vars", "{\"code\":\""+params.get("content")+"\"}");//code 模板中的字段名 以JSON传递
		paramsM.put("signature", signature);
		try {
			Object result=HttpClientUtils.sendHttpPost(url, paramsM, null);
			return result;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	@Override
	public Object sendVideo(Map<String, Object> params) {
		String url="http://api.submail.cn/voice/verify.json";
		Map<String,String> paramsM=new HashMap<String,String>();
		paramsM.put("appid", appid);
		paramsM.put("to", params.get("phone").toString());
		paramsM.put("code", params.get("code").toString());//验证码
		paramsM.put("signature", signature);
		try{
			Object result=HttpClientUtils.sendHttpPost(url,paramsM,null);
			return result;
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
	}
	public static void main(String[] args){
		SendIntferce submail=new SubmailImpl();
		Map<String,Object> params=new HashMap<String,Object>();
		params.put("phone", "17759219161");
		params.put("content", "1234是打发点56");
//		System.out.println(submail.sendVideo(params));
		System.out.println(submail.send(params));
	}
}
