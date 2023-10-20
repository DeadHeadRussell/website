local utils = import '../../utils.libsonnet';

utils.makeAlbum(
  '50/90 2023',
  '50/90 2023',
  '2023-07-04 - 2023-10-01',
  'Andrew Russell',
  [
    utils.makeSong(
      'Until Dawn',
      '2023-09',
      333,
      credits = [
        utils.makeCredit('Heather Russell', 'Vocals, melody, harmony'),
        utils.makeCredit('Andrew Russell', 'Lyrics, music, shouts, all instruments')
      ],
      lyrics = |||
        [Verse 1]
        Endless waves create
        A sense of no escape
        The sea and the sky go on
        Merge on the horizon
        Sailing on to dawn

        [Verse 2]
        The dark canopy
        Silence to infinity
        A flicker of light shines through
        Is all there is to view
        Walking on to dawn

        [Verse 3]
        Daunting peak above
        Teases location of
        One more crest to rise
        Until another meets our eyes
        Climbing on to dawn

        [Chorus]
        I won't back down, I'll keep climbing higher
        In the face of the unknown, I'll never tire
        Pushing on until the brink of day

        So let us play, with efficient grace,
        Let our feet take us to another new place.
        Pushing on until the brink of day

        [Verse 4]
        Endless tasks abide
        With meaning to provide
        A lot from before to show
        On to dawn we'll go
      |||,
      description = |||
        Written for an employee at my company as an award for winning a hackathon. The three inspirations I was given were:
        - Shipyards by The Lake Poets
        - Evanescence
        - Female vocals

        Generally, I write very negative lyrics. I guess its an outlet or something. Anyways, I tried to keep these lyrics really positive as it I didn't want to write a really dark song for an employee! But if this is as positive as I get, should I be concerned?
      |||
    ),
    utils.makeSong(
      'Mémoire d\'un Rêve',
      '2023-08',
      259
    ),
    utils.makeSong(
      'And the Sun was Silent',
      '2023-09',
      131,
      artist = 'Stephen Wordsmith and Andrew Russell',
      credits = [
        utils.makeCredit('Stephen Wordsmith', 'Lyrics'),
        utils.makeCredit('Andrew Russell', 'Music, vocals, guitars')
      ],
      lyrics = |||
        He fell asleep with only four
        He walked away with five
        While glancing back at every crack for falling feet behind

        And when he left, the birds had songs
        The strangers, each in their own font
        Wrote stories with their lips for the first time

        The sun would blaze the heat of days
        In silence in the sky

        The blackbirds on the streaking wire
        Composed themselves into a bar
        A line that now, for once, he stopped and heard

        The china roared a waterfall
        The lights forgot the words and hummed
        The wind he thought would whistle as it worked

        Was mute just like the burning brute
        Sat silent in the sky

        The auburn flames upon the grate
        The auburn leaves beneath his feet
        Now crackled, cackled from the same song's sheet

        He fell asleep with senses four
        He walked away with five
        While glancing back at every crack for unseen men behind

        And the sun would blaze the heat of days
        In silence in the sky
      |||,
      description = 'I love odd form songs.'
    ),
    utils.makeSong(
      'Sparkling Flight',
      '2023-09',
      144,
      lyrics = |||
        [Verse 1]
        The ruby light sparkles clean in the fire
        As I look upon my pack with glee
        A snap of branches sounds behind me
        I douse the flames and turn to flee

        [Verse 2]
        The emerald leaves cover the trail behind me
        The coloured veil fills my hope to the brim
        The gem's weight on my back grows lighter
        As I flee with glee

        [Verse 3]
        The sapphires glisten under the blue sky
        As I open my pack with glee
        The sparkling colours shine so brightly
        Calm now I turn to leave
      |||
    )
  ],
  description = |||
    Just a couple things that happened to be done during the 50/90 time period.
  |||,
  external = 'https://fiftyninety.fawm.org/@deadhead'
)

