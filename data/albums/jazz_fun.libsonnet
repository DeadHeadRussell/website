local utils = import '../utils.libsonnet';

utils.makeAlbum(
  'Jazz Fun',
  '2008-08',
  'Couple jazz tunes',
  [
    utils.makeSong(
      'Reborn',
      '2008-08',
      291
    ),
    utils.makeSong(
      'Touch of Nothing',
      '2008-08',
      519
    )
  ]
)
