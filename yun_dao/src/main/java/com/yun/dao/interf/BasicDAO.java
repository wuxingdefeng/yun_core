package com.yun.dao.interf;

import java.util.List;
import java.util.Map;

//基础类
public interface BasicDAO<T> {
    //保存单个
	public void save(T t);
	//批量对象保存
	public void saveListObj(List<T> lis);
	//批量List<Map>保存
	public void saveListMap(List<Map<String, Object>> lismap);
	//修改单个
	public void update(T t);
	//动态修改Map
	public void updateMap(Map<String, Object> params);
	//根据某个字段获取单个对象
	public T getObject(Map<String, Object> params);
	//根据某个字段获取单个Map
	public Map<String,Object> getMapObj(Map<String, Object> params);
	//根据某个字段获取集合对象
	public List<T> getListObject(Map<String, Object> params);
	//根据某个字段获取集合Map
	public List<Map<String,Object>> getListMap(Map<String, Object> params);
	//判断某个字段是否存在
	public int getObjectExists(Map<String, Object> params);
	//获取分页的数据集
	public List<Map<String,Object>> getPageData(Map<String, Object> params);
	//获取分页的总数量
	public int getPageCount(Map<String, Object> params);
	//物理删除数据
	public int delete(Map<String, Object> params);
	//假删除数据
	public int deleteBash(Map<String, Object> params);
}
