package com.yun.commons.entity;
/**
 * 极光用户实体类
 * @author QB
 *
 */
public class JGUser {
	private String username;//用户登录名
	private String password;//登陆密码
	private String appkey;//用户所属于的应用的appkey
	private String nickname;//用户昵称
	private String birthday;//生日 yyyy-MM-dd HH:mm:ss
	private int gender;//性别 0 - 未知， 1 - 男 ，2 - 女
	private String signature;//用户签名
	private String region;//用户所属地区
	private String address;//用户详细地址
	private String ctime;//用户创建时间
	private String mtime;//用户最后修改时间
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getAppkey() {
		return appkey;
	}
	public void setAppkey(String appkey) {
		this.appkey = appkey;
	}
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public String getBirthday() {
		return birthday;
	}
	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}
	public int getGender() {
		return gender;
	}
	public void setGender(int gender) {
		this.gender = gender;
	}
	public String getSignature() {
		return signature;
	}
	public void setSignature(String signature) {
		this.signature = signature;
	}
	public String getRegion() {
		return region;
	}
	public void setRegion(String region) {
		this.region = region;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getCtime() {
		return ctime;
	}
	public void setCtime(String ctime) {
		this.ctime = ctime;
	}
	public String getMtime() {
		return mtime;
	}
	public void setMtime(String mtime) {
		this.mtime = mtime;
	}

}
