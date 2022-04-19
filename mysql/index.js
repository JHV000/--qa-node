const mysql = require('mysql')

const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'411322',
    database:'qasystem'
})

/**
 * 查询数据
 */
// db.query('select * from user',(err,res)=>{
//     if(err)return console.log(err.message);
//     console.log(res);
// })

/**
 * 插入新数据
 */
// const user = {uid:'00001',username:'jhv',password:'88888'}
// const sqlStr = 'insert into user (uid,username,password) values (?,?,?)'

// db.query(sqlStr,[user.uid,user.username,user.password],(err,res)=>{
//     if(err)return console.log(err.message);
//     if(res.affectedRows === 1)console.log("插入成功！");
    
// })


/**
 * 更新数据
 */
// const user = {uid:'00002',username:'wzq',password:'88888'}
// const sqlStr = 'update user set ? where uid = ?'

// db.query(sqlStr,[user,user.uid],(err,res)=>{
//     if(err)return console.log(err.message);
//     if(res.affectedRows === 1)console.log("更新成功！");
    
// })

/**
 * 删除数据
 */
// const sqlStr = 'delete from user where uid = ?'

// db.query(sqlStr,0001,(err,res)=>{
//     if(err)return console.log(err.message);
//     if(res.affectedRows === 1)console.log("删除成功！");
    
// })