{
	let uid=$("span.wrapper.hover>span>a").attr("href").match("/user/([0-9]+)")[1];
	let cur=0,sum=-1,v=$("<span style='-webkit-touch-callout:none;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;-khtml-user-select:none;user-select:none;position:fixed;top:0;left:0;backdrop-filter:blur(5px);color:#000;display:block;text-align:center;z-index:114514'>正在准备，请稍候</span>");
	v.css({"width":window.innerWidth+"px","height":window.innerHeight+"px","line-height":window.innerHeight+"px"});
	$(document.body).append(v);
	window.addEventListener("resize",function(){
		v.css({"width":window.innerWidth+"px","height":window.innerHeight+"px","line-height":window.innerHeight+"px"});
	})
	function exec(){
		$.get("/api/feed/list?user="+uid).success(function(d){
			if(sum==-1){
				sum=d.feeds.count;
				v.text("共 "+sum+" 条犇犇，已删除 "+cur+" 条");
			}
			if(d.feeds.result.length==0){
				v.text("已经删除完毕qwq");
				setTimeout(function(){location.reload();},1000);
				return;
			}
			let i=0,int=setInterval(function(){
				$.post("/api/feed/delete/"+d.feeds.result[i].id).success(function(){
					v.text("共 "+sum+" 条犇犇，已删除 "+(++cur)+" 条");
					if(++i>=d.feeds.result.length){
						if(d.feeds.count>20){
							setTimeout(function(){exec();},500);
						}else{
							v.text("已经删除完毕qwq");
							setTimeout(function(){location.reload();},1000);
						}
						clearInterval(int);
					}
				});
			},500);
		});
	}
	exec();
}
