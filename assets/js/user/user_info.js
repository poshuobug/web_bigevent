$(function() {
    var form = layui.form
    var layer = layui.layer

    form.verify({
        nickname: function(value){ //value：表单的值、item：表单的DOM对象
          if(value.length > 6) {
              return '昵称长度必须在1~6个字符之间！'
          }
        }
    })
    initUserInfo()
    // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: function(res) {
                console.log(res);
                if(res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                // 调用form.val()快速为表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 重置表单
    $('#btnReset').on('click', function(e) {
        // 阻止表单默认重置行为
        e.preventDefault();
         initUserInfo()
    })

    // 修改表单信息
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        // 发起请求
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) return layer.msg('修改用户信息失败！')
                layer.msg(res.message)
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }
        })
    })
})