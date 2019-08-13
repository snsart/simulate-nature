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
var Worm = (function (_super) {
    __extends(Worm, _super);
    function Worm(x, y) {
        var _this = _super.call(this) || this;
        _this._segments = [];
        _this._mass = 10;
        _this._segmentNum = 3;
        _this._location = new Vector2D(x, y);
        _this._velocity = new Vector2D(0, 0);
        _this._acceleration = new Vector2D(0, 0);
        _this._target = new Vector2D(x, y);
        _this.createSegments();
        return _this;
    }
    Object.defineProperty(Worm.prototype, "target", {
        get: function () {
            return this._target;
        },
        set: function (value) {
            this._target = value;
        },
        enumerable: true,
        configurable: true
    });
    Worm.prototype.createSegments = function () {
        for (var i = 0; i < this._segmentNum; i++) {
            var segment = new Segment(0, 0);
            segment._angle = i * Math.PI / 5;
            this._segments.push(segment);
            if (i == 0) {
                segment.target = this._target;
                segment.location = this._location;
            }
            else {
                segment.target = this._segments[i - 1].location;
                segment.location = this._segments[i - 1].location.copy();
                segment.location.sub(new Vector2D(20, 0));
            }
            this.addChild(segment);
            segment.update();
            segment.display();
        }
        this.segmentsUpdate();
    };
    Worm.prototype.segmentsUpdate = function () {
        for (var i = 0; i < this._segmentNum; i++) {
            var segment = this._segments[i];
            if (i == 0) {
                segment.target = this._target;
                segment.location = this._location;
            }
            else {
                segment.target = this._segments[i - 1].location.copy();
                var newLocation = segment.target.copy();
                var dir = Vector2D.sub(segment.location, segment.target);
                dir.normalize();
                dir.mult(20);
                newLocation.add(dir);
                segment.location = newLocation;
                console.log(newLocation);
            }
            segment.update();
            segment.display();
        }
    };
    Worm.prototype.run = function () {
        var force = new Vector2D(0, 0);
        for (var i = 0; i < this._segments.length; i++) {
            var segment = this._segments[i];
            force.add(segment.generateForce);
        }
        this.applyForce(force);
        var fraction = this._velocity.copy();
        fraction.normalize();
        fraction.mult(-0.01);
        this.applyForce(fraction);
        this.update();
        this.segmentsUpdate();
    };
    Worm.prototype.update = function () {
        this._velocity.add(this._acceleration);
        this._location.add(this._velocity);
        this._acceleration.mult(0);
    };
    Worm.prototype.applyForce = function (force) {
        var f = Vector2D.div(force, this._mass);
        this._acceleration.add(f);
    };
    return Worm;
}(egret.Sprite));
__reflect(Worm.prototype, "Worm");
//# sourceMappingURL=Worm.js.map