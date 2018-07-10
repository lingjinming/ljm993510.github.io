define(['jquery'], function($) {

    function Dialog() {
        this.config = {
            width: 500,
            height: 300,
            con: '默认显示的内容', //默认显示的内容
            handle: null, //函数
            title: '系统消息', //标题
            hasCloseBtn: false, //是否有关闭按钮
            skinThemeName: '', //弹框皮肤主题
            btnTxt: '确定', //默认按钮文字
            hasMask: true, //添加遮罩
            handleAlertBtn: function() {
                alert('you clicked confirm')
            },
            handleCloseBtn: function() {
                alert('you clicked closetbtn')
            },
        }
    }; //定义一个Dialog的类

    Dialog.prototype = {

        alert: function(config) {
            var CONFIG = $.extend(this.config, config); //extend强大之处

            var boundingBox = $("<div class='boundingBox'><div class='head'>" + CONFIG.title + "</div><div class='con'>" + CONFIG.con + "</div><div class='foot'><input id='btn' type='button' value=" + CONFIG.btnTxt + "></div></div>");
            var boundingBox_btn = boundingBox.find('#btn');
            boundingBox.appendTo('body');

            mask = null;
            if (CONFIG.hasMask) {
                mask = $('<div class="mask"></div>');
                mask.appendTo('body')
            }

            boundingBox_btn.on('click', function() {
                CONFIG.handleAlertBtn && CONFIG.handleAlertBtn();
                boundingBox.remove();
                mask && mask.remove();
            });
            // 加入配置
            // $.extend(this.config, config); //注意extend的用法

            $(boundingBox).css({
                width: CONFIG.width + 'px',
                height: CONFIG.height + 'px',
                left: (CONFIG.x || (window.innerWidth - CONFIG.width) / 2) + 'px',
                top: (CONFIG.y || (window.innerHeight - CONFIG.height) / 2) + 'px',
            });
            if (CONFIG.hasCloseBtn) { //判断是否有关闭按钮
                var closeBtn = $("<span class='closeBtn'>X</span>");
                closeBtn.appendTo($('.boundingBox .head'));
                closeBtn.on('click', function() {
                    CONFIG.handleCloseBtn && CONFIG.handleCloseBtn();
                    boundingBox.remove();
                    mask && mask.remove();
                })
            };
            if (CONFIG.skinThemeName) {
                boundingBox.addClass(CONFIG.skinThemeName)
            }



        },
        confirm: function() {},
        prompt: function() {}

    }
    return {
        Dialog: Dialog
    }
});