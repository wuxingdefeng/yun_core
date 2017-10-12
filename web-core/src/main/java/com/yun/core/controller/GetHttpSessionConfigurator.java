package com.yun.core.controller;

import javax.websocket.HandshakeResponse;
import javax.websocket.server.HandshakeRequest;
import javax.websocket.server.ServerEndpointConfig;
import javax.websocket.server.ServerEndpointConfig.Configurator;

public class GetHttpSessionConfigurator extends Configurator{
	@Override
	public void modifyHandshake(ServerEndpointConfig sec,HandshakeRequest request, HandshakeResponse response) {

	}

}
