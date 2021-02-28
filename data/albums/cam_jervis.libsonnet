local utils = import '../utils.libsonnet';

utils.makeAlbum(
  'The Cam Jervis Experience',
  'The Cam Jervis Experience',
  '2008',
  'Originals and covers played in my high school band',
  [
    utils.makeSong(
      'Road to Want',
      '2008',
      358,
      'The Cam Jervis Experience',
      [
        utils.makeCredit('Andrew Russell', 'Lead Guitar'),
        utils.makeCredit('Adam Baigent', 'Rhythm Guitar, Didgeridoo'),
        utils.makeCredit('Cam Jervis', 'Bass Guitar'),
        utils.makeCredit('Garry Garneau', 'Drums'),
        utils.makeCredit('The Cam Jervis Experience', 'Music')
      ],
      description = 'Progressive rock song'
    ),
    utils.makeSong(
      'On Either Side',
      '2008',
      193,
      'The Cam Jervis Experience',
      [
        utils.makeCredit('Garry Garneau', 'Lead Vocals, Russian Lap Harp, Lyrics'),
        utils.makeCredit('Adam Baigent', 'Backing Vocals, Guitar, Music'),
        utils.makeCredit('Andrew Russell', 'Backing Vocals, Piano'),
        utils.makeCredit('Cam Jervis', 'Backing Vocals, Bass Guitar')
      ],
      description = 'Laid back fold'
    ),
    utils.makeSong(
      'Crash Symbol',
      '2008',
      102,
      'The Cam Jervis Experience',
      [
        utils.makeCredit('Garry Garneau', 'Lead Vocals, Drums, Lyrics'),
        utils.makeCredit('Andrew Russell', 'Guitar'),
        utils.makeCredit('Adam Baigent', 'Guitar, Music'),
        utils.makeCredit('Cam Jervis', 'Bass Guitar'),
      ],
      description = 'Rock Rock Rock'
    ),
    utils.makeSong(
      'Farmhouse',
      '2008',
      255,
      'Phish',
      [
        utils.makeCredit('Andrew Russell', 'Lead Vocals, Lead Guitar, Drums'),
        utils.makeCredit('Garry Garneau', 'Backing Vocals'),
        utils.makeCredit('Adam Baigent', 'Rhythm Guitar'),
        utils.makeCredit('Cam Jervis', 'Piano, Bass Guitar')
      ],
      description = 'Rock ballad'
    ),
    utils.makeSong(
      'El Scorcho',
      '2008',
      284,
      'Weezer',
      [
        utils.makeCredit('Garry Garneau', 'Lead Vocals'),
        utils.makeCredit('Andrew Russell', 'Lead Guitar, Rock Organ, Drums'),
        utils.makeCredit('Adam Baigent', 'Rhythm Guitar'),
        utils.makeCredit('Cam Jervis', 'Bass Guitar')
      ],
      description = 'Rock song'
    )
  ]
)
