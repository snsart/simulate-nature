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
var Vehicle = (function (_super) {
    __extends(Vehicle, _super);
    function Vehicle(mass, x, y, target) {
        if (target === void 0) { target = new Vector2D(0, 0); }
        var _this = _super.call(this) || this;
        _this.geneCounter = 0;
        _this.stoped = false;
        _this.obstacles = [];
        _this.dna = new DNA();
        _this.mass = mass;
        _this.location = new Vector2D(x, y);
        _this.velocity = new Vector2D(0, 0);
        _this.acceleration = new Vector2D(0, 0);
        _this.target = target;
        _this.shape = new egret.Shape();
        var g = _this.shape.graphics;
        g.clear();
        g.beginFill(0xff0000);
        g.moveTo(0, 0);
        g.lineTo(-10, -5);
        g.lineTo(-10, 5);
        g.lineTo(0, 0);
        _this.addChild(_this.shape);
        _this.shape.x = _this.location.x;
        _this.shape.y = _this.location.y;
        return _this;
    }
    Vehicle.prototype.testObstacle = function () {
        for (var _i = 0, _a = this.obstacles; _i < _a.length; _i++) {
            var obs = _a[_i];
            if (obs.contains(this.location)) {
                this.stoped = true;
            }
        }
    };
    Vehicle.prototype.run = function (vehicles) {
        if (!this.stoped) {
            this.geneCounter++;
            this.applyForce(this.dna.genes[this.geneCounter]);
            this.update();
            this.testObstacle();
            this.display();
        }
    };
    /*适应度计算*/
    Vehicle.prototype.fitness = function () {
        var d = Vector2D.dist(this.location, this.target);
        this._fitness = Math.pow(1 / d, 2);
        if (this.stoped) {
            this._fitness = 0;
        }
    };
    Vehicle.prototype.getFitness = function () {
        return this._fitness;
    };
    /*繁殖*/
    Vehicle.prototype.crossover = function (v) {
        var vehicle = new Vehicle(1, 80, 380);
        var dna = this.dna.crossover(v.dna);
        vehicle.dna = dna;
        return vehicle;
    };
    /*突变*/
    Vehicle.prototype.mutate = function (mutationRate) {
        this.dna.mutate(mutationRate);
    };
    Vehicle.prototype.applyForce = function (force) {
        var f = Vector2D.div(force, this.mass);
        this.acceleration.add(f);
    };
    Vehicle.prototype.update = function () {
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
        this.acceleration.mult(0);
    };
    Vehicle.prototype.display = function () {
        this.shape.x = this.location.x;
        this.shape.y = this.location.y;
        var angle = this.velocity.heading2D() * 180 / Math.PI;
        this.shape.rotation = angle;
    };
    Vehicle.prototype.checkEdge = function (width, height) {
        if (this.location.x > width) {
            this.location.x = 0;
        }
        else if (this.location.x < 0) {
            this.location.x = width;
        }
        if (this.location.y > height) {
            this.location.y = 0;
        }
        else if (this.location.y < 0) {
            this.location.y = height;
        }
    };
    return Vehicle;
}(egret.Sprite));
__reflect(Vehicle.prototype, "Vehicle");
//# sourceMappingURL=Vehicle.js.map