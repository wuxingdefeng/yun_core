(function (window) {
    yjqueryuiUtils = {
        tab: {
            addIframe: function (tabid) {
                /// <summary>
                /// tabsǶ��iframe
                /// <para>ʾ��:yjqueryuiUtils.tab.addIframe('tabs'); </para>
                /// <para>�ο�:http://deano.me/2011/08/jquery-tabs-iframes/ </para>
                /// <para>˵��:ÿ��TabpageӦ����href,id,rel����</para>
                /// </summary>
                /// <param name="tabid">tabs��ID</param>
                var tabs = $('#' + tabid).tabs();
                var url = $("#tabs ul li:eq(" + 0 + ")").find("a");
                this.addEveryIframe(url.attr("href"), url.attr("rel"), url.attr("id"));
                $("#" + tabid + " ul li a").click(function () {
                    yjqueryuiUtils.tab.addEveryIframe($(this).attr("href"), $(this).attr("rel"), $(this).attr("id"));
                });
            },
            addEveryIframe: function (href, rel, id) {
                /// <summary>
                /// tabsǶ��iframe
                /// </summary>
                /// <param name="href">�����ӵ�href</param>
                /// <param name="rel">�����ӵ�rel</param>
                /// <param name="id">�����ӵ�id</param>
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