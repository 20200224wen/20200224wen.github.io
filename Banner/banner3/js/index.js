// 实现插件 + 实现轮播图功能

(function ($) {
    // 实现轮播图功能
    function Slider(ele, opt) {
        var d = {
            curDisplay: 0,
            autoPlay: false,
            interval: 2000
        }
        this.opts = $.extend({}, d, opt);
        this.wrap = ele;
        this.curDisplay = this.opts.curDisplay
        this.$img = this.wrap.find('img');
        this.imgLen = this.$img.length;
        this.nowIndex = 0;
        this.timer = null;
        this.interval = this.opts.interval;
        this.autoPlay = this.opts.autoPlay;

        this.init();
    }
    Slider.prototype.init = function () {
        console.log(this)
        this.initMove();
        this.bindEven();
    }
    Slider.prototype.initMove = function () {
        var self = this;
        var hLen = Math.floor(self.imgLen / 2);
        var lNum, rNum;
        for (var i = 0; i < hLen; i++) {
            lNum = self.curDisplay - i - 1;
            self.$img.eq(lNum).css({
                transform: 'translateX(' + (-150 * (i + 1)) + 'px) translateZ(' + (200 - i * 100) + 'px) rotateY(30deg)'
            })

            rNum = self.curDisplay + i + 1;
            self.$img.eq(rNum).css({
                transform: 'translateX(' + (150 * (i + 1)) + 'px) translateZ(' + (200 - i * 100) + 'px) rotateY(-30deg)'
            })
        }
        self.$img.eq(self.curDisplay).css({
            transform: 'translateZ(300px)'
        })
    }
    Slider.prototype.bindEven = function () {
        var self = this;
        self.$img.on('click', function () {
            self.nowIndex = $(this).index();
            self.moving(self.nowIndex);
        }).hover(function(){
            clearInterval(self.timer)
        },function(){
            self.timer = setInterval(function() {
                self.play();
            }, self.interval)
        });
        this.timer = setInterval(function() {
            self.play();
        }, this.interval)
    }
    Slider.prototype.moving = function (index) {
        this.curDisplay = index;
        this.initMove();
    }
    // 自动播放
    Slider.prototype.play = function () {
        if (this.autoPlay) {
            if (this.nowIndex == this.imgLen - 1) {
                this.nowIndex = 0;
            } else {
                this.nowIndex++;
            }
            this.moving(this.nowIndex);
        }
    }
    // 扩展插件
    $.fn.extend({
        slider: function (options) {
            new Slider(this, options);
        }
    })
})(jQuery)