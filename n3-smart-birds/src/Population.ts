class Population extends egret.Sprite{
	private mutationRate:number;
	private population:Array<any>;
	private matingPool:Array<any>;
	private generations:number;
	private totalPopulation:number;
	private target:Vector2D;
	private obstacles:Array<any>;

	public constructor(mutationRate,totalPopulation,obstacles:Array<any>,target:Vector2D=new Vector2D(0,0)) {
		super();
		this.mutationRate=mutationRate;
		this.totalPopulation=totalPopulation;
		this.population=[];
		this.matingPool=[];
		this.target=target;
		this.obstacles=obstacles;

		for(let i=0;i<this.totalPopulation;i++){
			let v=new Vehicle(1,80,380,this.target);
			v.obstacles=this.obstacles;
            this.population.push(v);
			this.addChild(v);
        }
	}

	public live(){
		for(let i=0;i<this.population.length;i++){
			this.population[i].run();
		}
	}

	public fitness(){
		for(let i=0;i<this.totalPopulation;i++){
			this.population[i].fitness();
        }
	}

	public selection(){
		this.matingPool=[];
		let totalFitness=0;
		for(let i=0;i<this.totalPopulation;i++){
			totalFitness+=this.population[i].getFitness();
        }

        for(let i=0;i<this.totalPopulation;i++){
			let n=this.population[i].getFitness()/totalFitness*300;
			if(n<1){
				continue;
			}
            for(let j=0;j<n;j++){
                this.matingPool.push(this.population[i]);
            }
        }
	}

	public reproduction(){
		for(let i=0;i<this.population.length;i++){
			let a=Math.floor(Math.random()*this.matingPool.length);
			let b=Math.floor(Math.random()*this.matingPool.length);
			let partnerA=this.matingPool[a];
			let partnerB=this.matingPool[b];
			let child=partnerA.crossover(partnerB);
			child.target=this.target;
			child.obstacles=this.obstacles;
			
			child.mutate(this.mutationRate);
			this.removeChild(this.population[i]);
			this.population[i]=child;
			this.addChild(child);
        }
	}
}