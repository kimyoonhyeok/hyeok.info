#!/bin/bash

# Find all mp4 and webm files
find next-app/public/project_images -type f \( -name "*.mp4" -o -name "*.webm" \) | while read VIDEO; do
  echo "Processing $VIDEO..."
  
  # Get current file size for comparison (optional, but good for logs)
  ORIG_SIZE=$(wc -c < "$VIDEO")
  
  # ffmpeg command
  # -y : Overwrite output
  # -i : Input file
  # -vf : Video filters. scale='min(1920,iw)':-2 means:
  #       If width (iw) > 1920, scale to 1920.
  #       Else keep width.
  #       Height (-2) is calculated to preserve aspect ratio and be even.
  # -c:v libx264 : Video codec H.264
  # -crf 23 : Constant Rate Factor (quality). Lower is better quality, higher is lower size. 23 is standard.
  # -preset medium : Encoding speed/compression balance.
  # -c:a copy : Copy audio stream without re-encoding (preserves audio quality perfectly).
  # < /dev/null : Prevent ffmpeg from reading stdin and breaking the loop
  
  ffmpeg -y -i "$VIDEO" -vf "scale='min(1920,iw)':-2" -c:v libx264 -crf 23 -preset medium -c:a copy "${VIDEO}.temp.mp4" < /dev/null 2>/dev/null
  
  if [ $? -eq 0 ]; then
     NEW_SIZE=$(wc -c < "${VIDEO}.temp.mp4")
     echo "  Success: $VIDEO ($ORIG_SIZE -> $NEW_SIZE bytes)"
     mv "${VIDEO}.temp.mp4" "$VIDEO"
  else
     echo "  Failed to process $VIDEO"
     rm "${VIDEO}.temp.mp4"
  fi
done
