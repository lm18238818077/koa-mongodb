#  MongoDB

 - 官网：http://mongoosejs.com

 - 官方指南：https://mongoosejs.com/docs/guide.html

 - 官方API文档 ：https://mongoosejs.com/docs/api.html

 - 参考手册：https://cnodejs.org/topic/548e54d157fd3ae46b233502

   ## 1.MongoDb数据库的基本概念

   - 可以有多个数据库
   - 一个数据库可以有多个集合
   - 一个集合可以有多个文档（表记录）
   - 文档结构很灵活，没有任何限制
   - MongoDB非常灵活，不需要像MySQL一样先常见数据库，表，设计表结构
     - 在这里只需要，当你需要插入数据的时候，只需要指定在那个数据库的哪个集合操作就可以了
     - 一切都有MongoDB来帮你自动完成建库建表这件事

   ## 2.起步

   安装：

   ``` shell
   npm i mongoose
   ```

   hello world:

   ``` shell
   var mongoose = require('mongoose');
   
   // 连接 MongoDB 数据库
   mongoose.connect('mongodb://localhost/test', { useMongoClient: true });
    //test 数据库中的集合名称, 不存在会创建.
   mongoose.Promise = global.Promise;
   
   // 创建一个模型
   // 就是在设计数据库
   // MongoDB 是动态的，非常灵活，只需要在代码中设计你的数据库就可以了
   // mongoose 这个包就可以让你的设计编写过程变的非常的简单
   var Cat = mongoose.model('Cat', { name: String });
   
   for (var i = 0; i < 100; i++) {
     // 实例化一个 Cat
     var kitty = new Cat({ name: '喵喵' + i });
   
     // 持久化保存 kitty 实例
     kitty.save(function (err) {
       if (err) {
         console.log(err);
       } else {
         console.log('meow');
       }
     });
   }
   
   ```

   ## 3.官方指南

   ### 3.1设计Scheme发布Model

   ```javascript
   var mongoose = require('mongoose')
   
   var Schema = mongoose.Schema
   
   // 1. 连接数据库
   // 指定连接的数据库不需要存在，当你插入第一条数据之后就会自动被创建出来
   mongoose.connect('mongodb://localhost/itcast')
   
   // 2. 设计文档结构（表结构）
   // 字段名称就是表结构中的属性名称
   // 约束的目的是为了保证数据的完整性，不要有脏数据
   var userSchema = new Schema({
     username: {
       type: String,
       required: true // 必须有
     },
     password: {
       type: String,
       required: true
     },
     email: {
       type: String
     }
   })
   
   // 3. 将文档结构发布为模型
   //    mongoose.model 方法就是用来将一个架构发布为 model
   //    第一个参数：传入一个大写名词单数字符串用来表示你的数据库名称
   //                 mongoose 会自动将大写名词的字符串生成 小写复数 的集合名称
   //                 例如这里的 User 最终会变为 users 集合名称
   //    第二个参数：架构 Schema
   //   
   //    返回值：模型构造函数
   var User = mongoose.model('User', userSchema)
   
   
   // 4. 当我们有了模型构造函数之后，就可以使用这个构造函数对 users 集合中的数据为所欲为了（增删改查）
   
   ```

   ### 3.2增加数据

   ```javascript
    var admin = new User({
      username: 'zs',
      password: '123456',
      email: 'admin@admin.com'
    })
   
    admin.save(function (err, ret) {
      if (err) {
        console.log('保存失败')
      } else {
        console.log('保存成功')
        console.log(ret)
      }
    })
   ```

   ### 3.3查询

   查询所有：

   ```javascript
   User.find(function (err, ret) {
     if (err) {
       console.log('查询失败')
     } else {
       console.log(ret)
     }
   })
   ```

   按条件查询所有：

   ```javascript
   User.find({
     username: 'zs' //  查询正则/joe/i
   }, function (err, ret) {
     if (err) {
       console.log('查询失败')
     } else {
       console.log(ret)
     }
   })
   
//find( {"$where" :  "this.x + this.y === 10" } ).sort( {“username”:1 , “age”:-1 } // ).limit(3)	
   //排序 键对应文档的键名, 值代表排序方向, 1 升序, -1降序
```
   
   按条件查询单个：
   
   ```javas
   User.findOne({
     username: 'zs'
   }, function (err, ret) {
     if (err) {
       console.log('查询失败')
     } else {
       console.log(ret)
  }
   })
```
   
### 3.4删除数据
   
   根据条件删除所有
   
   ```javascript
   User.remove({
     username: 'zs'
   }, function (err, ret) {
     if (err) {
       console.log('删除失败')
     } else {
       console.log('删除成功')
       console.log(ret)
  }
   })
```
   
   根据条件删除一个：
   
```
   findOneAndRemove(conditions, options, callback)
```
   
   根据id删除一个
   
```
   findByIdAndRemove(id, options, callback)
```
   
### 3.5更新数据
   
   根据条件更新所有：
   
```javascript
   Model.update(query, { name: 'jason bourne' }, options, callback);
```
   
   根据条件更新一个：
   
```javas
   findOneAndUpdate(conditions, update, options, callback)
```
   
   根据id更新一个：
   
   ```javascript
   User.findByIdAndUpdate('5a001b23d219eb00c8581184', {
     password: '123'
   }, function (err, ret) {
     if (err) {
       console.log('更新失败')
     } else {
       console.log('更新成功')
  }
   })
   ```
   
   



 - ## 下载

   下载地址 `https://www.mongodb.com/`

   将安装的bin目录添加到环境变量

   检查是否安装成功 控制台中 `mongod`

   效果 `2018-10-06T14:04:57.439+0800 I CONTROL [initandlisten] now exiting 2018-10-06T14:04:57.439+0800 I CONTROL [initandlisten] shutting down with code:100`

   查看mongoDB的版本

   ```shell
   mongod --version
   ```

- ## 启动

  mongod --dbpath=C:\data\db  

  需要手动新建目录/data/db

- ## 停止

  关闭cmd窗口或者 ctrl+c

- ## 链接MongoDB 

  1.在开始mongod 的情况下 新开一个cmd窗口

  2.输入`mongo`

  3.退出 `exit`

- ##  基本操作 

  1.show dbs :查看数据库

  2.use 数据库名字 ：切换到指定数据库 如果没有也会链接 插入数据时才会创建这个数据库

  3.db ：查看当前所属数据库

  4.db.表名.insertOne({"name":"tom"}):向指定集合(表)插入数据

  5.show collections :查看当前数据库的所有表

  6.db.表名.find()：查询指定表中的所有数据

