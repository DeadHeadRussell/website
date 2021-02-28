local utils = import '../utils.libsonnet';

utils.makeAlbum(
  'FAWM 2020',
  'FAWM 2020',
  '2020-02-01 - 2020-02-29',
  'Classical Music Extravaganza',
  [
    utils.makeSong(
      'No Light',
      '2020-02',
      279,
      description = 'Rock. Depressing',
      lyrics = |||
        [Intro]
        C#m
        
        [Verse 1]
        C#m E C#m
        There is not light, Where I appear
        Stuck here by myself, Trapped with my fear
        Fractured mind, Pieces of my Brain
        C#m E G#7
        Without any reason, Here, I remain
        
        [Verse 2]
        Hear the approach, He who I hate most
        Screaming, I leave, Buts he's with me
        Turning I strike, and I go down with him
        Falling as I cry, then I hear
        
        [Bridge]
        A
        You are here
        E A
        Catching as I fall, You are here
        E A
        Holding me close, You are here

        [Outro]
        C#m
      |||
    ),
    utils.makeSong(
      'Labour of Love',
      '2020-02',
      220,
      description = |||
        Was wanting to do my yearly DADGAD song late one night when I got the idea for this one, but it had more of a morning feel to it so I waited until the next morning to write it!
      |||
    ),
    utils.makeSong(
      'Lone Roamer',
      '2020-02',
      247,
      description = |||
        Wanted to write an acoustic grunge song, but this came out instead.... I'll find that grunge song one day.

        I asked a few others to help name this song. They all independently said it was about traveling / roaming / adventuring / something similar. How odd.
      |||
    ),
    utils.makeSong(
      'Elegy of Fear',
      '2020-02',
      351,
      description = |||
        Got inspired by a Rachmaninoff Elegy Op. 3 No. 1, so I wrote something in that style.
        This took 3-4 long days of writing and still could use tons of work, but... FAWM. Also, my playing sucks, I had to record a lot of this one hand at a time... then heavily edit those sections as well. Huzzah for MIDI!
      |||,
      sheetMusic = true
    ),
    utils.makeSong(
      'Silently Tapping upon the Glass',
      '2020-02',
      314,
      artist = 'Stephen Wordsmith and Andrew Russell',
      credits = [
        utils.makeCredit('Andrew Russell', 'All Instruments and Music'),
        utils.makeCredit('Stephen Wordsmith', 'Lyrics')
      ],
      description = 'Jazz noir horror',
      lyrics = |||
        Silently tapping upon the glass
        Of the master bedroom window pane
        He hoped to rouse the master of the house
        To warn him of the flame
        
        That danced and licked across the den
        Consuming all without a care
        And wove a raging drunkard's path
        Towards the only wooden stair
        
        Silently tapping upon the glass
        But no reaction came to pass
        
        Silently tapping upon the glass
        Of the master bedroom window pane
        The soft and scanty droplets fell
        Of long-awaited summer rain
        
        That could not douse a burning house
        Or spirits of a watchful warner
        Knocking all too softly as
        The tongue of fire licked every corner
        
        Silently tapping upon the glass
        But no reaction came to pass
        
        BRUDGE
        And so they met an ending
        Neither happy nor surprising
        To become a part of all that came to pass
        And in the here and now
        The way to talk of our devising's
        still -
        Tapping
        Silently
        Upon the glass
        
        <bit o' music>
        
        Silently tapping upon the glass
        As the strange intruder searched the room
        The muted lifeline in her hand
        All that could save her from her doom
        
        The words said 'sending' and no more
        But why? She could not understand
        Til in the end, the wardrobe door
        Swung upen by a stranger's hand
        
        Silently tapping upon the glass
        But no reaction came to pass
      |||
    ),
    utils.makeSong(
      'Trafilata al Bronzo',
      '2020-02',
      282,
      description = 'Jumped into my head just a few hours before I had to catch a plane. 100% FAWM quality. Yet another song where I had to ask what to name it / what genre / how to describe it. No definitive answers. If you know where this names come, I guess you like pasta?'
    ),
    utils.makeSong(
      'Variations on a Theme of Raindrop Prelude (Chopin)',
      '2020-02',
      587,
      artist = 'Christopher and Andrew Russell',
      credits = [
        utils.makeCredit('Christopher and Andrew Russell', 'Everything')
      ],
      description = |||
        Composed with my brother, Christopher Russell.
        
        Theme from Chopin - Raindrop Prelude
        https://youtu.be/HVau-JRGirg
        Variations are around the theme from 1:42 - 2:42
        https://youtu.be/HVau-JRGirg?t=102
        
        Variations are a type of composition where you start with an already written piece of music (in our case, the above theme), then write original pieces that modify the original theme, are influenced by it, or are just similar to it in some way that may or may not make sense to the listener.
        
        For example, you could take a single note melody line from the original theme, and then put it to a different set of chords using a different rhythm. Or take some rhythmic pattern from the original theme and write a new theme that is based off of that rhythmic pattern. The possibilities are endless!
        
        Here is a Rachmaninoff: Variations on a Theme of Chopin (a different Chopin theme!). It is well worth the listen.
        https://youtu.be/XiDtLscGnn8
        
        Performed by myself. Err... mostly. Kind of. Every note here was played on a piano. Just... usually really slowly, and one hand at a time. Or sometimes even multiple takes for a single hand. And then edited heavily after that.
      |||,
      sheetMusic = true
    ),
    utils.makeSong(
      'Prelude in F Minor',
      '2020-02',
      223,
      description = |||
        There's just something about me and manhattans when it comes to piano. It just changes how I write piano music.
        Anyhoo, regular disclaimer that I "played" this piece. Aka, one hand... err... one part of one hand at a time. Then made lots of edits. So don't go claiming I'm great at playing piano after listening to this.
      |||,
      sheetMusic = true
    ),
    utils.makeSong(
      'Rhapsody of Uncertainty',
      '2020-02',
      806,
      description = 'A rhapsody. \'nuff said.',
      sheetMusic = true
    ),
    utils.makeSong(
      'Impromptu 1',
      '2020-02',
      484,
      description = |||
        8 minutes cut out of a 30 minute improv session. It sounded so much like a piece already composed that I decided to upload it verbatim here. Will probably go back and give it some more coherence at some point.

        Multiple (3 or 4) themes from this same improv session went on to become [[song:fawm_2020.rhapsody_of_uncertainty|Rhapsody of Uncertainty]].
      |||
    ),
    utils.makeSong(
      'Seed into Tree',
      '2020-02',
      194,
      artist = 'Nancy Gunderson, Kristen Machina and Andrew Russell',
      credits = [
        utils.makeCredit('Kristen Machina', 'Vocals'),
        utils.makeCredit('Andrew Russell', 'Vocals, Guitar, Music'),
        utils.makeCredit('Nancy Gunderson', 'Lyrics')
      ],
      description = 'Yet another FAWM collab with the wonderful Hummingbear.  I managed to rope my wife into singing one yet again! (And by that, I mean she wanted to sing to these lyrics 😀)',
      lyrics = |||
        The seed
        The seed
        Does it ever know
        The shape into which
        Its genes will grow?
        
        The seed
        The seed
        Is it ever sad
        To lose its damp
        And earthen bed?
        
        The seed
        The seed
        Does it ever grieve
        The daily change
        Of boundaries?
        
        Its seed coat burst
        Its rootlets swell
        No longer sheltered
        Tight within itself.
        
        The tree
        The tree
        Does it remember long
        How from the seed
        It was sprung?
        
        The tree
        The tree
        Does it feel the pain
        Of never being
        A seed again?
        
        The seed
        The seed
        Could it imagine
        What could be gained
        By losing its seedy reign?
        
        The tree
        The tree
        If it ever knew
        Would thank the seed
        From which it grew.
      |||
    ),
    utils.makeSong(
      'Dance of the Dead',
      '2020-02',
      288,
      description = |||
        My morning songs always seem to end up happier than my other songs. Its weird considering that I usually write them before I have my coffee...
        I just picture dancing skeletons when listening to this, and there's definitely some Garcia and Grisman influence poking through. Hence the title.
      |||
    ),
    utils.makeSong(
      'Back to Frozen',
      '2020-02',
      244,
      artist = 'Adnama17 and Andrew Russell',
      credits = [
        utils.makeCredit('Andrew Russell', 'Vocals, Guitar, Bass Guitar, Music'),
        utils.makeCredit('Adnama17', 'Vocals, Lyrics')
      ],
      description = 'This is me rushing to finish 14.  Except I needed help for some brilliant lyrics.',
      lyrics = |||
        V1
        A wise man once said
        There’s nothing new under the sun
        And I know for a fact
        That what I said can’t be undone
        
        I was being selfish
        I was dreary afternoon rain
        The last thing I would want
        Is to cause you heartache or pain
        
        Just want back to
        
        C
        When every day was Sunday morning
        Your every word was so transforming
        When we could conquer all
        Every demon, big or small
        
        When every night was just pure heaven
        Your slightest touch took my confession
        Your voice in my ear
        Made me shiver, made me fear
        
        V2
        I’ve tried not to be green
        Fan the flame, reignite the spark
        Nothing makes a difference
        Now I’m alone here in the dark
        Just want back to
        
        V3
        I know I should move on
        Had my chance, but did it all wrong
        Blanket over my head
        Nothing to say, I’ve lost my song
        
        Cuz I can’t shake the thought
        Of your warm breeze blowing through my heart
        Melting my pain away
        I’m back to frozen, like at the start
      |||
    ),
    utils.makeSong(
      'Seeking an End',
      '2020-02',
      258,
      description = 'Well, I hit 14... not much else to say about this one.  ...well, other than most of this came from that same 30 min piano improv session. Could probably turn it into something much better than this, but not with the time remaining in FAWM!'
    )
  ],
  description = |||
    My brother got me hooked on romantic era solo piano compositions.  So I made some of my own.  Also, all my guitar pieces got called Spanish.  Which is weird considering I don't have any Spanish influences that I know of.
    FAWM 2020 also includes 1 standard DADGAD acoustic tune, 1 typical Andrew instrumental rock, and 1 depressing rock song.  Batteries not included.
  |||,
  external = 'http://fawm.org/fawmers/deadhead/'
)
