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
var Obstacle = (function (_super) {
    __extends(Obstacle, _super);
    function Obstacle(x, y, w, h) {
        var _this = _super.call(this) || this;
        _this.location = new Vector2D(x, y);
        _this.w = w;
        _this.h = h;
        _this.display();
        return _this;
    }
    Obstacle.prototype.contains = function (v) {
        if (v.x > this.location.x && v.x < this.location.x + this.w && v.y > this.location.y && v.y < this.location.y + this.h) {
            return true;
        }
        else {
            return false;
        }
    };
    Obstacle.prototype.display = function () {
        var g = this.graphics;
        g.beginFill(0x888888);
        g.drawRect(this.location.x, this.location.y, this.w, this.h);
    };
    return Obstacle;
}(egret.Shape));
__reflect(Obstacle.prototype, "Obstacle");
//# sourceMappingURL=Obstacle.js.map