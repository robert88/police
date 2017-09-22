/**
 * 前台JS主入口
 */
layui.define(['form', 'layer', 'laydate'], function (exports) {
    var layer = layui.layer,
        laydate = layui.laydate,
        form = layui.form(),
	$ = layui.jquery;
	
	/*
	* 公用事件
	*
	**/
	var start = {
	     max: '2099-06-16 23:59:59'
	    ,istoday: false
	    ,choose: function(datas){
	      end.min = datas; //开始日选好后，重置结束日的最小日期
	      end.start = datas //将结束日的初始值设定为开始日
	    }
	  };
  
	  var end = {
	     max: '2099-06-16 23:59:59'
	    ,istoday: false
	    ,choose: function(datas){
	      start.max = datas; //结束日选好后，重置开始日的最大日期
	    }
	  };
	  $("#LAY_demorange_s").click(function(){
	  	start.elem = this;
	    	laydate(start);	
	  });
	  $("#LAY_demorange_e").click(function(){
	  	end.elem = this
	    	laydate(end);	
	  });
	  
	var layertip;
	$('*[data-tips]').hover(function(){
		var that = this;
		layertip=layer.tips($(this).data('tips'), that,{tips: 1}); 
	},function(){
		layer.close(layertip);
	});
  
    	/**
	* AJAX全局设置
	*/
	$.ajaxSetup({
		type: "post",
		dataType: "json"
	});
	if(arproject_status == 2)
	{
		$(".btnbor").hover(function(){
			$(this).prev().hide();
		});
	}
	/**
	* 通用表单提交(AJAX方式)
	*/
	form.on('submit(*)', function (data) {
		/*layer.alert(JSON.stringify(data.field), {
		      title: '最终的提交信息'
		    })*/
		var elem = $(this);    
		var submit_val = elem.val();
		elem.val(submit_val+"中...").addClass("on").attr('disabled',true);
		$.ajax({
		    url: data.form.action,
		    type: data.form.method,
		    data: data.field,
		    success: function (info) {
		        if (info.code === 1) {
		            setTimeout(function () {
		                location.href = info.url;
		            }, 1000);
		        }
			elem.val(submit_val).removeClass("on").attr("disabled",false);
		        layer.msg(info.msg);
		    }
		});
		return false;
	});
	//自定义验证规则
	form.verify({
		username: function(value){
			if(value.length < 2){
			return '昵称至少得2个字符啊';
			}
		}

	});
	//添加项目
	$(".addwork").click(function(){
		//添加入库
		 $.ajax({
		    url: Routing.generate('kit_web_work_json', {type: 'add_project'}),
		    type: 'post',
		    data: {title:'标题'},
		    success: function (info) {
		        if (info.code === 1) {
		            setTimeout(function () {
		                location.href = info.url;
		            }, 1000);
		        }
				
		        layer.msg(info.msg);
		    }
		});
	});
	
	var scene={
		//新增
		addwork:function(obj,id){
			$.ajax({
			    url: '/test/arproject/add_arproject.json',//Routing.generate('kit_web_work_json', {type: 'add_project'}),
			    type: 'post',
			    data: {title:'标题'},
			    success: function (info) {
			        if (info.code === 1) {
			            setTimeout(function () {
			                location.href = info.url;
			            }, 1000);
			        }				
			        layer.msg(info.msg);
			    }
			});
		},
		delwork:function(obj,id){
			var ele = $(obj).parents(".zprt");
			$.ajax({
			    url: '/test/arproject/del_arproject.json',
			    type: 'post',
			    data: {id:id},
			    success: function (info) {
			        if (info.code === 1) {
							ele.remove();
							if (info.code === 1) {
								setTimeout(function () {
									window.location.reload()
								},200)
							}
			        }				
			        layer.msg(info.msg);
			    }
			});
		},
		//编辑
	        update:function(obj,id){
	             $(obj).parent().next(".edit").show();
	        },
		//取消
		cancel:function(obj,id){
	             $(obj).parent().hide();
	        },
		//确定
		deter:function(obj,id){
		     var title = $(obj).parent().find("input").val();
		     title = $.trim(title);
		     if(title.length == 0)
		     {
		     	layer.msg("请填写项目标题");
			return false;
		     }
		     if(title.length >12)
		     {
		     	layer.msg("长度不能超过12个字符");
			return false;
		     }
		     var elem = $(obj);	
	             $.ajax({
			    url: '/index/arproject/add_arproject.json',
			    type: 'post',
			    data: {title:title,id:id},
			    success: function (info) {
			        if (info.code === 1) {
			            elem.parent().hide();
				    elem.parent().parent().find(".title h2").text(title);
			        }				
			        layer.msg(info.msg);
			    }
			});
	        },
		//继续新增记录
		addrecord:function(obj,id){
			var list_order = $(".upzpert").length;
			$.ajax({
			    url: '/index/arrecord/addrecord.json',
			    type: 'post',
			    data: {id:id,list_order:list_order},
			    success: function (info) {
			        if (info.code === 1) {
			            location.href = info.url;
			        }else
				{
					$(".takmains .cont span").empty().html(info.msg);
					$(".takmains .btns .takdeter").data("status","account");
					$(".graybg").show();
					$(".takmains").show();
				}
			    }
			});
		},
		//删除记录
		delrecord:function(obj,id){
			$(".takmains .btns .takdeter").data("id",id).data("status","delrecord");
			$(".takmains .cont span").empty().html('<i>删除后不可恢复</i><i>确定删除么?</i>');
			$(".graybg").show();
			$(".takmains").show();
		},
		//上传图片
		uploadimg:function(obj,id){
			if(!id)
			{
				layer.msg("参数错误");
				return false;
			}
			layer.open({
			  type: 2,
			  title: '上传识别图',
			  shadeClose: false,
			  shade: 0.8,
			  area: ['700px', '480px'],
			  content: 'admin/selectPicture.html'//Routing.generate('kit_web_work_picture')
			}); 
		},
		//上传视频
		uploadvideo:function(obj,id){
			if(!id)
			{
				layer.msg("参数错误");
				return false;
			}
			layer.open({
			  type: 2,
			  title: '上传本地视频',
			  shadeClose: false,
			  shade: 0.8,
			  area: ['300px', '200px'],
			  content:'/admin/selectVideo.html'//Routing.generate('kit_web_work_video')
			});
			
		},
		//弹框取消
		takcancel:function(obj,id){
			$(".takmains .btns .takdeter").data("id",id).data("status","");
			$(".graybg").hide();
			$(".takmains").hide();	
		},
		//弹框确认
		takdeter:function(obj,id){
			var status = $(obj).data("status");
			var ele = $(".upzpert"+id);
			switch(status)
			{
			    case 'delrecord':
			        //删除记录
				$.ajax({
				    url: Routing.generate('kit_web_work_delete'),
				    type: 'post',
				    data: {id:id},
				    success: function (info) {
				        if (info.code === 1) {
							$(".graybg").hide();
							$(".takmains").hide();
					        ele.fadeTo("slow", 0.01, function(){//fade
							    ele.slideUp("slow", function() {//slide up
							    	ele.remove();//then remove from the DOM
							    });
							  });
							var ii = $(".ftbtns .tips i").text();
							$(".ftbtns .tips i").text(parseInt(ii)+1);
							location.href = info.data;
				        }				
				        layer.msg(info.msg);
				    }
				});
			        break;
			    case 'saverecord':
			    	//确认提交
			        $.ajax({
				    url: Routing.generate('kit_web_work_save'),
				    type: 'post',
				    data: $('form').serialize(),
				    success: function (info) {
				        if (info.code === 1) {
				            setTimeout(function () {
				                location.href = info.url;
				            }, 1000);
				        }else{
				        	$(".graybg").hide();
						    $(".takmains").hide();  
				        }			
				        layer.msg(info.msg);
				    }
				});
			        break;
			    case 'account':
			    	window.open('http://www.arsuoai.com/index/account/index.html');
			    	break;
			    default:
			      $(".graybg").hide();
			      $(".takmains").hide();  
			}
		},
		//详情展示
		showhtml:function(obj,id){
			var _html = $(obj).parent().find(".pic").html();
			layer.open({
			  type: 1,
			  title:'',
			  closeBtn:0,
			  scrollbar:false,
			  shadeClose :true,
			  area: ['640px', '360px'], //宽高
			  content: _html
			});
		},
		//保存草稿
		savecg:function(obj,id){
			var listorder = {};
			$(".upzpert").each(function(i){
				listorder[i] = $(this).data('id');
			 });
			 $.ajax({
			    url: '/index/arrecord/listorder.json',
			    type: 'post',
			    data: {id:id,listorder:listorder},
			    success: function (info) {
			        if (info.code === 1) {
			            setTimeout(function () {
			                location.href = info.url;
			            }, 1000);
			        }				
			        layer.msg(info.msg);
			    }
			});
		},
		//提交
		savetj:function(obj,id){
			$(".takmains .btns .takdeter").data("id",id).data("status","saverecord");
			$(".takmains .cont span").empty().html('<i>提交成功后,就不可再修改</i><i>确定提交么?</i>');
			$(".graybg").show();
			$(".takmains").show();
		},
		//导出所有图片
		allpic:function(obj,id){
			$.ajax({
			    url: '/index/arrecord/allpic.json',
			    type: 'post',
			    data: {id:id},
			    success: function (info) {
			        if (info.code === 1) {
			            window.location.href=info.data;
			        }				
			        layer.msg(info.msg);
			    }
			});
		}
		
		
		
	}



	$(document).off("click.user",".scene_option").on('click.user',".scene_option",function(){
		var type=$(this).data('type'),id=$(this).data('id');
		if(arproject_status == 2)
		{
			if(type == 'showhtml' || type == 'allpic')
			{
			}else
			{
				layer.msg("已提交状态, 禁止修改");
				return false;
			}
		}
		if(scene[type]){
			scene[type](this,id);
		}
	})

	exports('user', {});
}); 