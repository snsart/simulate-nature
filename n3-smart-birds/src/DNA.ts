class DNA {
	private _genes=[];
	private _fitness:number;
	private _maxforce=0.5;
	private _lifetime=200;

	public constructor() {
		for(let i=0;i<this._lifetime;i++){
			let force=Vector2D.random2D();
			force.mult(Math.random()*this._maxforce);
			this._genes.push(force);
		}
	}

	public get genes(){
		return this._genes;
	}

	public crossover(partner:DNA):DNA{
		let child=new DNA();
		//let midpoint=Math.floor(Math.random()*200);
		for(let i=0;i<this._genes.length;i++){
			let random=Math.random();
			if(random>0.5){
				child._genes[i]=this._genes[i];
			}else{
				child._genes[i]=partner._genes[i];
			}
		}
		return child;
	}

	public mutate(mutationRate:number){
		for(let i=0;i<this._genes.length;i++){
			if(Math.random()<mutationRate){
				let force=Vector2D.random2D();
				force.mult(Math.random()*this._maxforce);
				this._genes[i]=force;
			}
		}
	}
}