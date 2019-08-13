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
var Repeller = (function (_super) {
    __extends(Repeller, _super);
    function Repeller(x, y) {
        var _this = _super.call(this) || this;
        _this.r = 50;
        _this.location = new Vector2D(x, y);
        return _this;
    }
    Repeller.prototype.display = function () {
        var g = this.graphics;
        g.beginFill(0xff0000);
        g.drawCircle(this.location.x, this.location.y, this.r);
    };
    Repeller.prototype.repel = function (p) {
        var dir = Vector2D.sub(this.location, p.location);
        var d = dir.mag();
        d = d < 5 ? 5 : (d > 300 ? 300 : d);
        dir.normalize();
        var force = -1 * 1000 / (d * d);
        dir.mult(force);
        return dir;
    };
    return Repeller;
}(egret.Sprite));
__reflect(Repeller.prototype, "Repeller");
//# sourceMappingURL=Repeller.js.map