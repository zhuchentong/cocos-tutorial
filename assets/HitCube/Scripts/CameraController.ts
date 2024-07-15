import { _decorator, Component, EventTouch, Input, input, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("CameraController")
export class CameraController extends Component {
  start() {
    input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
  }

  update(deltaTime: number) {}

  onTouchStart(event: EventTouch) {
    console.log("touch start", event.getLocation());
  }

  onTouchEnd(event: EventTouch) {
    console.log("touch end", event.getLocation());
  }

  onTouchMove(event: EventTouch) {
    const pos = this.node.position;
    const moveScale = 0.05;

    this.node.setPosition(
      pos.x + event.getDeltaX() * moveScale,
      pos.y + event.getDeltaY()* moveScale
    );
  }
}
