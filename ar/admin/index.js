$('.gh').click(function(){	if($(this).hasClass('selected')){		$(this).removeClass('selected');		$('#nav').addClass('hide');	}	else{		$(this).addClass('selected');		$('#nav').removeClass('hide');	}});var arproject_status = 1;layui.config({	base: '/resource/js/'}).use('user');