#!/bin/bash
echo "Starting compression..."
for file in next-app/public/project_images/*/*.mp4; do
  # Skip Sketched and X as they are already compressed
  if [[ "$file" == *"Sketched/"* ]] || [[ "$file" == *"X/"* ]]; then
    continue
  fi

  if [ -f "$file" ]; then
    echo "Compressing $file..."
    ffmpeg -v warning -y -i "$file" -vf "scale='min(720,iw)':-2" -c:v libx264 -crf 28 -preset fast -an "${file%.mp4}_compressed.mp4" </dev/null
    mv "${file%.mp4}_compressed.mp4" "$file"
    ls -lh "$file"
  fi
done
echo "Compression complete."
