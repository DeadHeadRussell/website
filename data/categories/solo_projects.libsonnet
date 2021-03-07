local albums = import '../albums/index.libsonnet';
local utils = import '../utils.libsonnet';

utils.makeCategory('Solo Projects', [
  albums.chosen,
  albums.rock_opera,
  albums.compositional_improvs,
  albums.home_concert_series,
  albums.cmu_session,
  albums.misc
])
