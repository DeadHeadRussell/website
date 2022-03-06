local utils = import '../../utils.libsonnet';

utils.makeAlbum(
  'FAWM 2014',
  'FAWM 2014',
  '2014-02-01 - 2014-02-28',
  'Songs from FAWM 2014 (February Album Writing Month)',
  [
    utils.makeSong(
      'What Can I Say?',
      '2014-02',
      131,
      description = 'Jazz-rock instrumental'
    ),
    utils.makeSong(
      'All In Time',
      '2014-02',
      352,
      description = 'Wistful folk song'
    ),
    utils.makeSong(
      'A Winter\'s Day',
      '2014-02',
      180,
      artist = 'Nadia Cripps and Andrew Russell',
      credits = [
        utils.makeCredit('Andrew Russell', 'All instruments, Music'),
        utils.makeCredit('Nadia Cripps', 'Lyrics')
      ],
      description = 'Driven Rock Adventure'
    ),
    utils.makeSong(
      'One Fall Afternoon',
      '2014-02',
      340,
      description = 'Sappy love song'
    )
  ],
  description = |||
    This was my first FAWM.  My roommate at the time had taken part in previous years and convinced me to give it a try.  The goal of FAWM is to push yourself to write 14 songs in 28 days with the idea being that one of them will be good!  I got to 4.
  |||,
  external = 'http://fawm.org/fawmers/deadhead/'
)
