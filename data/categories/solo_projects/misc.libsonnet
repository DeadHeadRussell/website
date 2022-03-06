local utils = import '../../utils.libsonnet';

utils.makeAlbum(
  'Misc',
  'Misc',
  '2016 - ???',
  'Various',
  [
    utils.makeSong(
      'Beware the Terrors',
      '2015',
      461,
      artist = 'Lavish Dude',
      credits = [
        utils.makeCredit('Sean Brennan', 'Vocals, Viola, Lyrics'),
        utils.makeCredit('Andrew Russell', 'Vocals, Guitars, Drums, Music')
      ],
      lyrics = |||
        [Verse 1]
        I'm cold and lonely please let me in
        Give me shelter treat me like kin
        I am weary please give me rest
        I am human not a test
        Please tell me what would you do
        If this weary soul was one of you

        [Verse 2]
        I am hungry hear my cry
        I'm in pain now tell me why
        I need healing let me pray
        Everybody else sends me away
        Please tell me where would you send your hate
        If governments made war on your fate

        [Chorus]
        The ones who chase after greed
        And reject their neighbours in need
        Beware all the terrors they feed

        [Verse 3]
        I am lonely please give me love
        Let judgement come from above
        I am fragile hold me tight
        Cause nothing for me has been right
        Please tell me where would you roam
        If you were cast out from your home

        [Verse 4]
        I have knowledge please lend your ears
        I can grapple with your darkest fears
        I have laboured I have learned
        But now I give up what I earn
        Please tell me what would you expect
        If they came to you to collect

        [Chorus]
      |||
    ),
    utils.makeSong(
      'The Pensive Pest',
      '2017',
      369,
      description = 'This one came out of [[song:fawm.fawm_2017.the_electric_tapes|The Electric Tapes]] from [[album:fawm.fawm_2017|FAWM 2017]]'
    ),
    utils.makeSong(
      'Waiting for the Sky to Fall',
      '2016',
      310,
      description = 'One of my finest compositions, both from a lyrical and musical point of view.',
      lyrics = |||
        [Verse 1]
        The sky is blue and I'll see it through
        Til the sky changes red before I go to bed

        Thinking how the rocks by the sea
        Are withered, oh they're rounded so small
        From fall after fall

        The bully of the waves
        Rushing to the shore
        Crashing so high
        They might touch my sky

        Its time to go home

        [Verse 2]
        The sky is blue and I'll see it through
        Til the sky changes red before I go to bed

        Wondering when I'll visit my home again
        Too long, I can barely remember
        The upper hall stairs

        The dinning room chairs
        We got them in fall
        They stood so high
        Reaching out to my sky

        Its time to go home
      |||
    ),
    utils.makeSong(
      'Once Majestic',
      '2020',
      393,
      description = 'Grand solo piano composition.  This is the first composition done primarily at the grand piano.',
      sheetMusic = true
    )
  ],
  description = |||
    A collection of miscellaneous recordings of original songs done at home.
  |||
)
