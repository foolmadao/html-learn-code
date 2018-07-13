// 插件作者：elc
// 使用说明：
// 插件需要作用于id为swiper父级div中，父级必须有定位及宽高属性，必须有overflow：hide
// 需要传入参数为包含所有轮播图的路径的对象。
// CSS示例
// #swiper{
//     position: relative;
//     width: 675px;
//     height: 250px;
//     text-align: center;
//     overflow: hidden;
// }


(function ($) {
    function Swiper(options) {
        // 实现轮播图功能
        this.opts = options || {};
        this.wrap = this.opts.father;
        this.init();
        // 点击事件
        this.bindEvent();
        // 自动轮播
        this.sliderAuto();
    }
    Swiper.prototype.init = function () {
        this.nowIndex = 0;  
        this.time = null;
        this.moveKey = true;
        this.moveKey2 = true;
        this.len = this.opts.img.length;
        this.image = this.opts.img;
        this.itemWidth = parseInt(this.wrap.css('width'));
        this.itemHeight = parseInt(this.wrap.css('height'));
        this.createDom();
    }
    Swiper.prototype.sliderAuto = function () {
        if (this.moveKey2) {
            var self = this;
            clearTimeout(this.time);
            this.time = setTimeout(function () {
                self.move('next');
                if($('.pnbutton div').css('display') === 'block'){
                    self.moveKey2 = false;
                }
            }, 2000);
        }
    }
    Swiper.prototype.bindEvent = function () {
        var self = this;
        $('.change-button ul li').add('.next').add('.pre').on('click', function () {
            if (self.moveKey) {
                if ($(this).attr('class') == 'pre') {
                    this.moveKey2 = true;
                    self.move('pre');
                } else if ($(this).attr('class') == 'next') {
                    this.moveKey2 = true;
                    self.move('next');
                } else {
                    this.moveKey2 = true;
                    self.move($(this).index());
                }
            }
        })
        self.wrap.mouseenter(function () {
            $('.pnbutton div').css('display', 'block')
            clearTimeout(self.time);
            self.moveKey2 = false;
        })
        self.wrap.mouseleave(function () {
            $('.pnbutton div').css('display', 'none');
            self.moveKey2 = true;
            if(self.moveKey){
                self.sliderAuto();
            }
        })
    }

    Swiper.prototype.changStyle = function () {
        // 切换class类名
        $('#swiper .active').removeClass();
        $('.change-button ul li').eq(this.nowIndex).addClass('active');
    }
    Swiper.prototype.move = function (dir) {
        this.moveKey = false;
        if (dir == 'pre' || dir == 'next') {
            if (dir == 'pre') {
                if (this.nowIndex == 0) {
                    $('.pic-frame').css('left', - (this.len * this.itemWidth) + 'px');
                    this.nowIndex = this.len - 1;
                } else {
                    this.nowIndex--;
                }
            } else {
                if (this.nowIndex == this.len - 1) {
                    $('.pic-frame').animate({ 'left': - (this.len * this.itemWidth) + 'px' }, function () {
                        $('.pic-frame').css('left', '0px');
                    })
                    this.nowIndex = 0;
                } else {
                    this.nowIndex++;
                }
            }
        } else {
            this.nowIndex = dir;
        }
        this.slider();
        this.changStyle();
    }

    Swiper.prototype.slider = function () {
        var self = this;
        $('.pic-frame').animate({ 'left': - (this.nowIndex * this.itemWidth) + 'px' }, function () {
            self.moveKey = true;
            self.sliderAuto();
        });
    }
    Swiper.prototype.createDom = function () {
        this.len = this.len;
        this.str = '<ul>';
        this.listStr = '<ul>';
        this.picFrame = $('<div class="pic-frame"></div>');
        this.changeButton = $('<div class="change-button"></div>');
        this.pnbutton = $('<div class="pnbutton"><div class="next"></div><div class="pre"></div></div>');
        for (var i = 0; i < this.len; i++) {
            this.str += '<li> <img src="' + this.image[i] + '" alt=""> </li>';
            this.listStr += '<li></li>';
        }
        this.str += '<li> <img src="' + this.image[0] + '" alt=""> </li></ul>';
        this.listStr += '</ul>';
        this.wrap.append(this.picFrame.html(this.str))
            .append(this.pnbutton)
            .append(this.changeButton.html(this.listStr));
        $('.change-button ul li').eq(0).addClass('active');
        $('#swiper .pic-frame ul li img').css({ 'width': this.itemWidth + 'px', 'height': this.itemHeight + 'px' })
        $('#swiper .pic-frame').css('width', (this.len + 1) * this.itemWidth + 'px')
        $('#swiper .pnbutton').css('marginTop',this.itemHeight*0.45 + 'px')
    }
    $.fn.extend({
        sliderImg: function (options) {
            options.father = this || $('body');
            new Swiper(options);
        }
    })
})(jQuery)