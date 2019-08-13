var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var SegmentShape = (function (_super) {
    __extends(SegmentShape, _super);
    function SegmentShape() {
        var _this = _super.call(this) || this;
        _this.draw();
        return _this;
    }
    SegmentShape.prototype.draw = function () {
        var g = this.graphics;
        g.lineStyle(1, 0x000000);
        g.beginFill(0xff0000);
        g.drawRoundRect(0, 0, 30, 30, 20, 20);
        var ball = new egret.Shape();
        ball.graphics.beginFill(0x000000);
        ball.graphics.drawCircle(30, 15, 5);
        this.addChild(ball);
    };
    return SegmentShape;
}(egret.Sprite));
__reflect(SegmentShape.prototype, "SegmentShape");
//# sourceMappingURL=SegmentShape.js.map