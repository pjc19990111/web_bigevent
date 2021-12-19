var layer = layui.layer
var form = layui.form
$(function() {
    function initarticlelist() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                console.log(res.data);
                var html = template('tpl-table', res)
                $('#continar').html(html)
            }
        })
    }
    initarticlelist()
    var index = null
    $('#btnAddCate').on('click', function() {
        index = layer.open({
            type: '1',
            title: '添加文章类型',
            area: ['500px', '250px'],
            content: $('#dia-add').html()
        });

    })
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败')
                }
                layer.msg('新增分类成功')
                initarticlelist()
                layer.close(index)
            }
        })

    })


    // 弹出修改层
    var indexEdit = null
    $('tbody').on('click', '#btn-update', function(e) {
        indexEdit = layer.open({
            type: '1',
            title: '修改文章类型',
            area: ['500px', '250px'],
            content: $('#dia-update').html()
        });
        var id = $(this).attr('data-id')
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            // data: { id },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取列表信息失败')
                }
                form.val('form-update', res.data)
            }

        })
    })

    $('body').on('submit', '#form-update', function(e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('修改分类失败')
                }
                layer.msg('修改分类成功')
                initarticlelist()
                layer.close(indexEdit)
            }
        })
    })

    $('tbody').on('click', '#btn-delete', function(e) {
        var id = $(this).attr('data-id')
        layer.confirm('确定删除？', { icon: 3, title: '提示' },
            function(index) {
                $.ajax({
                    method: 'GET',
                    url: '/my/article/deletecate/' + id,
                    // data: { id },
                    success: function(res) {
                        if (res.status !== 0) {
                            return layer.msg('删除失败')
                        }
                        layer.msg('删除成功')
                        layer.close(index)
                        initarticlelist()

                    }

                })

            })

    })
})