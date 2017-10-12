package com.yun.commons.entity;

import org.json.simple.JSONArray;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 测试确认基数
 * @author QB
 *
 */
public class TestEntityMain {
	public static void main(String[] args){
		testGetZS();
	}
	/**
	 * 测试获取临床证据的真实度
	 */
	public static void testGetZS(){

		/*************创建基数规则开始************/
		/**
		 * 一般基数有多个规则
		 */
//		List<Map<String,Object>> listM=new ArrayList<Map<String,Object>>();
//		Map<String,Object> m1=new HashMap<String,Object>();
//		m1.put("logic",1);//1 或者 2与
//		m1.put("symptomStr", "纳差");
//		//m1.put("isFlog", "a");//一般不需要 只有有几个之间是组合或者关系时需要
//		listM.add(m1);
		/*************创建基数规则结束************/
//		String str="[{\"name\":\"JSON\",\"age\":\"24\",\"address\":\"北京市西城区\"}]";
		String str="[{\"symptomStr\":\"舌紫,舌紫气\",\"logic\":1},{\"symptomStr\":\"舌暗\",\"logic\":1},{\"symptomStr\":\"舌暗淡\",\"logic\":1},{\"symptomStr\":\"脉涩\",\"logic\":1},{\"symptomStr\":\"脉结,脉代\",\"logic\":1},{\"symptomStr\":\"胸痛\",\"logic\":1},{\"symptomStr\":\"脉滞\",\"logic\":1}]";
		//获取到的症状数据（测试数据）
		List<Map<String,Object>> listM=(List<Map<String, Object>>)net.sf.json.JSONArray.toList(net.sf.json.JSONArray.fromObject(str), Map.class);
//		String[] sels={"舌淡","舌胖","脉细","脉弱","便溏"};
		String[] sels={"舌紫","舌紫气","舌暗"};


//
		System.out.println("当前基数规则JSON串："+ JSONArray.toJSONString(listM));
		System.out.println("当前基数热的权重："+TestEntityMain.getCount(listM, sels));
	}
	/**
	 * 根据当前提交的症状数据获取某个基数的症状强度（获取真实的临床证据）
	 * @param lisM 当前基数规则集合
	 * @param sympotmArrs 当前选中的选项
	 * @return
	 */
	public static Object getCount(List<Map<String,Object>> lisM,String[] sympotmArrs){
		if(lisM!=null&&lisM.size()>0&&sympotmArrs!=null&&sympotmArrs.length>0){
			int weight=0;//选中占用规则的权重
			//当前选中集合
			Map<String,Object> hash=new HashMap<String,Object>();
			//记录组合情况 只适用于或者
			Map<String,Integer> existsM=new HashMap<String,Integer>();

			for(String sym:sympotmArrs){
				hash.put(sym, sym);
			}
			/************开始遍历规则*************/
			for(Map<String,Object> m:lisM){
				//当前规则的比较方式（1：或者 2：与）
				int bl=Integer.parseInt(m.get("logic").toString());
				Object obj=m.get("symptomStr");
				//组合成员之间给与一样的值（每一组成员不能一样，一组必须保持一致）
				Object isFlog=m.get("isFlog");
				int count=0;//统计当前规则的指标
				if(obj!=null){
					String[] arrs=obj.toString().split(",");
					for(String str:arrs){
						if(hash.containsKey(str)){
							count+=1;
						}
					}
					if(bl==1){//逻辑或者
						if(count>0){
							weight+=1;
						}
					}else{//逻辑与
						if(count==arrs.length){
							weight+=1;
						}
					}
				}
				if(null!=isFlog){//组合计算权重
					String flog=isFlog.toString();
					if(existsM.containsKey(flog)){
						int existsNum=Integer.parseInt(existsM.get(flog).toString());
						existsM.put(flog,existsNum+=1);
					}else{
						existsM.put(flog,0);
					}
				}
			}
			//有组合时需要减去
			if(null!=existsM&&existsM.size()>0){
				for(String key:existsM.keySet()){
					weight-=Integer.parseInt(existsM.get(key).toString());
				}
			}
			/************结束遍历规则*************/
			return  weight;
		}else{
			return 0;
		}

	}
}
