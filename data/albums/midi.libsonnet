local utils = import '../utils.libsonnet';

utils.makeAlbum(
  'MIDI',
  'MIDI',
  '2008 - 2015',
  'Various',
  [
    utils.makeSong(
      'What Am I?',
      '2010',
      287,
      description = 'Guitar led, instrumental rock song'
    ),
    utils.makeSong(
      'Has That Ever Crossed Your Mind',
      '2011',
      210,
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
      |||,
      description = 'Simple 6/8 rock song'
    ),
    utils.makeSong(
      'Six Wide Lanes',
      '2012',
      156,
      artist = 'Heather and Andrew Russell',
      credits = [
        utils.makeCredit('Andrew Russell', 'All instruments, Music, Lyrics'),
        utils.makeCredit('Heather Russell', 'Music, Lyrics')
      ],
      lyrics = |||
        [Verse 1]
        Six wide lanes flowing through this city
        And this place isn't where I belong
        But the road keeps going on
        On and on
        And it can't be very long now

        [Verse 2]
        Six wide lanes travelling out of this city
        And I ain't going back for awhile
        I'm travelling on and on
        On and on
        And I ain't going back for a while

        [Verse 3]
        Six wide lanes leading into the distance
        And I can't keep on straight anymore
        I'm moving today
        I'm going astray
        And I keep travelling on and on

        Follow this road home

        [Verse 4]
        Six wide lanes heading from town to town
        And I can't find a place to settle down
        I'm going in circles
        I'm all alone
        Oh why won't the highway lead me home
        Oh why won't the highway lead me home
        Oh why won't the highway lead me home
        Oh why won't the highway lead me home
      |||,
      description = 'Upbeat bluegrass tune'
    ),
    utils.makeSong(
      'Mellow Song',
      '2010',
      272,
      artist = 'Heather and Andrew Russell',
      credits = [
        utils.makeCredit('Andrew Russell', 'All instruments, Music, Lyrics'),
        utils.makeCredit('Heather Russell', 'Music, Lyrics'),
      ],
      description = 'There are lyrics for this.  I swear.  I just don\'t know what happened to them and they were never completed...'
    ),
    utils.makeSong(
      'Die Die Die',
      '2010',
      496,
      lyrics = |||
        [Verse 1]
        I don't care what you do to me
        As long as you do it all wrong
        I don't care what you say to me
        As long as you say it all wrong

        I don't care what you do to me
        As long as you do it all right
        I don't care what you say to me
        As long as you say it all right

        [Chorus]
        Cause I want you to
        Die die die
        Die die die
        I don't care what you do to me
        I just want you to die

        [Verse 2]
        I don't care what happens to me
        As long as it happens all right
        I don't care what happens to me
        As long as it happens tonight

        I don't care what happens to me
        As long as it happens all wrong
        I don't care what happens to me
        As long as it don't happen for long

        [Chorus]

        [Verse 3]
        I know now what you did to me
        What you did was so wrong
        I know now what you did to me
        You did it for oh so long

        I know now what you did to me
        What you did was so right
        I know now what you did to me
        You did it to me all night

        [Chorus]
        Cause I want you to
        Die die die
        Die die die
        I know now what you did to me
        And cause that I want you to die
        And cause that I want you to die
        And cause that I want you to die
        And cause that I want you to die
      |||,
      description = 'Rock-funk trio'
    ),
    utils.makeSong(
      'Jazzy #5',
      '2010',
      390,
      description = 'Instrumental jazz song.  There\'s also a #2.'
    ),
    utils.makeSong(
      'KOR Waltz',
      '2010',
      622,
      description = 'Jazz-rock waltz'
    ),
    utils.makeSong(
      'Riding Past',
      '2014',
      216,
      credits = [
        utils.makeCredit('Andrew Russell', 'All instruments, Music'),
        utils.makeCredit('Pat Lowther', 'Lyrics')
      ],
      lyrics = |||
        Long streets of houses
        With lighted roofs
        Black against
        Winter sky

        Blue as Venetian glass
        With Venus hanging
        Like a small
        Yellow moon

        In the houses people
        Are cooking food
        And scolding children

        The ones home from work
        Are hanging their coats up
        Telephones are ringing
        Behind the yellow windows

        Come, open the doors
        Yellow rectangles and steam
        Of meat and potatoes

        Stand on the front steps
        Stare at the sky and wave
        Look, we're riding past Venus
      |||,
      description = 'Original poem titled "Riding Past" by Pat Lowther'
    )
  ],
  description = |||
    A collection of works that use MIDI patches for the bass and drums with real instruments recorded on top.
  |||
)
