(function ($) {
    var num = 1;
    var key = true;
    var oli = $('li');
    getData();
    function getData() {
        if (key) {
            key = false;
            $.ajax({
                type: 'GET',
                url: 'http://localhost/web/water/src/js/getPics.php?cPage=' + num,
                success: addDom,
                beforeSend: function () {
                    $('.load').show();
                },
                error:function(){
                    console.log('error');
                }
            });
            num++
        }
    }
    function addDom(data){
        console.log(JSON.parse(data));
        $('.load').hide();
        var dataList = JSON.parse(data);
        dataList.forEach(function(ele,index){
            var oDiv = $('<div class="item"></div>');
            var img = new Image();
            var span = $('<span>'+ ele.title +'</span>')
            img.src = ele.preview;
            oDiv.append(img).append(span);
            console.log(oDiv[0])
            img.onload = function(){
                getMinlist(oli).append(oDiv);
            }
        })
        key = true;
    }
    function getMinlist(dom){
        var minHeight = parseInt(dom.eq(0).css('height'));
        var index = 0;
        for (var i = 1;i < dom.length; i++){
            if(parseInt(dom.eq(i).css('height')) < minHeight){
                index = i;
                minHeight = parseInt(dom.eq(i).css('height'));
            }
        }
        return dom.eq(index);
    }
    $(window).scroll(function () {
        var scrollHeight = $(this).scrollTop();
        var clientHeight = $(window).height();
        var pageHeigh = parseInt($(getMinlist(oli)).css('height'));
        if (scrollHeight + clientHeight > pageHeigh) {
            getData();
        }
    })
})(jQuery)