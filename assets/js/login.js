$(function() {
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })


    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    var form = layui.form
    var layer = layui.layer
        // 通过偶verify自定义校验规则
    form.verify({
            username: {

            },
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            repwd: function(value) {
                // 通过形参拿到当前的值
                // 拿到密码框中的值
                // 进行一次校验
                // 如果不一致则返回一个错误消息
                var pwd = $('.reg-box [name=password]').val()
                if (pwd !== value) {
                    return '两次密码不一致'
                }

            }
        })
        //注册
    $('#form_reg').on('submit', function(e) {

            e.preventDefault()
            const data = { username: $('.reg-box [name=username]').val(), password: $('.reg-box [name=password]').val() }
            $.post('http://api-breakingnews-web.itheima.net/api/reguser', data, function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功！，请登录');
                $('#link_login').click()
            })
        })
        // 登录
    $('#form_login').on('submit', function(e) {
        const data = { username: $('.login-box [name=username]').val(), password: $('.login-box [name=password]').val() }

        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: "POST",
            // 快速获取当前表单数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 将登陆成功得到的token存到localStorage中
                localStorage.setItem('token', res.token)
                layer.msg('登录成功');
                location.href = '/index.html'
            }
        })
    })

})