import Phaser from 'phaser';
import OutlinePipelinePlugin from 'phaser3-rex-plugins/plugins/outlinepipeline-plugin.js';

export class OutlinePlugin {
  scene: Phaser.Scene;
  outline: OutlinePipelinePlugin;
  constructor(scene: Phaser.Scene) {
    this.scene = scene;

    this.outline = this.getOutlinePipelinePlugin('rexOutlinePipeline');
  }

  static config(): Phaser.Types.Core.PluginObjectItem {
    return {
      key: 'rexOutlinePipeline',
      plugin: OutlinePipelinePlugin,
      start: true,
    };
  }

  register(
    obj: Phaser.GameObjects.GameObject,
    color: Phaser.Display.Color,
    thickness = 1
  ) {
    this.outline.add(obj, {
      thickness,
      outlineColor: color.color,
    });
  }

  getOutlinePipelinePlugin(key: string): OutlinePipelinePlugin {
    const plugin = this.scene.plugins.get(key);
    if (!plugin) {
      throw new Error(`Plugin ${key} not found`);
    }
    if (!(plugin instanceof OutlinePipelinePlugin)) {
      throw new Error(
        `Plugin ${key} is not an instance of OutlinePipelinePlugin`
      );
    }
    return plugin;
  }
}
