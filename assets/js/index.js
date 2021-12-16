var layer = layui.layer
$(function() {
    // 获取用户信息
    setTimeout(function() {
        getUserinfo()
    }, 50)

    $('#btnLogout').on('click', function() {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' },
            function(index) {
                //do something
                localStorage.removeItem('token')
                location.href = './login.html'
                layer.close(index);
            });
    })
})

function getUserinfo() {
    $.ajax({
        method: "GET",
        url: '/my/userinfo',
        data: {},
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败！')
            }
            renderAvatar(res.data)
        },
        // complete: function(res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token') // 强制清除token
        //         location.href = './login.html' // 跳转到登录页面
        //     }
        // }
    })
}
// 渲染用户信息的方法
function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#weclome').html('欢迎&nbsp;&nbsp;' + name)
    var img = user.user_pic
    if (img !== null) {
        // $('.layui-nav-img')
        $('.layui-nav-img').attr('src', img).show()
        $('.text-avatar').hide()
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide()
        var fistr = name[0].toUpperCase()
        $('.text-avatar').html(fistr)
    }
}