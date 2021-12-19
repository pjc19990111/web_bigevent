var layer = layui.layer
var form = layui.form
$(function() {
    function initCate() {
        $.ajax({
            method: "GET",
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类列表失败')
                }
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }
    initCate()
    initEditor()
        // 1.3 创建裁剪区域
    $image.cropper(options)

    $('#btnImg').on('click', function() {
        console.log(111);
        $('#coverFile').click()
    })
    $('#coverFile').on('change', function(e) {
        // 获取文件列表
        var files = e.target.files
        if (files.length === 0) {
            return
        }
        var newImgURL = URL.createObjectURL(files[0])
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options)

    })
    var atr_status = '已发布'
    $('#btnSave').on('click', function() {
        atr_status = '草稿'
    })
    $('#form-pub').on('submit', function(e) {
        e.preventDefault()
        var fd = new FormData($(this)[0])
        fd.append('status', atr_status)
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
            })
        publishAtrtivle(fd)
    })

    function publishAtrtivle(fd) {
        $.ajax({
            method: "POST",
            url: "/my/article/add",
            data: fd,
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('发布失败')
                }
                layer.msg("发布成功")
                location.href = '/article/art_list.html'
            },

        })
    }

})