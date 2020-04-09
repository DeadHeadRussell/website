local albums = import '../albums/index.libsonnet';
local utils = import '../utils.libsonnet';

utils.makeCategory('Solo Projects', [
  albums.rock_opera,
  albums.cmu_session,
  albums.misc
])
