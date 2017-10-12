package com.yun.commons.entity;
/**
 *  规则最小粒度(用于获取确认临床证据)
 * @author QB
 *
 */
public class TestEntity {

	private int logic;//逻辑 1 or 2 and

	private String symptomStr;//症状字符串 例如（头痛，眼花 多个以逗号分隔）

	private String baseID;//基数主键
	
	public int getLogic() {
		return logic;
	}
	public void setLogic(int logic) {
		this.logic = logic;
	}
	public String getSymptomStr() {
		return symptomStr;
	}
	public void setSymptomStr(String symptomStr) {
		this.symptomStr = symptomStr;
	}
	public String getBaseID() {
		return baseID;
	}
	public void setBaseID(String baseID) {
		this.baseID = baseID;
	}

}
