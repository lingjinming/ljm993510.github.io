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
            isDraggable: true, //是否可拖拽
            dragHandle: null, //拖动把手
            handleAlertBtn: null,
            handleCloseBtn: null,
        };
        this.handlers = {
            //利用观察者模式实现封装自定义事件，而不用去关注底层的事件如鼠标点击等
        };
    }; //定义一个Dialog的类

    Dialog.prototype = {

        alert: function(config) {
            var that = this;
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
                // CONFIG.handleAlertBtn && CONFIG.handleAlertBtn();
                boundingBox.remove();
                mask && mask.remove();
                that.fire('alert')
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
                    // CONFIG.handleCloseBtn && CONFIG.handleCloseBtn();
                    boundingBox.remove();
                    mask && mask.remove();
                    that.fire('close')

                })
            };
            if (CONFIG.skinThemeName) {
                boundingBox.addClass(CONFIG.skinThemeName)
            };
            if (CONFIG.isDraggable) {
                if (CONFIG.dragHandle) {
                    boundingBox.draggable({
                        handle: CONFIG.dragHandle
                    });
                } else {
                    boundingBox.draggable()
                }
            };
            if (CONFIG.handleAlertBtn) {
                this.on('alert', CONFIG.handleAlertBtn)
            };
            if (CONFIG.handleCloseBtn) {
                this.on('alert', CONFIG.handleCloseBtn)
            };


        },
        confirm: function() {},
        prompt: function() {},
        on: function(type, handler) {
            if (typeof this.handlers[type] == 'undefined') {
                this.handlers[type] = [];
            };
            this.handlers[type].push(handler);
            return this; //函数执行结束前会将改实例返回出来以便接着调用其他方法
        },
        fire: function(type, data) {
            if (typeof this.handlers[type] instanceof Array) {
                var handlers = this.handlers[type];
                for (var i = 0; i < handlers.length; i++) {
                    handlers[i](data)
                }
            };
            return this; //函数执行结束前会将改实例返回出来以便接着调用其他方法
        }

    }
    return {
        Dialog: Dialog
    }
});