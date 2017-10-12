package com.yun.commons;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.List;

/**
 * 文件上传工具
 */
public class MyFileUtil {
	/**
	 * 多部分上传文件
	 * @param request
	 * @param destPath
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public static Object uploadFile(HttpServletRequest request,String destPath) throws Exception{
		request.setCharacterEncoding("utf-8");
		//使用Apache文件上传组件处理文件上传步骤：
		//1、创建一个DiskFileItemFactory工厂
		DiskFileItemFactory factory=new DiskFileItemFactory();
		//2、创建一个文件上传解析器
		ServletFileUpload upload=new ServletFileUpload(factory);
		//解决上传文件名的中文乱码
		upload.setHeaderEncoding("UTF-8");
		List<FileItem> items=upload.parseRequest(request);
		StringBuffer sb=new StringBuffer();

		String bash=System.getProperty("user.dir").replace("bin", "webapps");
		StringBuffer cPath=new StringBuffer("/yunCoreUpload/"+destPath+"/");
		cPath.append(DateUtil.getDateFormats(DateUtil.date2,null));
		File dirFile=new File(bash,cPath.toString());
		if(!dirFile.exists()){
			dirFile.mkdirs();
		}
		for(FileItem item:items){
			if(!item.isFormField()){//文件

				//上传文件名称
				String filename=item.getName();
				//处理文件名的绝对路径问题
				int index=filename.lastIndexOf("\\");
				if(index!=-1){
					filename=filename.substring(index+1);
				}
				//文件添加uuid前缀，处理同名问题
				String savename=UUIDUtil.getUUid()+"_"+filename;

				File destFile=new File(dirFile,savename);
				item.write(destFile);

				sb.append(cPath.toString()).append("/"+savename).append(",");
			}
		}
		if(sb!=null&&sb.length()>0){
			sb.deleteCharAt(sb.length()-1);
			return sb.toString();
		}
		return null;
	}
	@SuppressWarnings("unchecked")
	public static Object uploadImgFile(HttpServletRequest request,String destPath) throws Exception{
		request.setCharacterEncoding("utf-8");
		DiskFileItemFactory factory=new DiskFileItemFactory();
		ServletFileUpload upload=new ServletFileUpload(factory);
		upload.setHeaderEncoding("UTF-8");
		List<FileItem> items=upload.parseRequest(request);
		StringBuffer sb=new StringBuffer();
		String bash=System.getProperty("user.dir").replace("bin", "webapps");
		//原
		StringBuffer cPath=new StringBuffer("/yunCoreUpload/"+destPath+"/");
		//压缩后
		StringBuffer cPathS=new StringBuffer("/imageS/"+destPath+"/");

		String dateName=DateUtil.getDateFormats(DateUtil.date2,null);

		cPath.append(dateName);
		cPathS.append(dateName);

		File dirFile=new File(bash,cPath.toString());
		File dirFileS=new File(bash,cPathS.toString());
		if(!dirFile.exists()){
			dirFile.mkdirs();
		}

		if(!dirFileS.exists()){
			dirFileS.mkdirs();
		}

		for(FileItem item:items){
			if(!item.isFormField()){//文件
				String filename=item.getName();
				int index=filename.lastIndexOf("\\");
				if(index!=-1){
					filename=filename.substring(index+1);
				}
				String savename=UUIDUtil.getUUid()+"_"+filename;

				File destFile=new File(dirFile,savename);
				File destFileS=new File(dirFileS,savename);
				item.write(destFile);
				int angel=ImageUtil.getAngel(destFile);
				if(angel>0){
					ImageUtil.imageFn(destFile, angel);
				}
				ImageUtil.zoomImageS(destFile, destFileS.getPath(), 0, 0);
				//返回压缩后的图片
				sb.append(cPathS.toString()).append("/"+savename).append(",");
			}
		}
		if(sb!=null&&sb.length()>0){
			sb.deleteCharAt(sb.length()-1);
			return sb.toString();
		}
		return null;
	}

	//
	public static void main(String[] args){
		StringBuffer sb=new StringBuffer();
		sb.append("23432,");
		System.out.println(sb.deleteCharAt(sb.length()-1));
	}
}
