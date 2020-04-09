local albums = import '../albums/index.libsonnet';
local utils = import '../utils.libsonnet';

utils.makeCategory('Old Projects', [
  albums.cam_tapes,
  albums.jazz_fun,
  albums.covers,
  albums.midi,
  albums.epic
])
