local albums = import '../albums/index.libsonnet';
local utils = import '../utils.libsonnet';

utils.makeCategory('FAWM', [
  albums.fifty_ninety_2020,
  albums.fawm_2020,
  albums.fawm_2019,
  albums.fawm_2018,
  albums.fawm_2017,
  albums.fawm_2016,
  albums.fawm_2015,
  albums.fawm_2014
])
