local albums = import '../albums/index.libsonnet';
local utils = import '../utils.libsonnet';

utils.makeCategory('Old Bands', [
  albums.cam_jervis,
  albums.orfs
])
