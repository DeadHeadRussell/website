local utils = import '../utils.libsonnet';

utils.makeAlbum(
  'ZAGS',
  'ZAGS',
  '2019 - 2020',
  'OST for Zen: A Gay Sequel',
  [
    utils.makeSong(
      'Zen',
      '2020',
      198,
      artist = 'Bob Conway and Andrew Russell',
      credits = [
        utils.makeCredit('Andrew Russell', 'All instruments, Music'),
        utils.makeCredit('Bob Conway', 'Lyrics')
      ],
      lyrics = |||
        [Verse 1]
        Sometimes
        When you're
        Feeling lonely
        Take a step back look around
        So you see that there's

        Friendships
        People
        Caring about you
        Might be surprised what could
        Then start to be in your

        Studies
        Workouts
        Wild parties
        Even some memories dredged
        Up from the past but when

        You're to-
        gether
        All that matters
        Is knowing each other and
        Finding at last

        Maybe something that's a little more

        [Chorus]
        That there's a lesson to learn
        Stop hiding inside let your world start to turn
        As you feel yourself start to grow
        Make choices and plan out your time till you know

        Don't let the doubting and fear win again
        Then you'll find that bit of zen

        [Verse 2]
        Breaking
        Through your
        Apprehensions
        Screw expectations and
        Live in the now with the

        Friends that
        Love you
        There beside you
        Spending your time with them
        And finding how

        You'll support each other through thick and thin

        [Chorus]

        People care about you remember it when
        You must find that bit of zen

        [Bridge]
        You're standing there leaving your old life behind
        The courage to move on and see what you find
        Accepting yourself feeling all that is real
        With Adam beside you you know how to feel

        [Chorus]

        Friendships are solid forever and then
        You'll have found that bit of zen
      |||
    )
  ],
  description = |||
    
  |||,
  external = 'http://zags.bobcgames.com/'
)
