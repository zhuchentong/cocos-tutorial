import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Food')
export class Food extends Component {

    @property
    public rotateSpeed = 90

    start() {

    }

    update(deltaTime: number) {
        const enlerAngle = this.node.eulerAngles;
        this.node.eulerAngles = new Vec3(enlerAngle.x, enlerAngle.y + this.rotateSpeed * deltaTime, enlerAngle.z);
    }
}

