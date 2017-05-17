[TOC]
##jquery validate remote的用法
有时候我们不仅仅对表单所录入的信息进行验证还需要将录入的值与数据库进行比较，这时我们就需要借助remote方法来实现
```
rules: {
                Email: {
                    required: true,
                    email: true                    
                },
                Password: {
                    required: true,
                    remote: {
                        url: "/Users/Login",
                        type: "Post",
                        data: {
                            Email: function () { return $("#Email").val(); },
                            Password:function(){return $("#Password").val();}
                        }
                    }
                   
                },
                remember: {
                    required: false
                }
            },
```