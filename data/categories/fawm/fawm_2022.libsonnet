local utils = import '../../utils.libsonnet';

utils.makeAlbum(
  'FAWM 2022',
  'FAWM 2022',
  '2022-02',
  'Andrew Russell',
  [
    utils.makeSong(
      'Mysteries of the Night',
      '2021-02',
      128
    ),
    utils.makeSong(
      'Good Morning Blues',
      '2021-02',
      161,
      artist = 'Andrew Russell and Nadine de Macdeo',
      credits = [
        utils.makeCredit('Nadine de Macedo', 'Melody, Production'),
        utils.makeCredit('Andrew Russell', 'Piano, Bass, Drums, Chords')
      ],
      description = 'For more work by Nadine, check out her link tree: https://linktr.ee/nadinedemacedo',
      external = 'https://linktr.ee/nadinedemacedo'
    ),
    utils.makeSong(
      'The Light Falls',
      '2021-02',
      357,
      lyrics = |||
        The light falls
        Behind the trees
        We're surrounded by
        What we can't see
        The light fades
        Into misery
        What we don't see
        Can still hurt us

        It takes more than one
        To lead the way
        It takes the crowd
        To change you say
        The days inbetween
        Are where it grows dark
        Come together
        And do your part

        We grow
        So we survive
        We adapt
        So we can keep our lives
        But we're just floating
        Along
        We need your help
        To have somewhere to land on
      |||
    ),
    utils.makeSong(
      'Mountains',
      '2021-02',
      218,
      artist = 'Andrew Russell and Heather Russell',
      credits = [
        utils.makeCredit('Andrew Russell', 'Vocals, Guitar, Music, Lyrics'),
        utils.makeCredit('Heather Russell', 'Vocals')
      ],
      lyrics = |||
        [Verse 1]
        The mountains on the horizon are beckoning me
        The mountains in the distance are where I should be
        I want to climb on up to the top of that hill
        Take a look around from the top of the world
        The mountains
        I want to be free

        [Verse 2]
        The islands across the ocean are beckoning me
        The islands in the distance are where I should be
        I want to swim as far as my breath can hold
        Float upon the tide until it carries me home
        The islands
        I want to be free

        [Verse 3]
        The stars in the night sky are beckoning me
        The stars in the distance are where I should be
        I want to build a spaceship that can take me up high
        Blast off from this rock and leave it all behind
        The night stars
        I want to be free
      |||
    ),
    utils.makeSong(
      'February Sunshine Love',
      '2021-02',
      543,
      artist = 'The Andrew Russell Trio starring Alex Klages',
      credits = [
        utils.makeCredit('Alex Klages', 'Vocals and Lyrics'),
        utils.makeCredit('Andrew Russell', 'Piano, Bass, Drums and Music')
      ]
    ),
    utils.makeSong(
      'A-Team',
      '2021-02',
      221,
      artist = 'The A-Team',
      credits = [
        utils.makeCredit('Andy Myers', 'Computer, random gibbering'),
        utils.makeCredit('Alex Klages', 'Intro narration, snapping fingers, making occasional vocal noises'),
        utils.makeCredit('Andy Getch', 'Mediocre amatuer, bass, lyrics, hmmm\'ing and angstly singing'),
        utils.makeCredit('Amanda Williams', 'Actual good singing unlike the rest of us, lyrics'),
        utils.makeCredit('Andy Russell', 'Guitar, guitar, pretending like he belongs with the grown up vocalists')
      ],
      lyrics = |||
        [Intro]
        FAWM, our yearly crusade
        These are the mishaps of five A's with no lives
        It's one month side trip
        To write down odd new words
        To lay down new notes
        And arrange orchestrations
        To boldly write what no one should have written in the first place

        [Verse 1]
        5 strangers met online
        2 of them were normal
        They got to talking late one night
        We should make this union formal

        [Pre-Chorus]
        D is for the damn good song we all know we can write
        C is the camaraderie hope an Andy doesn’t bite

        [Verse 2]
        Sometimes one of us is angry
        one of us has angst
        one of us has anxiety
        Sometimes one of us is argumentative
        One of us is astrological
        one of us is AOL
        one of us is AWOL

        [Pre-Chorus]
        B is for blah blah blah blah just like the lyrics that I write
        A is for our anthem it’s clean outta sight!

        [Chorus]
        We’re the A Team
        A Team
        A Team
        Oh we’re so sorry
        But we’re the A Team

        [Verse 3]
        One of us is an aunt
        One of us is antagonistic
        Some of us are failed athletes
        Probably should be keeping better track of this

        [Pre-Chorus]
        Some of us are accountants
        Some of us failed as architects
        All of us are awkward
        But we're all first in line

        [Chorus]
      |||
    ),
    utils.makeSong(
      'Chocolate Swirl',
      '2021-02',
      122,
      artist = 'The Russell Family',
      credits = [
        utils.makeCredit('Heather Russell', 'Left Vocals'),
        utils.makeCredit('Kristen Machina', 'Right Vocals'),
        utils.makeCredit('Andrew Russell', 'Guitar, music, lyrics'),
        utils.makeCredit('Valerie Russell', 'Bass, lyrical inspiration'),
        utils.makeCredit('Christopher Russell', 'Drums')
      ],
      lyrics = |||
        I may be hankering for a piece of what
        I need I may be digging through my pantry for a piece of you
        I'm on my itch again another slab will get me through
        I'm on a knife's edge another cut of this slab will do
        I feel it every day It starts with one small piece
        I try to keep it out of the way
        I tell myself to not lose control
        I have one more it grows it grows it grows it grows it grows

        I'm in a chocolate swirl
        I'll give that new kind a whirl
        Gimme that chocolate pearl
        I'm in a chocolate swirl
        I'm out of control

        I'm on the hunt for more the latest bean from a new country
        This one's got nuts galore they take up space it's not for me
        This one is silky smooth I feel it coat my tongue
        This one's got cream two I'll need to get some help from you
        They've got my tryptophan my phenethylamine
        I've got to keep my levels up
        My serotonin enkephalin anandamidic high
        I need I need I need that high

        I'm in a chocolate swirl
        I'll give that new kind a whirl
        Gimme that chocolate pearl
        I'm in a chocolate swirl
        I'm out of control
      |||
    ),
    utils.makeSong(
      'Malplenan Theme',
      '2021-02',
      251,
      credits = [
        utils.makeCredit('Andrew Russell', 'Everything except below'),
        utils.makeCredit('Christopher Russell', 'Timpani and Bass Drum')
      ],
      external = 'https://www.worldanvil.com/w/malplenan-russellnoob',
      description = 'A theme song written for my home brewed DnD campaign called Malplenan.'
    ),
    utils.makeSong(
      'Im̓ye̓n and Snč̓l̓ep',
      '2021-02',
      231,
      external = 'https://www.worldanvil.com/w/malplenan-russellnoob',
      description = 'A folk song written for my DnD campaign called Malplenan.'
    ),
    utils.makeSong(
      'Improv for a Cold Morning',
      '2021-02',
      556
    ),
    utils.makeSong(
      'Acoustic Fire',
      '2021-02',
      167
    ),
    utils.makeSong(
      'Me and My Guitar - 1',
      '2021-02',
      274
    ),
    utils.makeSong(
      'Me and My Guitar - 2',
      '2021-02',
      212
    ),
    utils.makeSong(
      'Me and My Guitar - 3',
      '2021-02',
      240
    ),
    utils.makeSong(
      'Me and My Guitar - 4 (Dog Jam)',
      '2021-02',
      294,
      credits = [
        utils.makeCredit('Andrew Russell', 'Guitar, Bass, Musical Idea'),
        utils.makeCredit('Christopher Russell', 'Drums')
      ]
    ),
    utils.makeSong(
      'Me and My Guitar - 5',
      '2021-02',
      167
    )
  ],
  description = |||
    My highest quantity FAWM, but not my highest quality FAWM.  Checkout [[album:lavish_dude.fawm_2022|Lavish Dude]] for the Lavish Dude works completed during this FAWM.
  |||,
  external = 'http://fawm.org/fawmers/deadhead/'
)
