(function (window) {
    yjqueryuiUtils = {
        tab: {
            addIframe: function (tabid) {
                /// <summary>
                /// tabs嵌套iframe
                /// <para>示例:yjqueryuiUtils.tab.addIframe('tabs'); </para>
                /// <para>参考:http://deano.me/2011/08/jquery-tabs-iframes/ </para>
                /// <para>说明:每个Tabpage应设置href,id,rel属性</para>
                /// </summary>
                /// <param name="tabid">tabs的ID</param>
                var tabs = $('#' + tabid).tabs();
                var url = $("#tabs ul li:eq(" + 0 + ")").find("a");
                this.addEveryIframe(url.attr("href"), url.attr("rel"), url.attr("id"));
                $("#" + tabid + " ul li a").click(function () {
                    yjqueryuiUtils.tab.addEveryIframe($(this).attr("href"), $(this).attr("rel"), $(this).attr("id"));
                });
            },
            addEveryIframe: function (href, rel, id) {
                /// <summary>
                /// tabs嵌套iframe
                /// </summary>
                /// <param name="href">超链接的href</param>
                /// <param name="rel">超链接的rel</param>
                /// <param name="id">超链接的id</param>
                if ($(href).find("iframe").length == 0) {
                    var openout = $("#tp" + id), iframetab = $("#tpiframe" + id);
                    if (openout.length == 0 && iframetab.length == 0) {
                        var html = [];
                        html.push('<div>');
                        html.push('<div id="tp' + id + '"></div><iframe id="tpiframe' + id + '" src="' + rel + '"/>');
                        html.push('</div>');
                        $(href).append(html.join(""));
                        openout = $("#tp" + id), iframetab = $("#tpiframe" + id);
                        openout.css({
                            'float': 'right',
                            'position': 'relative',
                            'top': '-28',
                            'left': '-5'
                        });
                        iframetab.css({
                            'width': '100%',
                            'height': 'auto',
                            'border': '0',
                            'margin': '0',
                            'position': 'relative',
                            'top': '0',
                            'background': 'white'
                        });
                    }
                    $(href).find("iframe").height($(window).height() - 80);
                }
                return false;
            }
        }
    };
    window.yjqueryuiUtils = yjqueryuiUtils;
})(window);