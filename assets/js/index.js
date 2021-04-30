$(function() {
    // 调用getUserInfo获取用户信息
    getUserInfo()
    // 退出功能
    $('#btnLogout').on('click', function() {
        // 提示用户是否退出
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            //do something
            
            // 清除本地储存的token
            localStorage.removeItem('token')
            // 跳转到登录页面
            location.href = '/login.html'

            // 关闭confirm询问框
            layer.close(index);
            
          });
    })
})
// 获取用户基本信息
function getUserInfo() {
    var layer = layui.layer
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        // // header请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            console.log(res);
            if(res.status !==0) return layer.msg(res.message)
            // 调用renderAvatar.sta渲染用户的头像
            renderAvatar(res.data)
        }
        // 不论成功或失败都会调用这个函数
        // complete: function(res) {
        //     console.log(res);
        //     // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        //     // responseJSON
        //     if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 强制清空token和跳转
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    })  
    }
    
// 渲染用户的头像
function renderAvatar(user) {
    // 获取用户名称
    var name = user.nickname || user.username
    // 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if(user.user_pic != null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var fir = name[0].toUpperCase()
        $('.text-avatar').html(fir).show()
    }
}