function XsScroll(json) {
    this.oScroll = document.querySelector("#oScroll");
    this.init(json);
}
XsScroll.prototype = {
    init: function (json) {
        var _this = this;
        this.oScroll.oRefreshInfo = document.querySelector("#xs-refresh-info");
        this.oScroll.oRefreshAnimate = document.querySelector("#xs-refresh-animate");
        this.oScroll.oLoadInfo = document.querySelector("#xs-load-info");
        this.oScroll.oLoadAnimate = document.querySelector("#xs-load-animate");
        this.oScroll.noData = document.querySelector("#xs-nodata");
        this, oScroll.startY = 0;
        this.oScroll.endY = 0;
        this.oScroll.disY = 0;
        this.oScroll.stopLoad = { isFlag: true };
        this.oScroll.json = json;
        this.oScroll.addEventListener("touchstart", this.touchStartFn);
        this.oScroll.addEventListener("touchmove", this.touchMoveFn);
        this.oScroll.addEventListener("touchend", this.touchEndFn);
        this.oScroll.done = this.done;
        if (this.oScroll.json.loadFn) {
            this.oScroll.json.loadFn();
        }
    },
    done: function () {
        console.log(this);
        this.style.transform = "translate3d(0px,0px,0px)";
        this.oRefreshInfo.style.display = "block";
        this.oRefreshAnimate.style.display = "none";
        this.stopLoad.isFlag = true;
        this.oLoadInfo.style.display = "block";
        this.oLoadAnimate.style.display = "none";
        this.noData.style.display = 'none';
    },
    touchStartFn: function (event) {
        if (event) {
            var oTouch = event.targetTouches[0];
            this.startY = oTouch.pageY;
            console.log("开始坐标：" + this.startY);
        }
    },
    touchMoveFn: function (event) {
        if (event) {
            var oTouch = event.targetTouches[0];
            this.endY = oTouch.pageY;
            if (this.endY - this.startY > 0) {
                this.style.transform = "translate3d(0px, " + (this.endY - this.startY) + "px, 0px)"
            }
            else if (this.endY - this.startY < 0 && this.stopLoad.isFlag) {
                this.style.transform = "translate3d(0px, " + (this.endY - this.startY) + "px, 0px)"
            }
            console.log("滑动坐标：" + this.endY);
        }
    },
    touchEndFn: function (event) {
        // this.stopLoadFn();
        var _this = this;
        if (event) {
            this.disY = this.endY - this.startY;
            console.log("坐标差：" + this.disY);
            if (this.disY > 65) {
                this.oRefreshInfo.style.display = "none";
                this.oRefreshAnimate.style.display = "block";
            }
            else if (this.disY < -65) {
                this.oLoadInfo.style.display = "none";
                this.oLoadAnimate.style.display = "block";
            }
            setTimeout(function () {
                if (_this.disY > 65) {
                    _this.style.transform = "translate3d(0px, 36px, 0px)";
                    setTimeout(function () {
                        if (_this.json.refreshFn) {
                            _this.json.refreshFn(_this.done.bind(_this));
                        }
                    }, 1500);
                }
                else if (_this.disY < -65) {
                    if (_this.stopLoad.isFlag) {
                        _this.style.transform = "translate3d(0px, -36px, 0px)";
                        setTimeout(function () {
                            _this.style.transform = "translate3d(0px,0px,0px)";
                            _this.oLoadInfo.style.display = "block";
                            _this.oLoadAnimate.style.display = "none";
                            if (_this.json.loadFn && _this.stopLoad.isFlag) {
                                _this.json.loadFn(_this.stopLoad);
                            }
                        }, 1500);
                    }
                    else {
                        _this.noData.style.display = 'block';
                        _this.noData.style.zIndex = '999';
                    }
                }
                else {
                    console.log(_this);
                    _this.style.transform = "translate3d(0px, 0px, 0px)";
                }
            }, 10);
        }
    }
}
