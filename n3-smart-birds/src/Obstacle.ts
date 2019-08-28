class Obstacle extends egret.Shape{
	private location:Vector2D;
	private w;
	private h;
	public constructor(x,y,w,h) {
		super();
		this.location=new Vector2D(x,y);
		this.w=w;
		this.h=h;
		this.display();
	}

	public contains(v:Vector2D){
		if(v.x>this.location.x&&v.x<this.location.x+this.w&&v.y>this.location.y&&v.y<this.location.y+this.h){
			return true;
		}else{
			return false;
		}
	}

	public display(){
		let g=this.graphics;
		g.beginFill(0x888888);
		g.drawRect(this.location.x,this.location.y,this.w,this.h);
	}
}