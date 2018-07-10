define(['jquery'], function($) {

    function Dialog() {
        this.config = {
            width: 500,
            height: 300,
            con: '默认显示的内容',
            handle: null
        }
    }; //定义一个Dialog的类

    Dialog.prototype = {
        alert: function(config) {
            var CONFIG = $.extend(this.config, config);

            var boundingBox = $("<div class='boundingBox'></div>");
            var btn = $('<input type="button" value="确定">');

            boundingBox.appendTo('body');
            boundingBox.html(CONFIG.con);

            // btn.appendTo(boundingBox);不能写在上面，得等弹框生成后才能appendTo
            btn.appendTo(boundingBox);
            $(btn).on('click', function() {
                CONFIG.handle && CONFIG.handle();
                boundingBox.remove();
            });
            // 加入配置
            // $.extend(this.config, config); //注意extend的用法
            $(boundingBox).css({
                width: CONFIG.width + 'px',
                height: CONFIG.height + 'px',
                left: (CONFIG.x || (window.innerWidth - CONFIG.width) / 2) + 'px',
                top: (CONFIG.y || (window.innerHeight - CONFIG.height) / 2) + 'px',
            })

        },
        confirm: function() {},
        prompt: function() {}

    }
    return {
        Dialog: Dialog
    }
});