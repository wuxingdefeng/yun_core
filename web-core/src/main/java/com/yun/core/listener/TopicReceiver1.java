package com.yun.core.listener;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.TextMessage;

import org.springframework.stereotype.Component;


/**
 * 
 * @author QB
 * @description  Topic消息监听器 消费者
 * 
 */
@Component
public class TopicReceiver1 implements MessageListener{

	public void onMessage(Message message) {
		try {
			System.out.println("TopicReceiver1接收到消息:"+((TextMessage)message).getText());
		} catch (JMSException e) {
			e.printStackTrace();
		}
	}
	
}
