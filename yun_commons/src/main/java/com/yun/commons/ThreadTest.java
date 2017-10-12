package com.yun.commons;


/**
 * 测试
 * @author QB
 *
 */
public class ThreadTest {
     public static void main(String[] args) throws InterruptedException{
    	 Thread1 t1=new Thread1();
    	 for(int i=1;i<10;i++){
    		 new Thread(t1,"a"+i).start();
    	 }
//    	 new Thread(t1,"a"+1).start();
//    	 new Thread(t1,"a"+2).start();
//    	 new Thread(t1,"a"+3).start();
     }
	
}
class Thread1 implements Runnable{
	  int i=10;
	  int j=10;
	@Override
	public  void run() {
		 synchronized (this) {
				 if(i<=0){
				    //	System.out.println("�Ѿ�ûƱ��");
				    }else{
				    	System.out.println(Thread.currentThread().getName()+"###"+i--);
				    }
	     }
		 System.out.println("j###"+j--); 
		    
	}
}
