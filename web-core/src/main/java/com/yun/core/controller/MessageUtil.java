package com.yun.core.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.websocket.EndpointConfig;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

import net.sf.json.JSONObject;
@ServerEndpoint(value="/loginPCIM/{myUUID}",configurator=GetHttpSessionConfigurator.class)
public class MessageUtil {
//	//保存所有服务器登录信息
//	private SpringRedisUtils redisUtils=(SpringRedisUtils) ContextLoader.getCurrentWebApplicationContext().getBean("springRedisUtils");
//	//保存本地服务器登录信息
//	private static  Map<String,Session> m =new ConcurrentHashMap<String,Session>();
//	/**
//	 * 连接成功做登录信息
//	 * @param myUUID
//	 * @param session
//	 * @param config
//	 */
//	@OnOpen
//	public void open(@PathParam("myUUID")String myUUID,Session session,EndpointConfig config){
//			String strs=myUUID;
//			myUUID=strs.split("@")[0];
//			String urlD=strs.split("@")[1];//根据这个做路由
//			if(myUUID==null||"".equals(myUUID.trim())){
//				OnMessage(messageObj("登录信息有误",5),session);
//			}else{
//				try {
//					Map<String, Object> reM=redisUtils.getMap("users");
//					if(reM==null||reM.size()<=0){
//						reM=new HashMap<String,Object>();
//					}
//					reM.put(myUUID, "http://"+URLDecoder.decode(urlD, "utf-8")+"/yun_core/sendSoket");
//					redisUtils.setMap("users",reM);
//				} catch (Exception e) {
//					e.printStackTrace();
//				}
//				m.put(myUUID, session);
//				JSONObject json=JSONObject.fromObject(messageObj(myUUID,6));
//				try {
//					json.put("urlS", "http://"+URLDecoder.decode(urlD, "utf-8")+"/yun_core/sendSoket");
//				} catch (UnsupportedEncodingException e) {
//					// TODO Auto-generated catch block
//					e.printStackTrace();
//				}
//				this.OnMessage(json.toString(), null);
//			}
//	}
//	public Session getSession(String toID){
//		if(toID!=null){
//			return m.get(toID);
//		}else{
//			return null;
//		}
//	}
//	/**
//	 * 消息封装
//	 * @param data
//	 * @param code（业务类型 1：错误消息 2：系统消息 3：聊天消息 4：视频消息 5:用户列表 6 上线通知 7 下线通知）
//	 * @return
//	 */
//	public String  messageObj(Object data,int code){
//		Map<String,Object> result=new HashMap<String,Object>();
//		result.put("data", data);
//		result.put("code", code);
//		return JSONObject.fromObject(result).toString();
//	}
//	public void deleteMes(String ID){
//		for(String key:m.keySet()){
//			if(m.get(key).getId().equals(ID)){
//				m.remove(key);
//			}
//		}
//	}
//	@OnMessage
//	public void OnMessage(String message, Session session){
//		synchronized (message) {
//			try{
//				if(message==null||"".equals(message.trim())){
//					if(session!=null){
//						session.getBasicRemote().sendText(messageObj("消息不可以为空哦",1));
//					}
//				}else{
//					JSONObject json=JSONObject.fromObject(message);
//					//接收人的ID
//					Object toID=json.get("toID");
//					//发送数据
//					Object obj=json.get("data");
//					//业务状态
//					int code=json.getInt("code");
//
//					Map<String, Object> reM=redisUtils.getMap("users");
//
//					if(toID==null||"".equals(toID)){//未选择对象时，群发
//
//						Map<String,Object> sokets=redisUtils.getMap("sokets3");
//						//记录发送服务器
//						if(sokets==null||sokets.size()<=0){
//							sokets=new HashMap<String,Object>();
//							for(String key:reM.keySet()){
//								if(!m.containsKey(key)){//赛选出非本地用户
//									sokets.put(reM.get(key).toString(), reM.get(key));
//								}
//							}
//						}
//						Object urlS=json.get("urlS");
//						if(urlS!=null){
//							sokets.remove(urlS.toString());
//						}
//						//给本地服务器所有人发送，并且删除掉发送名单
//						for(String key:m.keySet()){
//							Session s=m.get(key);
//							if(s!=null){
//								s.getBasicRemote().sendText(messageObj(obj.toString(),code));
//							}
//						}
//						if(sokets!=null&&sokets.size()>0){//还有值还需要发送
//							redisUtils.removeMap("sokets3");
//							redisUtils.setMap("sokets3", sokets);
//							for(String key:sokets.keySet()){
//								String url=key;
//								Map<String,String> m=new HashMap<String,String>();
//								m.put("params", messageObj(obj,code));
//								m.put("urlS", url);
//								System.out.println(HttpClientUtils.sendHttpPost(url, m, null));
//							}
//						}else{
//							redisUtils.removeMap("sokets3");
//						}
//					}else{//单发给某个对象
//						Session sessionS=m.get(toID);
//						if(sessionS!=null){
//							sessionS.getBasicRemote().sendText(messageObj(obj,code));
//						}else{
//							String url=reM.get(toID.toString()).toString();
//							Map<String,String> m=new HashMap<String,String>();
//							m.put("params",messageObj(obj,code));
//							m.put("urlS", url);
//							System.out.println(HttpClientUtils.sendHttpPost(url, m, null));
//						}
//						if(reM.get(toID)==null){
//							session.getBasicRemote().sendText(messageObj("对方暂时不在线",1));
//						}
//					}
//				}
//			}catch(Exception e){
//				if(session!=null){
//					try {
//						session.getBasicRemote().sendText(messageObj(e.getMessage(),1));
//					} catch (IOException e1) {
//						e1.printStackTrace();
//					}
//				}
//				e.printStackTrace();
//			}
//		}
//
//	}
//	@OnClose
//	public void close(Session session) throws Exception{
//		synchronized (session) {
//			if(m!=null&&m.size()>0){
//				String ID=null;
//				Map<String, Object> reM=redisUtils.getMap("users");
//				for(String key:m.keySet()){
//					if(m.get(key).getId().equals(session.getId())){
//						ID=key;
//						reM.remove(ID);
//						m.remove(key);
//					}
//				}
//				redisUtils.removeMap("users");
//				redisUtils.setMap("users",reM);
//				if(ID!=null){
//					OnMessage(messageObj(ID,7), null);
//				}
//			}
//		}
//	}
//	@OnError
//	public void onError(Session session, Throwable error) throws Exception{
//		synchronized (error) {
//			if(m!=null&&m.size()>0){
//				String ID=null;
//				Map<String, Object> reM=redisUtils.getMap("users");
//				for(String key:m.keySet()){
//					if(m.get(key).getId().equals(session.getId())){
//						ID=key;
//						reM.remove(ID);
//						m.remove(key);
//					}
//				}
//				redisUtils.removeMap("users");
//				redisUtils.setMap("users",reM);
//				if(ID!=null){
//					OnMessage(messageObj(ID,7), null);
//				}
//			}
//		}
//		error.printStackTrace();
//	}
//	/**
//	 * 
//	 * @param ID 当前人主键
//	 * @return
//	 * @throws Exception 
//	 */
//	public  Map<String,Object> getM() throws Exception {
//		Map<String, Object> reM=redisUtils.getMap("users");
//		return reM;
//	}
//	public  void setM(Map<String,Session> m) {
//		MessageUtil.m = m;
//	}


		private static  Map<String,Session> m =new ConcurrentHashMap<String,Session>();
		@OnOpen
		public void open(@PathParam("myUUID")String myUUID,Session session,EndpointConfig config){
			String strs=myUUID;
			myUUID=strs.split("@")[0];
//			String urlD=strs.split("@")[1];//根据这个做路由
			if(myUUID==null||"".equals(myUUID.trim())){
				OnMessage(messageObj("登录信息有误",5),session);
			}else{
				m.put(myUUID, session);
				this.OnMessage(messageObj(myUUID,6), null);
			}
		}
		public Session getSession(String toID){
			Object obj=m.get(toID);
			if(obj!=null){
				return (Session) obj;
			}else{
				return null;
			}
	
		}
		 /**
		 * 消息封装
		 * @param data
		 * @param code（业务类型 1：错误消息 2：系统消息 3：聊天消息 4：视频消息 5:用户列表 6 上线通知 7 下线通知）
		 * @return
		 */
		public String  messageObj(Object data,int code){
			Map<String,Object> result=new HashMap<String,Object>();
			result.put("data", data);
			result.put("code", code);
			return JSONObject.fromObject(result).toString();
		}
		/**
		 * 退出系统
		 * @param ID
		 */
		public void deleteMes(String ID){
			m.remove(ID);
			OnMessage(messageObj(ID,7), null);
		}
		
		@OnMessage
		public void OnMessage(String message, Session session){
			try{
				if(message==null||"".equals(message.trim())){
					session.getBasicRemote().sendText(messageObj("消息不可以为空哦",1));
				}else{
					JSONObject json=JSONObject.fromObject(message);
					//接收人的ID
					Object toID=json.get("toID");
					//发送数据
					Object obj=json.get("data");
					//业务状态
					int code=json.getInt("code");
					boolean bl=true;
					if(toID==null||"".equals(toID)){//未选择对象时，群发
						for(Session se:m.values()){
							se.getBasicRemote().sendText(messageObj(obj.toString(),code));
						}
					}else{//单发给某个对象
						for(String key:m.keySet()){
							if(key.equals(toID)){
								m.get(key).getBasicRemote().sendText(messageObj(obj,code));
								bl=false;
							}
						}
						if(bl){
							session.getBasicRemote().sendText(messageObj("对方暂时不在线",1));
						}
					}
				}
			}catch(Exception e){
				try {
					session.getBasicRemote().sendText(messageObj(e.getMessage(),1));
				} catch (IOException e1) {
					e1.printStackTrace();
				}
				e.printStackTrace();
			}
		}
		@OnClose
		public void close(Session session){
			if(m!=null&&m.size()>0){
				String ID=null;
				for(String key:m.keySet()){
					if(m.get(key).getId().equals(session.getId())){
						ID=key;
						m.remove(key);
					}
				}
				if(ID!=null){
					OnMessage(messageObj(ID,7), null);
				}
	
			}
		}
		@OnError
		public void onError(Session session, Throwable error){
			if(m!=null&&m.size()>0){
				String ID=null;
				for(String key:m.keySet()){
					if(m.get(key).getId().equals(session.getId())){
						ID=key;
						m.remove(key);
					}
				}
				if(ID!=null){
					OnMessage(messageObj(ID,7), null);
				}
			}
			System.out.println("发生错误"+session.getId());
//			error.printStackTrace();
		}
		  /**
		  * 
		  * @param ID 当前人主键
		  * @return
		  */
		public static Map<String,Session> getM() {
			return m;
		}
		public static void setM(Map<String,Session> m) {
			MessageUtil.m = m;
		}
}
