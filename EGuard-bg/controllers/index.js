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
                console.log('inner.userid:'+body);
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
    console.log('authCode:'+authCode);
    // 获取access_token
    var gettoken_data = {
        "appkey" : config.appkey,
        "appsecret" : config.appsecret
    }
    var url_gettoken = config.URL_GET_TOKEN+'?'+transObjtoURLstr(gettoken_data);
    let access_token = await getAccesstoken(url_gettoken)
    console.log('accesstoken:'+access_token);
    // 获取userid
    var getuser_info = {
        "access_token" : access_token,
        "code" : authCode
    }
    var url_getuserinfo = config.URL_GET_USER_INFO+'?'+transObjtoURLstr(getuser_info);
    let userid = await getUserid(url_getuserinfo);
    console.log('userid:'+userid);
    // 获取用户详情
    var getuser_data = {
        'access_token' : access_token,
        'userid' : userid                       
    }
    var url_getuser = config.URL_USER_GET+'?'+transObjtoURLstr(getuser_data);   
    let userinfo = await getUserinfo(url_getuser);
    let objUserinfo = JSON.parse(userinfo);
    let unionid = objUserinfo.unionid;
    console.log('unionid:'+unionid);
    
    // 操作数据库查询unionid是否存在该用户
    var person = await tables.Department_admin.findOne({
        where: {
            union_id: unionid
        }
    });
    if(person){
        var department = await tables.Department.findOne({
            where:{
                department_id : person.department_id
            }
        }) ;
        person.dataValues.dormi_name = department.department_name;
        
        ctx.type = 'application/json;charset=UTF-8';
        ctx.body = person;
    }
    else{
        console.log('该用户不存在');
        ctx.type = 'text/plain; charset=utf-8',
        ctx.body = '该用户不存在';
    }   
};

module.exports = {
    'POST /login': fn_signin,
};