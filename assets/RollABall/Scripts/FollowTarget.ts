import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FollowTarget')
export class FollowTarget extends Component {

    @property(Node)
    public target:Node


    private offset: Vec3 = new Vec3(0,0,0)

    start() {
        // 初始化偏移量
        Vec3.subtract(this.offset, this.node.position, this.target.position)
    }

    lateUpdate() {
       this.node.setPosition(
        this.target.position.x + this.offset.x,
        this.target.position.y + this.offset.y,
        this.target.position.z + this.offset.z
       ) 
    }
}

