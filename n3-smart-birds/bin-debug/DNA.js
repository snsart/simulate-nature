var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DNA = (function () {
    function DNA() {
        this._genes = [];
        this._maxforce = 0.5;
        this._lifetime = 200;
        for (var i = 0; i < this._lifetime; i++) {
            var force = Vector2D.random2D();
            force.mult(Math.random() * this._maxforce);
            this._genes.push(force);
        }
    }
    Object.defineProperty(DNA.prototype, "genes", {
        get: function () {
            return this._genes;
        },
        enumerable: true,
        configurable: true
    });
    DNA.prototype.crossover = function (partner) {
        var child = new DNA();
        //let midpoint=Math.floor(Math.random()*200);
        for (var i = 0; i < this._genes.length; i++) {
            var random = Math.random();
            if (random > 0.5) {
                child._genes[i] = this._genes[i];
            }
            else {
                child._genes[i] = partner._genes[i];
            }
        }
        return child;
    };
    DNA.prototype.mutate = function (mutationRate) {
        for (var i = 0; i < this._genes.length; i++) {
            if (Math.random() < mutationRate) {
                var force = Vector2D.random2D();
                force.mult(Math.random() * this._maxforce);
                this._genes[i] = force;
            }
        }
    };
    return DNA;
}());
__reflect(DNA.prototype, "DNA");
//# sourceMappingURL=DNA.js.map