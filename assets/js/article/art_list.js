var layer = layui.layer
var form = layui.form
var laypage = layui.laypage
$(function() {
    // 定义美化时间的过滤器
    function times(n) {
        return n < 10 ? '0' + n : n
    }
    template.defaults.imports.dataFormat = function(date) {
        const dt = new Date(date)
        var y = dt.getFullYear()
        var m = times(dt.getMonth() + 1)
        var d = times(dt.getDate())

        var hh = times(dt.getHours())
        var mm = times(dt.getMinutes())
        var ss = times(dt.getSeconds())

        return y + '-' + m + '-' + d + '-' + ' ' + hh + ':' + mm + ":" + ss
    }

    // 定义查询的参数对象
    var q = {
        pagenum: 1, // 页码值默认请求第一页
        pagesize: 2, // 没页几条数据
        cate_id: '', // 文章分类的Id
        state: '' // 文章发布状态
    }

    ininatrList()
    initCate()

    function ininatrList() {
        $.ajax({
            method: 'GET',
            url: "/my/article/list",
            data: q,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取列表失败')
                }
                var htmlstr = template('tpl-list', res)
                $('#continar').html(htmlstr)
                renderPage(res.total)
            }
        })
    }


    // 初始化文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类数据失败')
                }
                var htmlStr = template('tpl-cate', res)
                $('#listCate').html(htmlStr)
                form.render()
            }
        })
    }

    $('#form-search').on('submit', function(e) {
        e.preventDefault()
            // 首选获取下拉框的值
        var cate_id = $('[name=cate_id]').val()
        var status = $('[name=status]').val()
            // 将值重新赋值给查询参数
        q.state = status
        q.cate_id = cate_id
            // 调用列表渲染函数
        ininatrList()

    })

    // 定义渲染分页的方法
    function renderPage(page) {
        laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
            count: page, //数据总数，从服务端得到
            limit: q.pagesize, // 每页显示几条
            curr: q.pagenum, // 默认选中
            // 
            limits: [2, 3, 5, 10],
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            jump: function(obj, first) {
                // 赋值最新的页码值
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                    // 根据最新的页码请求渲染最新的列表
                if (!first) {
                    ininatrList()
                }

            }
        });
    }

    $('tbody').on('click', '#btn-delete', function(e) {
        var id = $(this).attr('data-id')
        var btn = $('#btn-delete')
        layer.confirm('确定删除？', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')

                    // 数据删除完成之后需要判断这页中还有没有数据如果没有数据了就让页码减一再请求
                    if (btn.length === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    ininatrList()

                }
            })
        })
    })
})