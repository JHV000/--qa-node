const express = require('express')
const router = express.Router()

/**
 * 导入jwt,并设置密钥
 **/
 const jwt = require('jsonwebtoken')
 //设置加密、解密的密钥
 const secretKey = 'JHV000 love wzq520'
// 监听get请求
// 参数：url，包含req、res的函数

//通过req.query获取查询字符串方式（即通过url传递参数）的请求参数
//通过req.params获取动态参数(即带：的动态参数) ‘/api/article/:id ’
//以上两者默认都是空对象
router.get('/admin/getUserInfo', (req, res) =>{
    const info = req.user
    console.log(req.user);
    res.send({
        code:200,
        msg:'获取成功！',
        data:info
    })
})

router.post('/user/login', (req, res) =>{
    const userinfo = req.body
    if(userinfo.username == 'admin' && userinfo.password == '8888'){

        //sign(用户的信息对象，密钥，有效时间)
        const tokenStr = jwt.sign({username:userinfo.username},secretKey,{expiresIn:'10000s'})
        return res.send({
            code:200,
            msg:'登录成功！',
            token:tokenStr
        })
    }
    
    res.send('ok')
} )




module.exports = router