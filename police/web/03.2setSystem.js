require("/web/useForm.js")
require("web/usePage.js")
layui.use("element",function(){
var element=layui.element();
element.on('tab(setting)',function(){
var $lis=$(this).parents(".layui-tab").find(".layui-tab-title").find("li");
$lis.find(".icon-right-dir").remove();
$(this).find("a").prepend("<i class="icon-right-dir"></i>")
})
})
