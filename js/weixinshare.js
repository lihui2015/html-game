wx.ready(function () {
    // 在这里调用 API
    // 2. 分享接口
    // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
    wx.onMenuShareAppMessage({
        title: '古埃及探秘',
        desc: '在长大的过程中，我才慢慢发现，我身边的所有事，别人跟我说的所有事，那些所谓本来如此，注定如此的事，它们其实没有非得如此，事情是可以改变的。更重要的是，有些事既然错了，那就该做出改变。',
        link: 'http://dev.digitalsnail.cn/djgame/html/index.php',
        imgUrl: 'http://dev.digitalsnail.cn/djgame/html/image/loading/pointer.png',
        trigger: function (res) {
            // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
            //alert('用户点击发送给朋友');
        },
        success: function (res) {
            //alert('已分享');
            //ajaxGift();
        },
        cancel: function (res) {
            //alert('已取消');
        },
        fail: function (res) {
            alert("分享失败，请稍后重试");
        }
    });


    // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
    wx.onMenuShareTimeline({
        title: '古埃及探秘',
        link: 'http://dev.digitalsnail.cn/djgame/html/index.php',
        imgUrl: 'http://dev.digitalsnail.cn/djgame/html/image/loading/pointer.png',
        trigger: function (res) {
            // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
            //alert('用户点击分享到朋友圈');
        },
        success: function (res) {
            //alert('已分享');
            ajaxGift();
        },
        cancel: function (res) {
            //alert('已取消');
        },
        fail: function (res) {
            alert("分享失败，请稍后重试");
        }
    });

});
wx.error(function (res) {
    alert(res.errMsg);
});

function ajaxGift(){
    var phone = registerPhone,
        type = "B",
        reg = "C";

    var data = {
        "mobile": phone,
        "type": type,
        "reg": reg
    };

    //alert(JSON.stringify(data));

    $.ajax({
        type:"POST",
        url: URL.gift,
        data:data,
        success:function(response){
            response = JSON.parse(response);
            console.log(response);                    
            var result = response.result,
                msg = response.message;

            if(result == 0){
                // 成功
                $(".page-shareGuide").removeClass("show");
                // alert(msg);
                layer.open({
                    content: msg
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                });

            }else if(result == 1){
                // 非会员
                //popup("no-pass");
                // alert(msg);
                layer.open({
                    content: msg
                    ,skin: 'msg'
                    ,time: 4 //2秒后自动关闭
                });

            }else if(result == 2){
                // 手机号异常
                // 会员资料异常，请去德基客服台处理
                //alert("会员资料异常，请去德基客服台处理");
                // alert(msg);
                layer.open({
                    content: msg
                    ,skin: 'msg'
                    ,time: 4 //2秒后自动关闭
                });
            }else if(result == 3){
                // 已参加过活动
                //alert("您已参加过活动")
                // alert(msg);
                layer.open({
                    content: msg
                    ,skin: 'msg'
                    ,time: 4 //2秒后自动关闭
                });
            }else if(result == 4){
                // 不在活动有效期之内
                //alert("不在活动有效期之内")
                // alert(msg);
                layer.open({
                    content: msg
                    ,skin: 'msg'
                    ,time: 4 //2秒后自动关闭
                });
            }else if(result == 5){
                // 短信验证码不正确
                //alert("短信验证码不正确，请重新输入")
                // alert(msg);
                layer.open({
                    content: msg
                    ,skin: 'msg'
                    ,time: 4 //2秒后自动关闭
                });
            }
        }
    })
}