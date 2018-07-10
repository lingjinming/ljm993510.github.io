require.config({
    paths: {
        jquery: './src/jquery',
        dialog: './util/dialog'
    }
})

require(['jquery', 'dialog'], function($, d) {
    $('#btn').on('click', function() {
        new d.Dialog().alert('welcome')
    })
})