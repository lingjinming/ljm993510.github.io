define(['jquery'], function($) {

    function Dialog() {}; //定义一个Dialog的类

    Dialog.prototype = {
        alert: function(con, handle) {
            var boundingBox = $("<div class='boundingBox'></div>");
            var btn = $('<input type="button" value="确定">');

            boundingBox.appendTo('body');
            boundingBox.html(con);

            // btn.appendTo(boundingBox);不能写在上面，得等弹框生成后才能appendTo
            btn.appendTo(boundingBox);
            $(btn).on('click', function() {
                handle && handle();
                boundingBox.remove();
            })
        },
        confirm: function() {},
        prompt: function() {}

    }
    return {
        Dialog: Dialog
    }
});