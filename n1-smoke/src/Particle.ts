class Particle extends egret.Sprite{
	
	public location:Vector2D;
	private velocity:Vector2D;
	private acceleration:Vector2D;

	private lifespan:number;
	private mass:number;
	private image:egret.Bitmap;

	public constructor(l:Vector2D) {
		super();
		this.location=l.copy();
		this.acceleration=new Vector2D(0,0);
		let vx=this.gaussrand()*0.5;//使用高斯分布生成初速度
		let vy=this.gaussrand()*0.5;
	
		this.velocity=new Vector2D(vx,vy);
		this.lifespan=255;
		this.mass=1;
		this.blendMode=egret.BlendMode.ADD;
		this.image=this.createBitmapByName("ball_png");
		let radious=Math.random()*10+30;
		this.image.width=radious;
		this.image.height=radious;
		this.addChild(this.image);
	}

	public run(){
		this.update();
		this.display();
	}

	public update(){
		this.velocity.add(this.acceleration);
		this.location.add(this.velocity);
		this.acceleration.mult(0);
		this.lifespan-=1.5;
	}

	public display(){
		/*let g=this.graphics;
		g.clear();
		g.beginFill(0x666666,this.lifespan/255);
		g.drawCircle(this.location.x,this.location.y,15);*/
		this.image.x=this.location.x;
		this.image.y=this.location.y;
		this.image.alpha=this.lifespan/255;
	}

	public applyForce(f:Vector2D){
		let force:Vector2D=f.copy();
		force.div(this.mass);
		this.acceleration.add(f);
	}

	public isDead(){
		if(this.lifespan<0){
			return true;
		}
		return false;
	}

	public gaussrand(){
		let u=Math.random();
		let v=Math.random();
		//console.log(u,v);
		let z=Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v);
		return z;
	}

	 private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }


}