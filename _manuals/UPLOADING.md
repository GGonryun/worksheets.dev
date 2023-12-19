# Uploading Games to Charity Games

## The CDN

Static IP assigned for CDN 34.110.239.165

URL: https://console.cloud.google.com/networking/addresses/list?project=charity-games

## The Google cloud Bucket

The bucket is public and holds all the static files for our public games:

https://console.cloud.google.com/storage/browser?hl=en&project=charity-games&prefix=&forceOnObjectsSortingFiltering=false&forceOnBucketsSortingFiltering=true

## Logging

A useful query for finding logs for the load balancer:

```
https://console.cloud.google.com/logs/query;query=--Hide%20similar%20entries%0A-%2528-labels.logLabel:*%0A-labels.activity_type_name:*%0Aseverity%3D%22INFO%22%0AhttpRequest.status%3D%22200%22%0A-jsonPayload.response_code:*%0A-jsonPayload.referer:*%0A-jsonPayload.path:*%0A-jsonPayload.name:*%0A-jsonPayload.code:*%0AjsonPayload:*%0A-jsonPayload.message:*%2529%0A--End%20of%20hide%20similar%20entries%0Aresource.type%3D%22http_load_balancer%22;cursorTimestamp=2023-12-10T20:06:19.572914Z;duration=PT1H?project=charity-games
```

## Uploading a game

### General

All games require an thumbnail and banner. The thumbnail is used for the game icon on several pages and the banner is used on the game page and as the open graph image. The thumbnail should be a 1:1 aspect ratio 300x300 or at most 500x500 pixels and the banner should be 1920x1080 pixels.

These files are placed along side the game distribution files in the CDN bucket. If the folder is `game-name` then the assets should be stored under `game-name/assets/` and named `thumbnail.png` and `banner.png`.

### Native Javascript

The game should be uploaded to the CDN directly with no additional changes. The index.html file should be the entry point for the game. If additional files are required they should be placed in the same folder as the index.html file.

### Construct 3

These games are generally ready to go as is. Follow the instructions above for Native Javascript games.

### Unity 3D

#### Brotli Compressed Game

A brotli compressed unity game can be uploaded to the CDN by following these steps:

1. Build the game in Unity 3D and select the WebGL platform.
   - The game should already be compressed.
2. Make the html canvas responsive:
   - Uncommenting the line `config.matchWebGLToCanvasSize = false;`
   - Change the lines: `canvas.style.width = PIXEL_SIZE;` to `canvas.style.width = "100%"` and `canvas.style.height = PIXEL_SIZE;` to `canvas.style.height = "100%";`
3. Update CSS styles to make canvas responsive:
   - Update the following code in the `TemplateData/style.css` file:

```diff
+ html {
+   height: 100%;
+   width: 100%;
+ }
body {
    padding: 0;
    margin: 0;
+   height: 100%;
+   width: 100%;
}
#unity-container.unity-desktop {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
+   height: 100%;
+   width: 100%;
}
#unity-canvas {
    background: #231f20;
+   height: 100%;
+   width: 100%;
+   object-fit: contain;
}
```

3. Remove the unity footer.
   - Remove the following code from the `index.html` file:

```
<div id="unity-footer">
    <div id="unity-webgl-logo"></div>
    <div id="unity-fullscreen-button"></div>
    <div id="unity-build-title">Floppy Bird</div>
  </div>
```

4. Upload the game to the CDN manually.

- You will be uploading the `Build` folder, the `index.html` file, and the `TemplateData` file.

5. Modify build files metadata (`GameName.data.br`, `GameName.framework.js.br`, `GameName.loader.js`, `GameName.wasm.br`)

- Metadata file types can be found in the [Unity Documentation: Server configuration for WebGL builds (Apache)](https://docs.unity3d.com/Manual/webgl-server-configuration-code-samples.html)

1.  `GameName.data.br`:
    - Change the `Content-Type` to `application/octet-stream`
    - Change the `Content-Encoding` to `br`
    - Change the `Cache-Control` to `no-transform`
2.  `GameName.framework.js.br`
    - Change the `Content-Type` to `application/javascript`
    - Change the `Content-Encoding` to `br`
    - Change the `Cache-Control` to `no-transform`
3.  `GameName.loader.js`
    - Change the `Content-Type` to `text/javascript`
4.  `GameName.wasm.br`
    - Change the `Content-Type` to `application/wasm`
    - Change the `Content-Encoding` to `br`
    - Change the `Cache-Control` to `no-transform`

```

```
