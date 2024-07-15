import { __private, _decorator, Collider, Component, EventKeyboard, ICollisionEvent, Input, input, ITriggerEvent, KeyCode, Node, RigidBody, Vec3 } from 'cc';
import { Food } from './Food';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
    @property
    public speed = 10

    private rgd: RigidBody = null
    private collider: Collider = null

    direction = {
        x: [],
        z: [],
    }

    start() {
        this.rgd = this.getComponent(RigidBody)
        this.collider = this.getComponent(Collider)

        this.collider.on("onTriggerEnter", this.onTriggerEnter, this)
    }

    onTriggerEnter(event: ITriggerEvent) {
        const food = event.otherCollider.getComponent(Food)

        if(food){
            food.node.destroy()
        }
    }


    onLoad() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this)
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this)
    }

    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.ARROW_LEFT:
                this.direction.x.push(-1)
                break
            case KeyCode.ARROW_RIGHT:
                this.direction.x.push(1)
                break
            case KeyCode.ARROW_UP:
                this.direction.z.push(-1)
                break;
            case KeyCode.ARROW_DOWN:
                this.direction.z.push(1)
                break;
        }
    }

    onKeyUp(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.ARROW_LEFT:
                this.direction.x = this.direction.x.filter(x => x !== -1)
                break
            case KeyCode.ARROW_RIGHT:
                this.direction.x = this.direction.x.filter(x => x !== 1)
                break
            case KeyCode.ARROW_UP:
                this.direction.z = this.direction.z.filter(x => x !== -1)
                break;
            case KeyCode.ARROW_DOWN:
                this.direction.z = this.direction.z.filter(x => x !== 1)
                break;
        }
    }

    protected onDestroy(): void {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this)
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this)

        this.collider.off("onTriggerEnter", this.onTriggerEnter, this)
    }

    update(deltaTime: number) {
        const pos = this.node.position
        const [posX] = this.direction.x.length === 0 ? [0] : this.direction.x.slice(-1)
        const [posZ] = this.direction.z.length === 0 ? [0] : this.direction.z.slice(-1)
        // const x = pos.x - this.speed * deltaTime * posX
        // const z = pos.z - this.speed * deltaTime * posZ

        this.rgd.applyForce(new Vec3(posX, 0, posZ).multiplyScalar(this.speed))
        // this.node.setPosition(x, pos.y, z)
    }
}

