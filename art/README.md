# Joe Town Blender hero

Original procedural editorial model, created with Blender 5.2 and the official Blender Lab MCP. No generated image service, third-party model, texture download, or paid credits.

## Files

- `joe-town-hero.blend`: editable final model and eight-second animation.
- `build_diorama.py`: complete procedural scene construction, materials, lighting, camera and animation. Set `JOE_ART_DIR` to a new output directory; existing source files are protected against overwriting.

The scene contains 547 objects. The wheel, five chickens, and camera animate. Frames 1 and 193 have matching world transforms (maximum delta 1.75e-7); export only 1–192 at 24 fps. The renderer is EEVEE, 64 samples, 1440×1080, transparent RGBA PNG. The hidden floor is retained for future art direction.

## Reproduce

```sh
# In a fresh output directory; a vendor Blender binary or blender CLI is required.
JOE_ART_DIR=/absolute/path/to/new-output blender --background --python art/build_diorama.py
# Render the saved scene; explicitly choose an existing frames directory.
blender --background /absolute/path/to/new-output/joe-town-hero.blend \
  --render-output /absolute/path/to/new-output/frames/town- --render-anim
```

`build_diorama.py` normally executes through `execute_blender_code` in the Blender MCP integration. For background CLI use, select the new scene in the renderer if your Blender version does not provide a window context.

Poster: encode frame 1 as quality-88 WebP retaining alpha. Desktop: composite frames over sRGB `#10251f`, H.264/yuv420p, CRF 20, 24 fps, faststart, no audio. Mobile: 768×576, CRF 21. No repeated last frame. The production site needs only the poster and the two MP4 files.

This is inspired by Joe Town's actual crown hall, mill, chickens, road and corn-farming vocabulary. It is not a capture of the released game and is labeled accordingly.
