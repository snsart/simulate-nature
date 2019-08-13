class SegmentShape extends egret.Sprite {
	public constructor() {
		super();
		this.draw();
	}

	public draw(){
		let g=this.graphics;
		g.lineStyle(1,0x000000);
		g.beginFill(0xff0000);
		g.drawRoundRect(0,0,30,30,20,20);

		let ball=new egret.Shape();
		ball.graphics.beginFill(0x000000);
		ball.graphics.drawCircle(30,15,5);
		this.addChild(ball);
	}
}