package com.yun.commons;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.URLName;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.util.*;

public class MailUtil {
	//账号
	private   String sender="mengdushe@163.com";
	//授权第三方登录密码（跟邮箱登录密码不一致）
	private   String password = "qinbin123456";
	// 是否smtp认证
	private  String isAuth="true";
	//邮件服务器端口
	private  String port="25";
	//发送邮件IP
	private  String smtpServer = "smtp.163.com";
	public MailUtil() {}

	public MailUtil(String sender,String password,String isAuth,String port,String smtpServer){
		this.sender=sender;
		this.password=password;
		this.isAuth=isAuth;
		this.port=port;
		this.smtpServer=smtpServer;
	}
	/**
	 * 发送邮件
	 * @param tos （收件人列表）
	 * @param type 1:文本邮件 2:HTML 邮件
	 * @param fileNames 附件列表
	 * @param centent 邮件内容
	 * @param title 邮件标题
	 * @return
	 */
	public Map<String,Object> sendEmails(List<String> tos,int type,List<String> fileNames,String centent,String title)throws Exception{
		Map<String,Object> result=new HashMap<String,Object>();
		result.put("code", 0);
		result.put("msg", "发送成功");
		StringBuffer errorStr=new StringBuffer();
		// 配置服务器属性
		Properties proper = new Properties();
		proper.put("mail.smtp.host", smtpServer);
		proper.put("mail.smtp.auth", isAuth);
		proper.put("mail.smtp.port", port);
		proper.put("mail.transport.protocol", "smtp"); // 发邮件协议
		proper.put("mail.store.protocol", "pop3"); // 收邮件协议
		List<InternetAddress> lisRece=new ArrayList<InternetAddress>();
		InternetAddress[] receiveAddress =null;
		for(int i=0;i<tos.size();i++){
			if(tos.get(i).indexOf("@")<=0){
				errorStr.append(tos.get(i)+" :发送失败了！请检测收件人是否错误！！\r");
			}else{
				//receiveAddress[i] = new InternetAddress(tos.get(i));
				lisRece.add(new InternetAddress(tos.get(i)));
			}
		}
		if(lisRece==null||lisRece.size()<=0){
			//TODO
		}else{
			InternetAddress[] receiveAddress2 =new InternetAddress[lisRece.size()];
			receiveAddress=lisRece.toArray(receiveAddress2);
			Session session=null;
			if("true".equals(isAuth)){//需要认证
				SmtpAuth sa = new SmtpAuth();
				sa.setUserinfo(sender, password);
				session= Session.getInstance(proper, sa);
				session.setPasswordAuthentication(new URLName(smtpServer), sa.getPasswordAuthentication());
			}else{
				session=Session.getInstance(proper);
				session.setPasswordAuthentication(new URLName(smtpServer),null);
			}
			MimeMultipart mmp = new MimeMultipart();
			MimeMessage sendMess = new MimeMessage(session);
			MimeBodyPart mbp = new MimeBodyPart();
			if(type==2){
				mbp.setContent(centent, "text/html");
			}else if(type==1){
				mbp.setContent(centent, "text/plain; charset=GBK");
			}
			mmp.addBodyPart(mbp);
			sendMess.setSubject(title);
			sendMess.setContent(mmp);

			// 附件处理
			if(fileNames!=null&&fileNames.size()>0){
				for(String fileName:fileNames){
					DataSource source = new FileDataSource(fileName);
					String name = source.getName();
					mbp = new MimeBodyPart();
					mbp.setDataHandler(new DataHandler(source));
					mbp.setFileName(name);
					mmp.addBodyPart(mbp);
				}
			}
			// 发送者
			sendMess.setFrom(new InternetAddress(sender));
			//接收者
			sendMess.setRecipients(Message.RecipientType.TO, receiveAddress);
			Transport.send(sendMess);
		}
		if(errorStr!=null&&!"".equals(errorStr.toString().trim())){
			result.put("code","1");
			result.put("msg", errorStr);
		}
		return result;
	}
	public static void main(String[] args){
		MailUtil mail=new MailUtil();
		//FuWayne@qq.com
		List<String> tos=new ArrayList<String>();
//		tos.add("991236860@qq.com");
//		tos.add("979392670@qq.com");
		tos.add("1018889262@qq.com");
		List<String> fileNames=new ArrayList<String>();
		fileNames.add("D://6111a90a4a1a4fd1c0379f7f84dd745b.jpg");
		try {
			//System.out.println(mail.sendEmails(tos, 1, fileNames,"尊敬的欧先生！经过我司的初次挑选，欢迎您于2017年6月18日上午15点到我司面试", "邀请面试通知<<杭州阿里巴巴公司>>").get("msg"));
			System.out.println(mail.sendEmails(tos, 1, fileNames,"谭亚萍美女，有人在这里向你告白，想知道是谁吗？回复‘了解’就能知道哦", "告白通知邮件").get("msg"));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}   
