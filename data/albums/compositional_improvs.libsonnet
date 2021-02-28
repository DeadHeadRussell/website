local utils = import '../utils.libsonnet';

utils.makeAlbum(
  'Compositional Improvs',
  'Compositional Improvs',
  '2020',
  'Improvs to spur creativity and aid the composition process',
  [
    utils.makeSong(
      'Impromptu 5',
      '2020-03-21',
      789
    ),
    utils.makeSong(
      'Impromptu 4',
      '2020-03-21',
      180
    ),
    utils.makeSong(
      'Impromptu 3',
      '2020-03-21',
      350,
      description = 'This one takes a while to get going, but it really gets going'
    ),
    utils.makeSong(
      'Impromptu 2',
      '2020-03-21',
      474,
      credits = [
        utils.makeCredit('Andrew Russell', 'Piano, Improv'),
        utils.makeCredit('Hoarce Silver', 'Music of "Peace"')
      ],
      description = 'Starts off with Peace by Horace Silver'
    )
  ],
  description = |||
    My wife's aunt graciously left us a baby grand piano when she moved out of Toronto.  These Impromptus are a series of improvisations done on that grand piano to fuel my compositions.
    The instrument is a beautiful Weinbach made in Czechia.
    It starts at Impromptu 2 since [[song:fawm_2020.impromptu_1|Impromptu 1]] is a part of [[album:fawm_2020|FAWM 2020]].  It's well worth the listen so go check it out!!
  |||
)

