class Segment extends egret.Sprite {

	private _location:Vector2D;
	private _target:Vector2D;
	
	private _amplitude:number=15;//振幅
	public _angle=0;//振动角度
	private _angleVel=0.04;//频率

	private _bodyShape:SegmentShape;
	private _heading:number;//角度
	private _mass:number=10;
	private _wagOffset:Vector2D;//节点振动偏移量
	private _generateForce:Vector2D;
	private _pushForce=0.02;

	public constructor(x:number,y:number) {
		super();
		this._location=new Vector2D(x,y);
		this._bodyShape=new SegmentShape();
		this._generateForce=new Vector2D(0,0);
		this.addChild(this._bodyShape);
	}

	public set pushForce(value:number){
		this._pushForce=value;
	}

	public set target(value:Vector2D){
		this._target=value;
	}

	public get target():Vector2D{
		return this._target;
	}

	public set location(value:Vector2D){
		this._location=value;
	}

	public get location():Vector2D{
		return this._location;
	}

	public get generateForce():Vector2D{
		let force=Vector2D.sub(this._target,this._location);
		force.normalize();
		if(this.isHead()){
			force.mult(0);
		}else{
			force.mult(this._pushForce);
		}
		this._generateForce=force;
		return this._generateForce;
	}

	public isHead():boolean{
		let angle=this._angle%(Math.PI*2);
		if(angle>0&&angle<Math.PI){
			return false;
		}
		return true;
	}

	public update(){
		let dir=Vector2D.sub(this._target,this._location);
		this._heading=dir.heading2D();
		
		let l=this._amplitude*Math.cos(this._angle);
		this._angle+=this._angleVel;
		this._wagOffset=new Vector2D(l*Math.cos(this._heading),l*Math.sin(this._heading));
	}

	public display(){
		this.x=this._location.x+this._wagOffset.x;
		this.y=this._location.y+this._wagOffset.y;
		this.rotation=this._heading*180/Math.PI;
	}
}