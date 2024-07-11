export type DragStartHandler = (
  pointer: Phaser.Input.Pointer,
  gameObject: Phaser.GameObjects.GameObject
) => void;

export type DragStartCallback<T extends Phaser.GameObjects.GameObject> = (
  pointer: Phaser.Input.Pointer,
  gameObject: T
) => void;

export type DragEndCallback<T extends Phaser.GameObjects.GameObject> = (
  pointer: Phaser.Input.Pointer,
  gameObject: T,
  dropped: boolean
) => void;

export type DragCallback<T extends Phaser.GameObjects.GameObject> = (
  pointer: Phaser.Input.Pointer,
  gameObject: T,
  x: number,
  y: number
) => void;

export type DragEnterCallback<TObject extends Phaser.GameObjects.GameObject> = (
  pointer: Phaser.Input.Pointer,
  gameObject: TObject,
  dropZone: Phaser.GameObjects.Zone
) => void;

export type DropCallback<TObject extends Phaser.GameObjects.GameObject> = (
  pointer: Phaser.Input.Pointer,
  gameObject: TObject,
  dropZone: Phaser.GameObjects.Zone
) => void;

export type DragLeaveCallback<TObject extends Phaser.GameObjects.GameObject> = (
  pointer: Phaser.Input.Pointer,
  gameObject: TObject,
  dropZone: Phaser.GameObjects.Zone
) => void;

export type InputEvent<
  TObject extends Phaser.GameObjects.GameObject = Phaser.GameObjects.GameObject
> = {
  dragstart: DragStartCallback<TObject>;
  drag: DragCallback<TObject>;
  dragend: DragEndCallback<TObject>;
  dragenter: DragEnterCallback<TObject>;
  dragleave: DragLeaveCallback<TObject>;
  drop: DropCallback<TObject>;
};

export type InputEventKey = keyof InputEvent;

export const phaserInputEvent =
  (scene: Phaser.Scene) =>
  <TEvent extends InputEventKey, TObject extends Phaser.GameObjects.GameObject>(
    event: TEvent,
    callback: InputEvent<TObject>[TEvent]
  ) => {
    scene.input.on(event, callback, scene);
  };
