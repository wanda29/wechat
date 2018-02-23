   const express=require('express');
   const  wechat= require("wechat");
   const  mysql= require('mysql');



   let config={
       token:'weixin',
       appid:'wxca81f110c81b7808',
       encodingAESKey:'dopZLlp3VkjQgBwM7ujw3gUMToIBZeVAkNAoViEYMQu',
       checkSignature:true

   }
   let pool=mysql.createPool({
       user:'root'
   });
    let app=new express();


   app.use(express.query());

    app.use("/",wechat(config,(req,res)=>{
        let message=req.weixin;
        // let  htmlUrl='http://www.w3school.com.cn/html/index.asp';
        // console.log(message.Content);
        // if(message.Content.includes('html')) {
        //     res.reply(htmlUrl);
        // }else {
        //     res.reply({
        //         title:'文章标题',
        //         description:'文章描述信息',
        //         picUrl:'https://unsplash.com/photos/GI1hwOGqGtE',
        //         url:'https://cn.bing.com'
        //     });
        // }
        let content=message.Content;
        let sql= "select *from db.chat where question like ?";
        pool.query(sql,[content],(err,results)=>{
            if(results.length===1){
                res.reply(results[0].answer);
            }else{
                res.reply("你说什么，我听不懂？");
            }
        });
        })
    );
    app.listen(4000);