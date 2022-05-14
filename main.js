{
  const p=400;
	let uid=_feInjection.currentUser.uid,cur,sum,v;
	cur=0;sum=-1;v=$("<div style='position:fixed;width:100%;height:100%;padding-top:5em;font-size:3em;top:0;left:0;backdrop-filter:blur(5px);color:#000;display:block;text-align:center;z-index:114514'>正在准备，请稍候</div>");
	$("body").append(v);
  function sto(f,t){setTimeout(f,t);}
	function exec(){
		$.get("/api/feed/list?user="+uid,function(d){
			if(sum==-1){
				sum=d.feeds.count;
				v.text("共"+sum+"条犇犇，已删除"+cur+"条");
			}
			if(d.feeds.result.length==0){
				v.text("已经删除完毕qwq");
				sto(function(){location.reload();},1000);
				return;
			}
      function delb(i){
        if(i>=d.feeds.result.length){
          if(d.feeds.count>20) sto(exec,p);
          else{
            v.text("已经删除完毕qwq");
            sto(function(){location.reload();},1000);
          }
          return;
        }
        $.post("/api/feed/delete/"+d.feeds.result[i].id,function(d){
          if(d.status!=200) sto(function(){delb(i);},p);
          else{
            v.text("共"+sum+"条犇犇，已删除"+(++cur)+"条");
            sto(function(){delb(i+1)},p);
          }
        }).error(function(){
          sto(function(){delb(i);},p);
        });
      }
      delb(0);
		}).error(function(){sto(exec,500)});
	}
  exec();
}
