package com.yun.commons.factory;


import com.yun.commons.interImpl.SubmailImpl;
import com.yun.commons.intferce.SendIntferce;
import com.yun.commons.intferce.Sender;

public class SubmilSendFactory implements Sender {
	@Override
	public SendIntferce getSender() {
		return new SubmailImpl();
	}
}
