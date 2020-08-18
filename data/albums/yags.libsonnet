local utils = import '../utils.libsonnet';

utils.makeAlbum(
  'YAGS',
  '2017 - 2019',
  'OST for Yearning: A Gay Story',
  [
    utils.makeSong(
      'Yearning',
      '2018',
      179,
      artist = 'Bob Conway and Andrew Russell',
      credits = [
        utils.makeCredit('Andrew Russell', 'All instruments, Music'),
        utils.makeCredit('Bob Conway', 'Lyrics')
      ],
      lyrics = |||
        [Verse 1]
        Feeling alone
        Off on my own
        Kind of for the first time

        With a secret inside
        Just something to hide
        Like a mountain I must climb

        As I'm looking back to who I've been
        Finding comfort in my skin
        So soon with just some time
        Hope that I can find

        [Chorus]
        That I'm yearning
        To be who I'll be
        Finding myself finally free
        I'm just yearning
        So that I can see
        That maybe what I need

        Is standing in front of me

        [Verse 2]
        People I meet
        Laughter I seek
        Friendship's forming as we go

        As we talk and confide
        Those feelings inside
        Turns to joy and thoughts that flow

        From my mind as I find something more
        In these friends that I adore
        Still each and every day
        Wish that I could get away

        [Chorus]

        I'm finding in front of me

        [Bridge]
        Through thick and thin
        And broken limbs
        And even times of trial
        As we grow close
        What helps the most
        Is when I see you smile
        Yeah I love to see you smile

        [Chorus]

        Was you here in front of me

        Yearning, to be who I'll be
        Yearning, so that I can see
        Yearning, because what I need is you
      |||
    )
  ],
  description = |||
    
  |||,
  external = 'http://yags.bobcgames.com/'
)
