package com.yun.commons;

import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.*;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;
import java.util.*;

/**
 * Excel ������
 */
public class ExcelUtil {
	/**
	 * 根据路径获取Excel并且解析出来
	 * @param path 路径
	 * @param parseM 解析器（excel 和实体类一对一的解析器 key为excel列名 value为实体字段名）
	 * @param sheetNumber 解析第几个sheet
	 * @return
	 */
	public static List<Map<String,Object>> parseExcel(String path,Map<String,Object> parseM,int sheetNumber){
		File file = null;
		InputStream input = null;
		Workbook workBook = null;
		Sheet sheet = null;
		if(path!=null&&!"".equals(path)){
			String suffix = path.substring(path.lastIndexOf("."),path.length());
			if (".xls".equals(suffix) || ".xlsx".equals(suffix)) {// 2003后缀或2007后缀
				file = new File(path);
				try {
					input = new FileInputStream(file);
				} catch (FileNotFoundException e) {
					e.printStackTrace();
				} catch (Exception e) {
					e.printStackTrace();
				}
				if(!input.markSupported()){
					input = new PushbackInputStream(input,8);
				}
				try{
					workBook = WorkbookFactory.create(input);
				} catch(IOException e){
					e.printStackTrace();
				} catch(InvalidFormatException e){
					e.printStackTrace();
				}
				try{
					if(workBook!=null){
						int numberSheet = workBook.getNumberOfSheets();
						if(numberSheet>0){
							sheetNumber-=1;
							sheet = workBook.getSheetAt(sheetNumber);//获取第一个工作簿(Sheet)的内容
							return getExcelContent(parseM,sheet);
						}else{
							System.out.println("目标表格工作簿(Sheet)数目为0！");
						}
					}
				}catch(Exception e){
					e.printStackTrace();
				}finally{
					try {
						input.close();
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			}else{
				System.out.println("非法的Excel文件后缀！");
			}
		}else{
			System.out.println("非法的文件路径!");
		}
		return null;
	}

	/**
	 * 解析(读取)Excel内容
	 * @param sheet
	 * @return
	 */
	public static List<Map<String,Object>> getExcelContent(Map<String,Object> parseM,Sheet sheet){
		List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
		int rowCount = sheet.getPhysicalNumberOfRows();//总行数
		if(rowCount>1){
			Row titleRow = sheet.getRow(0);//标题行
			for(int i=1;i<rowCount;i++){//遍历行，略过标题行，从第二行开始
				Row row = sheet.getRow(i);
				Map<String,Object> m=new HashMap<String,Object>();
				for(int j=0;j<row.getPhysicalNumberOfCells();j++){//遍历列
					Cell cell=row.getCell(j);
					if(cell!=null){
						String key=titleRow.getCell(j).getStringCellValue();
						if(parseM.containsKey(key)){
							m.put(parseM.get(key).toString(), cell);
							list.add(m);
						}
					}
				}
			}
		}
		return list;
	}

	/**
	 * 生成2003 Excel
	 */
	public static void buildXSLExcel(String Path,String FileName,Map<String,Object> titleM,List<Map<String,Object>> resultLisM,HttpServletResponse response){
		HSSFWorkbook workBook = null;
		List<String> cellTitle = new ArrayList<String>();
		List<String> TitleLis=new ArrayList<String>();
		if(titleM!=null){
			if(resultLisM!=null&&resultLisM.size()>0){
				for(String key: titleM.keySet()){
					cellTitle.add(key);
					TitleLis.add(titleM.get(key).toString());
				}
				try {
					workBook = new HSSFWorkbook();//创建工作薄
					HSSFSheet sheet = workBook.createSheet();
					//workBook.setSheetName(0, "工作簿名称");//工作簿名称
					HSSFFont font = workBook.createFont();
					font.setColor(HSSFFont.COLOR_NORMAL);
					font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
					HSSFCellStyle cellStyle = workBook.createCellStyle();//创建格式
					cellStyle.setFont(font);
					cellStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
					cellStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
					//创建第一行标题
					HSSFRow titleRow = sheet.createRow((short) 0);//第一行标题
					for(int i = 0; i <  cellTitle.size(); i++){//创建第1行标题单元格
						sheet.setColumnWidth(i,5000);
						sheet.autoSizeColumn(i);
						HSSFCell cell = titleRow.createCell(i,0);
						cell.setCellStyle(cellStyle);
						cell.setCellValue(cellTitle.get(i));
					}
					HSSFCellStyle style = workBook.createCellStyle();//创建格式
					int i=0;
					for(Map<String,Object> m:resultLisM){
						HSSFRow row = sheet.createRow((short) i+1);
						for(int k=0;k<TitleLis.size();k++){
							Object obj=m.get(TitleLis.get(k));
							if(obj==null){
								obj="--";
							}
							HSSFCell cell = row.createCell(k);
							cell.setCellValue(obj.toString());
							style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
							cell.setCellStyle(style);
						}
						i++;
					}
					File file = new File(Path+FileName+".xls");
					if(response!=null){
						response.setContentType("application/application/vnd.ms-excel");
						response.setHeader("Content-disposition","attachment;filename=" + URLEncoder.encode(FileName + ".xls", "UTF-8"));
						OutputStream outStream=response.getOutputStream();
						workBook.write(outStream);
						outStream.flush();
						outStream.close();
					}else{
						FileOutputStream outStream= new FileOutputStream(file);
						workBook.write(outStream);
						outStream.flush();
						outStream.close();
					}
				}catch(Exception e){
					e.printStackTrace();
				}
			}
		}
	}

	/**
	 * 生成2007 Excel
	 */
	public static void buildXSLXExcel(String Path,String FileName,Map<String,Object> titleM,List<Map<String,Object>> resultLisM,HttpServletResponse response){
		XSSFWorkbook workBook = null;
		List<String> cellTitle = new ArrayList<String>();
		List<String> TitleLis=new ArrayList<String>();
		if(titleM!=null){
			if(resultLisM!=null&&resultLisM.size()>0){
				for(String key: titleM.keySet()){
					cellTitle.add(key);
					TitleLis.add(titleM.get(key).toString());
				}
				try {
					workBook = new XSSFWorkbook();//创建工作薄
					XSSFSheet sheet = workBook.createSheet();
					XSSFFont font = workBook.createFont();
					font.setColor(HSSFFont.COLOR_NORMAL);
					font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
					XSSFCellStyle cellStyle = workBook.createCellStyle();//创建格式
					cellStyle.setFont(font);
					cellStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
					cellStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
					//创建第一行标题
					XSSFRow titleRow = sheet.createRow((short) 0);//第一行标题
					for(int i = 0; i <  cellTitle.size(); i++){//创建第1行标题单元格
						sheet.setColumnWidth(i, 5500);
//						sheet.autoSizeColumn(i);
						sheet.setDefaultRowHeight((short) 500);
						XSSFCell cell = titleRow.createCell(i,0);
						cell.setCellStyle(cellStyle);
						cell.setCellValue(cellTitle.get(i));
					}
					XSSFCellStyle style = workBook.createCellStyle();//创建格式
					int i=0;
					for(Map<String,Object> m:resultLisM){
						XSSFRow row = sheet.createRow((short) i+1);
						for(int k=0;k<TitleLis.size();k++){
							Object obj=m.get(TitleLis.get(k));
							if(obj==null){
								obj="--";
							}
							XSSFCell cell = row.createCell(k);
							cell.setCellValue(obj.toString());
							style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
							style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
							cell.setCellStyle(style);
						}
						i++;
					}
					File file = new File(Path+FileName+".xlsx");
					if(response!=null){
						response.setContentType("application/application/vnd.ms-excel");
						response.setHeader("Content-disposition","attachment;filename=" + URLEncoder.encode(FileName + ".xlsx", "UTF-8"));
						OutputStream outStream=response.getOutputStream();
						workBook.write(outStream);
						outStream.flush();
						outStream.close();
					}else{
						FileOutputStream outStream= new FileOutputStream(file);
						workBook.write(outStream);
						System.out.println("完成");
						outStream.flush();
						outStream.close();
					}
				}catch(Exception e){
					e.printStackTrace();
				}
			}
		}
	}

	public static void main(String[] args){

		/*******************************测试导入Excel 开始********************************/
		//解析器
//		Map<String,Object> parseM=new HashMap<String,Object>();
//		parseM.put("医生主键","doctor_id");
//		parseM.put("姓名", "doctor_name");
//		parseM.put("擅长", "shanchang");
//		parseM.put("擅长疾病主键", "shanchang_id");
//
//		List<Map<String,Object>> listm=ExcelUtil.parseExcel("d://test.xlsx",parseM,2);
//		System.out.print(listm);
		/*******************************测试导入Excel 结束********************************/

		/*******************************测试导出Excel 开始********************************/
		//导出格式
		Map<String,Object> titleM=new TreeMap<String,Object>();
		titleM.put("姓名", "name");
		titleM.put("年龄", "age");
		titleM.put("生日", "birthday");
		titleM.put("金额", "money");

		//导出数据
		List<Map<String,Object>> resultListM=new ArrayList<Map<String,Object>>();

		Map<String,Object> userM1=new HashMap<String,Object>();
		userM1.put("name", "张三");
		userM1.put("age", "25岁");
		userM1.put("birthday", "2017-05-23 17:23:34");
		userM1.put("money", 12.6);

		Map<String,Object> userM2=new HashMap<String,Object>();
		userM2.put("name", "李四和士大夫撒旦飞洒发斯蒂芬是范德萨的发案发时打发啊");
		userM2.put("age", "28岁");
		userM2.put("birthday", "2018-07-32 19:43:34");
		userM2.put("money", 18.6);

		resultListM.add(userM1);
		resultListM.add(userM2);

		ExcelUtil.buildXSLXExcel("d://", "demo2", titleM, resultListM, null);
		/*******************************测试导出Excel 结束********************************/

	}
}
