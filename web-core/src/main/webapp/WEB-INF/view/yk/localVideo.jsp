<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="../common/taglibs.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <title>视频聊天</title>
    <link rel="stylesheet" href="<%=basePath%>/static/extends_layer/layer_.css" type="text/css">
    <script type="text/javascript" src="<%=basePath%>/static/layer/layer.js"></script>
    <link rel="stylesheet" type="text/css" href="<%=basePath%>/static/santiIM/im.css">
    <style type="text/css">
    
    
    </style>
  </head>
  <body>
      <input type="hidden" id="accesscToken"  />
	  <input type="hidden" id="roomID" />
	  <input type="hidden" id="serviceURL" />
      <input type="hidden"  id="localID" value="${localID }">
      <input type="hidden"  id="remoID" value="${remoID }">
      <input type="hidden"  id="localName" value="${localName }">
      <input type="hidden"  id="remoName" value="${remoName }">
      <!-- 视频相关开始 -->
     <div id="showVideo">
              <div id="container_" style="width:600px;height:500px;border-right:2px solid #808080;float:left;">
								<div id="videos"  >
							     	<video id="localVideo" muted autoplay  width="600" height="500"  flog="1"></video>
							     	<audio id="localAudio" muted autoplay></audio>
							     	<div class="locaName">自己</div>
								</div>
								<div class="remo_">
								     <div id='remoteVideo'></div>
			                         <div id='remoteAudio'></div>
								</div>
			 </div>
			 <div id="msgss" style="float:left;width:298px;height:500px;background-color:#d0d0d0;">
							     <!-- 显示设备区开始 -->
							     <div class="sb_lis">
									     <div class="seb"><label for='videoCodingSelect'>视频格式: </label><select id="videoCodingSelect"></select></div>
									     <div class="seb" style="display:none;"><label for='initAudioSource'>麦克风设备: </label><select id="initAudioSource"></select></div>
									     <div class="seb" style="display:none;"><label for='initVideoSource'>摄像头设备: </label><select id="initVideoSource" onchange="getResolutionAndFrameRate(this.value)"></select></div>
									     <div class="seb"><label for='resolutionSelect'>分辨率: </label><select id="resolutionSelect"></select></div>
									     <div class="seb"><label for='frameRateSelect'>帧率: </label><select id="frameRateSelect"><option value=1>1</option><option value=3>3</option><option value=5>5</option><option value=8>8</option><option value=10>10</option><option value=12>12</option><option value=15 selected>15</option><option value=18>18</option><option value=20>20</option><option value=25>25</option><option value=30>30</option></select>
									     </div>
								   </div>
								   <!-- 显示设备区结束 -->
								   <!-- 聊天消息区开始 -->
								   <div id="messagess_">
								           <!-- 消息展示区开始 -->
								           <div id="centent_im">
								                   
								           </div>
								           <!-- 消息展示区结束 -->
								           <!-- 消息发送区开始 -->
								           <div id="send_im">
								                 <input name="centent_" class="message_im" placeholder="输入消息后点击发送"/><span class="message_send" onclick="messageSend();">发送</span>
								           </div>
								           <!-- 消息发送区开始 -->
								   </div>
								   <!-- 聊天消息区结束 -->
				</div>
     </div>
     <!-- 视频结束 -->
     
  </body>
  <script type="text/javascript" src="<%=basePath%>/static/js/home/video.js"></script>
  <script type="text/javascript" src="<%=basePath%>/static/js/home/localVideo.js"></script>
</html>
