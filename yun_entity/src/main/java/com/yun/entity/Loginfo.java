package com.yun.entity;
   /**
    * 日志信息
    * LogInfo
    */ 
public class Loginfo extends BaseEntity{
	private String ID;
	private String CLIENT_IP;
	private String METHOD_DESC;
	private String CLASS_METHOD;
	private String PARAMS;
	private String ADMIN_NAME;
	private String ADMIN_ID;
	public void setID(String ID){
		this.ID=ID;
	}
	public String getID(){
		return ID;
	}
	public void setCLIENT_IP(String CLIENT_IP){
		this.CLIENT_IP=CLIENT_IP;
	}
	public String getCLIENT_IP(){
		return CLIENT_IP;
	}
	public void setMETHOD_DESC(String METHOD_DESC){
		this.METHOD_DESC=METHOD_DESC;
	}
	public String getMETHOD_DESC(){
		return METHOD_DESC;
	}
	public void setCLASS_METHOD(String CLASS_METHOD){
		this.CLASS_METHOD=CLASS_METHOD;
	}
	public String getCLASS_METHOD(){
		return CLASS_METHOD;
	}
	public void setPARAMS(String PARAMS){
		this.PARAMS=PARAMS;
	}
	public String getPARAMS(){
		return PARAMS;
	}
	public void setADMIN_NAME(String ADMIN_NAME){
		this.ADMIN_NAME=ADMIN_NAME;
	}
	public String getADMIN_NAME(){
		return ADMIN_NAME;
	}
	public void setADMIN_ID(String ADMIN_ID){
		this.ADMIN_ID=ADMIN_ID;
	}
	public String getADMIN_ID(){
		return ADMIN_ID;
	}
}
