local albums = import '../albums/index.libsonnet';
local utils = import '../utils.libsonnet';

utils.makeCategory('YAGS', [
  albums.zags,
  albums.yags
])
