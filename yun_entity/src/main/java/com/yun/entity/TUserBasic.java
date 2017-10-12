package com.yun.entity;
import java.io.Serializable;
import java.util.Date;
   /**
    * 用户表
    * t_user_basic
    */ 
public class TUserBasic extends BaseEntity implements Serializable{
	private String user_id;
	private String user_name;
	private int user_sex;//1：男2：女
	private Date user_birthday;//出生日期
	private int user_age;//年龄
	private int user_marrige; //婚否1：已婚 2：未婚
	private String user_job;//职业
	private String user_phone;//联系方式
	private String user_long_address;//长期居住地址
	private String user_communication_address;// 通讯地址
	private String create_by;
	private Date create_date;
	private String update_by;
	private Date update_date;
	private String del_date;
	private Date is_del;
	private String user_name_first;//姓名拼音首字母
	
	//字符串
	private String user_birthday_Str;
	
	public void setUser_id(String user_id){
		this.user_id=user_id;
	}
	public String getUser_id(){
		return user_id;
	}
	public void setUser_name(String user_name){
		this.user_name=user_name;
	}
	public String getUser_name(){
		return user_name;
	}
	public void setUser_sex(int user_sex){
		this.user_sex=user_sex;
	}
	public int getUser_sex(){
		return user_sex;
	}
	public void setUser_birthday(Date user_birthday){
		this.user_birthday=user_birthday;
	}
	public Date getUser_birthday(){
		return user_birthday;
	}
	public void setUser_age(int user_age){
		this.user_age=user_age;
	}
	public int getUser_age(){
		return user_age;
	}
	public void setUser_marrige(int user_marrige){
		this.user_marrige=user_marrige;
	}
	public int getUser_marrige(){
		return user_marrige;
	}
	public void setUser_job(String user_job){
		this.user_job=user_job;
	}
	public String getUser_job(){
		return user_job;
	}
	public void setUser_phone(String user_phone){
		this.user_phone=user_phone;
	}
	public String getUser_phone(){
		return user_phone;
	}
	public void setUser_long_address(String user_long_address){
		this.user_long_address=user_long_address;
	}
	public String getUser_long_address(){
		return user_long_address;
	}
	public void setUser_communication_address(String user_communication_address){
		this.user_communication_address=user_communication_address;
	}
	public String getUser_communication_address(){
		return user_communication_address;
	}
	public void setCreate_by(String create_by){
		this.create_by=create_by;
	}
	public String getCreate_by(){
		return create_by;
	}
	public void setCreate_date(Date create_date){
		this.create_date=create_date;
	}
	public Date getCreate_date(){
		return create_date;
	}
	public void setUpdate_by(String update_by){
		this.update_by=update_by;
	}
	public String getUpdate_by(){
		return update_by;
	}
	public void setUpdate_date(Date update_date){
		this.update_date=update_date;
	}
	public Date getUpdate_date(){
		return update_date;
	}
	public void setDel_date(String del_date){
		this.del_date=del_date;
	}
	public String getDel_date(){
		return del_date;
	}
	public void setIs_del(Date is_del){
		this.is_del=is_del;
	}
	public Date getIs_del(){
		return is_del;
	}
	public String getUser_birthday_Str() {
		return user_birthday_Str;
	}
	public void setUser_birthday_Str(String user_birthday_Str) {
		this.user_birthday_Str = user_birthday_Str;
	}
	public String getUser_name_first() {
		return user_name_first;
	}
	public void setUser_name_first(String user_name_first) {
		this.user_name_first = user_name_first;
	}
	
}
