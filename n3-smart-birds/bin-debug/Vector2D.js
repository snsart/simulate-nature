/*
* 2d向量类
* @author jinhailiang
* date:20190801
* update:20190814-(0,0)向量单位化，返回(0,0);
*/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vector2D = (function () {
    function Vector2D(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this._x = x;
        this._y = y;
    }
    Object.defineProperty(Vector2D.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (value) {
            this._x = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2D.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (value) {
            this._y = value;
        },
        enumerable: true,
        configurable: true
    });
    /*------------------------------------静态方法-----------------------------*/
    /*两个向量相加*/
    Vector2D.add = function (v1, v2) {
        var x = v1.x + v2.x, y = v1.y + v2.y;
        return new Vector2D(x, y);
    };
    /*两个向量相减*/
    Vector2D.sub = function (v1, v2) {
        var x = v1.x - v2.x, y = v1.y - v2.y;
        return new Vector2D(x, y);
    };
    /*向量乘以一个标量*/
    Vector2D.mult = function (v, num) {
        var x = v.x * num, y = v.y * num;
        return new Vector2D(x, y);
    };
    /*向量除以一个标量*/
    Vector2D.div = function (v, num) {
        if (num == 0) {
            throw new Error("除0错误");
        }
        var x = v.x / num, y = v.y / num;
        return new Vector2D(x, y);
    };
    /*计算向量长度*/
    Vector2D.mag = function (v) {
        return Math.sqrt(v.x * v.x + v.y * v.y);
    };
    /*设定向量长度*/
    Vector2D.setMag = function (v, len) {
        v = Vector2D.normalize(v);
        return Vector2D.mult(v, len);
    };
    /*单位化向量，使其长度为1*/
    Vector2D.normalize = function (v) {
        var m = Vector2D.mag(v);
        if (m === 0) {
            return new Vector2D(0, 0);
        }
        return Vector2D.div(v, m);
    };
    /*限制向量的长度*/
    Vector2D.limit = function (v, maxLen) {
        if (Vector2D.mag(v) > maxLen) {
            v = Vector2D.setMag(v, maxLen);
        }
    };
    /*计算向量的方向*/
    Vector2D.heading2D = function (v) {
        return Math.atan2(v.y, v.x);
    };
    /*旋转一个二维向量*/
    Vector2D.rotate = function (v, angle) {
        var cos = Math.cos(angle), sin = Math.sin(angle), x = v.x * cos + v.y * sin, y = -v.x * sin + v.y * cos;
        return new Vector2D(x, y);
    };
    /*线性插值到另一个向量
    * mid为取值为(0,1),
    */
    Vector2D.lerp = function (v1, v2, mid) {
        var x = v1.x * (1 - mid) + v2.x * mid, y = v1.y * (1 - mid) + v2.y * mid;
        return new Vector2D(x, y);
    };
    /*计算两个向量的欧几里得距离*/
    Vector2D.dist = function (v1, v2) {
        return Math.sqrt((v1.x - v2.x) * (v1.x - v2.x) + (v1.y - v2.y) * (v1.y - v2.y));
    };
    /*计算两个向量的夹角*/
    Vector2D.angelBetween = function (v1, v2) {
        return Vector2D.heading2D(v2) - Vector2D.heading2D(v1);
    };
    /*计算两个向量的点乘
    *两个向量的点乘返回一个数，代表v1在v2上的投影长度，当长度为0时，说明两向量垂直;
    */
    Vector2D.dot = function (v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    };
    /*计算两个向量的叉乘
    *两个向量的叉乘是另一个向量，它与这两个向量形成的平面垂直，可以通过右手法则判断其方向;
    * 右手法则：a×b用右手指向a，然后握向b，大拇指指的方向即为叉乘的方向;
    * 三维向量叉乘公式为：a×b=(y1z2-y2z1,-(x1z2-x2z1),x1y2-x2y1)；
    * 二维向量相乘，可以假设z1和z2等于0，只返回第3个参数，可以通过这个参数的正负，判断b在a的左侧还是右侧,或者共线(参数为0);
    */
    Vector2D.cross = function (v1, v2) {
        return v1.x * v2.y - v2.x * v1.y;
    };
    /*返回一个随机的二维向量*/
    Vector2D.random2D = function () {
        var x = Math.random() - 0.5, y = Math.random() - 0.5;
        var randomV = new Vector2D(x, y);
        randomV.normalize();
        return randomV;
    };
    /*-----------------------------------------------非静态方法-------------------------------------------------*/
    /*两个向量相加*/
    Vector2D.prototype.add = function (v) {
        this.x += v.x;
        this.y += v.y;
    };
    /*两个向量相减*/
    Vector2D.prototype.sub = function (v) {
        this.x -= v.x;
        this.y -= v.y;
    };
    /*向量乘以一个标量*/
    Vector2D.prototype.mult = function (num) {
        this.x *= num;
        this.y *= num;
    };
    /*向量除以一个标量*/
    Vector2D.prototype.div = function (num) {
        if (num == 0) {
            throw new Error("除0错误");
        }
        this.x /= num,
            this.y /= num;
    };
    /*计算向量长度*/
    Vector2D.prototype.mag = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    /*设定向量长度*/
    Vector2D.prototype.setMag = function (len) {
        this.normalize();
        this.mult(len);
    };
    /*单位化向量，使其长度为1*/
    Vector2D.prototype.normalize = function () {
        var m = this.mag();
        if (m === 0) {
            return;
        }
        this.div(m);
    };
    /*限制向量的长度*/
    Vector2D.prototype.limit = function (maxLen) {
        if (this.mag() > maxLen) {
            this.setMag(maxLen);
        }
    };
    /*计算向量的方向*/
    Vector2D.prototype.heading2D = function () {
        return Math.atan2(this.y, this.x);
    };
    /*旋转一个二维向量*/
    Vector2D.prototype.rotate = function (angle) {
        var cos = Math.cos(angle), sin = Math.sin(angle);
        var x = this.x, y = this.y;
        this.x = x * cos + y * sin;
        this.y = -x * sin + y * cos;
    };
    /*线性插值到另一个向量
    * mid为取值为(0,1),
    */
    Vector2D.prototype.lerp = function (v, mid) {
        var x = this.x * (1 - mid) + v.x * mid, y = this.y * (1 - mid) + v.y * mid;
        return new Vector2D(x, y);
    };
    /*计算两个向量的欧几里得距离*/
    Vector2D.prototype.dist = function (v) {
        return Math.sqrt((this.x - v.x) * (this.x - v.x) + (this.y - v.y) * (this.y - v.y));
    };
    /*计算两个向量的夹角*/
    Vector2D.prototype.angelBetween = function (v) {
        return Vector2D.heading2D(this) - Vector2D.heading2D(v);
    };
    /*计算两个向量的点乘
    *两个向量的点乘返回一个数，代码v1在v2上的投影长度，当长度我0时，说明两向量垂直;
    */
    Vector2D.prototype.dot = function (v) {
        return this.x * v.x + this.y * v.y;
    };
    /*计算两个向量的叉乘
    *两个向量的叉乘是另一个向量，它与这两个向量形成的平面垂直，可以通过右手法则判断其方向;
    * 右手法则：a×b用右手指向a，然后握向b，大拇指指的方向即为叉乘的方向;
    * 三维向量叉乘公式为：a×b=(y1z2-y2z1,-(x1z2-x2z1),x1y2-x2y1)；
    * 二维向量相乘，可以假设z1和z2等于0，只返回第3个参数，可以通过这个参数的正负，判断b在a的左侧还是右侧,或者共线(参数为0);
    */
    Vector2D.prototype.cross = function (v) {
        return this.x * v.y - v.x * this.y;
    };
    /*向量复制*/
    Vector2D.prototype.copy = function () {
        return new Vector2D(this.x, this.y);
    };
    return Vector2D;
}());
__reflect(Vector2D.prototype, "Vector2D");
//# sourceMappingURL=Vector2D.js.map