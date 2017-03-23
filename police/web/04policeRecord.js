require("/web/useForm.js");

require("web/btnTab.js");

layui.use(['element', 'layer'], function(){
	var element = layui.element();
	var layer = layui.layer;

	//监听折叠
	element.on('collapse(test)', function(data){
		
	});
});