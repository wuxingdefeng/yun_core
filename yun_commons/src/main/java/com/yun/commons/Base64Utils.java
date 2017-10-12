package com.yun.commons;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

import Decoder.BASE64Decoder;
import Decoder.BASE64Encoder;


public class Base64Utils {
	public static String jiaMi(String str) throws UnsupportedEncodingException{
    	return new BASE64Encoder().encodeBuffer(str.getBytes("utf-8")); 
    }
    public static String jieMi(String str){  
    	try {
			return new String(new BASE64Decoder().decodeBuffer(str),"utf-8");
		} catch (IOException e) {
			e.printStackTrace();
		    return null;
		}
    }
    public static void main(String[] args) throws UnsupportedEncodingException{
    	String testStr="eyJ1c2VyTmFtZSI6IuWRqOadsOS8piIsInVzZXJTZXgiOiLlpbMiLCJ1c2VyQWdlIjoiMCIsInRlbGVwaG9uZSI6IjM0NTY1NTQzMiIsImFkZHJlc3MiOiLplb/mnJ/lsYXkvY/lnLDlnYAiLCJ0b2tlbiI6IjJiNmJhNzg2NzkyNTQyMzJhN2IxZjgwNThlYzZhMmFiIiwidXNlcklEIjoiMmUwNDRiMDM0NTI0NGMxNmFlODM0YWQ1Njg0YWVmZjUifQ==";
    	System.out.println(jieMi(testStr));
    	
//    	String arch = System.getProperty("os.arch");
//    	String os= System.getProperty("os.name");
//
//    	System.out.println(arch);
//    	System.out.println(os); 
    }
}
