require.config({
    paths: {
        jquery: './src/jquery',
        dialog: './util/dialog'
    }
})

require(['jquery', 'dialog'], function($, d) {
    $('#btn').on('click', function() {

        new d.Dialog().alert({
            title: '自己设置的标题',
            con: '如果不配置相应参数，则会使用dialog.prototype里面设置的默认属性的值',
            handle: function() {
                alert('you clidked button')
            },
            width: 500,
            height: 400,
            y: 100,
            hasCloseBtn: true
        })

    })
})