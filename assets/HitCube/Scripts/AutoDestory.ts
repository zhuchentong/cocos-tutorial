import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BulletController')
export class BulletController extends Component {
    start() {

    }

    update(deltaTime: number) {
        if(this.node.position.y < -10){
            this.node.destroy()
        }
    }
}

