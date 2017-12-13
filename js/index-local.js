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
                disc = "恭喜你顺利找齐4件闯关装备，不过属于勇士的探险还在继续。愿生命之光永远照耀你。";
                showDialog("none", "", disc);
                $dialog.on("tap", function() {
                    if($(this).hasClass("pass")){
                        $(this).removeClass("show");
                        $dialogProgress.hide();
                        $(".swiper-container").addClass("step2");
                        myScroll.scrollTo(-450,0);
                        scene2();
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
                    },2000);
                    
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
            "<div class='npcText'>你终于来了，不过要找的人不是我！德基圣诞消费，积分5倍起蹭蹭往上涨……一不小心还能兑换到<span class='yellow'>iPhone X！</span></div>",
            "<div class='npcText'>你找错了！不过只有美丽的人才能见到我。悄悄给你透露个消息：圣诞在德基买满3999，<span class='yellow'>超高价值大奖</span>抽到“人神共愤”！</div>",
            "<div class='npcText'>还嫌不够刺激？OK，德基不走套路只走心！<span class='yellow'>圣诞限时折扣中心2折起！</span>抢不到的话……只能说你手速太慢啦！</div>",
            "<div class='npcText'>是谁在打扰我休息？既然这样不妨告诉你，德基广场APP或官方微信服务号，抢德基<span class='yellow'>史上首次发放的一大波现金红包</span>！那可是真金白银啊！</div>"
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

        function showResult(){
            var isKey = "true",
                title = "07",
                Tips = "终于完成了！“DEJI”快去解锁开门吧！",
                isChecked = "",
                sum = 0;
            for(var i = 1; i < 7; i++){
                sum += key[i];
            }
            if(sum == 6){
                showDialog2(isKey, title, Tips, isChecked);
            }
            
            $dialog.on("tap", function() {
                $(this).removeClass("show");
                if($(this).hasClass("finished")){
                    $(".lock-key").addClass("show");
                    boxInput.init();
                }
            });
        }

        function showDialog2(isKey, dTitle, dTips, isChecked){
            $dialog.addClass("show");
            var $progress = $(".dialog-progress span");
            var $audioResult = $("#audioResult")[0];
            var index = Number(dTitle);

            $dialog.removeClass("finished pass");
            $dialogDisc.removeClass("dialog-result");

            if(index == 7){
                $dialogKey.removeClass("hide");
                $dialogKey.find("div").removeClass().addClass("snippet-img snippet-img_" + dTitle);
                $dialogTips.removeClass("key-content");
                $dialogTitle.removeClass().addClass("snippet-text snippet-text_" + dTitle);
                $dialogDisc.addClass("finish-disc").html(dTips).show();
                $dialog.addClass("finished");
            }

            if(isKey == "true"){
                $(".npcText").remove();
                $dialogTips.removeClass("hide");
            }else if(isKey == "false"){
                $dialogTips.addClass("hide");
                $dialogKey.removeClass("hide");
                $dialogKey.find("div").removeClass().addClass("npc-img npc-img_" + dTitle).html("").append($(npcText[index - 1]));
                $("#audioNPC" + index)[0].play();
            }
            if(isChecked == "false"){
                $dialogKey.addClass("hide");
                $dialogTitle.removeClass().addClass("snippet-text snippet-text_" + dTitle);
                $dialogDisc.html("").hide();
                $dialogTips.addClass("key-content");
                $("#clue" + dTitle).attr("data-isChecked","true");

                if(index == 5){
                    $("#audioBroken")[0].play();
                }
                // setTimeout(function(){
                //     $dialog.removeClass("show");
                // },2000);
            }else if(isChecked == "true"){
                $dialogKey.removeClass("hide");
                $dialogKey.find("div").removeClass().addClass("snippet-img snippet-img_" + dTitle);
                $dialogTitle.removeClass();
                $dialogTips.removeClass("key-content");
                $("#clue" + dTitle).attr("data-ischecked","false").attr("data-tips","您已经拿到该线索！");
                $dialogDisc.addClass("snippet-disc").show();
                if(dTips == "tips"){
                    var keWord = keyWords[count];
                    count ++;
                    $dialogDisc.html(keWord);
                    key[index] = 1;
                    $audioResult.play();
                } else if(dTips == "您已经拿到该线索！"){
                    $dialogDisc.html(dTips);
                }
                setTimeout(function(){
                    showResult()
                },2000);
            }

            var number = count > 6 ? 6 : count;
            $progress.html(number);

            $dialog.off().on("tap", function() {
                $(this).removeClass("show");
                if(isChecked != "false"){
                    $(".cell").removeClass("after");
                }
                if(isKey == "false"){
                    $("#audioNPC" + index)[0].pause();
                    $("#audioNPC" + index)[0].currentTime = '0';
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


    //恭喜通关
    //$(".page-register").addClass("show");
    //getAward();

    // 全局变量 ajax请求路径
    var baseUrl = "./djgame/frontend/web/game";
    var URL = {
        send: baseUrl + "/send.json",
        gift: baseUrl + "/gift.json",
        register: baseUrl + "/register.json"
    };

    /**
     * 输入手机号码进行验证
     */
    function getAward(){
        var $pageValidate = $("#pageValidate"),
            $sendMessageBtn = $(".J_sendMessage"),
            $validateBtn = $(".J_validate"),
            $inputPhone = $pageValidate.find(".input-phone"),
            $inputValidate = $pageValidate.find(".input-validate"),
            SECOND = 5,
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
            var phone = $.trim($inputPhone.val()),
                data = {
                    "mobile": phone
                };
            if(!phone.length){
                alert("请输入您的手机号码")
                return false;
            }
            if (isWaiting === false){
                $.ajax({
                    type:"GET",
                    url: URL.send,
                    data:data,
                    success:function(response){
                        if(response.result == 0){
                            isWaiting = true;
                            timeCount();
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
                code = $.trim($inputValidate.val()),
                data = {
                    "mobile": phone,
                    "code": code
                };
            if(!phone.length){
                alert("请输入您的手机号码")
                return false;
            }
            $.ajax({
                type:"GET",
                url: URL.gift,
                data:data,
                success:function(response){

                    var result = response.result
                        msg = response.message;

                    if(result == 0){
                        // 成功
                        $pageValidate.removeClass("show");
                        $(".page-finished").addClass("show");

                    }else if(result == 1){
                        // 非会员
                        popup("no-pass");

                    }else if(result == 2){
                        // 手机号异常
                        // 会员资料异常，请去德基客服台处理
                        //alert("会员资料异常，请去德基客服台处理");
                        alert(msg);
                    }else if(result == 3){
                        // 已参加过活动
                        //alert("您已参加过活动")
                        alert(msg);
                    }else if(result == 4){
                        // 不在活动有效期之内
                        //alert("不在活动有效期之内")
                        alert(msg);
                    }else if(result == 5){
                        // 短信验证码不正确
                        //alert("短信验证码不正确，请重新输入")
                        alert(msg);
                    }
                }
            })
        })

        $inputBirth.on("focus",function(e){
            $(this).attr("type","date");
            $(this).focus();
        })

        $registerBtn.off().on("tap",function(e){
            e.stopPropagation();
            var phone = $.trim($inputPhoneRe.val()),
                gender = $inputGender.val(),
                name = $.trim($inputName.val()),
                birth = $inputBirth.val();
            var data = {
                    "mobile": phone,
                    "gender": gender,
                    "name": name,
                    "birthday": birth
                };;

            if(!phone.length){
                alert("请输入手机号码");
                return false;
            }

            $.ajax({
                type:"GET",
                url: URL.register,
                data:data,
                success:function(response){
                    var result = response.result,
                        msg = response.message;

                    if(result == 0){
                        // 注册成功
                        popup("register-pass");

                    }else if(result == 1){
                        // 已经是会员，重新登陆
                        //alert("您已经是会员，马上登陆领取积分")
                        alert(msg);
                        showValidate();

                    }else if(result == 2){
                        // 注册失败
                        //alert("注册失败，请重新尝试");
                        alert(msg);
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

        $popupBtn.on("tap",function(e){
            e.stopPropagation();
            
            $popup.removeClass("show");

            if($popupCont.hasClass("no-pass")){
                $pageValidate.removeClass("show");
                $pageRegister.addClass("show");
            }else if($popupCont.hasClass("register-pass")){
                showValidate()
            }
        })

        $popup.on("tap",function(){
            e.stopPropagation();
            $(this).removeClass("show");
            if($popupCont.hasClass("register-pass")){
                showValidate()
            }
        })
    }
 
    $(".page-tips").on("tap", function() {
        $(this).remove();
    });

    $("#jsMusic").on("tap", function() {
        e.stopPropagation();
        var music = $(this);
        if(music.hasClass("open")){
            $("#audioBg")[0].play();
        }else{
            $("#audioBg")[0].pause();
        }
        music.toggleClass("open");
    });

    $("#link").on("tap", function() {
        window.location.href = "http://dev.digitalsnail.cn/djgame/html/";
    });
});
