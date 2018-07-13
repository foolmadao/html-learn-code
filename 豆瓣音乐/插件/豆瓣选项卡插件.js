(function ($) {
    var obj = {
        init: function (opt) {
            this.opt = opt;
            this.createDom();
            this.bindEvent();
        },
        // 创建dom元素
        createDom: function () {
            var head = $('<div class="list-head"></div>');
            var title = $('<span class="title">' + this.opt.headname + '</span>');
            var tag = '';
            var context = '';
            var more = $('<span class="more">更多</span><div></div>');
            var len = this.opt.tagList.length;

            for (var i = 0; i < len; i++) {
                tag += '<span class="tag">' + this.opt.tagList[i] + '</span>';
                context += '<div class="context">'
                var len2 = this.opt.contextList[i].length;
                for (var j = 0; j < len2; j++) {
                    context += '<div class="list-item"><img src="' + this.opt.contextList[i][j].img + '" alt="">\
                    <div class="name">'+ this.opt.contextList[i][j].name + '</div>\
                    <div class="des">'+ this.opt.contextList[i][j].des + '</div></div>'
                }
                context += '</div>'
            }
            tag = $(tag);
            context = $(context);
            this.opt.father.append(head.append(title).append(tag).append(more)).append(context);
            this.opt.father.find('.tag').eq(0).addClass('active')
            this.opt.father.find('.context').eq(0).addClass('active1');
        },
        // 实现点击切换
        bindEvent: function () {
            var self = this;
            console.log(self.opt.father);
            var len = this.opt.tagList.length;
            for (var i = 0; i < len; i++) {
                (function (i,) {
                    console.log(self.opt.father.find('.tag').eq(i)[0])
                    self.opt.father.find('.tag').eq(i).click(function(){
                        $(this).closest('.artist-list').find('.active').removeClass('active');
                        $(this).closest('.artist-list').find('.active1').removeClass('active1');
                        $(this).closest('.artist-list').find('.tag').eq(i).addClass('active');
                        $(this).closest('.artist-list').find('.context').eq(i).addClass('active1');
                    })
                    
                })(i,);
            };
        }
    }
    $.fn.extend({
        tagTool: function (options) {
            options.father = this || $('body');
            obj.init(options);
        }
    })
}) (jQuery)