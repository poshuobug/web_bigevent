$(function() {
    var form = layui.form
    var layer = layui.layer

    form.verify({
        pwd: [/^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'],
        samePwd: function(value) {
            if(value === $('[name=oldPwd]').val()) {
                return '新密码与旧密码不能相等'
            }
        },
        rePwd: function(value) {
            if($('[name=newPwd]').val() !== value) {
                return '两次密码不一致'
            }
        }
    })


    // 
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        var data = {
            oldPwd: $('[name=oldPwd]').val(),
            newPwd: $('[name=newPwd]').val()


        }
        $.ajax({
            type: 'post',
            url: '/my/updatepwd',
            data: data,
            success: function(res) {
                if(res.status !== 0) return layer.msg('密码修改失败')
                layer.msg(res.message)
                // 重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})