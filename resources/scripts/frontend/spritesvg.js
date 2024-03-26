const icons = require.context('@images/sprite-svg', true, /\.svg$/, "lazy");

// Automatically load all SVG files in the sprite-svg directory.
icons.keys().forEach(icons);
