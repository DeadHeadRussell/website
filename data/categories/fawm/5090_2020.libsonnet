local utils = import '../../utils.libsonnet';

utils.makeAlbum(
  '50/90 2020',
  '50/90 2020',
  '2020-07-04 - 2020-10-01',
  'Practical Piano Playing',
  [
    utils.makeSong(
      'Ocean Journey (i1)',
      '2020-07-05',
      1139,
      sections = [
        utils.makeSection(0, 'Rising Tide'),
        utils.makeSection(345, 'Rough Seas'),
        utils.makeSection(522, 'Aftermath'),
        utils.makeSection(863, 'Return Home')
      ]
    ),
    utils.makeSong(
      'Dream Big (i2)',
      '2020-07-12',
      1191,
      sections = [
        utils.makeSection(0, 'Plod On'),
        utils.makeSection(251, 'Building Out'),
        utils.makeSection(480, 'A Time of Dreams'),
        utils.makeSection(707, 'Back to Reality'),
        utils.makeSection(1050, 'To Dream Again')
      ]
    ),
    utils.makeSong(
      'Life Moves On (i3)',
      '2020-08-08',
      1411,
      sections = [
        utils.makeSection(0, 'Playpen'),
        utils.makeSection(310.6, 'Worn Down'),
        utils.makeSection(550.6, 'Lamenting the Past'),
        utils.makeSection(671, 'Life Moves On'),
        utils.makeSection(954, 'Replay')
      ]
    ),
    utils.makeSong(
      'Fantasia in C# Minor',
      '2020-08-18',
      348,
      description = |||
        I recorded multiple takes over 45 mins just to realize that I never hit the record button... It was much better the first time around, I swear.
      |||,
      sheetMusic = true
    )
  ],
  description = |||
    Decided to take part in 50/90, FAWM's bigger brother.  There's no way I can compose 50 pieces in this time period, so I'll instead focus on improv.
  |||,
  external = 'http://fiftyninety.fawmers.org/user/deadhead'
)
