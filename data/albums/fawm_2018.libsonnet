local utils = import '../utils.libsonnet';

utils.makeAlbum(
  'FAWM 2018',
  '2018-02-01 - 2018-01-28',
  'Back to the losing.',
  [
    utils.makeSong(
      'Rainy Day',
      '2018-02',
      241,
      description = 'Calming acoustic tones'
    ),
    utils.makeSong(
      'I-279 South to Pittsburgh',
      '2018-02',
      384,
      description = 'Jammin\' road song'
    ),
    utils.makeSong(
      'Waiting for Something, In Vain',
      '2018-02',
      377
    )
  ],
  description = |||
    Yet another FAWM where life got in the way.  I almost got to my regular pace of 4.... almost.
  |||,
  external = 'http://fawm.org/fawmers/deadhead/'
)
