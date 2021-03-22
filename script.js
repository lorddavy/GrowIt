/* global PIXI */

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application({
  width: 480,
  heigh: 320
});

const tileSize = 16;

let map = {
  width: 4,
  height: 4,
  tiles: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
};

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);

// load the texture we need
app.loader
  .add(
    "tileset",
    "https://cdn.glitch.com/0effa0a5-67a0-429e-bb3d-5ec515c17ff8%2Fnature-paltformer-tileset-16x16.png?v=1616359446013"
  )
  .load((loader, resources) => {
    // This creates a texture from a 'bunny.png' image
    let tileTextures = [];
    for (let i = 0; i < 7 * 11; i++) {
      let x = i % 7;
      let y = Math.floor(i / 7);
      tileTextures[i] = new PIXI.Texture(
        resources.tileset.texture,
        new PIXI.Rectangle(x * tileSize, x * tileSize, tileSize, tileSize)
      );
    }

    const bunny = new PIXI.Sprite(tileTextures[53]);
    bunny.scale.x = 5;
    bunny.scale.y = 5;

    // Setup the position of the bunny
    bunny.x = app.renderer.width / 2;
    bunny.y = app.renderer.height / 2;

    // Rotate around the center
    bunny.anchor.x = 0.5;
    bunny.anchor.y = 0.5;

    let background = new PIXI.Container();
    for (let y = 0; y < map.width; y++) {
      for (let x = 0; x < map.width; x++) {
        let tile = map.tiles[y * map.width + x];
        let sprite = new PIXI.Sprite(tileTextures[tile]);
        sprite.x = x * tileSize;
        sprite.y = y * tileSize;
        background.addChild(sprite);
      }
    }

    // Add the bunny to the scene we are building
    app.stage.addChild(bunny);

    // Listen for frame updates
    app.ticker.add(() => {
      // each frame we spin the bunny around a bit
      bunny.rotation += 0.01;
    });
  });

app.loader.onError.add(error => console.error(error));
