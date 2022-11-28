// Spark AR Modules
const Scene = require("Scene");
const Audio = require("Audio");
const Materials = require("Materials");
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