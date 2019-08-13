class Repeller extends egret.Sprite{
	private location:Vector2D;
	private r=50;
	
	public constructor(x:number,y:number) {
		super();
		this.location=new Vector2D(x,y);
	}

	public display(){
		let g=this.graphics;
		g.beginFill(0xff0000);
		g.drawCircle(this.location.x,this.location.y,this.r);
	}

	public repel(p:Particle){
		let dir=Vector2D.sub(this.location,p.location);
		let d=dir.mag();
		d=d<5?5:(d>300?300:d);
		dir.normalize();
		let force=-1*1000/(d*d);
		dir.mult(force);
		return dir;
	}
}