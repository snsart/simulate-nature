class Worm extends egret.Sprite{

	public _target:Vector2D;
	private _location:Vector2D;
	private _velocity:Vector2D;
	private _acceleration:Vector2D;

	private _segments:Segment[]=[];
	private _mass:number=10;
	private _segmentNum:number=3;

	public constructor(x,y) {
		super();
		this._location=new Vector2D(x,y);
		this._velocity=new Vector2D(0,0);
		this._acceleration=new Vector2D(0,0);
		this._target=new Vector2D(x,y);
		this.createSegments();
	}

	public set target(value:Vector2D){
		this._target=value;
	}

	public get target():Vector2D{
		return this._target;
	}

	private createSegments(){
		for(let i=0;i<this._segmentNum;i++){
			let segment=new Segment(0,0);
			segment._angle=i*Math.PI/5;
			this._segments.push(segment);
			if(i==0){
				segment.target=this._target;
				segment.location=this._location;
			}else{
				segment.target=this._segments[i-1].location;
				segment.location=this._segments[i-1].location.copy();
				segment.location.sub(new Vector2D(20,0));
			}
			this.addChild(segment);
			segment.update();
			segment.display();
		}
		
		this.segmentsUpdate();
	}

	public segmentsUpdate(){
		for(let i=0;i<this._segmentNum;i++){
			let segment=this._segments[i];
			if(i==0){
				segment.target=this._target;
				segment.location=this._location;
			}else{
				segment.target=this._segments[i-1].location.copy();
				let newLocation=segment.target.copy();
				let dir=Vector2D.sub(segment.location,segment.target);
				dir.normalize();
				dir.mult(20);
				newLocation.add(dir);
				segment.location=newLocation;
				console.log(newLocation);
			}
			segment.update();
			segment.display();
		}
	}

	public run(){

		let force:Vector2D=new Vector2D(0,0);
		for(let i=0;i<this._segments.length;i++){
			let segment:Segment=this._segments[i] as Segment;
			force.add(segment.generateForce);
		}
		this.applyForce(force);

		let fraction=this._velocity.copy();
		fraction.normalize();
		fraction.mult(-0.01);
		this.applyForce(fraction);

		this.update();
		this.segmentsUpdate();
	}


	public update(){
		this._velocity.add(this._acceleration);
		this._location.add(this._velocity);
		this._acceleration.mult(0);
	}

	public applyForce(force:Vector2D){
		let f:Vector2D=Vector2D.div(force,this._mass);
		this._acceleration.add(f);
	}

	/*public checkEdge(width:number,height:number){
		if(this._location.x>width){
			this._location.x=0;
		}else if(this._location.x<0){
			this._location.x=width;
		}

		if(this._location.y>height){
			this._location.y=0;
		}else if(this._location.y<0){
			this._location.y=height;
		}
	}*/
}