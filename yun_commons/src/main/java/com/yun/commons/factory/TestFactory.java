package com.yun.commons.factory;

import com.yun.commons.intferce.SendIntferce;
import com.yun.commons.intferce.Sender;

import java.util.HashMap;
import java.util.Map;



/**
 * 抽象工厂模式测试
 * @ 1:定义接口内统一方法
 * @ 2:不同对象实现1接口，并且实现方法
 * @ 3:定义返回1接口的接口
 * @ 4:定义对象工厂实现接口3，并且实现方法
 * @author QB
 *
 */
public class TestFactory {
	public static void main(String[] args){
		Sender send=new SubmilSendFactory();
		SendIntferce ferc=send.getSender();
		Map<String,Object> params=new HashMap<String,Object>();
		params.put("phone", "13968034241");
		params.put("code", "123456");
		System.out.println(ferc.sendVideo(params));
	}
}
