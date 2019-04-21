'use strict';

const tables = require('../access/db_modules')


var visitor = async (ctx, next) => {
    // 获取前端传递的formdata
    var formdata = ctx.request.body || '';
    // 表单当前提交时间
    let timestamp = new Date().getTime();
    formdata.timestamp = timestamp;
    // console.log(formdata);
    // 向访客登记记录表中插入一条新记录
    tables.Visit_record.create(formdata);
    // ctx.type = 'application/json;charset=UTF-8';
    ctx.type = 'text/plain; charset=utf-8';
    ctx.body = '来访登记提交成功！';
}

module.exports = {
    'POST /visitor': visitor,
};