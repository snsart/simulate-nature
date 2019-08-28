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
var Population = (function (_super) {
    __extends(Population, _super);
    function Population(mutationRate, totalPopulation, obstacles, target) {
        if (target === void 0) { target = new Vector2D(0, 0); }
        var _this = _super.call(this) || this;
        _this.mutationRate = mutationRate;
        _this.totalPopulation = totalPopulation;
        _this.population = [];
        _this.matingPool = [];
        _this.target = target;
        _this.obstacles = obstacles;
        for (var i = 0; i < _this.totalPopulation; i++) {
            var v = new Vehicle(1, 80, 380, _this.target);
            v.obstacles = _this.obstacles;
            _this.population.push(v);
            _this.addChild(v);
        }
        return _this;
    }
    Population.prototype.live = function () {
        for (var i = 0; i < this.population.length; i++) {
            this.population[i].run();
        }
    };
    Population.prototype.fitness = function () {
        for (var i = 0; i < this.totalPopulation; i++) {
            this.population[i].fitness();
        }
    };
    Population.prototype.selection = function () {
        this.matingPool = [];
        var totalFitness = 0;
        for (var i = 0; i < this.totalPopulation; i++) {
            totalFitness += this.population[i].getFitness();
        }
        for (var i = 0; i < this.totalPopulation; i++) {
            var n = this.population[i].getFitness() / totalFitness * 300;
            if (n < 1) {
                continue;
            }
            for (var j = 0; j < n; j++) {
                this.matingPool.push(this.population[i]);
            }
        }
    };
    Population.prototype.reproduction = function () {
        for (var i = 0; i < this.population.length; i++) {
            var a = Math.floor(Math.random() * this.matingPool.length);
            var b = Math.floor(Math.random() * this.matingPool.length);
            var partnerA = this.matingPool[a];
            var partnerB = this.matingPool[b];
            var child = partnerA.crossover(partnerB);
            child.target = this.target;
            child.obstacles = this.obstacles;
            child.mutate(this.mutationRate);
            this.removeChild(this.population[i]);
            this.population[i] = child;
            this.addChild(child);
        }
    };
    return Population;
}(egret.Sprite));
__reflect(Population.prototype, "Population");
//# sourceMappingURL=Population.js.map