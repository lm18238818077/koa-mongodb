const miBack = require('../middleware/mi-back')
const mongoose = require("mongoose");
const User = mongoose.model('User')
module.exports = {
  index: async(ctx, next) => {
    // console.log(ctx)
  },
  // 存入数据库
  saveUser: async(ctx, next) => {
    const params = ctx.request.body
    const { name, age, like } = params
    console.log(params)
    if (name && age && like) {
      try {
        let user = new User({
          name, 
          age, 
          like
        })
        user = user.save()
        ctx.redirect('/user')
        ctx.status = 301;
      } catch (e) {
        ctx.send('Server Error!!')
      }
    } else {
      ctx.body = miBack(1, null, '参数错误')
    }
  },
  getUser: async(ctx, next) => {
    const data = await User.find((err, item) => {
      console.log(item,ctx)
    })
    if (data) {
      await ctx.render('index', {
        user:data
      })
    } else {
      ctx.body = miBack(1, null, '暂无数据')
    }
  },
  add: async(ctx, next) => {
    await ctx.render('useradd')
  },
  delUser: async(ctx, next) => {
    const {id} = ctx.query
    const result = await User.where({
      _id: id
    }).remove()
    try {
      await result
      ctx.body = miBack(0, null)
      ctx.redirect('/user')
    } catch (error) {
      ctx.body = miBack(1, null, 'fuck')
    }
  },
  update: async(ctx, next) => {
    const {id} = ctx.query
    const data = await User.findById(id,(err, item) => {
      console.log(item,ctx)
    })
    if (data) {
      await ctx.render('userUpdate', {
        user:data
      })
    } else {
      ctx.body = miBack(1, null, '暂无数据')
    }
  },
  updateUser: async(ctx, next) => {
    const {name, age, like, id } = ctx.request.body
    const result = await User.where({
      _id: id
    }).update({
      name, 
      age, 
      like
    })
    try {
      await result
      ctx.body = miBack(0, result, 'success')
      ctx.redirect('/user')
    } catch (error) {
      ctx.body = miBack(1, null, 'fuck')
    }
  },
  home: async(ctx, next) => {
    ctx.response.body = '<h1>HOME page</h1>'
  },
  homeParams: async(ctx, next) => {
    ctx.response.body = '<h1>HOME page /:id/:name</h1>'
  },
  login: async(ctx, next) => {
    await ctx.render('home/login', {
      btnName: 'GoGoGo'
    })
  },
  register: async(ctx, next) => {
    // 解构出 app 实例对象
    const { app } = ctx

    let params = ctx.request.body
    let name = params.name
    let password = params.password

    // 留意 service 层的调用方式
    let res = await app.service.home.register(name,password)
    if(res.status == "-1"){
      await ctx.render("home/login", res.data)
    }else{
      ctx.state.title = "个人中心"
      await ctx.render("home/success", res.data)
    }
  }
}