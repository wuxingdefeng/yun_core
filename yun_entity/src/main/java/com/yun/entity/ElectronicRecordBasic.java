package com.yun.entity;
import java.util.Date;
   /**
    * 病历表
    * electronic_record_basic
    */ 
public class ElectronicRecordBasic extends BaseEntity{
	private String record_id;
	private String user_name;
	private String user_sex;
	private String user_age;
	private Date user_birthday;
	private String user_rmarrige;
	private String user_job;
	private String user_phone;
	private String user_long_address;
	private String user_postal_address;
	private String uncomfortable_place;
	private Date write_date;
	private Date create_date;
	private String create_by;
	private Date del_date;
	private int is_del;
	private String del_by;
	private String record_num;
	private String remarks;
	private String user_id;//用户主键
	//下面非表中数据
	private String user_birthday_string;
	private String jsondata;
	private String htmldata;	
	
	private String searchName;//插叙你条件姓名或手机号码模糊查询
	public void setRecord_id(String record_id){
		this.record_id=record_id;
	}
	public String getRecord_id(){
		return record_id;
	}
	public void setUser_name(String user_name){
		this.user_name=user_name;
	}
	public String getUser_name(){
		return user_name;
	}
	public void setUser_sex(String user_sex){
		this.user_sex=user_sex;
	}
	public String getUser_sex(){
		return user_sex;
	}
	public void setUser_age(String user_age){
		this.user_age=user_age;
	}
	public String getUser_age(){
		return user_age;
	}
	public void setUser_birthday(Date user_birthday){
		this.user_birthday=user_birthday;
	}
	public Date getUser_birthday(){
		return user_birthday;
	}
	public void setUser_rmarrige(String user_rmarrige){
		this.user_rmarrige=user_rmarrige;
	}
	public String getUser_rmarrige(){
		return user_rmarrige;
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
	public void setUser_postal_address(String user_postal_address){
		this.user_postal_address=user_postal_address;
	}
	public String getUser_postal_address(){
		return user_postal_address;
	}
	public void setUncomfortable_place(String uncomfortable_place){
		this.uncomfortable_place=uncomfortable_place;
	}
	public String getUncomfortable_place(){
		return uncomfortable_place;
	}
	public void setWrite_date(Date write_date){
		this.write_date=write_date;
	}
	public Date getWrite_date(){
		return write_date;
	}
	public void setCreate_date(Date create_date){
		this.create_date=create_date;
	}
	public Date getCreate_date(){
		return create_date;
	}
	public void setCreate_by(String create_by){
		this.create_by=create_by;
	}
	public String getCreate_by(){
		return create_by;
	}
	public void setDel_date(Date del_date){
		this.del_date=del_date;
	}
	public Date getDel_date(){
		return del_date;
	}
	public void setIs_del(int is_del){
		this.is_del=is_del;
	}
	public int getIs_del(){
		return is_del;
	}
	public void setDel_by(String del_by){
		this.del_by=del_by;
	}
	public String getDel_by(){
		return del_by;
	}
	public void setRecord_num(String record_num){
		this.record_num=record_num;
	}
	public String getRecord_num(){
		return record_num;
	}
	public void setRemarks(String remarks){
		this.remarks=remarks;
	}
	public String getRemarks(){
		return remarks;
	}
	public String getUser_birthday_string() {
		return user_birthday_string;
	}
	public void setUser_birthday_string(String user_birthday_string) {
		this.user_birthday_string = user_birthday_string;
	}
	public String getJsondata() {
		return jsondata;
	}
	public void setJsondata(String jsondata) {
		this.jsondata = jsondata;
	}
	public String getHtmldata() {
		return htmldata;
	}
	public void setHtmldata(String htmldata) {
		this.htmldata = htmldata;
	}
	public String getSearchName() {
		return searchName;
	}
	public void setSearchName(String searchName) {
		this.searchName = searchName;
	}
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	
}
