// 每次发起ajax时都会先调用这个函数
// 这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // 在真正发起ajax之前拼接一次url
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
})