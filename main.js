{
	let uid=$("span.wrapper.hover>span>a").attr("href").match("/user/([0-9]+)")[1];
	let cur=0,sum=-1,v=$("<span style='-webkit-touch-callout:none;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;-khtml-user-select:none;user-select:none;position:fixed;top:0;left:0;backdrop-filter:blur(5px);color:#000;display:block;text-align:center;z-index:114514'>\u6b63\u5728\u51c6\u5907\uff0c\u8bf7\u7a0d\u5019</span>");
	v.css({"width":window.innerWidth+"px","height":window.innerHeight+"px","line-height":window.innerHeight+"px"});
	$(document.body).append(v);
	window.addEventListener("resize",function(){
		v.css({"width":window.innerWidth+"px","height":window.innerHeight+"px","line-height":window.innerHeight+"px"});
	})
	function exec(){
		let b=0;
		$.get("/api/feed/list?user="+uid).success(function(d){
			if(sum==-1){
				sum=d.feeds.count;
				v.text("\u5171 "+sum+" \u6761\u7287\u7287\uff0c\u5df2\u5220\u9664 "+cur+" \u6761");
			}
			if(d.feeds.result.length==0){
				v.text("\u5df2\u7ecf\u5220\u9664\u5b8c\u6bd5qwq");
				v.animate({"opacity":"0"},3000,function(){
					v.remove();
				})
				return;
			}
			let i=0,int=setInterval(function(){
				$.post("/api/feed/delete/"+d.feeds.result[i].id);
				v.text("\u5171 "+sum+" \u6761\u7287\u7287\uff0c\u5df2\u5220\u9664 "+(++cur)+" \u6761");
				if(++i>=d.feeds.result.length){
					if(d.feeds.count>20){
						exec();
					}else{
						v.text("\u5df2\u7ecf\u5220\u9664\u5b8c\u6bd5qwq");
						v.animate({"opacity":"0"},3000,function(){
							v.remove();
						});
					}
					clearInterval(int);
				}
			},200);
		});
	}
	exec();
}
