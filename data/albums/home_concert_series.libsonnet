local utils = import '../utils.libsonnet';

utils.makeAlbum(
  'Home Concert Series',
  '2020',
  'Mini concerts done from the comfort of home',
  [
    utils.makeSong(
      'Home Concert - 2020-05-17 - Solo Piano',
      '2020',
      credits = [
        utils.makeCredit('Andrew Russell', 'Piano'),
        utils.makeCredit('See Above', 'Music')
      ],
      description = |||
        Notturno - Edvard Grieg
        Here's That Rainy Day - Jimmy Van Heusen
        Improv - Andrew Russell
        Three To Get Ready - David Brubeck
        (Up a) Lazy River - Hoagy Carmichael
        Quiet Nights of Quiet Stars (Corcovado) - Antônio Carlos Jobim
      |||
    ),
    utils.makeSong(
      'Home Concert - 2020-05-10 - Solo Piano',
      '2020',
      credits = [
        utils.makeCredit('Andrew Russell', 'Piano'),
        utils.makeCredit('See Above', 'Music')
      ],
      description = |||
        Improv - Andrew Russell
        Ruby, My Dear - Thelonius Monk
        Waltz for Debby - Bill Evans
        Georgia on My Mind - Hoagy Carmichael
        Improv - Andrew Russell
        Lazy Bones - Hoagy Carmichael
        Blue in Green - Bill Evans
        Improv - Andrew Russell
      |||
    )
  ],
  description = |||
    These performances mimic as if I was playing a concert.  They will typically be 30mins to 1 hour, and go through a series of songs and improvisations, just like I would playing anywhere.  Post processing will be done to cleanup the audio quality (eg, noise reduction, I live in a noisy apartment!) but generally not for editing or fixing mistakes.
  |||
)

