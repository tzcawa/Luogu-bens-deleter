{
	let uid=_feInjection.currentUser.uid,cur,sum,v;
	function wid(w=0){
		return w?innerWidth:innerHeight;
	}
	function work(){
		cur=0;sum=-1;v=$("<span style='position:fixed;top:0;left:0;backdrop-filter:blur(5px);color:#000;display:block;text-align:center;z-index:114514'>正在准备，请稍候</span>");
		v.css({"width":wid(1)+"px","height":wid()+"px",lineHeight:wid()+"px"});
		$(document.body).append(v);
		addEventListener("resize",function(){
			v.css({"width":wid(1)+"px","height":wid()+"px",lineHeight:wid()+"px"});
		});
		exec();
	}
	function exec(){
		$.get("/api/feed/list?user="+uid).success(function(d){
			if(sum==-1){
				sum=d.feeds.count;
				v.text("共"+sum+"条犇犇，已删除"+cur+"条");
			}
			if(d.feeds.result.length==0){
				v.text("已经删除完毕qwq");
				setTimeout(function(){location.reload();},1000);
				return;
			}
			let i=0,int=setInterval(function(){
				$.post("/api/feed/delete/"+d.feeds.result[i].id).success(function(){
					v.text("共"+sum+"条犇犇，已删除"+(++cur)+"条");
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
        work();
}
