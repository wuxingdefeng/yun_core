$(document).ready(function(){
	 var height=parseInt($(window).height());
	 var right_heand_height=parseInt(($('.heand_url', window.parent.document).height()));
	 var right_tabs_height=parseInt($('.pageTabls', window.parent.document).height());
	 var pages_height=parseInt($("#pages_div").height());
	 var relHeight=height-right_heand_height-right_tabs_height-pages_height+10;
	 $(".tables_main").attr("style","height:"+relHeight+"px;");
	
});