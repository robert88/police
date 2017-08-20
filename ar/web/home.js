$(function(){

	$("html").addClass("desktop fp-enabled").css({height:"100%",overflow:"hidden"});
	$("body").css({height:"100%",overflow:"hidden"}).queryLoader2({
		barColor: "#111111",
		backgroundColor: "#202020",
		percentage: true,
		barHeight: 30,
		completeAnimation: "grow"
	});

	$('.slide-wrap #s1 video').get(0).play();
	_slideAutoChange = setInterval("$.slideAutoChange()",15000);


	$('.page2 li').hover(function(){
			$(this).addClass('selected');
		},
		function(){
			$(this).removeClass('selected');
		});

	$('.gh').click(function(){
		if($(this).hasClass('selected')){
			$(this).removeClass('selected');
			$('#nav').addClass('hide');
		}
		else{
			$(this).addClass('selected');
			$('#nav').removeClass('hide');
		}
	});


	$(".nav_main").on("click","a",function () {
		$('.gh').click();
	});
//	滑屏
	var anchors =  ['home', 'services', 'cases', 'download','contact','footer'];
	$('.page-wrap').fullpage({
		anchors:anchors,
		verticalCentered: !1,
		navigation: !0,
		afterLoad: function(anchorLink, index){
			if(index == 1){
				$('#fp-nav').addClass('selected');
				$('.gb-nav').removeClass('show');
				$('.gb-header').addClass('show');
			}else{
				$('.gb-nav').addClass('show');
				$('.gb-header').removeClass('show');
				$('#fp-nav').addClass('selected');
			}
		},
		onLeave: function(index, nextIndex, direction){

			if(index == anchors.length-1 && direction == 'down'){
				$("footer").addClass("pageshow");

			}else{
				$("footer").removeClass("pageshow");
			}
		}
	});


//	头部幻灯片
	function currVideoPlay(){
		$('.slide-wrap video').get(0).pause();
		$('.slide-wrap li.selected video').get(0).play();
	}
	$('#slide-nav li.nav-bullet-container').click(function(){
		$('#slide-nav li.nav-bullet-container').removeClass('active').eq($(this).index()).addClass('active');

		$('.slide-wrap li').removeClass('selected').eq($(this).data('index')).addClass('selected');
		currVideoPlay();
	});

	var curr,next,prev;
	$.extend({
		slideAutoChange:function(){
			curr = $('.slide-wrap li.selected');
			if(curr.next().size()>0){
				next = curr.next();
			}
			else{
				next = $('.slide-wrap li:first');
			}
			curr.removeClass('selected');
			next.addClass('selected');

			$('#slide-nav li.nav-bullet-container').removeClass('active').eq(next.index()).addClass('active');
			currVideoPlay();
		}
	});

	$('.page1').mousewheel(function(event, delta) {

		curr = $('.slide-wrap li.selected');

		if(delta>0){
			if(curr.prev().size()>0){
				prev = curr.prev();
			}
			else{
				prev = $('.slide-wrap li:last');
			}
			curr.removeClass('selected');
			prev.addClass('selected');

			$('#slide-nav li.nav-bullet-container').removeClass('active').eq(prev.index()).addClass('active');
			currVideoPlay();
			return false;
		}
		else{
			if(curr.next().size()>0){
				next = curr.next();
			}
			else{
				next = $('.slide-wrap li:first');
			}
			if(curr.next().size()>0){

				curr.removeClass('selected');
				next.addClass('selected');

				$('#slide-nav li.nav-bullet-container').removeClass('active').eq(next.index()).addClass('active');
				currVideoPlay();
				return false;
			}
			else{

			}
		}

	});

	$('#nav, #loader').mousewheel(function(event, delta) {
		return false;
	});

//  进度条
	$('.myStat').circliful();

})