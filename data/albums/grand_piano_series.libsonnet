local utils = import '../utils.libsonnet';

utils.makeAlbum(
  'Grand Piano Series',
  '2020',
  'Improvs on a grand piano',
  [
    utils.makeSong(
      'Impromptu 2',
      '2020'
    ),
    utils.makeSong(
      'Impromptu 3',
      '2020',
      description = 'This one takes a while to get going, but it really gets going'
    ),
    utils.makeSong(
      'Impromptu 4',
      '2020'
    ),
    utils.makeSong(
      'Impromptu 5',
      '2020'
    )
  ],
  description = |||
    My wife's aunt graciously left us a baby grand piano when she moved out of Toronto.  These songs are a series of improvisations done on that grand piano.
    The instrument is a beautiful Weinbach made in Czechia.
    It starts at Impromptu 2 since Impromptu 1 is a part of FAWM 2020.  It's well worth the listen so go check it out!!
  |||
)

