package com.yun.commons;

import java.io.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSetMetaData;
import java.util.Date;

/**
 * 代码生成类
 * @author QB
// *
 */
public class CreateCode {
	private String sqlName="ck_core";//数据库名称
	private static final String URL ="jdbc:mysql://121.43.233.145:3306/";//数据路路径
	private static final String NAME = "dev";  //用户名
	private static final String PASS = "dev";  //密码
	private static final String DRIVER ="com.mysql.jdbc.Driver";
	//需要修改的地方开始
	private static final String tablename = "t_user_basic";//表名称
	private static final String class_desc="用户表";//表描述（类描述）
	private String entity_ids="user_id";//表主键
	//需要修改的地方结束
	private static final String TemplatePath="yun_commons/src/common/code";//代码模板路径

	private static final String ServicePath="yun_services/src/com/service/inter";//service   口路径
	private static final String ServiceImplPath="yun_services/src/com/service/impl";//Service 接口实现路径

	private static final String DAOPath="yun_dao/src/com/dao/interf";//dao接口路径
	private static final String DAOImplPath="yun_dao/src/com/dao/impl";//dao接口实现路径
	private static final String SQLMapPath="yun_dao/src/mybatis-config.xml";//sqlMap路径(定义别名)
	private static final String SQLXML="yun_dao/src/com/dao/mapper";//SQL xml文件路径

	private static final String entityPath="yun_entity/src/com/entity";//实体路径
	private static final String entityPagePath="com.entity";//实体包路径

	private static final String ControllerPath="yun_core/src/com/core/controller";//控制器路径
	private static final String PagePath="yun_core/WebRoot/WEB-INF/view";//页面路径
	private static final String JsPath="yun_core/WebRoot/static/my/system";//js路径
//	private static final String CssPath="yun_core/WebRoot/static/my/system";//css路径

	private static final String extendsClass="BaseEntity";//继承类 这里用token做父表

	private String[] colnames; //列名数组
	private String[] colTypes;//列类型数组
	private int[] colSizes; //列名大小数组

	private boolean  f_util=false;
	private boolean f_sql=false;
	private  StringBuffer selSQL=new StringBuffer("select ");//最基础的查询语句
	private  StringBuffer updSQL=new StringBuffer("update  "+tablename+" set ");//最基础的修改语句
	private  StringBuffer insSQL=new StringBuffer("insert  into "+tablename+" (");//最基础的修改语句
	private StringBuffer insSQLValue=new StringBuffer();//单个插入SQL
	private StringBuffer insListSQL=new StringBuffer("insert  into "+tablename+" (");//批量插入SQL
	private StringBuffer insSQLListValue=new StringBuffer("<foreach collection=\"list\" item=\"item\" index=\"index\" separator=\",\" >\n\t\t\t(");

	public static void main(String[] args){
		CreateCode code=new CreateCode();
		code.sqlUtil();
		String className=code.indexCap(CamelCaseUtils.toCamelCase(tablename));
		//创建实体数据
		//code.parse();
		code.createFile(entityPath+"/"+className+".java", code.parse(), false);
		//创建Mybatis配置信息
		code.createFile(SQLMapPath, code.getMybatisConfig(SQLMapPath), true);
		//创建SQL数据
		code.createFile(SQLXML+"/"+className+".xml", code.getDaoMappXML(TemplatePath+"/DaoMapper.xml"), false);
		//创建Dao实现类数据
		code.createFile(DAOImplPath+"/"+className+"DaoImpl.java",code.getDaoImpl(TemplatePath+"/DaoImpl.xml"), false);
		//创建Dao接口数据
		code.createFile(DAOPath+"/"+className+"DaoInter.java",code.getDaoInter(TemplatePath+"/DaoInter.xml"), false);
		//创建Service接口数据
		code.createFile(ServicePath+"/"+className+"ServiceInter.java",code.getServiceInter(TemplatePath+"/ServiceInter.xml"), false);
		//创建Service实现接口数据
		code.createFile(ServiceImplPath+"/"+className+"ServiceImpl.java",code.getServiceImpl(TemplatePath+"/ServiceImpl.xml"), false);
		//TODO 创建控制器 创建基础页面 创建js 创建css
		//创建控制器
		code.createFile(ControllerPath+"/"+className+"Controller.java", code.getController(TemplatePath+"/Controller.xml"), false);
		//创建LIST页面
		code.createRootFile(PagePath+"/"+className.toLowerCase(), code.getList(TemplatePath+"/list.xml"), "list.jsp");
		//创建JS
		code.createRootFile(JsPath, code.getJS(TemplatePath+"/js.xml"), className.toLowerCase()+".js");
		//创建新增或修改
		code.createRootFile(PagePath+"/"+className.toLowerCase(), code.getAddOrUpdate(TemplatePath+"/addOrupdate.xml"), "addOrUpdate.jsp");
	}
	//返回新增或者修改数据
	public String getAddOrUpdate(String file){
		String content=getFileContent(file);
		String className=indexCap(CamelCaseUtils.toCamelCase(tablename));
		content=content.replaceAll("cLASSNAME", className.toLowerCase());
		content=content.replaceAll("IDS", entity_ids);
		StringBuffer sb=new StringBuffer();
		for(String colsName:colnames){
			if(!colsName.equals(entity_ids)){
				sb.append("\n\t\t\t\t\t<tr ><th>"+colsName+":</th>");
				sb.append("\n\t\t\t\t\t\t<td><input type=\"text\" name=\""+colsName+"\" value='\\${"+className.toLowerCase()+"."+colsName+"}' class=\"easyui-validatebox\" data-options=\"required:true\" ></td>");
				sb.append("\n\t\t\t\t\t</tr>");
			}
		}
		content=content.replaceAll("LIST", sb.toString());
		return content;
	}
	//返回JS数据
	public String getJS(String file){
		String content=getFileContent(file);
		String className=indexCap(CamelCaseUtils.toCamelCase(tablename));
		//创建CSS文件夹以及文件
		createRootFile(JsPath,"", className.toLowerCase()+".css");
		content=content.replaceAll("cLASSNAME", className.toLowerCase());
		content=content.replaceAll("IDS", entity_ids);
		return content;
	}
	//返回LIST数据
	public String getList(String file){
		String content=getFileContent(file);
		String className=indexCap(CamelCaseUtils.toCamelCase(tablename));
		content=content.replaceAll("CLASSNAME", className);
		content=content.replaceAll("cLASSNAME", className.toLowerCase());
		//构建列表
		StringBuffer lisSb=new StringBuffer();
		for(String colsName:colnames){
			if(colsName.equals(entity_ids)){
				lisSb.append("<th data-options=\"field:'"+colsName+"',align:'center',hidden:true\">"+colsName+"</th>");
			}else{
				lisSb.append("\n\t\t\t\t<th data-options=\"field:'"+colsName+"',align:'center',width:100\">"+colsName+"</th>");
			}
		}
		content=content.replaceAll("LIST",lisSb.toString());
		return content;
	}
	//返回控制器内数据
	public String getController(String file){
		String content=getFileContent(file);
		String className=indexCap(CamelCaseUtils.toCamelCase(tablename));
		content=content.replaceAll("CLASSNAME", className);
		content=content.replaceAll("cLASSNAME", className.toLowerCase());
		content=content.replaceAll("IDS",entity_ids);
		return content;
	}
	//返回SERVICE接口实现内数据
	public String getServiceImpl(String file){
		String content=getFileContent(file);
		String className=indexCap(CamelCaseUtils.toCamelCase(tablename));
		content=content.replaceAll("CLASSNAME", className);
		content=content.replaceAll("cLASSNAME", className.toLowerCase());
		content=content.replaceAll("IDS", indexCap(entity_ids));
		content=content.replaceAll("ID", entity_ids);
		content=content.replaceAll("TOOLS", "ID");
		content=content.replaceAll("TOOL", "IDUtil");
		return content;
	}
	//返回SERVICE接口内数据
	public String getServiceInter(String file){
		String content=getFileContent(file);
		String className=indexCap(CamelCaseUtils.toCamelCase(tablename));
		content=content.replaceAll("CLASSNAME", className);
		content=content.replaceAll("cLASSNAME", className.toLowerCase());

		content=content.replaceAll("ID", entity_ids);
		return content;
	}
	//返回DAO接口内数据
	public String getDaoInter(String file){
		String content=getFileContent(file);
		String className=indexCap(CamelCaseUtils.toCamelCase(tablename));
		content=content.replaceAll("CLASSNAME", className);
		return content;
	}
	//返回DAO实现内数据
	public String getDaoImpl(String file){
		String content=getFileContent(file);
		String className=indexCap(CamelCaseUtils.toCamelCase(tablename));
		content=content.replaceAll("CLASSNAME", className);
		return content;
	}
	/**
	 * 返回DAO.xml 数据
	 * @param file
	 * @return
	 */
	public String getDaoMappXML(String file){
		String content=getFileContent(file);
		String className=indexCap(CamelCaseUtils.toCamelCase(tablename));
		content=content.replaceAll("SYSCLASS", className);
		content=content.replaceAll("TABLENAME", tablename);
		content=content.replaceAll("NAMESPACE", entityPagePath+"."+className);
		content=content.replaceAll("<!-- INSERT  -->", insSQL.toString());
		content=content.replaceAll("<!-- INSERTLIST  -->", insListSQL.toString());
		content=content.replaceAll("<!-- UPDATE -->", updSQL.toString());
		content=content.replaceAll("<!-- SELECT -->", selSQL.toString());
		return content;
	}
	public String getMybatisConfig(String path){
		String className=indexCap(CamelCaseUtils.toCamelCase(tablename));
		String mapperAliasConfig=getFileContent(SQLMapPath);
		mapperAliasConfig=mapperAliasConfig.replaceAll("<!-- aliases  -->",
				"<!-- aliases  -->\n\t\t <!--"+class_desc+"("+DateUtil.getDateFormats(DateUtil.date1,new Date())+")-->\n\t\t <typeAlias type=\""+entityPagePath+"."+className+"\" alias=\""+className+"\"/>");
		return mapperAliasConfig;
	}


	private String getFileContent(String filePath){
		StringBuffer sb=new StringBuffer("");
		File file=new File(new File((new File("").getAbsolutePath())).getParent()+"/"+filePath);
		//		System.out.println(file.exists());
		InputStreamReader read = null;
		try {
			read = new InputStreamReader(new FileInputStream(file),"utf-8");
			BufferedReader buffer=new BufferedReader(read);
			String lineTxt=null;
			while((lineTxt=buffer.readLine())!=null){
				sb.append(lineTxt+"\n");
			}
		} catch (Exception  e) {
		}
		return sb.toString();
	}

	private String sqlType2JavaType(String sqlType) {
		if(sqlType.equalsIgnoreCase("bit")){
			return "boolean";
		}else if(sqlType.equalsIgnoreCase("tinyint")){
			return "byte";
		}else if(sqlType.equalsIgnoreCase("smallint")){
			return "short";
		}else if(sqlType.equalsIgnoreCase("int")){
			return "int";
		}else if(sqlType.equalsIgnoreCase("bigint")){
			return "long";
		}else if(sqlType.equalsIgnoreCase("float")){
			return "float";
		}else if(sqlType.equalsIgnoreCase("decimal") || sqlType.equalsIgnoreCase("numeric")
				|| sqlType.equalsIgnoreCase("real") || sqlType.equalsIgnoreCase("money")
				|| sqlType.equalsIgnoreCase("smallmoney")){
			return "double";
		}else if(sqlType.equalsIgnoreCase("varchar") || sqlType.equalsIgnoreCase("char")
				|| sqlType.equalsIgnoreCase("nvarchar") || sqlType.equalsIgnoreCase("nchar")
				|| sqlType.equalsIgnoreCase("text")){
			return "String";
		}else if(sqlType.equalsIgnoreCase("datetime")||sqlType.equalsIgnoreCase("date")){
			return "Date";
		}else if(sqlType.equalsIgnoreCase("image")){
			return "Blod";
		}
		return "String";
	}
	/**
	 * 首字母大写
	 * @param str
	 * @return
	 */
	public String indexCap(String str){
		char[] chs=str.toCharArray();
		if(chs[0]>=97){
			if(chs[0]>='a'||chs[0]<='z'){
				chs[0]=(char)(chs[0]-32);
			}
		}
		return new String(chs);
	}
	//生成实体类
	private String parse() {
		StringBuffer sb = new StringBuffer();
		sb.append("package "+entityPagePath+";\r\n");
		if(f_util){
			sb.append("import java.util.Date;\r\n");
		}
		if(f_sql){
			sb.append("import java.sql.*;\r\n");
		}
		sb.append("   /**\r\n");
		sb.append("    * "+class_desc+"\r\n");
		sb.append("    * "+tablename+"\r\n");
		sb.append("    */ \r\n");
		sb.append("public class " + indexCap(CamelCaseUtils.toCamelCase(tablename)) + " extends "+extendsClass+"{\r\n");
		attrsAll(sb);
		methodAll(sb);
		sb.append("}\r\n");
		return sb.toString();
	}
	/**
	 * 生成所有属性
	 * @param sb
	 */
	private void attrsAll(StringBuffer sb) {
		for (int i = 0; i < colnames.length; i++) {
			sb.append("\tprivate " + sqlType2JavaType(colTypes[i]) + " " + colnames[i] + ";\r\n");
		}
	}
	/**
	 * 生成get,set方法
	 * @param sb
	 */
	private void methodAll(StringBuffer sb) {
		for (int i = 0; i < colnames.length; i++) {
			sb.append("\tpublic void set" + indexCap(colnames[i]) + "(" + sqlType2JavaType(colTypes[i]) + " " +   colnames[i] + "){\r\n");
			sb.append("\t\tthis." + colnames[i] + "=" + colnames[i] + ";\r\n");
			sb.append("\t}\r\n");
			sb.append("\tpublic " + sqlType2JavaType(colTypes[i]) + " get" + indexCap(colnames[i]) + "(){\r\n");
			sb.append("\t\treturn " + colnames[i] + ";\r\n");
			sb.append("\t}\r\n");
		}
	}
	/**
	 * 拿出数据库相关数据
	 */
	private  void sqlUtil(){
		Connection con=null;
		String sql = "select * from " + tablename;
		PreparedStatement pStemt = null;
		try {
			Class.forName(DRIVER);
			con = (Connection) DriverManager.getConnection(URL+sqlName,NAME,PASS);
			pStemt = (PreparedStatement) con.prepareStatement(sql);
			ResultSetMetaData rsmd = pStemt.getMetaData();
			int size = rsmd.getColumnCount();
			colnames = new String[size];
			colTypes = new String[size];
			colSizes = new int[size];
			for(int i=0;i<size;i++){
				colnames[i]=rsmd.getColumnName(i+1);
				insSQL.append(colnames[i]).append(",");
				insListSQL.append(colnames[i]).append(",");
				if(!colnames[i].equals("is_del")){
					selSQL.append(colnames[i]).append(",");//构建查询sql语句
					updSQL.append(colnames[i]);//构建更新语句
					insSQLValue.append("#{"+colnames[i]+"},");
					insSQLListValue.append("#{item."+colnames[i]+"},");
					updSQL.append("=#{"+colnames[i]+"},");
				}else{
					insSQLValue.append("0,");
					insSQLListValue.append("0,");
				}
				colTypes[i]=rsmd.getColumnTypeName(i+1);
				if(colTypes[i].equalsIgnoreCase("datetime")){
					f_util=true;
				}
				if(colTypes[i].equalsIgnoreCase("date")){
					f_util=true;
				}
				if(colTypes[i].equalsIgnoreCase("image")||colTypes[i].equalsIgnoreCase("text")){
					f_sql=true;
				}
				colSizes[i]=rsmd.getColumnDisplaySize(i+1);
			}
			selSQL.deleteCharAt(selSQL.length()-1).append(" from "+tablename);
			updSQL.deleteCharAt(updSQL.length()-1).append(" where is_del=0 and "+entity_ids+"=#{"+entity_ids+"}");

			insSQL.deleteCharAt(insSQL.length()-1).append(" )\n\t\tvalues\n\t\t("+insSQLValue.deleteCharAt(insSQLValue.length()-1)+")");
			insListSQL.deleteCharAt(insListSQL.length()-1).append(" )\n\t\tvalues\n\t\t"+insSQLListValue.deleteCharAt(insSQLListValue.length()-1)+")\n\t\t</foreach>");
			//System.out.println("修改SQL:"+updSQL);
			//System.out.println("查询SQL:"+selSQL);
			//System.out.println("插入SQL:"+insSQL);
			//System.out.println("批量插入SQL:"+insListSQL);
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("连接数据失败！！");
		} finally{
			try{
				con.close();
			}catch(Exception e2){
				System.out.println("关闭连接出现异常！！"+e2.getMessage());
			}
		}
	}
	/**
	 * 生成文件
	 * @param filePath 文件路径
	 * @param content 文件内容
	 */
	private void createFile(String filePath,String content,boolean bl){
		OutputStreamWriter osw = null;
		File file=new File(new File(new File("").getAbsolutePath()).getParent()+"/"+filePath);
		Long start=System.currentTimeMillis();
		System.out.println("开始执行："+start);
		try {
			if(bl){
				if(file.exists()){
					file.delete();
				}
				file.createNewFile();
				osw = new OutputStreamWriter(new FileOutputStream(file, false),"utf-8");
				osw.write(content);
			}else{
				if(!file.exists()){
					file.createNewFile();
					osw = new OutputStreamWriter(new FileOutputStream(file, false),"utf-8");
					osw.write(content);
				}else{
					System.out.println("-------------------------------------------------------------------------------------文件已存在");
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
		} finally{
			if(osw!=null){
				try {
					osw.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			Long end=System.currentTimeMillis();
			System.out.println("执行结束"+end+",总花费："+(end-start)+"秒");
		}
	}
	private void createRootFile(String mks,String content,String files){
		OutputStreamWriter osw = null;
		String filePaths=new File(new File("").getAbsolutePath()).getParent()+"/"+mks;
		File file=new File(filePaths.replaceFirst("classes", ""));
		Long start=System.currentTimeMillis();
		System.out.println("开始执行："+start);
		try {
			if(!file.exists()){
				file.mkdirs();
			}
			File f=new File(file.getPath()+"/"+files);
			if(!f.exists()){
				f.createNewFile();
				osw = new OutputStreamWriter(new FileOutputStream(f, false),"UTF-8");
				osw.write(content);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally{
			if(osw!=null){
				try {
					osw.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			Long end=System.currentTimeMillis();
			System.out.println("执行结束"+end+",总花费："+(end-start)+"秒");
		}
	}
}
