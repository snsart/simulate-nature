class ParticleSystem extends egret.Sprite {
	
	private particles:Array<Particle>;
	private origin:Vector2D;
	private torchImage:egret.Bitmap;

	public constructor(location:Vector2D) {
		super();
		this.origin=location.copy();
		this.particles=new Array<Particle>();
		this.torchImage=this.createBitmapByName("torch_png");
		this.addChild(this.torchImage);
		this.torchImage.anchorOffsetX=-10;
		this.torchImage.anchorOffsetY=-30;
		this.torchImage.x=this.origin.x;
		this.torchImage.y=this.origin.y;
	}

	public setOrigin(x:number,y:number){
		this.origin.x=x;
		this.origin.y=y;
		this.torchImage.x=x;
		this.torchImage.y=y;
	}

	public addParticle(){
		let p=new Particle(this.origin)
		this.particles.push(p);
		this.addChild(p);
	}

	public applyForce(f:Vector2D){
		for(let p of this.particles){
			p.applyForce(f);
		}
	}

	public applyRepeller(r:Repeller){
		for(let p of this.particles){
			let force:Vector2D=r.repel(p);
			p.applyForce(force);
		}
	}

	public run(){
		for(let p of this.particles){
			p.run();
			if(p.isDead()){
				this.particles.splice(this.particles.indexOf(p),1);
				this.removeChild(p)
			}
		}
	}

	private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}