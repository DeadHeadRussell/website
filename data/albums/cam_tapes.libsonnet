local utils = import '../utils.libsonnet';

utils.makeAlbum(
  '\'Cam Tapes',
  '\'Cam Tapes',
  '2010 - 2013',
  'Webcam recording series',
  [
    utils.makeSong(
      'I\'m One',
      '2013',
      188,
      artist = 'The Who',
      credits = [
        utils.makeCredit('Andrew Russell', 'All instruments'),
        utils.makeCredit('Pete Townshend', 'Music, Lyrics')
      ],
      video = true,
      lyrics = |||
        [Verse 1]
        Every year is the same
        And I feel it again
        I'm a loser no chance to win
        Leaves start falling
        Come down is calling
        Loneliness starts sinking in

        [Chorus]
        And I'm one
        I am one
        And I can see
        That this is me
        And I will be
        You'll all see
        I'm the one

        [Verse 2]
        Where do you get
        Those blue, blue jeans
        Faded patched secret so tight
        Where do you get
        That walk oh so lean
        Your shoes and your shirt all just right

        [Chorus]

        [Verse 3]
        I got a Gibson
        Without a case
        And I can't get that even tanned look on my face
        Ill fitting clothes
        And I blend in the crowd
        Fingers so clumsy
        Voice too loud

        [Chorus]

        I'm the one
        I'm the one
      |||,
      external = 'https://www.youtube.com/watch?v=cbwKrUv115Y&list=PL6A7D4203E4BA8C2C&index=1'
    ),

    utils.makeSong(
      'Down by the Water',
      '2013',
      231,
      artist = 'The Decemberists',
      credits = [
        utils.makeCredit('Heather Russell', 'Vocals'),
        utils.makeCredit('Andrew Russell', 'Vocals, Guitars, Piano'),
        utils.makeCredit('Colin Meloy, The Decemberists', 'Music, Lyrics')
      ],
      video = true,
      lyrics = |||
        [Verse 1]
        See this ancient riverbed
        See where all the follies are led
        Down by the water and down by the old main drag

        I was just some tow-head teen
        Feeling around for fingers to get in between
        Down by the water and down by the old main drag

        [Chorus]
        The season rubs me wrong
        The summer swells anon

        So knock me down and tear me up
        But I would bear it all broken just to fill my cup
        Down by the water and down by the old main drag

        [Verse 2]
        Sweet descend this rabble round
        The pretty little patter of a seaport town
        Rolling in the water rolling down the old main drag

        All dolled up in gabardine
        The lash-flashing Leda of Pier nineteen
        Queen of the water queen of the old main drag

        [Chorus]
      |||,
      external = 'https://www.youtube.com/watch?v=hNGOx8-wmIw&list=PL6A7D4203E4BA8C2C&index=2'
    ),
    utils.makeSong(
      'Dupree\'s Diamond Blues',
      '2013',
      237,
      artist = 'Grateful Dead',
      credits = [
        utils.makeCredit('Andrew Russell', 'All instruments'),
        utils.makeCredit('Jerry Garcia and Robert Hunter', 'Music, Lyrics'),
      ],
      video = true,
      lyrics = |||
        [Verse 1]
        When I was just a little young boy
        Papa said "Son, you'll never get far
        I'll tell you the reason if you want to know
        Cause child of mine, there isn't really very far to go"

        [Verse 2]
        Well baby baby wants just a gold diamond ring
        Wants it more than any old thing
        Well when I get those jelly roll blues
        I'd go and do anything in this whole world for you

        [Verse 3]
        Went down to the jewelry store packing a gun
        Says "Wrap this one up. I think I'll take this one"
        "A thousand dollars" the jewelry man said
        Well Dupree said, "I think I'll pay this one off to you in lead"

        [Bridge]
        Well you know son you just can't figure,
        First thing you know you're gonna pull that trigger
        And it's no wonder your reasons go bad
        Jelly roll will drive you so mad

        [Verse 4]
        Judge said "Son, its gonna cost you some time"
        Dupree said "Judge, you know that crossed my mind"
        Judge said "Fact boy it's cost you your life"
        Dupree said "Judge, you know that seems to me to be about right"

        [Verse 5]
        Well baby, baby's gonna lose her sweet man
        Dupree come out with a losing hand
        Baby's gonna weep it up for awhile
        And then go out and find another sweet man's gonna treat her with style

        [Verse 6]
        Well judge said "Son, I know your baby well
        But that's a secret I can't never tell"
        Well dupree said "Judge, well it's well understood,
        But you got to admit that that sweet, sweet jelly's so damn good"

        [Bridge]
        Well you know son you just can't figure,
        First thing you know you're gonna pull that trigger
        And it's no wonder your reasons go bad,
        Jelly roll will drive you stone mad

        [Verse 7]
        Same old story I know it's been told
        Some like jelly jelly - some like gold
        Many a man's done a terrible thing
        Just to get their baby a shining diamond ring
      |||,
      external = 'https://www.youtube.com/watch?v=bldq2jPjOxc&list=PL6A7D4203E4BA8C2C&index=3'
    ),
    utils.makeSong(
      'Scarlet Begonias',
      '2012',
      583,
      artist = 'Grateful Dead',
      credits = [
        utils.makeCredit('Andrew Russell', 'All instruments'),
        utils.makeCredit('Jerry Garcia and Robert Hunter', 'Music, Lyrics'),
      ],
      video = true,
      lyrics = |||
        [Verse 1]
        As I was walking around Grosvenor Square
        Not a chill to the winter but a nip to the air
        From the other direction she was calling my eye
        I thought it could be an illusion but I might as well try
        Might as well try

        [Verse 2]
        She had rings on her fingers and bells on her shoes
        And I knew without asking she was into the blues
        She wore scarlet begonias tucked into her curls
        I knew right away that she was not like other girls
        Other girls

        [Verse 3]
        In the thick of the evening when the dealing got rough
        She was too pat to open but too cool to bluff
        As I picked up my matches and I was closing the door
        I had one of them flashes that I've been here before
        Been there before

        [Bridge]
        Well I ain't often right but I've never been wrong
        Seldom turns out the way it does in a song
        Once in a while you get shown the light
        In the strangest of places if you look at it right

        [Verse 4]
        Well there ain't nothing wrong with the way that she moves
        Scarlet begonias or a touch of the blues
        And there's nothing wrong with the look that's in her eyes
        I Had to learn the hard way to let her pass by
        Let her pass by

        [Verse 5]
        The wind in the willow's playing "Tea For Two"
        The sky was yellow and the sun was blue
        Strangers stopping strangers just to shake their hand
        Everybody's playing in the heart of gold band
        Heart of gold band
      |||,
      external = 'https://www.youtube.com/watch?v=GhOEkeNBVuU&list=PL6A7D4203E4BA8C2C&index=4'
    ),
    utils.makeSong(
      'No Place Like the Right Time',
      '2012',
      223,
      artist = 'Donna the Buffalo',
      credits = [
        utils.makeCredit('Heather Russell', 'Vocals'),
        utils.makeCredit('Andrew Russell', 'Vocals, Guitar'),
        utils.makeCredit('Tara Nevins', 'Music, Lyrics')
      ],
      video = true,
      lyrics = |||
        [Verse 1]
        Crooked fence chicken yard
        Life can be simple and still be hard
        Oh my head it hurts my eyes
        The world's getting bigger as it shrinks in size
        You walked by out of the blue
        I never expected to be loved by you
        I always thought the most of you
        Now we're sitting and we're drinking too

        [Chorus]
        There's no place I can find
        There's no place no place like the right time
        There's no place I can find
        There's no place, no place like the right time

        [Verse 2]
        Sit and watch the tall grass grow
        I run and hide from the things I know
        Catch the dust up in my eye
        All is looking different as the years go by
        There's a dish that I'm not passing
        Yours is a love that is everlasting
        You give to the world, you give to yourself
        When you're giving your best to somebody else

        [Bridge]
        World keeps turning but I don't know why
        Blackbirds singing on a country wire
        White steam rising off the blackest tar
        Who ever thought we'd ever come this far
        Jet stream riding as the clock strikes three
        Tea for two honey, tea at three
        Ask me your question it'll set you free
        All wound up on bended knee
      |||,
      external = 'https://www.youtube.com/watch?v=hURusstrVLQ&list=PL6A7D4203E4BA8C2C&index=5'
    ),
    utils.makeSong(
      'Why Don\'t You Save Me',
      '2011',
      503,
      video = true,
      lyrics = |||
        [Verse 1]
        I haven't slept for five days
        I haven't woke for months
        I'm trying to call the good lord
        I'm tyring to call him at once
        I got into a spot of trouble
        I got into it over a girl
        I'm crying out my heart now
        I'm crying to the end of the world

        I'm feeling down
        I'm feeling down
        Down, why don't you save me

        [Verse 2]
        I can't give up the life we had
        I can't start one a new
        I'm trying to make a big change
        I'm trying to hit undo
        I know that she's the only one
        I know that there's more fish in the sea
        I'm crying can't you help me lord
        I'm crying can't you see

        I'm calling you
        I'm calling you
        You, why don't you save me
        Why don't you save me
        Why don't you try to find the time
        Where you can help me mend my mind
        Why don't you save me

        [Verse 3]
        I embraced a new calling
        I gave up all my life
        I'm trying to get your help lord
        I'm trying to remove this strife
        I can't do this on my own
        I can't do this without your help
        I'm crying can't you help me lord
        I'm crying cause I failed

        I'm trying lord I am trying
        I'm crying lord I am crying
      |||,
      external = 'https://www.youtube.com/watch?v=dS1Nb1Uvdtg&list=PL6A7D4203E4BA8C2C&index=6'
    ),
    utils.makeSong(
      'F is For Frogs',
      '2011',
      204,
      video = true,
      lyrics = |||
        [Verse 1]
        F is for frogs when they jump all about
        Except when they cut human throats out
        F is for frogs who are feeling fine
        If they're not you better stay on their good side
        F is for frogs

        [Verse 2]
        F is for flesh eating frogs
        They especially like the flesh of dogs
        F is for poison arrow frogs
        They extract their poison from the bark of logs
        F is for frogs

        [Verse 3]
        F is for frogs who bomb the earth
        Then they will all laugh in mirth
        F is for frongs who are not done
        With the human race who was very dumb
        F is for frogs

        [Verse 4]
        F is for frogs who control the human race
        Who will finally get a taste
        F is for frogs who are no longer a pet
        Who can be forced to go to the vet
        F is for frogs
      |||,
      external = 'https://www.youtube.com/watch?v=_CtRO7n6hZ4&list=PL6A7D4203E4BA8C2C&index=7'
    ),
    utils.makeSong(
      'The Journey',
      '2011',
      317,
      video = true,
      lyrics = |||
        [Verse 1]
        The light just popped and now you're in the dark.
        You have nowhere to go.
        A light goes off in the distance.
        You follow it around the globe.

        It takes you to places that you've never been.
        See things you've never seen before.
        The light goes off and then you're in the dark.
        And then you start over again.

        Now you start over again.
        Now you start over again.
        Now you start over again.
        Now you start over again.

        [Verse 2]
        Now you've travelled the world over.
        You've been pretty far.
        You'd like to settle down a while.
        After having travelled so hard.

        But no matter where you go,
        You've seen better days.
        But no matter where you look,
        The horizon always turns your gaze.

        The horizon always turns your gaze.
        The horizon always turns your gaze.
        The horizon always turns your gaze.
        The horizon always turns your gaze.
      |||,
      external = 'https://www.youtube.com/watch?v=ed6AgSGknMc&list=PL6A7D4203E4BA8C2C&index=8'
    ),
    utils.makeSong(
      'Farther Away',
      '2010',
      621,
      video = true,
      lyrics = |||
        [Verse 1]
        Fly away my pretty darling.
        Fly away my little one.
        Fly away for now I must let you go.
        Times are hard, increasingly so.

        [Verse 2]
        Look at this, see what you have done.
        Sold my child so I could just live on.
        Far away she will go.
        Far away, too far for me to go.

        [Chorus]
        These desolations that you have caused.
        You should stop meddling with nature's affairs.
        These hard times are from you and your.
        Why me? It's unfair.

        [Verse 3]
        I am done, nothing to live for.
        You've taken it all away now.
        I am gone, there's no coming back now.
        You've taken everything away from me.
        
        [Chorus]
        
        [Outro]
        Way-oh-way, farther away now.
      |||,
      external = 'https://www.youtube.com/watch?v=AU8ADee0acE&list=PL6A7D4203E4BA8C2C&index=9'
    ),
    utils.makeSong(
      'Don\'t Think Twice, It\'s All Right',
      '2011',
      277,
      artist = 'Bob Dylan',
      credits = [
        utils.makeCredit('Andrew Russell', 'All instruments'),
        utils.makeCredit('Bob Dylan', 'Music, Lyrics')
      ],
      video = true,
      lyrics = |||
        [Verse 1]
        It ain't no use to sit and wonder why, babe
        It don't matter anyhow
        And it ain't no use to sit and wonder why, babe
        If you don't know by now
        When your rooster crows at the break of dawn
        Look out your window and I'll be gone
        You're the reason I'm travelling on
        Don't think twice, it's all right

        [Verse 2]
        And it ain't no use in turning on your light, babe
        That light I've never known
        And it ain't no use in turning on your light, babe
        I'm on the dark side of the road
        Still I wish there was something you would do or say
        To try and make me change my mind and stay
        We never did too much talking anyway
        So don't think twice, it's all right

        [Verse 3]
        It ain't no use in calling out my name, gal
        Like you never did before
        And it ain't no use in calling out my name, gal
        I can't hear you anymore
        I'm a thinking and wondering all the way down the road
        I once loved a woman, a child I am told
        I give her my heart but she wanted my soul
        But don't think twice, it's all right

        [Verse 4]
        I'm a walking down that lone lonesome road, babe
        Where I'm bound I can't tell
        Goodbye is too good a word, gal
        So I just say fare thee well
        I ain't saying you treated me unkind
        You could have done better but I don't mind
        You just kinda wasted my precious time
        But don't think twice, it's all right

        You're the reason I'm travelling on
        Don't think twice, it's all right
        But don't think twice, it's all right
      |||,
      external = 'https://www.youtube.com/watch?v=7ClU6VsXKlA&list=PL6A7D4203E4BA8C2C&index=10'
    ),
    utils.makeSong(
      'KOR Waltz',
      '2010',
      444,
      video = true,
      external = 'https://www.youtube.com/watch?v=HnWOT5zHQP8&list=PL6A7D4203E4BA8C2C&index=11'
    ),
    utils.makeSong(
      'You\'ll Know My Name',
      '2011',
      87,
      artist = 'Phish',
      credits = [
        utils.makeCredit('Andrew Russell', 'All instruments'),
        utils.makeCredit('Trey Anastasio and Tom Marshall', 'Music, Lyrics')
      ],
      video = true,
      lyrics = |||
        [Verse 1]
        Oh I guess you can stay here tonight
        I'll pay for the breakfast when dark becomes light
        But if for some reason I buy you a ring
        Don't get your hopes up it don't mean a thing

        [Verse 2]
        And then if I say what you'd rather not hear
        Just let if flow out the opposite ear
        Most of my words are just meant for today
        There's limited truth in the things that I say

        [Bridge]
        Nothing works as its written
        Try to feed you'll be bitten
        Try to practice what you read
        And more than likely you'll bleed

        [Verse 3]
        But none of this matters now that you're here
        You really can't leave until you finish that beer
        Somewhere inside us our needs are the same
        The difference come morning is you'll know my name
      |||,
      external = 'https://www.youtube.com/watch?v=2gYcsKolO0c&list=PL6A7D4203E4BA8C2C&index=12'
    ),
    utils.makeSong(
      'Los Hoya Jam',
      '2010',
      397,
      video = true,
      external = 'https://www.youtube.com/watch?v=J9v5pUTjmRg&list=PL6A7D4203E4BA8C2C&index=13'
    ),
    utils.makeSong(
      'hehehe...',
      '2010',
      266,
      video = true,
      external = 'https://www.youtube.com/watch?v=NrZx_BGyyL0&list=PL6A7D4203E4BA8C2C&index=14'
    ),
    utils.makeSong(
      'Back on the Train',
      '2010',
      438,
      artist = 'Phish',
      credits = [
        utils.makeCredit('Andrew Russell', 'All instruments'),
        utils.makeCredit('Trey Anastasio and Tom Marshall', 'Music, Lyrics')
      ],
      video = true,
      lyrics = |||
        [Verse 1]
        When I jumped off I held a bucket full of thoughts
        When I first jumped off I held that bucket in my hands
        Ideas that would take me all around the world
        I stood and watched the smoke behind the mountain curl
        It took me a long time to get back on the train

        [Verse 2]
        Now I'm gone and I'll never look back again
        I'm gone and I'll never look back at all
        You'll know I'll never look back again
        I turned my face into the howling wind
        It took me a long time to get back on the train

        [Verse 3]
        See my face in the town that's flashing by
        See me standing in the station in the rain
        See me running there besides the car
        I left if all behind and I've travelled far
        It took me a long time to get back on the train
      |||,
      external = 'https://www.youtube.com/watch?v=PKhtxriyXKA&list=PL6A7D4203E4BA8C2C&index=15'
    ),
    utils.makeSong(
      'Rocking in the Free World',
      '2010',
      634,
      artist = 'Neil Young',
      credits = [
        utils.makeCredit('Andrew Russell', 'All instruments'),
        utils.makeCredit('Neil Young', 'Music, Lyrics')
      ],
      video = true,
      lyrics = |||
        [Verse 1]
        There's colours on the street
        Red white and blue
        People shuffling their feet
        People sleeping in their shoes
        Now there's a warning sign on the road ahead
        There's a lot of people saying we'd be better off dead
        I don't feel like Satan but I am to them
        So I try to forget it any way I can

        [Chorus]
        Keep on rocking in the free world

        [Verse 2]
        I see a woman in the night
        With a baby in her hand
        Under an old street light
        Near a garbage can
        Now she puts the kid away and she's gone to take a hit
        She hates her life and what she's done to it
        There's one more kid who will never go to school
        Never get to fall in love never get to be cool

        [Chorus]

        [Verse 3]
        We got a thousand points of light
        For the homeless man
        We've got kindler gentler
        Machine gun hand
        We got department stores and toilet paper
        We got styrofoam boxes for the ozone layer
        Got a man of the people says keep hope alive
        Got fuel to burn got roads to drive

        [Chorus]
      |||,
      external = 'https://www.youtube.com/watch?v=ZeGJv6HkepM&list=PL6A7D4203E4BA8C2C&index=16'
    )
  ],
  description = |||
    Various covers, original songs, and jams recorded in front of a webcam.  Started just as just a single electric guitar with the pedal, but it evolved to bring on guests and use multi-tracking.
  |||,
  external = 'https://www.youtube.com/playlist?list=PL6A7D4203E4BA8C2C'
)

