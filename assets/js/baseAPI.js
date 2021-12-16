// 每次发起ajax时都会先调用这个函数
// 这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // 在真正发起ajax之前拼接一次url
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url

    //    统一设置请求
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token')
        }
    }
    options.complete = function(res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token') // 强制清除token
            location.href = './login.html' // 跳转到登录页面
        }
    }

})