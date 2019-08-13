//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {



    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.runGame().catch(e => {
            console.log(e);
        })



    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private textfield: egret.TextField;
    private particleSystem:ParticleSystem;
    private repeller:Repeller;
    private mouse:Vector2D;
    private mouseDown:boolean=false;
    private lastPosition:Vector2D;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        let bg:egret.Shape=new egret.Shape();
        let g=bg.graphics;
        g.beginFill(0x000000);
        g.drawRect(0,0,1600,900);
        this.addChild(bg);
        this.mouse=new Vector2D(400,400);
        this.lastPosition=new Vector2D(this.mouse.x,this.mouse.y);

        this.particleSystem=new ParticleSystem(this.mouse);

        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,(e)=>{
            this.mouseDown=true;
            this.mouse.x=e.stageX;
            this.mouse.y=e.stageY;
            this.lastPosition=new Vector2D(this.mouse.x,this.mouse.y);
        },this);

        this.stage.addEventListener(egret.TouchEvent.TOUCH_END,(e)=>{
            this.mouseDown=false;
        },this);

        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,(e)=>{
            this.mouse.x=e.stageX;
            this.mouse.y=e.stageY;
        },this);

        this.addChild(this.particleSystem);
        this.onEnterFrame();
    }

    private onEnterFrame(){
        this.particleSystem.setOrigin(this.mouse.x,this.mouse.y);
        this.particleSystem.addParticle();
        this.particleSystem.addParticle();
        let wind=Vector2D.sub(new Vector2D(this.mouse.x,this.mouse.y),this.lastPosition);
        wind.div(100);
        let gravity=new Vector2D(0,-0.05);
        this.particleSystem.applyForce(wind);
        this.particleSystem.applyForce(gravity);
        //this.particleSystem.applyRepeller(this.repeller);//添加排斥力
        this.particleSystem.run();
        this.lastPosition=new Vector2D(this.mouse.x,this.mouse.y);
        requestAnimationFrame(this.onEnterFrame.bind(this));
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

}