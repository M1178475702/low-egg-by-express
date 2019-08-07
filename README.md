# low-egg-by-express
用express封装的超低配egg

主要问题及思路：

除了一般的loader之外，最关键的是，如何在router中实例化controller，并指定对应的方法
egg在router中指定controller的方式为  controller.method
但是controller确是延后实例的
在指定方式指定到method的情况，如何实例controller是一个问题

首先确定一个东西，表达式最后返回的，一定是请求处理函数
如 function(req,res,next)  的样子
那么，可以在这个处理函数中，实例化对应的controller类，并调用对应的method
于是确定问题，如何在只通过表达式的前提下，在处理函数中，获知要实例化的类，以及调用方法
此外，还要考虑嵌套controller的情况

最终采用了proxy的方法
使用proxy，在通过proxy调用对象方法的时候，可以知道调用的方法名
基于此，首先对 app.controller进行proxy封装
当访问的是对象时（嵌套目录），则对这个对象进行相同的proxy封装（这里使用this获取该handler）
当访问的是类时，则先封装一个对象，一个字段记录这个类的类名。然后为该对象增加proxy
当访问该对象的方法时，通过该对象存储的类名，获取该controller类，然后将其实例化，最后再调用该类对应的方法。
由此，实现了egg风格的controller
