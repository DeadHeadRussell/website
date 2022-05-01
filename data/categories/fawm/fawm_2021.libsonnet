local utils = import '../../utils.libsonnet';

utils.makeAlbum(
  'FAWM 2021',
  'FAWM 2021',
  '2021-02-01 - 2021-02-28',
  'The Andrew Russell Trio',
  [
    utils.makeSong(
      'Leading Off',
      '2021-02',
      332,
      artist = 'The Andrew Russell Trio',
      description = |||
        And thus kicks of my FAWM 2021 jazz kick. No clue why this happened - I just had jazz on my mind.
        This one was was inspired by Herbie Hancock's Maiden Voyage, but it wound up closer to Vince Guaraldi or Esbjörn Svensson Trio.
      |||,
      sheetMusic = true
    ),
    utils.makeSong(
      'How Far Will I Go For Her',
      '2021-02',
      333,
      artist = 'The Andrew Russell Trio',
      description = 'This jazz ballad just sang onto the page for me. I think it would really shine with some lyrics, but alas, none yet.',
      sheetMusic = true
    ),
    utils.makeSong(
      'Emotional Charge',
      '2021-02',
      349,
      artist = 'The Andrew Russell Trio',
      description = 'This one starts joyous, with a David Brubeck meets Animal Crossing feel, but then ends with a very emotionally charged section.',
      sheetMusic = true
    ),
    utils.makeSong(
      'Blue',
      '2021-02',
      273,
      artist = 'The Andrew Russell Trio starring Alex Klages',
      credits = [
        utils.makeCredit('Alex Klages', 'Vocals and Lyrics'),
        utils.makeCredit('Andrew Russell', 'Piano, Bass, Drums and Music')
      ],
      description = 'Come join us in our jazz lounge. Pull up a chair, grab a drink, but most importantly, relax and enjoy the show. A very Paul Anka or Mel Tormé feel lounge feel.',
      lyrics = |||
        [Verse]
        Blue...
        Like the shadows on the new fallen snow
        Blue...
        Like the night sky when you bid me go
        Blue...
        All I know is the colour blue

        [Verse]
        Blue...
        Like the water rushing down the drain
        Blue...
        Like the teardrops now falling like rain
        Blue...
        All I know is the colour blue

        [Bridge]
        I used to know red
        Was the colour of love
        I used to know yellow
        Like the sunshine above
        Now all I know
        All that is left for me
        Is the colour blue
        And that's how I will be...

        [Verse]
        Blue...
        Like the empty sky over my head
        Blue...
        Like the empty sheets on my old bed
        Blue...
        All I know is the colour blue

        [Bridge]
        I used to know green
        Was the colour of life
        I used to know white
        Back when you were my wife
        Now all I know
        I don't even have grey
        Is the colour blue
        And that's how I will stay

        [Out]
        Blue...
        Blue...
        Blue...
        All I know is the colour blue
      |||,
      sheetMusic = true
    ),
    utils.makeSong(
      'Crosseyed and Terrified',
      '2021-02',
      197,
      artist = 'The Andrew Russell Trio',
      description = 'This one really pushed my drumming limits. A lot of takes and post-editing later and this is what you get.  This was largely influenced by how I interepreted Duke Ellington\'s caravan from a lead sheet before I ever heard it. Boy was I off.',
      sheetMusic = true
    ),
    utils.makeSong(
      'Languish in Sorrow',
      '2021-02',
      403,
      description = 'The guitarist Andrew Russell joins in the Andrew Russell trio for a compelling jazz rock fusion to round out the album.',
      sheetMusic = true
    ),
    utils.makeSong(
      'Musey Stole My Lunch',
      '2021-02',
      250,
      artist = 'Andrew Russell and Adnama17',
      credits = [
        utils.makeCredit('Adnama17', 'Lyrics'),
        utils.makeCredit('Andrew Russell', 'Vocals, Guitar, Organ, Bass, Drums, Music')
      ],
      description = 'I got some very playful lyrics and just had to turn them into a banger.',
      lyrics = |||
        [Verse]
        It was a normal day
        I was working away
        Writing some code
        And other fancy stuff

        Somehow I was alone
        While working from my home
        ‘Go treat yourself’
        My brain whispered to me

        My favorite thing by far
        Could eat it by the jar
        Tomato soup
        And some cornbread to dip

        [Pre-Chorus]
        I had just sat down at my kitchen table
        Steam from the soup warming up my nose
        That’s precisely when Musey chose to tell me
        Exactly what she wanted me to compose

        [Chorus]
        Musey stole my lunch
        I was so hungry
        But the perfect chord
        And the perfect word
        Just whacked me upside the head

        [Out]
        Now my soup is cold
        And my bread is stale
        Stomach is growling
        But I must obey
        Or I just might wake up dead

        [Verse]
        Ran to my studio
        Pen and paper in tow
        Tuned my guitar
        Tried quick to lay it down

        But my vision was swayed
        At everything thing that laid
        Half way written
        And half way eaten too

        When did I start this one?
        I thought this one was done…
        What is that smell?
        Look! Here are all my plates…

        [Pre-Chorus]
        How in the world did I let it get this bad?
        How is she still putting up with me?
        Is this precisely why she chose my lunchtime
        To grace me with her grand creativity?!

        [Chorus]
        Musey stole my lunch
        I was so hungry
        But the perfect chord
        And the perfect word
        Just whacked me upside the head

        [Out]
        Now my soup is cold
        And my bread is stale
        Stomach is growling
        But I must obey
        Or I just might wake up dead
      |||
    ),
    utils.makeSong(
      'In the End',
      '2021-02',
      193,
      artist = 'Andrew Russell and Mike J.',
      credits = [
        utils.makeCredit('Mike J.', 'Lyrics, Vocals, Guitar'),
        utils.makeCredit('Andrew Russell', 'Guitar, Piano, Bass, Drums, Music')
      ],
      description = 'I came across these lyrics on FAWM, and the music just jumped out at me.',
      lyrics = |||
        [Verse]
        High seas in a wooden boat
        Hope for sun
        Hope she floats
        Rain storm and I'm made of bread
        In my mind
        In my head

        [Chorus]
        Wish I could be as strong as you
        Sure of the color of the blues
        Wish that I could be a friend
        When you need
        In the end

        [Verse]
        Bad vote haunts me now
        Said some things
        Anyhow
        Take it back if I could
        Sure of none
        Not sure I should

        [Chorus]

        [Verse]
        Guess you should try anyhow
        Throw it out
        Lay it down
        If you're lucky it will stick
        On the wall
        Like pasta brick

        [Chorus]
      |||,
      sheetMusic = true
    ),
    utils.makeSong(
      'Ten Little Terrors',
      '2021-02',
      138,
      description = |||
        Wanted to do an improv based 10x10 and came up with the theme of "Terrors". Each short represents another type of terror. What type is each? That is up to the listener to decided.

        A 10x10 is 10, 10 second songs in a row. They don't have to be linked in any way, but in this case they are.

        I started by improv'ing the electric guitar, then layered everything else beneath it, mostly improv, but a couple retakes here and there. And well, since its me... its more like a 15x10 since everything I do ends up long. I also picked up some new synths a few days ago, so of course I had to use them here!
      |||,
      lyrics = |||
        [One]
        (no lyrics)

        [Two]
        (no lyrics)

        [Three]
        It's in the house
        Under the bed
        Cover your eyes
        Cover your head

        It's in the house
        Under the bed
        Cover your eyes

        [Four]
        (no lyrics)

        [Five]
        (no lyrics)

        [Six]
        I can't un-see what happened

        [Seven]
        I'm stuck in this madness
        I'm going looney
        It's in this madness
        Halloonie Balloonie

        [Eight]
        Yeaaaahhh
        It's on

        [Nine]
        Going far away
        Leaving on a plane
        Leaving this terror behind

        Going far away
        Gonna catch a plane
        Gotta hope it leaves on time

        [Ten]
        (no lyrics)
      |||
    ),
    utils.makeSong(
      'White Russian Winter',
      '2021-02',
      1202,
      sections = [
        utils.makeSection(0, 'Mvmt 1'),
        utils.makeSection(540, 'Mvmt 2'),
        utils.makeSection(720, 'Mvmt 3'),
        utils.makeSection(1075, 'Mvmt 4')
      ],
      description = |||
        Hoooo boy. So I was having a lull in my songwriting and decided to do an improv session on the piano. White Russian in hand, winter storm out the window, I was all set.

        Then this came out. Good news, I would like to turn it / parts of it into my next sonata. Bad news, that will take a long freakin' time and heck if I'm going to spend the rest of my FAWM on this.

        Warning: 20 mins long. Don't feel like you have to listen to it all.
      |||
    )
  ],
  description = |||
    A productive year all around!  Checkout [[album:lavish_dude.fawm_2021|Lavish Dude]] for the Lavish Dude works completed during this FAWM.
    There is a good split of Jazz Trio songs here, acoustic alternative songs in Lavish Dude, various styles in collabs and exploration completed this year.
  |||,
  external = 'http://fawm.org/fawmers/deadhead/'
)
