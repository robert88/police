layui.use("element", function () {
    var element = layui.element();
    function initContentItem($tabWrap){
        var $tabTitle = $tabWrap.find(".layui-tab-title").find("li");
        var titleLen = $tabTitle.length;
        var $content = $tabWrap.find(".layui-tab-content")
        var curLen = $content.find(".layui-tab-item").length;
        if(curLen<titleLen){
            var len = titleLen-curLen;
            for(var i=0;i<len;i++){
                $content.append("<div class='layui-tab-item'></div>");
            }
        }
        $tabTitle.off("click","a").on("click","a",function (e) {
            e.preventDefault();
        })
    }
    $(".page-group-tab").each(function () {
        initContentItem($(this))
    });
    element.on('tab(pageTab)', function () {
        var $lis = $(this).parents(".layui-tab").find(".layui-tab-title").find("li");
        var $content = $(this).parents(".layui-tab").find(".layui-tab-content");
        $lis.find(".icon-up-dir").remove();
        $lis.find(".space").addClass("space-hide");
        $(this).find("a").prepend('<i class="icon-up-dir"></i>');
        var index = $(this).index();
        /*页面加载*/
        debugger
        if($content.find(".layui-tab-item").eq(index).html().replace(/\s+/,"")==""){
            var url = $(this).find("a").attr("href");
            var url = url&&url.replace(/\s+/,"");
            if(url){
                $content.find(".layui-tab-item").eq(index).load(url)
            }
        }


    })
})