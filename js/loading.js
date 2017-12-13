/* loading */
$(function() {
    var PreLoad = function(a, b) {
        var c = b || {};
        this.source = a, this.count = 0, this.total = a.length, this.onload = c.onload, 
        this.prefix = c.prefix || "", this.init();
    };
    PreLoad.prototype.init = function() {
        var a = this;
        a.source.forEach(function(b) {
            var c = b.replace(/[#\?].*$/, "").substr(b.lastIndexOf(".") + 1).toLowerCase(), d = a.prefix + b;
            switch (c) {
              case "js":
                a.script.call(a, d);
                break;

              case "css":
                a.stylesheet.call(a, d);
                break;

              case "svg":
              case "jpg":
              case "gif":
              case "png":
              case "jpeg":
                a.image.call(a, d);
            }
        });
    }, PreLoad.prototype.getProgress = function() {
        return Math.round(this.count / this.total * 100);
    }, PreLoad.prototype.image = function(a) {
        var b = document.createElement("img");
        this.load(b, a), b.src = a;
    }, PreLoad.prototype.stylesheet = function(a) {
        var b = document.createElement("link");
        this.load(b, a), b.rel = "stylesheet", b.type = "text/css", b.href = a, document.head.appendChild(b);
    }, PreLoad.prototype.script = function(a) {
        var b = document.createElement("script");
        this.load(b, a), b.type = "text/javascript", b.src = a, document.head.appendChild(b);
    }, PreLoad.prototype.load = function(a, b) {
        var c = this;
        a.onload = a.onerror = a.onabort = function(a) {
            c.onload && c.onload({
                count: ++c.count,
                total: c.total,
                item: b,
                type: a.type
            });
        };
    };
    var resources = [ "./css/index.css","./js/lib/touch.js" ];

    var images = [
        "./image/swipe_tips.png", 
        "./image/step1/btn_check.png", 
        "./image/step1/light/bg2_01.jpg", 
        "./image/step1/light/bg2_02.jpg",
        "./image/step1/light/bg2_03.jpg", 
        "./image/step1/light/bg2_04.jpg",
        "./image/step1/animate/before/animate01.png",
        "./image/step1/animate/before/animate02.jpg",
        "./image/step1/animate/before/animate03.png",
        "./image/step1/animate/before/animate04.jpg",
        "./image/step1/animate/before/animate05.png",
        "./image/step1/animate/before/animate06.png",
        "./image/step1/animate/before/animate07.png",
        "./image/step1/animate/before/animate08.png",
        "./image/step1/animate/before/animate09.png",
        "./image/step1/animate/before/animate10.png",
        "./image/step1/animate/before/animate11.jpg",
        "./image/step1/animate/before/animate12.png",
        "./image/step1/animate/before/animate13.png",
        "./image/step1/animate/before/animate14.png",
        "./image/step1/animate/before/animate15.png",
        "./image/step1/animate/after/animate02.jpg",
        "./image/step1/animate/after/animate04.jpg",
        "./image/step1/animate/after/animate11.jpg",
        "./image/step1/animate/after/animate13.png",
        "./image/step1/animate/after/animate14.png",
        "./image/step1/animate/after/animate15.png",
        "./image/step1/popup/progress-bg.jpg",
        "./image/step1/popup/img/01.jpg", 
        "./image/step1/popup/img/02.jpg",
        "./image/step1/popup/img/03.jpg", 
        "./image/step1/popup/img/04.jpg",
        "./image/step1/popup/img/05.jpg", 
        "./image/step1/popup/img/06.jpg",
        "./image/step1/popup/img/07.jpg", 
        "./image/step1/popup/img/08.jpg",
        "./image/step1/popup/img/key01.png",
        "./image/step1/popup/img/key02.png",
        "./image/step1/popup/img/key03.png",
        "./image/step1/popup/img/key04.png",
        "./image/step1/popup/text/discount/01.png", 
        "./image/step1/popup/text/discount/02.png",
        "./image/step1/popup/text/discount/03.png", 
        "./image/step1/popup/text/discount/04.png",
        "./image/step1/popup/text/discount/05.png", 
        "./image/step1/popup/text/discount/06.png",
        "./image/step1/popup/text/discount/07.png", 
        "./image/step1/popup/text/discount/08.png",
        "./image/step1/popup/text/key/01.png", 
        "./image/step1/popup/text/key/02.png",
        "./image/step1/popup/text/key/03.png", 
        "./image/step1/popup/text/key/04.png",
        "./image/step2/light/bg2_01.jpg", 
        "./image/step2/light/bg2_02.jpg",
        "./image/step2/light/bg2_03.jpg", 
        "./image/step2/light/bg2_04.jpg",
        "./image/step2/animate/before/01.jpg",
        "./image/step2/animate/before/02.jpg",
        "./image/step2/animate/before/03.png",
        "./image/step2/animate/before/08.jpg",
        "./image/step2/animate/before/09.jpg",
        "./image/step2/animate/before/10.jpg",
        "./image/step2/animate/after/01.jpg",
        "./image/step2/animate/after/02.jpg",
        "./image/step2/animate/after/03.png",
        "./image/step2/animate/after/04.jpg",
        "./image/step2/animate/after/05.jpg",
        "./image/step2/animate/after/08.jpg",
        "./image/step2/animate/after/09.jpg",
        "./image/step2/animate/after/10.jpg",
        "./image/step2/popup/text-bg.jpg",
        "./image/step2/popup/img/01.png",
        "./image/step2/popup/img/02.png",
        "./image/step2/popup/img/03.png",
        "./image/step2/popup/img/04.png",
        "./image/step2/popup/img/05.png",
        "./image/step2/popup/img/06.png",
        "./image/step2/popup/img/07.png",
        "./image/step2/popup/img/npc01.png",
        "./image/step2/popup/img/npc02.png",
        "./image/step2/popup/img/npc03.png",
        "./image/step2/popup/img/npc04.png",
        "./image/step2/popup/img/key01.png",
        "./image/step2/popup/img/key02.png",
        "./image/step2/popup/img/key03.png",
        "./image/step2/popup/img/key04.png",
        "./image/step2/popup/img/key05.png",
        "./image/step2/popup/img/key06.png",
        "./image/step2/popup/img/more-btn.png",
        "./image/step2/popup/text/01.png",
        "./image/step2/popup/text/02.png",
        "./image/step2/popup/text/03.png",
        "./image/step2/popup/text/04.png",
        "./image/step2/popup/text/05.png",
        "./image/step2/popup/text/06.png",
        "./image/step2/popup/text/07.png",
        "./image/fun/pass-bg.gif",
        "./image/fun/pass-bg.jpg",
        "./image/fun/pass-btn.png",
        "./image/fun/pass-img.png",
        "./image/fun/passBtn-1.png",
        "./image/fun/passBtn-bg.png",
        "./image/fun/register-pass.gif",
        "./image/fun/register.gif",
        "./image/fun/register.png",
        "./image/fun/unpass.gif",
        "./image/fun/validate.png",
        "./image/loading/pointer.png"
    ]; 

    resources = resources.concat(images);
    new PreLoad(resources, {
        onload: function(load) {
            var count = load.count, total = load.total, percent = Math.ceil(100 * count / total);
            $("#percent").html(percent + "%");
            $('#loading .animate-item .before').css({
              'width': percent + '%'
            })
            $('#loading .animate-item .after').css({
              'left': percent + '%'
            })
            setTimeout(function() {
                
                if (count == total) {
                    
                    $("#jsBgBox").removeClass("dark");

                    var el = $("#loading");
                    $(el).addClass("complete");
                    setTimeout(function() {
                        $(el).remove();
                        $("#jsMusic").addClass("show");
                    }, 1000);
                }
            }, 500);
        }
    });
});