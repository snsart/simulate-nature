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
var Liquid = (function (_super) {
    __extends(Liquid, _super);
    function Liquid(x, y, w, h, c) {
        var _this = _super.call(this) || this;
        _this._x = x;
        _this._y = y;
        _this._w = w;
        _this._h = h;
        _this._c = c;
        return _this;
    }
    Object.defineProperty(Liquid.prototype, "x", {
        get: function () {
            return this._x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Liquid.prototype, "y", {
        get: function () {
            return this._y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Liquid.prototype, "w", {
        get: function () {
            return this._w;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Liquid.prototype, "h", {
        get: function () {
            return this._h;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Liquid.prototype, "c", {
        get: function () {
            return this._c;
        },
        enumerable: true,
        configurable: true
    });
    Liquid.prototype.display = function () {
        var g = this.graphics;
        g.clear();
        g.beginFill(0x000088);
        g.drawRect(this._x, this._y, this._w, this._h);
    };
    return Liquid;
}(egret.Sprite));
__reflect(Liquid.prototype, "Liquid");
//# sourceMappingURL=Liquid.js.map