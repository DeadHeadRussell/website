local utils = import '../utils.libsonnet';

utils.makeAlbum(
  'CMU Session',
  '2014-01',
  'Recording session at CMU\'s studio',
  [
    utils.makeSong(
      'Has That Ever Crossed Your Mind',
      '2014-01',
      208,
      credits = [
        utils.makeCredit('Andrew Russell', 'Vocals, Guitars, Bass Guitar, Music, Lyrics'),
        utils.makeCredit('Christopher Russell', 'Drums'),
        utils.makeCredit('Riccardo Schultz + CMU Students', 'Studio Engineers')
      ],
      description = |||
        Straight up 3min Rock Song in 6/8
        I wrote this song while riding a bike. In fact, I wrote a second song on that bike ride as well. Life is silly sometimes.
      |||,
      lyrics = |||
        I have shown you what you've never seen before
        I have helped you take your first walk 'cross the floor
        I have made sure that you've never fall'n behind
        Has that ever crossed your mind

        La dee da dee da da la dee da dee da
        La dee da dee da da la dee da dee da
        La dee da dee da da la dee da dee da
        La dee da dee da dee da
        La dee da dee da dee da
        La dee da dee da dee da

        In the time that was and time that swept away
        Once we were close now and we have gone astray
        One day I will be waiting you'll find
        Has that ever crossed your mind
        Has that ever crossed your mind
        Has that ever crossed your mind

        Left with pictures painted with a coarse hand
        Life is something that one cannot understand
        What you did I would never do in kind
        Has that ever crossed your mind
        Has that ever crossed your mind
        Has that ever crossed your mind

        La dee da dee da da la dee da dee da
        La dee da dee da da la dee da dee da
        La dee da dee da da la dee da dee da
        La dee da dee da dee da
      |||
    ),
    utils.makeSong(
      'Moving',
      '2014-01',
      438,
      credits = [
        utils.makeCredit('Andrew Russell', 'Vocals, Guitars, Bass Guitar, Drums, Music, Lyrics'),
        utils.makeCredit('Riccardo Schultz + CMU Students', 'Studio Engineers')
      ],
      description = 'Simple rock song followed by relaxed composed section ending with a trippy jam.',
      lyrics = |||
        Long times pass and short times hold
        To be lost in a town that I do not know
        Allies twist without a cause
        Where one cannot pause for too long
        Where they do not belong
        Why is it here is not clear

        Moving away during a storm
        Leaving what is not the norm
        Casting off those lifeless fires
        Forgetting all the liars; wasted time
        It wasn't worth a dime
        Such a worthless year
        Wasted here

        Lifeless nights are worse than before
        There is nothing great here to explore
        Waiting for the next strike to blow
        There is nothing here to show that is new
        Its the same polluted dew
        From here I should be gone
        Is all wrong
        Is all wrong
        Is all wrong
        Is all wrong
      |||
    )
  ],
  description = |||
    Recordings done at CMU with the wonderful Riccardo.
    Bass and drums were recorded at home in BC while the guitars and vocals were in the studio. The higher quality audio really shines through on these recordings. I guess that's what a great studio gets you!
  |||,
  external = 'https://www.cmu.edu/cfa/music/people/Bios/schulz_riccardo.html'
)
