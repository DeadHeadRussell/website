local albums = import '../albums/index.libsonnet';
local utils = import '../utils.libsonnet';

utils.makeCategory('Lavish Dude', [
  albums.lavish_dude_fawm_2019,
  albums.lavish_dude_fawm_2021
])
