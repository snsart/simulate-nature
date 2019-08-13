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
var Particle = (function (_super) {
    __extends(Particle, _super);
    function Particle(l) {
        var _this = _super.call(this) || this;
        _this.location = l.copy();
        _this.acceleration = new Vector2D(0, 0);
        var vx = _this.gaussrand() * 0.5; //使用高斯分布生成初速度
        var vy = _this.gaussrand() * 0.5;
        _this.velocity = new Vector2D(vx, vy);
        _this.lifespan = 255;
        _this.mass = 1;
        _this.blendMode = egret.BlendMode.ADD;
        _this.image = _this.createBitmapByName("ball_png");
        var radious = Math.random() * 10 + 30;
        _this.image.width = radious;
        _this.image.height = radious;
        _this.addChild(_this.image);
        return _this;
    }
    Particle.prototype.run = function () {
        this.update();
        this.display();
    };
    Particle.prototype.update = function () {
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
        this.acceleration.mult(0);
        this.lifespan -= 1.5;
    };
    Particle.prototype.display = function () {
        /*let g=this.graphics;
        g.clear();
        g.beginFill(0x666666,this.lifespan/255);
        g.drawCircle(this.location.x,this.location.y,15);*/
        this.image.x = this.location.x;
        this.image.y = this.location.y;
        this.image.alpha = this.lifespan / 255;
    };
    Particle.prototype.applyForce = function (f) {
        var force = f.copy();
        force.div(this.mass);
        this.acceleration.add(f);
    };
    Particle.prototype.isDead = function () {
        if (this.lifespan < 0) {
            return true;
        }
        return false;
    };
    Particle.prototype.gaussrand = function () {
        var u = Math.random();
        var v = Math.random();
        //console.log(u,v);
        var z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
        return z;
    };
    Particle.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Particle;
}(egret.Sprite));
__reflect(Particle.prototype, "Particle");
//# sourceMappingURL=Particle.js.map