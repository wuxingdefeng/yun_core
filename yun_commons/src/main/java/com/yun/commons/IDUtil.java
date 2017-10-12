package com.yun.commons;

import java.util.UUID;

public class IDUtil {
      public static String getID(){
    	  return UUID.randomUUID().toString().replaceAll("-", "");
      }
      public static void main(String[] args){
    	  System.out.println(IDUtil.getID());
      }
}
