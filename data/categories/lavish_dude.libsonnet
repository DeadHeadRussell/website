local albums = import '../albums/index.libsonnet';
local utils = import '../utils.libsonnet';

utils.makeCategory('Lavish Dude', [
  albums.leading_off
])
