/*
* 2d向量类
* @author jinhailiang
* date:20190801
* update:20190814-(0,0)向量单位化，返回(0,0);
*/

class Vector2D {

	private _x:number;
	private _y:number;
	
	public constructor(x:number=0,y:number=0) {
		this._x=x;
		this._y=y;
	}

	public set x(value:number){
		this._x=value;
	}

	public get x():number{
		return this._x;
	}

	public set y(value:number){
		this._y=value;
	}

	public get y():number{
		return this._y;
	}

	/*------------------------------------静态方法-----------------------------*/

	/*两个向量相加*/
	public static add(v1:Vector2D,v2:Vector2D):Vector2D{
		let x=v1.x+v2.x,
			y=v1.y+v2.y;
		return new Vector2D(x,y);
	}

	/*两个向量相减*/
	public static sub(v1:Vector2D,v2:Vector2D):Vector2D{
		let x=v1.x-v2.x,
			y=v1.y-v2.y;
		return new Vector2D(x,y);
	}

	/*向量乘以一个标量*/
	public static mult(v:Vector2D,num:number):Vector2D{
		let x=v.x*num,
			y=v.y*num;
		return new Vector2D(x,y);
	}

	/*向量除以一个标量*/
	public static div(v:Vector2D,num:number):Vector2D{
		if(num==0){
			throw new Error("除0错误");
		}
		let x=v.x/num,
			y=v.y/num;
		return new Vector2D(x,y);
	}

	/*计算向量长度*/
	public static mag(v:Vector2D):number{
		return Math.sqrt(v.x*v.x+v.y*v.y);
	}

	/*设定向量长度*/
	public static setMag(v:Vector2D,len:number):Vector2D{
		v=Vector2D.normalize(v);
		return Vector2D.mult(v,len);
	}

	/*单位化向量，使其长度为1*/
	public static normalize(v:Vector2D):Vector2D{
		let m=Vector2D.mag(v);
		if(m===0){
			return new Vector2D(0,0);
		}
		return Vector2D.div(v,m);
	}

	/*限制向量的长度*/
	public static limit(v:Vector2D,maxLen:number){
		if(Vector2D.mag(v)>maxLen){
			v=Vector2D.setMag(v,maxLen);
		}
	}

	/*计算向量的方向*/
	public static heading2D(v:Vector2D):number{
		return Math.atan2(v.y,v.x);
	}

	/*旋转一个二维向量*/
	public static rotate(v:Vector2D,angle:number){
		let cos=Math.cos(angle),
			sin=Math.sin(angle),
			x = v.x * cos + v.y * sin,
			y = -v.x * sin + v.y * cos;
		return new Vector2D(x,y);
	}

	/*线性插值到另一个向量
	* mid为取值为(0,1),
	*/

	public static lerp(v1:Vector2D,v2:Vector2D,mid:number){
		let x=v1.x*(1-mid) + v2.x*mid,
			y=v1.y*(1-mid) + v2.y*mid;
		return new Vector2D(x,y);
	}

	/*计算两个向量的欧几里得距离*/
	public static dist(v1:Vector2D,v2:Vector2D){
		return Math.sqrt((v1.x-v2.x)*(v1.x-v2.x)+(v1.y-v2.y)*(v1.y-v2.y));
	}

	/*计算两个向量的夹角*/
	public static angelBetween(v1:Vector2D,v2:Vector2D):number{
		return Vector2D.heading2D(v2)-Vector2D.heading2D(v1);
	}

	/*计算两个向量的点乘
	*两个向量的点乘返回一个数，代表v1在v2上的投影长度，当长度为0时，说明两向量垂直;
	*/
	public static dot(v1:Vector2D,v2:Vector2D){
		return v1.x*v2.x+v1.y*v2.y;
	}

	/*计算两个向量的叉乘
	*两个向量的叉乘是另一个向量，它与这两个向量形成的平面垂直，可以通过右手法则判断其方向;
	* 右手法则：a×b用右手指向a，然后握向b，大拇指指的方向即为叉乘的方向;
	* 三维向量叉乘公式为：a×b=(y1z2-y2z1,-(x1z2-x2z1),x1y2-x2y1)；
	* 二维向量相乘，可以假设z1和z2等于0，只返回第3个参数，可以通过这个参数的正负，判断b在a的左侧还是右侧,或者共线(参数为0);
	*/
	public static cross(v1:Vector2D,v2:Vector2D):number{
		return v1.x*v2.y-v2.x*v1.y;
	}

	/*返回一个随机的二维向量*/
	public static random2D():Vector2D{
		let x=Math.random()-0.5,y=Math.random()-0.5;
		let randomV=new Vector2D(x,y);
		randomV.normalize();
		return randomV;
	}


	/*-----------------------------------------------非静态方法-------------------------------------------------*/


	/*两个向量相加*/
	public add(v:Vector2D){
		this.x+=v.x;
		this.y+=v.y;
	}

	/*两个向量相减*/
	public sub(v:Vector2D){
		this.x-=v.x;
		this.y-=v.y;
	}

	/*向量乘以一个标量*/
	public  mult(num:number){
		this.x*=num;
		this.y*=num;
	}

	/*向量除以一个标量*/
	public div(num:number){
		if(num==0){
			throw new Error("除0错误");
		}
		this.x/=num,
		this.y/=num;
	}

	/*计算向量长度*/
	public  mag():number{
		return Math.sqrt(this.x*this.x+this.y*this.y);
	}

	/*设定向量长度*/
	public setMag(len:number){
		this.normalize();
		this.mult(len);
	}

	/*单位化向量，使其长度为1*/
	public normalize(){
		let m=this.mag();
		if(m===0){return;}
		this.div(m);
	}

	/*限制向量的长度*/
	public limit(maxLen:number){
		if(this.mag()>maxLen){
			this.setMag(maxLen);
		}
	}

	/*计算向量的方向*/
	public heading2D():number{
		return Math.atan2(this.y,this.x);
	}

	/*旋转一个二维向量*/
	public  rotate(angle:number){
		let cos=Math.cos(angle),
			sin=Math.sin(angle);
		let x=this.x,y=this.y;
		this.x = x * cos + y * sin;
		this.y = -x * sin + y * cos;
	}

	/*线性插值到另一个向量
	* mid为取值为(0,1),
	*/

	public lerp(v:Vector2D,mid:number){
		let x=this.x*(1-mid) + v.x*mid,
			y=this.y*(1-mid) + v.y*mid;
		return new Vector2D(x,y);
	}

	/*计算两个向量的欧几里得距离*/
	public  dist(v:Vector2D){
		return Math.sqrt((this.x-v.x)*(this.x-v.x)+(this.y-v.y)*(this.y-v.y));
	}

	/*计算两个向量的夹角*/
	public angelBetween(v:Vector2D):number{
		return Vector2D.heading2D(this)-Vector2D.heading2D(v);
	}

	/*计算两个向量的点乘
	*两个向量的点乘返回一个数，代码v1在v2上的投影长度，当长度我0时，说明两向量垂直;
	*/
	public dot(v:Vector2D){
		return this.x*v.x+this.y*v.y;
	}

	/*计算两个向量的叉乘
	*两个向量的叉乘是另一个向量，它与这两个向量形成的平面垂直，可以通过右手法则判断其方向;
	* 右手法则：a×b用右手指向a，然后握向b，大拇指指的方向即为叉乘的方向;
	* 三维向量叉乘公式为：a×b=(y1z2-y2z1,-(x1z2-x2z1),x1y2-x2y1)；
	* 二维向量相乘，可以假设z1和z2等于0，只返回第3个参数，可以通过这个参数的正负，判断b在a的左侧还是右侧,或者共线(参数为0);
	*/
	public cross(v:Vector2D):number{
		return this.x*v.y-v.x*this.y;
	}

	/*向量复制*/
	public copy():Vector2D{
		return new Vector2D(this.x,this.y);
	}

}