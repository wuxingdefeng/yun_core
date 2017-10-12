package com.yun.commons;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.net.HttpURLConnection;
import java.net.URL;
import java.util.*;


/**
 * 小说爬虫
 * @author QB
 *
 */
public class XiaoShuo {
	public static  List<Map<String,Object>> getDianding() throws Exception{
		String url="http://www.23us.com";//顶点小说
		String responseStr=HttpClientUtils.sendHttpGet(url, null,"GBK");
		Document doc = Jsoup.parse(responseStr);
		//风云榜
		Element content = doc.getElementById("s_dd");
		//风云榜下排名数据
		Elements links = content.getElementsByTag("a");
		//System.out.println(responseStr);
		List<Map<String,Object>> lis=new ArrayList<Map<String,Object>>();
		for (Element link : links) {
			Map<String,Object> m=new HashMap<String,Object>();
			Elements imgs=link.getElementsByTag("img");
			if(imgs.size()>0){
				Element imgEm=imgs.get(0);
				m.put("imgurl", imgEm.attr("src"));
				//获取小说详细信息以及最新更新
				String detailUrl=link.attr("href").trim();//顶点小说
				String detailHtml=HttpClientUtils.sendHttpGet(detailUrl, null,"GBK");
				Document detailDoc = Jsoup.parse(detailHtml);
				m.put("bookName", detailDoc.getElementById("content").getElementsByTag("h1").text().split(" ")[0]);
				m.put("imgPath", detailDoc.getElementsByClass("hst").get(0).getElementsByTag("img").get(0).attr("src"));
				m.put("detailPath", Base64Utils.jiaMi(detailDoc.getElementsByClass("btnlinks").get(0).getElementsByTag("a").get(0).attr("href")));
				Elements tableS=detailDoc.getElementsByTag("table");
				if(tableS.size()>0){
					Element table=tableS.get(0);
					Elements trs=table.getElementsByTag("tr");
					m.put("type", trs.get(0).getElementsByTag("td").get(0).text().substring(1));
					m.put("userName", trs.get(0).getElementsByTag("td").get(1).text().substring(1));
					m.put("status", trs.get(0).getElementsByTag("td").get(2).text().substring(1));
					m.put("scNum", trs.get(1).getElementsByTag("td").get(0).text().substring(1));
					m.put("fontSize", trs.get(1).getElementsByTag("td").get(1).text().substring(1));
					m.put("upDate", trs.get(1).getElementsByTag("td").get(2).text().substring(1));
					m.put("sumClick", trs.get(2).getElementsByTag("td").get(0).text().substring(1));
					m.put("yueClick", trs.get(2).getElementsByTag("td").get(1).text().substring(1));
					m.put("weekClick", trs.get(2).getElementsByTag("td").get(2).text().substring(1));
					m.put("sumTui", trs.get(3).getElementsByTag("td").get(0).text().substring(1));
					m.put("yueTui", trs.get(3).getElementsByTag("td").get(1).text().substring(1));
					m.put("weekTui", trs.get(3).getElementsByTag("td").get(2).text().substring(1));
					//					System.out.println("类型："+trs.get(0).getElementsByTag("td").get(0).text().substring(1));
					//					System.out.println("作者："+trs.get(0).getElementsByTag("td").get(1).text().substring(1));
					//					System.out.println("状态："+trs.get(0).getElementsByTag("td").get(2).text().substring(1));
					//					System.out.println("收藏数："+trs.get(1).getElementsByTag("td").get(0).text().substring(1));
					//					System.out.println("全文长度："+trs.get(1).getElementsByTag("td").get(1).text().substring(1));
					//					System.out.println("最近更新："+trs.get(1).getElementsByTag("td").get(2).text().substring(1));
					//					System.out.println("总点击数："+trs.get(2).getElementsByTag("td").get(0).text().substring(1));
					//					System.out.println("本月点击："+trs.get(2).getElementsByTag("td").get(1).text().substring(1));
					//					System.out.println("本周点击："+trs.get(2).getElementsByTag("td").get(2).text().substring(1));
					//					System.out.println("总推荐数："+trs.get(3).getElementsByTag("td").get(0).text().substring(1));
					//					System.out.println("本月推荐："+trs.get(3).getElementsByTag("td").get(1).text().substring(1));
					//					System.out.println("本周推荐："+trs.get(3).getElementsByTag("td").get(2).text().substring(1));
				}
				//System.out.println(detailHtml);
			}
			//			else{
			//				//获取小说所有章节
			//				System.out.println(link);
			//				String linkHref = link.attr("href");
			//				String linkText = link.text();
			//				System.out.println(linkText);
			//				m.put("link", linkHref);//下级需要解析的路径
			//			}
			lis.add(m);
		}
		//System.out.println(lis.size()+"--"+lis);
		return lis;
	}
	public static  List<Map<String,Object>> getQidian(String url) throws Exception{
		//String baseUrl="http://book.qidian.com";
		List<Map<String,Object>> lis=new ArrayList<Map<String,Object>>();
		String responseStr=HttpClientUtils.sendHttpGet(url, null,"GBK");
		Document doc = Jsoup.parse(responseStr);
		Elements books=doc.getElementsByClass("all-book-list");
		Element book=books.get(0);
		for(Element li:book.getElementsByTag("li")){
			Map<String,Object> m=new HashMap<String,Object>();
			String imgPath=li.getElementsByTag("img").attr("src");
			Element bookT=li.getElementsByTag("h4").get(0).getElementsByTag("a").get(0);
			Elements infos=li.getElementsByTag("p");
			Elements bookBa=infos.get(0).getElementsByTag("a");
			m.put("userName", bookBa.get(0).text());
			m.put("type", bookBa.get(1).text()+"."+bookBa.get(2).text());
			m.put("status", infos.get(0).getElementsByTag("span").get(0).text());
			m.put("descr", infos.get(1).text());
			m.put("fontSize", infos.get(2).text());
			m.put("bookID",bookT.attr("data-bid"));
			m.put("bookName", bookT.text());
			m.put("imgPath", "http:"+imgPath);
			//			System.out.println("详细路径："+"http:"+bookT.attr("href"));
			//			System.out.println("书名："+bookT.text());
			//			System.out.println("作者："+m.get("userName"));
			//			System.out.println("类型："+m.get("type"));
			//			System.out.println("状态："+m.get("status"));
			//			System.out.println("简介："+m.get("descr"));
			//			System.out.println("字数："+m.get("fontSize"));
			//			System.out.println();
			lis.add(m);
		}
		return lis;
	}
	public static boolean getUrls(String url){
		HttpURLConnection conn = null;
		try {
			URL realUrl = new URL(url);
			conn = (HttpURLConnection) realUrl.openConnection();
			conn.setRequestMethod("GET");
			conn.setUseCaches(false);
			conn.setReadTimeout(8000);
			conn.setConnectTimeout(8000);
			conn.setInstanceFollowRedirects(false);
			conn.setRequestProperty("User-Agent","Mozilla/5.0 (Windows NT 10.0; WOW64; rv:46.0) Gecko/20100101 Firefox/46.0");
			int code = conn.getResponseCode();
			if (code == 200) {
				return true;
			}else{
				return false;
			}
		}catch (Exception e){
			e.printStackTrace();
		}
		return false;
	}
	//顶点小说分页获取
	public static Object getDingdian(String url) throws Exception{
		List<Map<String,Object>> result=new ArrayList<Map<String,Object>>();
		String responseStr=HttpClientUtils.sendHttpGet(url, null,"GBK");
		Document doc = Jsoup.parse(responseStr);
		Element table=doc.getElementsByTag("table").get(0);
		for(Element tr:table.getElementsByTag("tr")){
			if(tr.getElementsByTag("td").size()>0){
				Map<String,Object> m=new HashMap<String,Object>();
				Element a1=tr.getElementsByClass("L").get(0).getElementsByTag("a").get(0);
				String bookID=a1.attr("href").split("book/")[1];
				//System.out.println(bookID);
				String bookName=a1.text();
				m.put("bookName",bookName.length()>=15?bookName.substring(0, 15)+"..":bookName);
				Element a2=tr.getElementsByClass("L").get(1).getElementsByTag("a").get(0);
				String urls=a2.attr("href");
				m.put("imgPath", urls.replaceAll("html", "files/article/image")+bookID+"s.jpg");
				m.put("ls", Base64Utils.jiaMi(urls.substring(0, urls.length()-1)));
				m.put("userName", tr.getElementsByClass("C").get(0).text());
				m.put("fontSize",  tr.getElementsByClass("R").get(0).text());
				m.put("status", tr.getElementsByClass("C").get(2).text());
				m.put("upd", tr.getElementsByClass("C").get(1).text());
				m.put("bookID", bookID);
				String updf=a2.text();
				m.put("updF", updf.length()>=13?updf.substring(0, 13)+"..":updf);
				//                if(!getUrls(m.get("imgPath").toString())){
				//                	m.put("imgPath", "http://c.hiphotos.baidu.com/zhidao/pic/item/203fb80e7bec54e764b8017eb9389b504fc26a7d.jpg");
				//                }
				//				System.out.println("书名："+m.get("bookName"));
				//                System.out.println("封面："+m.get("imgPath"));
				//                System.out.println("作者："+m.get("userName"));
				//                System.out.println("字数："+m.get("fontSize"));
				//                System.out.println("状态："+m.get("status"));
				//                System.out.println("最近更新时间："+m.get("upd"));
				//                System.out.println("最新章节："+m.get("updF"));
				//                System.out.println("章节列表："+Base64Utils.jieMi(m.get("ls").toString()));
				//                System.out.println();
				result.add(m);
			}
		}
		//aHR0cDovL3d3dy4yM3VzLmNvbS9odG1sLzU1LzU1NTE5
		//aHR0cDovL3d3dy4yM3VzLmNvbS9odG1sLzU1LzU1NTE5
		//System.out.println(doc.getElementsByTag("table"));
		//System.out.println(doc);
		return result;
	}
	public static void main(String[] args) throws Exception{
		//getQidian("http://a.qidian.com/?size=-1&sign=-1&tag=-1&chanId=-1&subCateId=-1&orderId=&update=-1&page=1&month=-1&style=1&action=-1&vip=-1");
		System.out.println(getDianding());
//		getAllZhangjie("http://book.qidian.com/ajax/book/category?_csrfToken=bcNvjr04wfuADdaPIn7KDIBdFQKI09p2tNxZpYeD&bookId=3513193");
//				getDingdian("http://www.23us.com/top/allvote_1.html");
	}

	public static Object getAllZhangjie(String url) throws Exception {
		String responseStr=HttpClientUtils.sendHttpGet(url, null,"UTF-8");
		return responseStr;
	}
	public static Object getAllZhangjie2(String url) throws Exception {
		List<Map<String,Object>> results=new ArrayList<Map<String,Object>>();
		String responseStr=HttpClientUtils.sendHttpGet(url, null,"GBK");
		Document doc = Jsoup.parse(responseStr);
		Element table=doc.getElementById("at");
		for(Element td:table.getElementsByTag("td")){
			Map<String,Object> m=new HashMap<String,Object>();
			m.put("cN", td.getElementsByTag("a").text());
			m.put("urls",Base64Utils.jiaMi(url+"/"+td.getElementsByTag("a").attr("href")));
			if(m.get("cN")!=null&&!"".equals(m.get("cN").toString())){
				results.add(m);
			}
			//System.out.println(m.get("cN")+"--"+m.get("urls"));

		}
		//倒序 最新章节在最前面
		Collections.reverse(results);
		return results;
	}
	public static Object dakai(String url) throws Exception {
		Map<String,Object> result=new HashMap<String,Object>();
		String responseStr=HttpClientUtils.sendHttpGet(url.substring(0,url.length()-1), null,"GBK");
		Document doc = Jsoup.parse(responseStr);
		String centent=doc.getElementById("contents").text().replaceAll(" ","\n");
		//		centent=centent.replaceAll("", "\n");
		//		System.out.println(centent);
		result.put("centent", centent);
		return result;
	}
}
