$(function() {
    // 点击注册使登陆表单隐藏，注册表单显示
    $('#link_reg').on('click', function() {
        $('.login-form').hide()
        $('.register-form').show()
    })
    // 点击去登录使注册表单隐藏，登录表单显示
    $('#link_login').on('click', function() {
        $('.login-form').show()
        $('.register-form').hide()
    })

    
    // 从layui从获取form对象
    var form = layui.form
    var layer = layui.layer
    // 通过form.verify函数自定义校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        //   校验两次的密码是否一致
        repwd: function(value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行判断
           var pwd = $('.register-form [name=password]').val()
            if(pwd !== value) return '两次密码不一致!';
        }
        })


        // 监听注册表单提交事件
        $('#form_reg').on('submit', function(e) {
            // 阻止默认表单提交
            e.preventDefault()
            var data = {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            }
            // 发起ajax请求
            $.ajax({
                type: 'POST',
                url: '/api/reguser',
                data: data,
                success: function(res) {
                    if(res.status !==0) return layer.msg(res.message);
                    layer.msg('注册成功');
                    $('#link_login').click();
                }
            })
        })

        // 监听登录表单提交事件
        $('#form-login').on('submit', function(e) {
            // 阻止默认表单提交
            e.preventDefault()
            var data = $('#form-login').serialize()
            // 发起ajax请求
            $.ajax({
                type: 'post',
                url: '/api/login',
                data: data,
                success: function(res) {
                    if(res.status !== 0) return layer.msg('登录失败')
                    layer.msg(res.message)

                    
                    // 将登陆成功后得到的token字符串，保存到localStorage中
                    localStorage.setItem('token', res.token)
                    // 跳转到后台主页
                    location.href = '/index.html'
                }
            })
        })
})
