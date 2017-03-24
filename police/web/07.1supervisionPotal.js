require("/web/useForm.js");
require("/web/usePage.js")
require("web/dateRange.js");
layui.use('laydate', function(){
	var laydate = layui.laydate
});
var newWindow;
$(".feedBackTable").on("click",".feedBackTableOpa",function () {
	var src = $(this).data("src");
	if(src.indexOf("//")==-1){
		src = window.location.href.replace(window.location.hash,"")+src;
	}
	var screenWidth = window.screen.width;
	var screenHeight = window.screen.height;
	if(newWindow){
		newWindow.close ();
	}

	newWindow = window.open (src, "newwindow", "height=400, width=800, left="+((screenWidth-800)/2)+",top="+((screenHeight-400)/2)+",toolbar =no, menubar=no, scrollbars=no, resizable=no, location=no, status=no")
})
layui.use(['element', 'layer'], function(){
	var element = layui.element();


});