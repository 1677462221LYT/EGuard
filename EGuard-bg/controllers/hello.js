'use strict';

const config = require('../config.default');
const crypto = require('crypto');
const hmac = crypto.createHmac('sha256', config.appSecret);
const request = require('request');
const tables = require('../access/db_modules')

function getUserinfo(url,requestData){
    return new Promise((resolve,reject)=>{
        request({
            url: url,
            method: "POST",
            json: true,
            headers: {
                "content-type": "application/json",
            },
            body: requestData
        }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(body.user_info);
            }
        }); 
    })
}

var fn_hello = async (ctx, next) => {
    let url = ctx.request.url;
    let department_id = url.split('?')[1].split('&')[0]; 
    let code = url.split('code=')[1].split('&state=')[0];
    let timestamp = new Date().getTime();
    hmac.update(''+timestamp);
    let signature = encodeURIComponent(hmac.digest('base64'));
    let requestUrl = config.URL_USERINFO_BYCODE+'?signature='+signature+'&timestamp='+timestamp+'&accessKey='+config.appId
    let requestData = {
        "tmp_auth_code": code
    }
    let userinfo = await getUserinfo(requestUrl,requestData);
    let unionid = userinfo.unionid;

    // 操作数据库查询unionid是否存在该用户
    var admin = await tables.Department_admin.findOne({
        where: {
            union_id: unionid
        }
    });
    ctx.type = 'text/plain; charset=utf-8';
    if(admin){
        ctx.body = '你好，管理员-'+admin.name+'!允许出入...';
    }
    else{
        var student = await tables.Student.findOne({
            where: {
                union_id: unionid
            }
        });
        if(student){
            if(student.is_indormi){
                ctx.body = '你好，'+student.name+'同学!一路顺风~允许出入...';
            }
            else{
                ctx.body = '你好，'+student.name+'欢迎回来~允许出入...'
            }
            let insert = {
                sign_time: timestamp,
                union_id: unionid,
                department_id: department_id,
                sign_state: !student.is_indormi
            }
            // 向出入登记记录表中插入一条新记录
            tables.Sign_record.create(insert);
            // 修改反转是否在寝标志位
            let pram = {'is_indormi':!student.is_indormi}
            tables.Student.update(
                pram,{
                    'where':{'union_id':unionid}
                }
            )
        }
        else{
            console.log('该用户不存在！禁止出入...');
            ctx.body = '该用户不存在！禁止出入...';
        }
    }
};

module.exports = {
    'GET /hello': fn_hello
};