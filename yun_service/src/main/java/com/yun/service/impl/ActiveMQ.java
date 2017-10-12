package com.yun.service.impl;

import org.springframework.stereotype.Component;

@Component
public class ActiveMQ {
/*	@Autowired
	private JmsTemplate jmsQueueTemplate;
	@Autowired
	private JmsTemplate jmsTopicTemplate;
	*//**
	 * 发送消息到队列（队列模式）生产者
	 * @param queueName
	 * @param message
	 *//*
	public void sendQueue(String queueName,final String message){
		jmsQueueTemplate.send(queueName, new MessageCreator() {
			@Override
			public Message createMessage(Session session) throws JMSException {
				return session.createTextMessage(message);
			}
		});
	}
	*//**
	 * 发送消息到队列（订阅模式）生产者
	 * @param topicName
	 * @param message
	 *//*
	public void sendTopic(String topicName,final String message){
		jmsTopicTemplate.send(topicName, new MessageCreator() {
			@Override
			public Message createMessage(Session session) throws JMSException {
				return session.createTextMessage(message);
			}
		});
	}*/
}
