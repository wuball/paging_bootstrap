
//分号防止前面代码遗失分号产生error
;

(function ($, window, document, undefined) {

    var pagingOption = {
        total: 100,
        count: 8,
        index: 1,
        callback: null
    };

    var Pager = function (ele, opt) {
        this.$element = ele,
            this.defaults = pagingOption,
            this.options = $.extend({}, this.defaults, opt);
    }

    Pager.prototype = {
        drawing: function () {

            //最大页码
            var maxp = Math.ceil(this.options.total / this.options.count);

            //保证页码在范围内
            var pindex;
            pindex = this.options.index > maxp ? maxp : this.options.index;
            pindex = this.options.index < 1 ? 1 : this.options.index;

            //补齐起始页码
            var ibp = (maxp - pindex) < 2 ? (2 - (maxp - pindex)) : 0;

            //分页开始页码
            var ibn = (pindex - 2) < 1 ? 1 : pindex - 2 - ibp;
            //起始页码不能小于1
            ibn = ibn < 1 ? 1 : ibn;
            //分页结束页码
            var ien = (ibn + 5) > maxp ? maxp + 1 : ibn + 5;

            var htmlstr = '';

            htmlstr += '<ul class="pagination">';

            //上一页
            htmlstr += '    <li><a href="javascript:void(0);" aria-label="Previous" class="page_index" data-pindex="' + (pindex - 1) + '"><span aria-hidden="true">«</span></a></li>';

            //当前页class
            var bncss = (1 == pindex ? 'active' : '');

            //首页
            htmlstr += '    <li class="' + bncss + '"><a href="javascript:void(0);" class="page_index" data-pindex="1">1</a></li>';

            //前省略
            if (pindex > 3 && maxp > 5) {
                htmlstr += '    <li class="disabled"><span>...</span></li>';
            }
            //中间页
            for (var i = ibn + 1 ; i < ien - 1; i++) {
                //当前页class
                var icss = (i == pindex ? 'active' : '');
                htmlstr += '    <li class="' + icss + '"><a href="javascript:void(0);" class="page_index" data-pindex="' + i + '">' + i + '</a></li>';
            }
            //后省略
            if (maxp - pindex > 2 && maxp > 5) {
                htmlstr += '    <li class="disabled"><span>...</span></li>';
            }

            //当前页class
            var encss = (maxp == pindex ? 'active' : '');

            //尾页
            if (maxp > 1)
                htmlstr += '    <li class="' + encss + '"><a href="javascript:void(0);" class="page_index" data-pindex="' + maxp + '">' + maxp + '</a></li>';
            //下一页
            htmlstr += '    <li><a href="javascript:void(0);" aria-label="Next" class="page_index" data-pindex="' + (pindex - -1) + '"><span aria-hidden="true">»</span></a></li>';

            //go to page , css not good
            //htmlstr += '    <li><input type="text" class="page_go_in form-control" value="' + pindex + '" ></li>';
            //htmlstr += '    <li><a href="javascript:void(0);" class="page_go"  value="' + pindex + '"><span aria-hidden="true">Go</span></a></li>';

            htmlstr += '</ul>';

            this.$element.html(htmlstr);

            var _callback = this.options.callback;
            var ele = this.$element;
            var opt = this.options;

            //页码切换
            this.$element.find(".page_index").click(function () {
                var pi = $(this).attr("data-pindex");
                if (pi > maxp || pi < 1)
                    return false;

                opt.index = pi;

                //如果有回调函数，等回调函数执行成功后自行重绘分页，否则直接重绘
                if (_callback != null) {
                    _callback(pi, function () { ele.paging(opt); });
                } else
                    ele.paging(opt);
            });

            //页码直达
            this.$element.find(".page_go").click(function () {
                var pi = parseInt($(".page_go_in").val());
                if (pi > maxp || pi < 1 || isNaN(pi) || pi == pindex)
                    return false;

                opt.index = pi;

                //如果有回调函数，等回调函数执行成功后自行重绘分页，否则直接重绘
                if (_callback != null) {
                    _callback(pi, function () { ele.paging(opt); });
                } else
                    ele.paging(opt);
            });

        }
    }

    $.fn.paging = function (options) {
        var pager = new Pager(this, options);
        return pager.drawing();
    }

})(jQuery, window, document);

