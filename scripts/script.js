// Spark AR Modules
const Scene = require("Scene");
const Audio = require("Audio");
const TouchGestures = require("TouchGestures");
const Materials = require("Materials");
const Time = require("Time");
const Textures = require("Textures");

(async function () {
  const [
    // Game Objects
    bunny,
    carrot,
    blocks,
    platforms,
    buttons,
    waterEmitter,
    buttonMats,
    blockMats,
    buttonTextures,
    // Game Audio
    jumpSound,
    dropSound,
    failSound,
    completeSound,
    clickSound,
    removeSound,
  ] = await Promise.all([
    // Game Objects
    Scene.root.findFirst("bunny"),
    Scene.root.findFirst("carrot"),
    Scene.root.findByPath("**/blocks/*"),
    Scene.root.findByPath("**/platforms/*"),
    Scene.root.findByPath("**/buttons/*"),
    Scene.root.findFirst("water_emitter"),
    Materials.findUsingPattern("btn*"),
    Materials.findUsingPattern("*block_mat"),
    Textures.findUsingPattern("btn*"),
    // Game Audio
    Audio.getAudioPlaybackController("jump"),
    Audio.getAudioPlaybackController("drop"),
    Audio.getAudioPlaybackController("fail"),
    Audio.getAudioPlaybackController("complete"),
    Audio.getAudioPlaybackController("click"),
    Audio.getAudioPlaybackController("remove"),
  ]);

  // Game constants
  const blockSlotInc = 0.1;
  const blockInitY = 0.9;
  const states = {
    start: 1,
    running: 2,
    complete: 3,
    failed: 4,
  };

  // Game variables
  let commands = [];
  let blocksUsed = 0;
  let currentState = states.start;

  /*------------- Button Taps -------------*/

  buttons.forEach((button, i) => {
    TouchGestures.onTap(button).subscribe(function () {
      switch (i) {
        case 0:
          addCommand("forward");
          break;
        case 1:
          addCommand("left");
          break;
        case 2:
          addCommand("right");
          break;
        case 3:
          clickSound.setPlaying(true);
          clickSound.reset();
          switch (currentState) {
            case states.start:
              Time.setTimeout(function () {
                if (commands.length !== 0) executeCommands();
              }, 300);
              break;
            case states.failed:
              resetLevel();
              break;
            case states.uncomplete:
              resetLevel();
              break;
            case states.complete:
              nextLevel("next");
              break;
          }
          break;
        case 4:
          removeSound.setPlaying(true);
          removeSound.reset();
          if (blocksUsed !== 0 && currentState === states.start) {
            let popped = commands.pop();
            popped.block.transform.y = blockInitY;
            popped.block.hidden = true;
            nextBlockSlot += blockSlotInc;
            blocksUsed--;
          }
          break;
      }
    });
  });

})();
