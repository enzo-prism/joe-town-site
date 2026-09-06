#!/bin/sh
# Encode rendered RGBA frames into a matching poster and silent browser loops.
set -eu
frame_dir=${1:?Usage: export_web.sh /absolute/path/to/frames /absolute/path/to/site}
site_dir=${2:?Usage: export_web.sh /absolute/path/to/frames /absolute/path/to/site}
mkdir -p "$site_dir/media" "$site_dir/images/refresh"
ffmpeg -hide_banner -loglevel error -n -f lavfi -i 'color=c=0x10251f:s=1440x1080:r=24:d=8' \
  -framerate 24 -i "$frame_dir/town-%04d.png" \
  -filter_complex '[0:v][1:v]overlay=shortest=1:format=auto,format=yuv420p[v]' \
  -map '[v]' -c:v libx264 -preset slow -crf 20 -movflags +faststart -an -t 8 \
  "$site_dir/media/joe-town-diorama.mp4"
ffmpeg -hide_banner -loglevel error -n -i "$site_dir/media/joe-town-diorama.mp4" \
  -vf scale=768:576:flags=lanczos -c:v libx264 -preset slow -crf 21 \
  -pix_fmt yuv420p -movflags +faststart -an "$site_dir/media/joe-town-diorama-mobile.mp4"
# Poster is regenerated independently if it already exists during art review.
if [ ! -f "$site_dir/images/refresh/hero-diorama.webp" ]; then
  ffmpeg -hide_banner -loglevel error -n -i "$frame_dir/town-0001.png" \
    -frames:v 1 -quality 88 "$site_dir/images/refresh/hero-diorama.webp"
fi
