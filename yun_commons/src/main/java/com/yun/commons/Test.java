package com.yun.commons;

import java.math.BigInteger;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;

public class Test {
	public static String test(String intStr){
		BigInteger num = new BigInteger(intStr);  
		num = num.setBit(2);  
		num = num.setBit(1);  
		num=num.setBit(3);
		System.out.println("test:"+num);
		return num.toString();
	}
	public static void test2(){
		Queue<String> queue = new LinkedList<String>();
		//    	 Queue<Map<String,Object>> queue2= new LinkedList<Map<String,Object>>(); 
		//���Ԫ��
		queue.offer("a");
		queue.offer("b");
		queue.offer("c");
		queue.offer("d"); 
		queue.offer("e");
		for(String q : queue){
			System.out.println(q);
		}
		System.out.println("===");
		System.out.println("���ص�һ��Ԫ�أ����ڶ�����ɾ�� poll="+queue.poll()); 
		for(String q : queue){
			System.out.println(q);
		}
		System.out.println("===");
		System.out.println("���ص�һ��Ԫ��  element="+queue.element()); 
		for(String q : queue){
			System.out.println(q);
		}
		System.out.println("===");
		System.out.println("���ص�һ��Ԫ�� peek="+queue.peek());
		for(String q : queue){
			System.out.println(q);
		}
	}
	//��λ��
	private static void swap(String[] str, int i, int j){  
		String temp=str[i];  
		str[i] = str[j];  
		str[j] = temp;  
	}
	//�������
	private static void arrange (String[] str, int st, int len,List<String> lisStr){  
		if (st == len - 1){  
			StringBuffer sb=new StringBuffer();
			for (int i = 0; i < len; i ++){  
				sb.append(str[i]).append("��");  
			} 
			lisStr.add(sb.deleteCharAt(sb.length()-1).toString());
		}else{  
			for(int i = st; i < len; i ++){  
				swap(str, st, i);  
				arrange(str, st + 1, len,lisStr);  
				swap(str, st, i);  
			}  
		}  
	}
	public static void Piao(){
//		String url="http://www.chepiao100.com/api/yupiao";
		String url="http://www.chepiao100.com/application/views/statics/doc/demo/yupiao.php";
		Map<String,Object> headerMap=new HashMap<String,Object>();
		headerMap.put("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
		Map<String,String> paramMap=new HashMap<String,String>();
		paramMap.put("userid", "991236860@qq.com");
		paramMap.put("seckey", "832ae2d3d659decbc18a8fffc3da9de2");//��Կ
		paramMap.put("date", "2017-06-15");
		paramMap.put("startStation", "����");
		paramMap.put("arriveStation", "����");
		
		try {
			System.out.println(HttpClientUtils.sendHttpsGet(url, paramMap, headerMap, "utf-8"));
//			System.out.println(HttpClientUtils.sendHttpPost(url, paramMap, headerMap));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public static void main(String[] args) throws UnknownHostException{
//		String str[] = {"��","��","��","̵"};  
//		List<String> lis=new ArrayList<String>();
//		arrange(str, 0, str.length,lis);
//		System.out.println(lis.contains("�硢��"));
//		System.out.println(lis.contains("�硢�����ȡ�̵")+"#####"+lis.size());
		//for(String key:lis){
		//   System.out.println(key);
		//         }
		//        try {
		//			System.out.println(new String("�Q".getBytes(),"utf-8"));
		//		} catch (UnsupportedEncodingException e) {
		//			// TODO Auto-generated catch block
		//			e.printStackTrace();
		//		}
		//    	test("1");
		//    	test2();
		//    	BigInteger num =new BigInteger("1");
		//        System.out.println(num);
		//        System.out.println(num.testBit(2));  
		//        System.out.println(num.testBit(1));  
		//        System.out.println(num.testBit(3));  

		//��ȡ��������IP��ַ����  
//		        InetAddress ip = InetAddress.getLocalHost();  
//		  
//		        //��ȡ����������IP��ַ����  
//		        InetAddress ip2 = InetAddress.getByName("121.43.233.145");  
//		        //ͨ��ָ��������������IP��ַ����  
//		        InetAddress.getByName("chen-pc");  
		  
		        //��ӡIP��ַ�ַ���  
//		        System.out.println(ip.getHostAddress());  
		        //��ӡIP��ַ���������ַ���  
//		        System.out.println(ip.getHostName());  
		        
//		        System.out.println("ip@-------"+ip2.getHostName());
		//  
		//        //ͨ����������ȡ�������е�IP��ַ  
		        InetAddress[] allByName = InetAddress.getAllByName("taobao.com");  
		        for (InetAddress inet : allByName) {  
		            System.out.println(inet.getHostAddress());  
		        }  
	}
}
