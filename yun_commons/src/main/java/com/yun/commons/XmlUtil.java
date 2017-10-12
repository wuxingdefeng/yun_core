package com.yun.commons;

import com.thoughtworks.xstream.XStream;
import com.yun.commons.entity.TestEntity;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;


public class XmlUtil {
	/**
	 * 构建请求对象为xml字符串
	 * @param parameters
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static String getRequestXml(Map<Object,Object> parameters){
		StringBuffer sb = new StringBuffer();
		sb.append("<xml>");
		Set es = parameters.entrySet();
		Iterator it = es.iterator();
		while(it.hasNext()) {
			Map.Entry entry = (Map.Entry)it.next();
			String k = (String)entry.getKey();
			Object v = entry.getValue();
			if ("attach".equalsIgnoreCase(k)||"body".equalsIgnoreCase(k)||"sign".equalsIgnoreCase(k)) {
				sb.append("<"+k+">"+"<![CDATA["+v+"]]></"+k+">");
			}else {
				sb.append("<"+k+">"+v+"</"+k+">");
			}
		}
		sb.append("</xml>");
		return sb.toString();
	}
	/**
	 * 获取子结点的xml
	 * @param children
	 * @return String
	 */
	@SuppressWarnings("rawtypes")
	public static String getChildrenText(List children) {
		StringBuffer sb = new StringBuffer();
		if(!children.isEmpty()) {
			Iterator it = children.iterator();
			while(it.hasNext()) {
				Element e = (Element) it.next();
				String name = e.getName();
				String value = e.getTextNormalize();
				List list = e.getChildren();
				sb.append("<" + name + ">");
				if(!list.isEmpty()) {
					sb.append(getChildrenText(list));
				}
				sb.append(value);
				sb.append("</" + name + ">");
			}
		}
		return sb.toString();
	}
	/**
	 * 解析xml,返回第一级元素键值对。如果第一级元素有子节点，则此节点的值是子节点的xml数据。
	 * @param strxml
	 * @return
	 * @throws JDOMException
	 * @throws IOException
	 */
	@SuppressWarnings("unchecked")
	public static Map<Object,Object> doXMLParse(String strxml) throws  Exception {
		strxml = strxml.replaceFirst("encoding=\".*\"", "encoding=\"UTF-8\"");
		if(null == strxml || "".equals(strxml)) {
			return null;
		}
		Map<Object,Object> m = new HashMap<Object,Object>();
		InputStream in = new ByteArrayInputStream(strxml.getBytes("UTF-8"));
		SAXBuilder builder = new SAXBuilder();
		Document doc = builder.build(in);
		Element root = doc.getRootElement();
		List<Element> list = root.getChildren();
		for(Element e:list){
			String k = e.getName();
			String v = "";
			List<Element> children = e.getChildren();
			if(children.isEmpty()) {
				v = e.getTextNormalize();
			} else {
				v =getChildrenText(children);
			}
			m.put(k, v);
		}
		//关闭流
		in.close();
		return m;
	}
	public static String setXML(String return_code, String return_msg) {
		return "<xml><return_code><![CDATA[" + return_code + "]]></return_code><return_msg><![CDATA[" + return_msg+ "]]></return_msg></xml>";
	}
	public static void main(String[] args){

		TestEntity entity=new TestEntity();
		entity.setBaseID("1");
		entity.setLogic(2);
		entity.setSymptomStr("sssss");
		XStream xstream = new XStream();
//    	Map<Object,Object> demo=new HashMap<Object,Object>();
//    	demo.put("a", "你好");
//    	demo.put("b", 11);
		String xmlStr=xstream.toXML(entity);
		System.out.println(xmlStr);

//    	String xmlStr="<xml><b>11</b><a>你好</a></xml>";
		try {
			Map<Object,Object> m=XmlUtil.doXMLParse(xmlStr);
			System.out.println(m.get("symptomStr"));
		} catch (Exception e) {
			e.printStackTrace();
		}
//    	System.out.println(XmlUtil.getRequestXml(demo));
	}
}
