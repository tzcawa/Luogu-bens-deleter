{
    const p=400;
    let uid=_feInjection.currentUser.uid,
    cur=0,
    sum=-1,
    v=$("<div style='position:fixed;width:100%;height:100%;padding-top:5em;top:0;left:0;background-color:#fff;opacity:0.7;color:#000;display:block;text-align:center;z-index:114514'><p style='font-size:3em'>正在准备，请稍候</p></div>"),
    w=$("<div style='font-size:1em'></div>"),
    sto=setTimeout;
    v.append(w);
    $("body").append(v);
    function exec(){
        $.get("/api/feed/list?user="+uid,function(d){
            if(sum==-1){
                sum=d.feeds.count;
                v.children("p").text("正在删除共"+sum+"条犇犇");
            }
            if(d.feeds.result.length==0){
                w.text("已经删除完毕qwq");
                sto(function(){location.reload();},1000);
                return;
            }
            function delb(i,r,nr){
                if(r>3){
                    w.text("暂时放弃了第"+(cur+1)+"条犇犇（id"+d.feeds.result[i].id+"）的删除。");
                    sto(function(){delb(i+1,0,1)},p);
                    return;
                }
                if(i>=d.feeds.result.length){
                    if(d.feeds.count>20||nr) sto(exec,p);
                    else{
                        w.text("已经删除完毕qwq");
                        sto(function(){location.reload();},1000);
                    }
                    return;
                }
                $.post("/api/feed/delete/"+d.feeds.result[i].id,function(k){
                    if(k.status!=200){
                        if(r<=2) w.text("删除第"+(cur+1)+"条犇犇（id"+d.feeds.result[i].id+"）时出了"+(r+1)+"点问题。将要重试。");
                        sto(function(){delb(i,r+1,nr);},p);
                    }else{
                        w.text("成功删除了"+(++cur)+"条犇犇（id"+d.feeds.result[i].id+"）");
                        sto(function(){delb(i+1,0,nr)},p);
                    }
                }).error(function(){
                    if(r<=2) w.text("删除第"+(cur+1)+"条犇犇（id"+d.feeds.result[i].id+"）时出了"+(r+1)+"点问题。将要重试。");
                    sto(function(){delb(i,r+1,nr);},p);
                });
            }
            delb(0,0);
        }).error(function(){
            w.text("获取犇犇时出了一点问题。将要重试。");
            sto(exec,p);
        });
        w.text("正在获取犇犇。");
    }
    exec();
}
