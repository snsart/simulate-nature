class Liquid extends egret.Sprite {
	private _x:number;
	private _y:number;
	private _w:number;
	private _h:number;
	private _c:number;

	public constructor(x,y,w,h,c) {
		super();
		this._x=x;
		this._y=y;
		this._w=w;
		this._h=h;
		this._c=c;
	}

	public get x():number{
		return this._x;
	}

	public get y():number{
		return this._y;
	}

	public get w():number{
		return this._w;
	}

	public get h():number{
		return this._h;
	}

	public get c():number{
		return this._c;
	}

	public display(){
		let g=this.graphics;
		g.clear();
		g.beginFill(0x000088);
		g.drawRect(this._x,this._y,this._w,this._h);
	}

}