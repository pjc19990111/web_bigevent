var form = layui.form
var layer = layui.layer
$(function() {
    initUserinfo()

    form.verify({
            nickname: function(value) {
                if (value.length > 6) {
                    return '昵称长度必须在1~6个之间'
                }
            }
        })
        // 重置表单数据
    $('#btnreset').on('click', function(e) {
        e.preventDefault()
        initUserinfo()
    })
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        var data = { id: '', nickname: '', email: "" }
        $.ajax({
            method: "POST",
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新失败')
                }
                layer.msg('更新成功')
                    // 调用父页面的方法
                window.parent.getUserInfo()

            }
        })
    })
})

function initUserinfo() {

    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败')
            }
            // 调用form.val()快速为表单赋值
            form.val('formUserInfo', res.data)
        }
    })
}