local utils = import '../utils.libsonnet';

utils.makeAlbum(
  'Home Concert Series',
  '2020',
  'Mini concerts done from the comfort of home',
  [
    utils.makeSong(
      'Home Concert - 2020-05-10 - Solo Piano',
      '2020'
    )
  ],
  description = |||
    These performances mimic as if I was playing a concert.  They will typically be 30mins to 1 hour, and go through a series of songs and improvisations, just like I would playing anywhere.  Post processing will be done to cleanup the audio quality (eg, noise reduction, I live in a noisy apartment!) but generally not for editing or fixing mistakes.
  |||
)

