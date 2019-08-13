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
var ParticleSystem = (function (_super) {
    __extends(ParticleSystem, _super);
    function ParticleSystem(location) {
        var _this = _super.call(this) || this;
        _this.origin = location.copy();
        _this.particles = new Array();
        _this.torchImage = _this.createBitmapByName("torch_png");
        _this.addChild(_this.torchImage);
        _this.torchImage.anchorOffsetX = -10;
        _this.torchImage.anchorOffsetY = -30;
        _this.torchImage.x = _this.origin.x;
        _this.torchImage.y = _this.origin.y;
        return _this;
    }
    ParticleSystem.prototype.setOrigin = function (x, y) {
        this.origin.x = x;
        this.origin.y = y;
        this.torchImage.x = x;
        this.torchImage.y = y;
    };
    ParticleSystem.prototype.addParticle = function () {
        var p = new Particle(this.origin);
        this.particles.push(p);
        this.addChild(p);
    };
    ParticleSystem.prototype.applyForce = function (f) {
        for (var _i = 0, _a = this.particles; _i < _a.length; _i++) {
            var p = _a[_i];
            p.applyForce(f);
        }
    };
    ParticleSystem.prototype.applyRepeller = function (r) {
        for (var _i = 0, _a = this.particles; _i < _a.length; _i++) {
            var p = _a[_i];
            var force = r.repel(p);
            p.applyForce(force);
        }
    };
    ParticleSystem.prototype.run = function () {
        for (var _i = 0, _a = this.particles; _i < _a.length; _i++) {
            var p = _a[_i];
            p.run();
            if (p.isDead()) {
                this.particles.splice(this.particles.indexOf(p), 1);
                this.removeChild(p);
            }
        }
    };
    ParticleSystem.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return ParticleSystem;
}(egret.Sprite));
__reflect(ParticleSystem.prototype, "ParticleSystem");
//# sourceMappingURL=ParticleSystem.js.map