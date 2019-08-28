class Vehicle extends egret.Sprite {

	public location:Vector2D;
	public velocity:Vector2D;
	public acceleration:Vector2D;
	public mass:number;
/*	public maxspeed:number;
	public maxforce:number;*/

	private shape:egret.Shape;
	
	public target:Vector2D;
	private _fitness:number;
	public dna:DNA;
	private geneCounter=0;
	private stoped=false;
	public obstacles=[];

	public constructor(mass:number,x:number,y:number,target:Vector2D=new Vector2D(0,0)) {
		super();
		this.dna=new DNA();
		this.mass=mass;
		this.location=new Vector2D(x,y);
		this.velocity=new Vector2D(0,0);
		this.acceleration=new Vector2D(0,0);
		this.target=target;

		this.shape=new egret.Shape();
		let g=this.shape.graphics;
		g.clear();
		g.beginFill(0xff0000);
		g.moveTo(0,0);
		g.lineTo(-10,-5);
		g.lineTo(-10,5);
		g.lineTo(0,0);
		this.addChild(this.shape);
		this.shape.x=this.location.x;
		this.shape.y=this.location.y;
	}

	public testObstacle(){
		for(let obs of this.obstacles){
			if(obs.contains(this.location)){
				this.stoped=true;
			}
		}
	}

	public run(vehicles:Array<Vehicle>){
		if(!this.stoped){
			this.geneCounter++;
			this.applyForce(this.dna.genes[this.geneCounter]);
			this.update();
			this.testObstacle();
			this.display();
		}
	}

	/*适应度计算*/
	public fitness(){
		let d=Vector2D.dist(this.location,this.target);
		this._fitness=Math.pow(1/d,2);
		if(this.stoped){
			this._fitness=0;
		}
	}

	public getFitness(){
		return this._fitness;
	}

	/*繁殖*/
	public crossover(v:Vehicle):Vehicle{
		let vehicle=new Vehicle(1,80,380);
		let dna=this.dna.crossover(v.dna);
		vehicle.dna=dna;
		return vehicle;
	}

	/*突变*/
	public mutate(mutationRate:number){
		this.dna.mutate(mutationRate);
	}
	
	public applyForce(force:Vector2D){
		let f:Vector2D=Vector2D.div(force,this.mass);
		this.acceleration.add(f);
	}

	public update(){
		this.velocity.add(this.acceleration);
		this.location.add(this.velocity);
		this.acceleration.mult(0);
	}

	public display(){
		this.shape.x=this.location.x;
		this.shape.y=this.location.y;
		let angle=this.velocity.heading2D()*180/Math.PI;
		this.shape.rotation=angle;
	}

	public checkEdge(width:number,height:number){
		if(this.location.x>width){
			this.location.x=0;
		}else if(this.location.x<0){
			this.location.x=width;
		}

		if(this.location.y>height){
			this.location.y=0;
		}else if(this.location.y<0){
			this.location.y=height;
		}
	}

}