'use strict';

const request = require('request');
const config = require('../config.default');
const transObjtoURLstr = require('../tools/transObjtoURLstr');
const tables = require('../access/db_modules')
const dao = require('../access/db_dao')

function getAccesstoken(url){
    return new Promise((resolve, reject)=>{
        request(url,(error,response,body)=>{
            if(!error && response.statusCode == 200){
                resolve(JSON.parse(body).access_token);
            }
        });
    });
}

function getUserid(url){
    return new Promise((resolve, reject)=>{
        request(url,(error,response,body)=>{
            if(!error &&response.statusCode == 200){
                resolve(JSON.parse(body).userid);
            }
        })
    })
}

function getUserinfo(url){
    return new Promise((resolve,reject)=>{
        request(url,(error,response,body)=>{
            if(!error &&response.statusCode == 200){
                resolve(body);
            }
        })
    })
}

var fn_signin = async (ctx, next) => {
    // 获取前端传递AuthCode
    var authCode = ctx.request.body.authCode || '';
    // 获取access_token
    var gettoken_data = {
        "appkey" : config.appkey,
        "appsecret" : config.appsecret
    }
    var url_gettoken = config.URL_GET_TOKEN+'?'+transObjtoURLstr(gettoken_data);
    let access_token = await getAccesstoken(url_gettoken)

    // 获取userid
    var getuser_info = {
        "access_token" : access_token,
        "code" : authCode
    }
    var url_getuserinfo = config.URL_GET_USER_INFO+'?'+transObjtoURLstr(getuser_info);
    let userid = await getUserid(url_getuserinfo);

    // 获取用户详情
    var getuser_data = {
        'access_token' : access_token,
        'userid' : userid                       
    }
    var url_getuser = config.URL_USER_GET+'?'+transObjtoURLstr(getuser_data);   
    let userinfo = await getUserinfo(url_getuser);

    // 操作数据库查询unionid是否存在该用户
    (async () => {
        var person = await tables.Student.findOne({
            where: {
                union_id: '1eZ4iPca85HInlgxLdyV5NwiEiE'
            }
        });
        console.log(`find person:`+person);
    })();
    console.log('access_token:'+access_token);
    console.log('userid:'+userid);
    console.log('userinfo:'+userinfo);
    ctx.type = 'application/json;charset=UTF-8';
    ctx.body = access_token;

    // result = request(url_gettoken,(error,response,body)=>{
    //     if(!error && response.statusCode == 200){
    //         access_token = JSON.parse(body).access_token;
    //         // 后台获取用户userid
    //         var getuser_info = {
    //             "access_token" : access_token,
    //             "code" : authCode
    //         }
    //         var url_getuserinfo = config.URL_GET_USER_INFO+'?'+transObjtoURLstr(getuser_info);
    //         let union_id = request(url_getuserinfo,async (error,response,body)=>{
    //             if(!error && response.statusCode == 200){
    //                 let userid = JSON.parse(body).userid;
    //                 // 后台获取用户详情
    //                 var getuser_data = {
    //                     'access_token' : access_token,
    //                     'userid' : userid                       
    //                 }
    //                 var url_getuser = config.URL_USER_GET+'?'+transObjtoURLstr(getuser_data);           
    //                 let union_id =await request(url_getuser,(error,response,body)=>{
    //                     if(!error && response.statusCode == 200){
    //                         let union_id = JSON.parse(body).unionid;
    //                         console.log('unionid:'+union_id);
    //                         return new Promise((re)=>{

    //                         })
    //                     }
    //                 }); 
    //                 let res = union_id.then((res)=>{
    //                     console.log('res:'+res);
    //                     return res;
    //                 })
    //                 console.log('#2'+res);
    //                 return union_id;
    //             }
    //         });
    //         console.log('#3:'+union_id);
    //         return union_id;
    //     }        
    // });




    
    // var func1 = async (ctx, next) => {
    //     var gettoken_data = {
    //         "appkey" : config.appkey,
    //         "appsecret" : config.appsecret
    //     }
    //     var url_gettoken = config.URL_GET_TOKEN+'?'+transObjtoURLstr(gettoken_data);
    //     request(url_gettoken,(error,response,body)=>{
    //         if(!error && response.statusCode == 200){
    //             ctx.body = JSON.parse(body).access_token;
    //             console.log(ctx.body);
    //         }
    //     })();
    //     return ctx.body;
    // };
    // access_token = await func1();


    // new Promise((resolve, reject)=>{
    //     var gettoken_data = {
    //         "appkey" : config.appkey,
    //         "appsecret" : config.appsecret
    //     }
    //     var url_gettoken = config.URL_GET_TOKEN+'?'+transObjtoURLstr(gettoken_data);
    //     request(url_gettoken,(error,response,body)=>{
    //         if(!error && response.statusCode == 200){
    //             resolve(JSON.parse(body).access_token);
    //         }
    //     });
    // }).then((access_token)=>{
    //     console.log('access_token!',access_token);
    // });



    // 请求钉钉API
    // API获取access_token
    // request(url_gettoken,function(error,response,body){
    //     if(!error && response.statusCode == 200){
    //         var access_token = JSON.parse(body).access_token;
    //         var getuser_info = {
    //             "access_token" : access_token,
    //             "code" : authCode
    //         }
    //         var url_getuserinfo = config.URL_GET_USER_INFO+'?'+transObjtoURLstr(getuser_info);

    //         console.log('step1:'+access_token);
            // API获取userid
            // request(url_getuserinfo,function(error,response,body){
            //     if(!error && response.statusCode == 200){
            //         var userid = JSON.parse(body).userid;
            //         var getuser_data = {
            //             'access_token' : access_token,
            //             'userid' : userid                       
            //         }
            //         var url_getuser = config.URL_USER_GET+'?'+transObjtoURLstr(getuser_data);
                    
            //         (function(callback){
            //         // API获取用户详情中的union_id
            //         request(url_getuser,function(error,response,body){
            //             if(!error && response.statusCode == 200){
            //                 // console.log(body);
            //                 union_id = JSON.parse(body).unionid;
            //                 // console.log(typeof(union_id));
            //                 // result = await myfunc(union_id);

            //                 // (async (union_id)=>{
            //                 //     var person = await tables.Department_admin.findOne({
            //                 //         where: {
            //                 //             union_id: `${union_id}`
            //                 //         }
            //                 //     });
            //                 //     console.log('step1:'+person);
            //                 //     return person;
            //                 // })();

            //                 console.log('inner:'+union_id);
            //                 return callback(null,union_id);
            //                 // return result;
            //             }
            //             else{
            //                 console.log('get_user请求出错！')
            //             }
            //         });
            //         console.log('step2:'+union_id);
            //     })();
            //     console.log('step3:'+union_id);



            //     }else{
            //         console.log('user_info请求出错！')
            //     }
            
            
            
            
            // });




    //     }
    //     else{
    //         console.log('access_token请求出错！')
    //     }
    // });
    
    // console.log('userinfo:'+getuser_info);
    // let result = await myfunc(union_id);
    // console.log('step3:'+result);
    // ctx.type = 'application/json;charset=UTF-8';
    // ctx.body = access_token;
};

module.exports = {
    'POST /login': fn_signin,
};