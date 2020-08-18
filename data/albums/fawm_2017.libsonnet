local utils = import '../utils.libsonnet';

utils.makeAlbum(
  'FAWM 2017',
  '2017-02-01 - 2017-02-28',
  'Write write write write write write write',
  [
    utils.makeSong(
      'Let\'s Go',
      '2017-02',
      189,
      description = 'A good opener for FAWM.'
    ),
    utils.makeSong(
      'The River',
      '2017-02',
      325,
      description = 'A through composition.  I really like how it ends, but the opening half hasn\'t aged well in my opinion.'
    ),
    utils.makeSong(
      'Manhattan Sessions',
      '2017-02',
      1265,
      description = 'There\'s just something about manhattans opening up my piano creativity.  Hence this 20 min improv extravaganza.  There are a number of distinct sections.  I used to have names and timestamps for them all but... no clue where they went.'
    ),
    utils.makeSong(
      'Kiddy Pool',
      '2017-02',
      433,
      artist = 'David L Graham and Andrew Russell',
      credits = [
        utils.makeCredit('Andrew Russell', 'All Instruments, Music'),
        utils.makeCredit('David L Graham', 'Lyrics')
      ],
      lyrics = |||
        [Verse 1]
        I didn't get shanked
        In the restroom
        Or lost on the way to Kathmandu

        So let's wake up
        The Chinese with a word
        Then we can shake it out on Park Avenue

        [Chorus]
        We'll make do with revolution
        Make do with a chaos cool
        Then jump right back into that
        That kiddy pool

        [Verse 2]
        I shouldn't hijack
        The conversation
        But even a fool can make a run

        So let's stick to
        Our marmalade and toast
        And pretend the world's going to implode

        [Chorus]

        [Verse 3]
        There's an ocean
        Of lies behind us
        But that's ok we're all about trust

        We can't make secrets
        Secrets hold us back
        Or worry about the facts that we lack

        [Chorus]
      |||
    ),
    utils.makeSong(
      'Morning Meadow',
      '2017-02',
      233,
      description = 'An exploration into DADGAD.  One guitar.  Many layers.'
    ),
    utils.makeSong(
      'The Spicy Burrito Saga',
      '2017-02',
      629,
      description = 'Following up on the Manhattan Sessions, I decided to try a similar concept with other instruments.  Here\'s 10 minutes of acoustic guitar improv.  There are four distinct sections.'
    ),
    utils.makeSong(
      'In The Confession Booth',
      '2017-02',
      178,
      artist = 'Lavish Dude',
      credits = [
        utils.makeCredit('Sean Brennan', 'Vocals, Viola, Lyrics'),
        utils.makeCredit('Andrew Russell', 'Guitar, Bass Guitar, Drums, Music')
      ],
      lyrics = |||
        [A]
        Bless me father I have sinned
        It's been a while
        Bless me father
        Since my last confession I've

        [B]
        Undermined the dignity of man
        Turned my back on the poor
        Indulged in consumerist pornography

        Committed blasphemy, adultery, and bigotry
        Consumed my hate like a drug
        And I've murdered, murdered, murdered
        In the name of an idol made of gold

        [C]
        I am heartily sorry for having offended thee
        Do I detest my sins
        I don't know, I don't know

        Bless me father for I have sinned
        It's been a while
        Bless me father
        Since my last confession I have
      |||
    ),
    utils.makeSong(
      'The Electric Tapes',
      '2017-02',
      1580,
      description = 'Part three of the improv tour.  This time the electric guitar makes it\'s appearance.  This is probably my least favourite of the bunch, but has churned out one of my favourites in [[song:misc.the_pensive_pest|The Pensive Pest]].'
    ),
    utils.makeSong(
      'The Basement Gallery',
      '2017-02',
      638,
      description = '4 of 5 done.  Bass guitar.  So low.  So smooth.  So go.'
    ),
    utils.makeSong(
      'Then',
      '2017-02',
      245
    ),
    utils.makeSong(
      'Meandering Musings',
      '2017-02',
      287,
      description = 'Out of instruments, I have a different take on the improv.  I start with an acoustic guitar track, 100% improv.  Then layer the bass, then keys, then electric guitar.  Every take improv\'d and every take done without listening back to what I did previously.  It was... fun!'
    ),
    utils.makeSong(
      'No Prophet',
      '2017-02',
      362,
      artist = 'Lavish Dude',
      credits = [
        utils.makeCredit('Sean Brennan', 'Vocals, Viola, Lyrics'),
        utils.makeCredit('Andrew Russell', 'Guitar, Music')
      ],
      lyrics = |||
        [A]
        Every night before I fall into bed
        Before slumber carries me away
        I think of everything that led me to this moment
        And how I ended up this way

        [B]
        Sometimes I cry, sometimes I smile
        Sometimes I relax, sometimes I shake
        Sometimes acceptance and sometimes denial
        All these thoughts will guide me till I wake

        [C]
        I am no prophet
        I may never know truth
        I quake before
        The mysteries unknown

        But I step back
        And I sink into the gratitude
        But knowing
        That I've been alone

        [B]
        Every time I pass the pictures on the wall
        And every time I read the letter
        Every time I hear their voices
        I find the strength to make things better
      |||
    ),
    utils.makeSong(
      'The Road to Nowhere',
      '2017-02',
      235,
      artist = 'Amanda West and Andrew Russell',
      credits = [
        utils.makeCredit('Andrew Russell', 'All instruments, Music'),
        utils.makeCredit('Amanada West', 'Lyrics')
      ],
      lyrics = |||
        [Verse 1]
        Staring out the window
        All I feel shadows
        Looming the dark and chilly night

        A vision rather
        Than the blue grey blind
        Just for once I'd like to touch the lunar sky

        On the road to nowhere

        [Chorus]
        It's a long death
        Too many years don't want to remember
        It's a slow death
        Too many souls are gone long before me
        It's a slow death

        [Verse 2]
        An empty soul is rusting
        On the heap of darkness
        Nothing I can do can bring it back

        I cannot understand
        Why deities allow
        A soul to rot in places over hallow ground

        On the road to nowhere

        [Chorus]
      |||
    ),
    utils.makeSong(
      'Up to Something',
      '2017-02',
      205,
      artist = 'Amanda West, Sean Brennan and Andrew Russell',
      credits = [
        utils.makeCredit('Sean Brennan', 'Viola'),
        utils.makeCredit('Andrew Russell', 'Guitar, Music'),
        utils.makeCredit('Amanda West', 'Bodhrán, Inspiration')
      ]
    ),
    utils.makeSong(
      'Travel Song',
      '2017-02',
      156,
      artist = 'Nancy Gunderson, Kristen Machina and Andrew Russell',
      credits = [
        utils.makeCredit('Kristen Machina', 'Vocals'),
        utils.makeCredit('Andrew Russell', 'Guitar, Music'),
        utils.makeCredit('Nancy Gunderson', 'Lyrics')
      ],
      lyrics = |||
        [Verse 1]
        Going down a new road
        Been down this road before
        Nothing looks familiar
        Cause I've seen it all before

        [Verse 2]
        Bubblegum pink bike
        Parked beside the lane
        Am I in Korea now
        In Kenya saw the same

        [Verse 3]
        Only three weeks ago
        Maybe three weeks ago
        Time doesn't change
        On this road

        [Bridge]
        The trees with their leaves
        A dog in the shade
        A tumbledown shack
        Broken wheel in the grass

        Sidewalk café
        With mystery on my plate
        Colourful bills
        Smiles instead of words

        The universal art of exchange
        What did I exchange for this

        [Verse 4]
        I guess I've had my fill
        Cause I finally understand
        Going down a new road
        Been down this road before
        Nothing looks familiar
        Cause I've seen it all before
        Nothing looks familiar
        Cause I've seen it all before
      |||
    )
  ],
  description = |||
    For the first time, I won at FAWM!! 15 songs, and some good collaborations too.
  |||,
  external = 'http://fawm.org/fawmers/deadhead/'
)
