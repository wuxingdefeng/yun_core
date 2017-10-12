package com.yun.commons;

public class Test2 {
	 public static int count = 0;
	 
	    public static void inc() {
	        //�����ӳ�1���룬ʹ�ý������
	        try {
	            Thread.sleep(1);
	        } catch (InterruptedException e) {
	        }
	        count++;
	    }
	 
	    public static void main(String[] args) {
	        //ͬʱ����1000���̣߳�ȥ����i++���㣬����ʵ�ʽ��
	        for (int i = 0; i < 1000; i++) {
	            new Thread(new Runnable() {
	                @Override
	                public void run() {
	                	Test2.inc();
	                }
	            }).start();
	        }
	        //����ÿ�����е�ֵ���п��ܲ�ͬ,����Ϊ1000
	        System.out.println("���н��:Counter.count=" + Test2.count);
	    }
}
