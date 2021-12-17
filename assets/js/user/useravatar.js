var layer = layui.layer
$(function() {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
        //为上传按钮绑定点击事件
    $('#btnChooseImage').on('click', function() {
        $('#file').click()
    })
    $('#file').on('change', function(e) {
        // 通过e可以拿到所选择的文件
        var fileslist = e.target.files
        if (fileslist.length === 0) {
            return layer.msg('请选择文件')
        }
        // 拿到文件
        var file = e.target.files[0]
            // 将文件转为路径
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    $('#btnUpload').on('click', function() {
        // 拿到用户头像
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
            // 上传至服务器
        $.ajax({
            method: "POST",
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更换头像失败')
                }
                layer.msg('更换头像成功')

                window.parent.getUserinfo()
            }
        })
    })
})