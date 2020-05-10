local albums = import '../albums/index.libsonnet';
local utils = import '../utils.libsonnet';

utils.makeCategory('Solo Projects', [
  albums.rock_opera,
  albums.grand_piano_series,
  albums.home_concert_series,
  albums.cmu_session,
  albums.misc
])
