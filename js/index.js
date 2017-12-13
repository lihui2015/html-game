// 全局变量 ajax请求路径
var baseUrl = "http://dev.digitalsnail.cn/djgame/frontend/web/game/";
var URL = {
    send: baseUrl + "send",
    gift: baseUrl + "gift",
    register: baseUrl + "register"
};
var registerPhone = ""; //全局变量-手机号码

$(function() {
    var $bgbox = $("#jsBgBox");
    var $dialog = $("#dialogBox"), $dialogKey = $dialog.find(".dialog-key");
    var $dialogTips = $(".dialog-tips");
    var $dialogTitle = $dialogTips.find("div"), $dialogDisc = $dialogTips.find("p");

    /**
     * 场景1
     */
    function scene1(){
        var key1 = 0, key2 = 0, key3 = 0, key4 = 0;
        var isKeyAppear = false;
        var $dialogProgress = $(".dialog-collect");

        $(".item").on("tap", function() {
            var $this = $(this);
            var type = $this.attr("data-type"), title = $this.attr("data-title"), isKey = $this.attr("data-iskey"), sort = $this.attr("data-sort"), disc = $this.attr("data-disc");
            if (sort == 2 && disc == "") {
                $(this).addClass("checked");
                if(isKey == "false"){
                    $(this).attr("data-disc","这就是一个破罐子！");
                    $("#audioBroken")[0].play();
                    return false;
                }
            } else if (sort == 1){
                $(this).addClass("after");
            }
            setTimeout(function() {
                if (type == 1) {
                    var  disc = $this.attr("data-disc"), img = $this.attr("data-img");
                    showDialog(title, isKey, disc, img);
                } else if (type == 3) {
                    var Tips = $this.attr("data-tips"), index = $this.attr("data-index");
                    showDialog(title, isKey, '', '', Tips, index);
                }
            }, 500);
        });

        var showResult = function() {
            var count = key1 + key2 + key3 + key4;
            var disc = "";
            if (count == 4) {
                disc = "恭喜你已顺利找到4件通关信物，请继续这次探秘之旅。";
                showDialog("none", "", disc);
                $dialog.on("tap", function() {
                    if($(this).hasClass("pass")){
                        $(this).removeClass("show");
                        $("body").addClass("blink");
                        $dialogProgress.hide();
                        setTimeout(function (argument) {
                            $(".swiper-container").addClass("step2");
                            //myScroll.refresh();
                            myScroll.scrollTo(-450,0);
                            scene2();
                        },1000)
                    }
                });
            }
        };
        var showDialog = function(dTitle, isKey, dDisc, dImg, dTips, index) {
            $dialog.addClass("show");
            var $mask = $dialog.find(".dialog-mask");
            var $audioResult = $("#audioResult")[0];
            $dialog.removeClass("pass");
            if (isKey == "false"){
                $dialogKey.removeClass("hide");
                $dialogKey.find("div").removeClass().addClass("discount-img discount-img_" + dImg);
                $dialogDisc.removeClass("dialog-result").html(dDisc).show();
                $mask.addClass("show");
                $dialogTitle.removeClass().addClass("discount-text discount-text_" + dTitle);
                $dialogTips.removeClass("key-content");
            } else if(isKey == "true"){
                isKeyAppear = true;
                $dialogKey.addClass("hide");
                $dialogTitle.removeClass().addClass("key-text key-text_" + dTitle);
                $dialogDisc.removeClass("dialog-result").html("").hide();
                $dialogTips.addClass("key-content");
                //setTimeout(function(){showResult();},2000);
            }else{
                $dialog.addClass("pass");
                $dialogKey.addClass("hide");
                $dialogTitle.removeClass().addClass("key-text key-text_" + dTitle);
                $dialogDisc.addClass("dialog-result").html(dDisc).show();
                $dialogTips.addClass("key-content");
                $mask.addClass("show pass");
            }

            if (dTips == "") {
                switch (index) {
                    case "1":
                        key1 = 1;
                        break;
                    case "2":
                        key2 = 1;
                        break;
                    case "3":
                        key3 = 1;
                        break;
                    case "4":
                        key4 = 1;
                        break;
                }

                if(isKeyAppear){
                    var keyTool = $dialogProgress.find(".J_tool").eq(0),
                        keyImg = "<img src='./image/step1/popup/img/key0"+ index +".png' />";
                    setTimeout(function(){
                        keyTool.html(keyImg);
                    },800);
                    
                    keyTool.removeClass('J_tool');
                    $dialogProgress.show();
                }
                $audioResult.play();
                $("#key0" + index).addClass("checked").attr("data-tips", "您已经拿到该线索！");
            }
            $dialog.on("tap", function() {
                $mask.removeClass("show");
                $(this).removeClass("show");
                $(".item").removeClass("after");
                showResult();
            });
            $mask.on("tap", function() {
                $mask.removeClass("show");
                $(this).removeClass("show");
                $(".item").removeClass("after");
            });
        };
    }

    scene1();
    //scene2();

    /**
     * 场景2
     */
    function scene2(){
        var key = [0,0,0,0,0,0];
        var isFinished = false;
        var count = 0;
        var npcText = [
            "<div class='npcText'>你要找的人不是我！不过德基圣诞消费，积分5倍起！一不小心还能兑换到<span class='yellow'>iPhone X！</span></div>",
            "<div class='npcText'>你找错了！<br>不过悄悄告诉你：圣诞在德基买满3999就有机会抽取<span class='yellow'>超高价值大奖！</span></div>",
            "<div class='npcText'>你听说了吗？德基限时消费积分抢兑<span class='yellow'>超值礼盒</span>！抢不到的话……只能说你手速太慢啦！</div>",
            "<div class='npcText'>不妨告诉你，德基广场APP或官方微信服务号，抢德基<span class='yellow'>首次发放的一大波现金红包！</span></div>"
        ];
        var keyWords = [
            "是一张碎纸片，但好像不完整。",
            "跟前面那张拼起来好像能看出点东西，但是依然不清晰。",
            "咦，这里也有一张碎纸片，拼起来试试！",
            "这张纸好像让我想到了什么，但应该还有。",
            "这张纸片至关重要，再看看别的地方。",
            "最后一张碎纸片果然藏在这里面！"
        ];

        $(".dialog-progress").removeClass("hide");

        $(".cell").off().on("tap", function(e) {
            e.stopPropagation();
            var $this = $(this);
            var type = $this.attr("data-type"), title = $this.attr("data-title"), disc = $this.attr("data-disc"), isKey = $this.attr("data-iskey"), img = $this.attr("data-img");

            if($(this).hasClass("disable")){
                return false;
            }
            $(this).addClass("after");

            setTimeout(function() {
                if (type == 1) {
                    showDialog2(isKey, title);
                } else if(type == 2) {
                    var Tips = $this.attr("data-tips"), isChecked = $this.attr("data-ischecked");
                    showDialog2(isKey, title, Tips, isChecked)
                }
            },300)
        });

        function showResult(dTitle){
            var isKey = "",
                title = "",
                Tips = "",
                isChecked = "",
                sum = 0;
            for(var i = 0; i < 6; i++){
                sum = sum + key[i];
            }

            if(dTitle == "07"){
                showDialog2("true", dTitle);
            } else{
                Tips = keyWords[count - 1];
                isChecked = "true";
                showDialog2("true", dTitle, Tips, isChecked);
            }
            
            $dialog.off().on("tap", function() {
                $(this).removeClass("show");
                if($(this).hasClass("finished")){
                    //$(".lock-key").addClass("show");
                    //$("#inputBoxContainer .realInput").val("").trigger("click").focus();
                    //boxInput.init();

                    $(".page-validate").addClass("show");
                    getAward();
                }
            });
        }

        function showDialog2(isKey, dTitle, dTips, isChecked){
            $dialog.addClass("show");
            var $progress = $(".dialog-progress span");
            var $audioResult = $("#audioResult")[0];
            var index = Number(dTitle);
            var $mask = $(".dialog-mask");

            $dialog.removeClass("finished pass");
            $dialogKey.removeClass("hide");
            $dialogDisc.removeClass("dialog-result");
            $mask.removeClass("show pass");

            if(index == 7){
                $dialogKey.removeClass("hide");
                $dialogKey.find("div").removeClass().addClass("snippet-img snippet-img_" + dTitle);
                $dialogTips.addClass("key-content");
                $dialogTitle.removeClass().addClass("snippet-text snippet-text_" + dTitle);
                $dialogDisc.hide();
                $(".dialog-progress").addClass("hide");
                $mask.addClass("show getAward");
                $dialog.addClass("finished");
                return false;
            }

            if(isKey == "true"){
                $(".npcText").remove();
                $dialogTips.removeClass("hide");
                dialogFlag = false;
                $(".dialog-progress").removeClass("hide");
            }else if(isKey == "false"){
                $dialogTips.addClass("hide");
                $dialogKey.find("div").removeClass().addClass("npc-img npc-img_" + dTitle).html("").append($(npcText[index - 1]));
                $("#audioNPC" + index)[0].play();
                $dialog.removeClass("bg-white");
                $(".dialog-progress").addClass("hide");
                dialogFlag = true;
            }
            if(dTips == "您已经拿到该线索！" || isChecked == "true"){
                $dialogKey.find("div").removeClass().addClass("snippet-img snippet-img_" + dTitle);
                $dialogTitle.removeClass();
                $dialogTips.addClass("key-content");
                $dialogDisc.html(dTips);
                $dialogDisc.addClass("snippet-disc").show();
                dialogFlag = true;

            }else if(dTips == "tips"){
                $dialogTitle.removeClass().addClass("snippet-text snippet-text_" + dTitle);
                $dialogKey.find("div").removeClass().addClass("transition-img transition-img_" + dTitle);
                $mask.addClass("more show");
                $dialogDisc.html("").hide();
                $dialogTips.addClass("key-content");
                if(index == 5){
                    $("#audioBroken")[0].play();
                }
                //var keWord = keyWords[count];
                //$dialogDisc.html(keWord);
                $("#clue" + dTitle).attr("data-tips", "您已经拿到该线索！");
            }
            $mask.off().on("tap", function() {
                count ++;
                key[index - 1] = 1;
                $mask.removeClass("show more");
                setTimeout(function() {
                    showResult(dTitle);
                }, 200);
                $audioResult.play();
            });

            var number = count > 6 ? 6 : count;
            $progress.html(number);
            if(number == 6 && isChecked == "true"){
                setTimeout(function(){
                    showResult("07");
                },2000)
            }
            $dialog.off().on("tap", function() {
                if (dialogFlag) {
                    $(this).removeClass("show");
                }
                if(isKey == "false"){
                    $("#audioNPC" + index)[0].pause();
                    $("#audioNPC" + index)[0].currentTime = '0';
                }
                if(number == 6){
                    $(".cell").addClass("disable");
                }
            });
        }
    }

    
    /**
     * 输入通关密码
     */
    var container = $("#inputBoxContainer");
    var boxInput = {
        maxLength:"",
        realInput:"",
        bogusInput:"",
        bogusInputArr:"",
        init:function(){
            var that = this;
            that.realInput = container.find(".realInput");
            that.bogusInput = container.find(".num-list");
            that.bogusInputArr = that.bogusInput.find(".input-item");
            that.maxLength = that.bogusInputArr.attr("maxlength");
            
            that.realInput.focus();
            that.realInput.on("input change",function(){
                that.setValue();
            })
        },
        setValue:function(){
            var real_str = this.realInput.val(),
                _self = this;
            //this.realInput.val(real_str);

            _self.bogusInputArr.removeClass("active");
            $(_self.bogusInputArr[real_str.length - 1]).addClass("active");

            $.each(_self.bogusInputArr,function(k,v){
                var str = real_str[k]?real_str[k]:"";
                $(v).val(str);
            })

            if(real_str.length >= this.maxLength){
                this.realInput.val(real_str.substring(0,4));
                $(".lock-key_hd").removeClass("wrong");
                var result = this.getBoxInputValue();
                result = result.toLowerCase();
                if (result == "deji") {
                    $(".page-validate").addClass("show");
                    $(".lock-key").removeClass("show");
                    getAward();
                } else {
                    $(".lock-key_hd").show().addClass("wrong");
                }
            }
        },
        getBoxInputValue:function(){
            var realValue = "";
            for(var i in this.bogusInputArr){
                if(!this.bogusInputArr[i].value){
                    break;
                }
                realValue += this.bogusInputArr[i].value;
            }
            return realValue;
        }
    }

    /**
     * 输入手机号码进行验证
     */
    function getAward(){
        var $pageValidate = $("#pageValidate"),
            $sendMessageBtn = $(".J_sendMessage"),
            $validateBtn = $(".J_validate"),
            $inputPhone = $pageValidate.find(".input-phone"),
            $inputValidate = $pageValidate.find(".input-validate"),
            SECOND = 60,
            waitTime = SECOND,
            isWaiting = false;
        var $popup = $(".popup"),
            $popupCont = $popup.find(".popup-content"),
            $popupBtn = $popup.find(".popupBtn");
        var $pageRegister = $("#pageRegister"),
            $registerBtn = $(".J_register"),
            $inputPhoneRe = $pageRegister.find(".input-phone"),
            $inputGender = $pageRegister.find(".input-gender"),
            $inputName = $pageRegister.find(".input-name"),
            $inputBirth = $pageRegister.find(".input-birth");
        
        $sendMessageBtn.off().on("tap",function(e){
            e.stopPropagation()
            var phone = $.trim($inputPhone.val());
                
            var reg = /^1\d{10}$/; 

            if(!reg.test(phone)){
                // alert("请输入11位手机号码");
                layer.open({
                    content: '请输入11位手机号码'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                });
                return false;
            }
            var data = {
                    "mobile": phone
                };

            if (isWaiting === false){
                $.ajax({
                    type:"POST",
                    url: URL.send,
                    data:data,
                    success:function(response){
                        response = JSON.parse(response);
                        console.log(response);
                        if(response.result == 0){
                            isWaiting = true;
                            timeCount();
                        }else{
                            alert("验证码发送失败，请检查手机号码输入是否正确后重新尝试获取验证码")
                        }
                    }
                })
            }
            
        })
        function timeCount(){

            $sendMessageBtn.html(waitTime + "s");

            if(waitTime == 0){
                //重新发送
                $sendMessageBtn.html('<img src="./image/fun/pass-img.png" alt="">');
                waitTime = SECOND;
                isWaiting = false;
                return false;

            }else{
                //60s倒计时
                waitTime -= 1;
                setTimeout(function(){
                    timeCount();
                },1000)
            }
        }

        $inputValidate.on("input change",function(e){
            var code = $.trim($inputValidate.val());

            if(code.length >= 4){
                $(this).val(code.substring(0,4));
                $validateBtn.removeClass("disabled");
            }else{
                if(!$validateBtn.hasClass("disabled")){
                    $validateBtn.addClass("disabled");
                }
            }
        })

        $validateBtn.off().on("tap",function(e){
            e.stopPropagation();
            if($(this).hasClass("disabled")){
                return false;
            }
            var phone = $.trim($inputPhone.val()),
                code = $.trim($inputValidate.val());

            var reg = /^1\d{10}$/; 
            if(!reg.test(phone)){
                // alert("请输入11位手机号码");
                layer.open({
                    content: '请输入11位手机号码'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                });
                return false;
            }
            ajaxGift(phone,"A","A",code);
        })

        function ajaxGift(phone,type,reg,code){
            var data = {
                "mobile": phone,
                "type": type,
                "reg": reg
            };

            if(code.length > 0){
                data.code = code;
            }

            registerPhone = phone;
            console.log(data);

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
                        // alert(msg);
                        layer.open({
                            content: msg,
                            btn: '我知道了',
                            skin: 'footer',
                            shadeClose: false,
                            yes: function(index){
                                layer.close(index);
                                $pageValidate.removeClass("show");
                                $(".page-finished").addClass("show");
                            }
                        });


                    }else if(result == 1){
                        // 非会员
                        popup("no-pass");

                    }else if(result == 2){
                        // 手机号异常
                        // 会员资料异常，请去德基客服台处理
                        //alert("会员资料异常，请去德基客服台处理");
                        // alert(msg);

                        layer.open({
                            content: msg
                            ,skin: 'msg'
                            ,time: 2 //2秒后自动关闭
                        });
                    }else if(result == 3){
                        // 已参加过活动
                        //alert("您已参加过活动")
                        // alert(msg);
                        layer.open({
                            content: msg
                            ,skin: 'msg'
                            ,time: 2 //2秒后自动关闭
                        });

                    }else if(result == 4){
                        // 不在活动有效期之内
                        //alert("不在活动有效期之内")
                        // alert(msg);
                        layer.open({
                            content: msg,
                            btn: '我知道了',
                            skin: 'footer',
                            shadeClose: false,
                            yes: function(index){
                                layer.close(index);
                            }
                        });
                    }else if(result == 5){
                        // 短信验证码不正确
                        //alert("短信验证码不正确，请重新输入")
                        // alert(msg);
                        layer.open({
                            content: msg
                            ,skin: 'msg'
                            ,time: 2 //2秒后自动关闭
                        });
                    }
                }
            })
        }

        $inputBirth.on("focus tap input",function(e){
            $(this).attr("type","date");
            $(this).focus();
        })

        $registerBtn.off().on("tap",function(e){
            e.stopPropagation();
            var phone = $.trim($inputPhoneRe.val()),
                gender = $inputGender.val(),
                name = $.trim($inputName.val()),
                birth = $inputBirth.val();

            var reg = /^1\d{10}$/; 

            if(!reg.test(phone)){
                // alert("请输入11位手机号码");
                layer.open({
                    content: '请输入11位手机号码'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                });
                return false;
            }
            if(gender == "--"){
                // alert("请输入性别");
                layer.open({
                    content: '请输入性别'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                });
                return false;
            }
            if(!name.length){
                // alert("请输入姓名");
                layer.open({
                    content: '请输入姓名'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                });
                return false;
            }
            if(!birth.length){
                // alert("请输入生日");
                layer.open({
                    content: '请输入生日'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                });
                return false;
            }
            var data = {
                    "mobile": phone,
                    "gender": gender,
                    "name": name,
                    "birthday": birth
                };
            registerPhone = phone;
            $.ajax({
                type:"POST",
                url: URL.register,
                data:data,
                success:function(response){
                    response = JSON.parse(response);
                    console.log(response);                  
                    var result = response.result,
                        msg = response.message;

                    if(result == 0){
                        // 注册成功
                        // alert(msg);
                        layer.open({
                            content: '注册会员成功,请使用手机号'+registerPhone+'登录德基广场会员中心',
                            btn: '我知道了',
                            skin: 'footer',
                            shadeClose: false,
                            yes: function(index){
                                layer.close(index);
                                // popup("register-pass");
                                ajaxGift(registerPhone,"A","B","")
                            }
                        });


                    }else if(result == 1){
                        // 已经是会员，重新登陆
                        //alert("您已经是会员，马上登陆领取积分")
                        //alert(msg);
                        ajaxGift("A","B",phone);

                    }else if(result == 2){
                        // 注册失败
                        //alert("注册失败，请重新尝试");
                        // alert(msg);
                        layer.open({
                            content: '注册失败，请重新尝试'
                            ,skin: 'msg'
                            ,time: 2 //2秒后自动关闭
                        });
                    }
                }
            })
        })

        /**
         * 注册成功/不是会员 弹出框
         */
        function popup(str){
            $popup.addClass("show");
            $popupCont.removeClass("register-pass no-pass").addClass(str);
        }

        /**
         * 显示验证手机号码页面
         */
        function showValidate(){
            $pageRegister.removeClass("show");
            $inputPhone.val("");
            $inputValidate.val("");
            $pageValidate.addClass("show");
            if(!$validateBtn.hasClass("disabled")){
                $validateBtn.addClass("disabled")
            }
        }

        $popupBtn.off().on("tap",function(e){
            e.stopPropagation();
            
            $popup.removeClass("show");

            if($popupCont.hasClass("no-pass")){
                // 不是会员
                var phone = $.trim($inputPhoneRe.val());
                if(!phone.length){
                    $inputPhoneRe.val(registerPhone);
                }
                $pageValidate.removeClass("show");
                $pageRegister.addClass("show");

            }else if($popupCont.hasClass("register-pass")){
                // 注册成功
                ajaxGift(registerPhone,"A","B","")
            }
        })

        $popup.off().on("tap",function(e){
            e.stopPropagation();
            $(this).removeClass("show");
            if($popupCont.hasClass("register-pass")){
                // 注册成功
                ajaxGift(registerPhone,"A","B","")
            }
        })
    }
 
    $(".page-tips").off().on("tap", function() {
        $(this).remove();
        $("#jsMusic").trigger("tap");
    });

    $("#jsMusic").off().on("tap", function(e) {
        e.stopPropagation();
        var music = $(this);
        //console.log(music.hasClass("pause"))
        if(music.hasClass("pause")){
            $("#audioBg")[0].play();
        }else{
            $("#audioBg")[0].pause();
        }
        music.toggleClass("pause");
    });

    $("#link").off().on("tap", function() {
        window.location.href = "http://dev.digitalsnail.cn/djgame/html/";
    });

    $("#shareLink").off().on("tap", function() {
        $("#pageShare").addClass("show");
    });

    $("#link").off().on("tap", function() {
        window.location.href = "http://dev.digitalsnail.cn/djgame/html/";
    });

    $('.page-finished_link').off().on("tap", function() {
        window.location.href = "https://m.dejiplaza.com/download";
    });

    $("#pageShare").off().on("tap", function() {
        $("#pageShare").removeClass("show");
    });


});
