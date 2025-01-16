#!/bin/bash
# Script to process all image files: keep an unaltered "_right" version and a flipped "_left" version

for file in *.png; do
    if [[ -f "$file" ]]; then
        # Create the "right" version (unaltered copy)
        right_output="../${file%.png}_right.png"
        cp "$file" "$right_output"
        echo "Created unaltered copy: $file -> $right_output"

        # Create the "left" version (flipped)
        left_output="../${file%.png}_left.png"
        convert "$file" -flop "$left_output"
        echo "Created flipped copy: $file -> $left_output"
    fi
done
