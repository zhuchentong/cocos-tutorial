import {
  __private,
  _decorator,
  Component,
  EventTouch,
  Input,
  input,
  instantiate,
  Node,
  Prefab,
  RigidBody,
  Vec3,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("AttackController")
export class AttackController extends Component {
  @property(Prefab)
  public bulletPrefab: Prefab = null;

  @property
  public bulletSpeed: number = 100;

  @property(Node)
  public bulletParent: Node = null;

  @property
  public fireRate: number = 0.3;

  private fireTimer: number = 0;

  private isTouching: boolean = false;

  start() {
    input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
  }

  fire() {
    const bullet = instantiate(this.bulletPrefab);
    bullet.setParent(this.bulletParent);
    bullet.setWorldPosition(this.node.position);
    const rgd = bullet.getComponent(RigidBody);
    rgd.setLinearVelocity(new Vec3(0, 0, -100));
  }

  onTouchEnd(event: EventTouch) {
    this.isTouching = false;
  }

  onTouchStart(event: EventTouch) {
    this.isTouching = true;
  }

  update(deltaTime: number) {
    if (this.isTouching) {
      this.fireTimer += deltaTime;

      if(this.fireTimer >= this.fireRate) {
        this.fireTimer = 0;
        this.fire();
      }
    }
  }
}
