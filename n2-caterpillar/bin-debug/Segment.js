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
var Segment = (function (_super) {
    __extends(Segment, _super);
    function Segment(x, y) {
        var _this = _super.call(this) || this;
        _this._amplitude = 15; //振幅
        _this._angle = 0; //振动角度
        _this._angleVel = 0.04; //频率
        _this._mass = 10;
        _this._pushForce = 0.02;
        _this._location = new Vector2D(x, y);
        _this._bodyShape = new SegmentShape();
        _this._generateForce = new Vector2D(0, 0);
        _this.addChild(_this._bodyShape);
        return _this;
    }
    Object.defineProperty(Segment.prototype, "pushForce", {
        set: function (value) {
            this._pushForce = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Segment.prototype, "target", {
        get: function () {
            return this._target;
        },
        set: function (value) {
            this._target = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Segment.prototype, "location", {
        get: function () {
            return this._location;
        },
        set: function (value) {
            this._location = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Segment.prototype, "generateForce", {
        get: function () {
            var force = Vector2D.sub(this._target, this._location);
            force.normalize();
            if (this.isHead()) {
                force.mult(0);
            }
            else {
                force.mult(this._pushForce);
            }
            this._generateForce = force;
            return this._generateForce;
        },
        enumerable: true,
        configurable: true
    });
    Segment.prototype.isHead = function () {
        var angle = this._angle % (Math.PI * 2);
        if (angle > 0 && angle < Math.PI) {
            return false;
        }
        return true;
    };
    Segment.prototype.update = function () {
        var dir = Vector2D.sub(this._target, this._location);
        this._heading = dir.heading2D();
        var l = this._amplitude * Math.cos(this._angle);
        this._angle += this._angleVel;
        this._wagOffset = new Vector2D(l * Math.cos(this._heading), l * Math.sin(this._heading));
    };
    Segment.prototype.display = function () {
        this.x = this._location.x + this._wagOffset.x;
        this.y = this._location.y + this._wagOffset.y;
        this.rotation = this._heading * 180 / Math.PI;
    };
    return Segment;
}(egret.Sprite));
__reflect(Segment.prototype, "Segment");
//# sourceMappingURL=Segment.js.map