
/*不压缩代码必须加载之前使用*/
process.argv[2]="-debug"

//文件操作
require("../../toolLib/prototype.js")
var wake = require("../../toolLib/fileWake.js")
var mergeParseJs = require("../../toolLib/mergeParseJs.js")

//对外接口
function merge(parseFile, outPath,inPath) {
	
	var indexData = wake.readData( parseFile ).replace(/#\/web\//g,"");

	console.log("-------common index:".green,parseFile,"-----------".green)

	var files = wake.findFile(inPath,"html",true);
	var jscode;
	for(var i=0;i<files.length;i++){
		var file = files[i];
		var outFile = getBuildPath(files[i],outPath);
        console.log(file,"to".red,outFile)
		var js = file.replace(".html",".js");
		var css= file.replace(".html",".css");
		var fileData = wake.readData(file)
	//同名js文件
		if(wake.isExist(js)){
			var jsData = wake.readData( js )
			if(jsData.trim()==""){
				jscode = "";
			}else{
				jscode = mergeParseJs.parseJs(js);
				jscode = "<script>$(function(){"+jscode + "})</script>"
			}
		}else{
			jscode="";
		}
		if(wake.isExist(css)){
			var cssData = wake.readData( css )
			var cssCode
			if(cssData.trim()==""){
				cssCode = "";
			}else{
				cssCode = mergeParseJs.parseCss(css);
				cssCode = "<style  type='text/css'>"+cssCode+"</style>"
			}
		}else{
			cssCode = "";
		}


		var lastData = indexData.replace('<div id="pageCss"></div>',cssCode||"")
			.replace('<div id="page"></div>',fileData.replace(/#\/web\//g,""))
			.replace('<div id="pageJs"></div>',jscode||"");
		//将简写替换加上.html
		lastData = lastData.replace(/href\s*=\s*"?#([^"]+)"?/gm,function(m,m1){var t=m1.split("?");return ('href="'+(t[0].indexOf(".html")!=-1?t[0]:t[0]+".html")+'"')})

		lastData = lastData.replace(/"\/index\.html#!\/web/gm,"\"/web").replace(/"\/admin\.html#!\/admin/gm,"\"/admin").replace(/"\/index\.html#/gm,"\"/web/home.html#").replace(/"\/index\.html"/gm,"\"/web/home.html\"").replace(/"\/admin\.html"/gm,"\"/admin/index.html\"")
		wake.writeData(outFile,lastData)
		
	}
};

function copyPublic(inPath,outpath){
	console.log("-------copy public:".red,inPath," to:".green,outpath);
	var out = getBuildPath(inPath,outpath);

	wake.copyDir(inPath,out)

}


/*根据文件所在的位置 换成 打包之后的文件所在位置*/
function getBuildPath(from,to){
	/*去掉..保留实际的路径*/
	return (to+"/"+from.replace(/\.\.\//g,"").replace(/\.\//g,"") ).toURI();
}


/*打包存放路径*/
var bulidPath = "./bulid"

/*所有文件路径*/
var allHtmlPath = "../web"

/*整体公用文件*/
var parseFile = "../indexStatic.html";




/*所有文件路径*/
var allHtmlPath2 = "../admin"

/*整体公用文件*/
var parseFile2 = "../adminStatic.html";

merge(parseFile,bulidPath,allHtmlPath);

merge(parseFile2,bulidPath,allHtmlPath2);
copyPublic("../resource",bulidPath);
copyPublic("../mirror",bulidPath);
copyPublic("../test",bulidPath);
