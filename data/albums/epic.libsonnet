local utils = import '../utils.libsonnet';

utils.makeAlbum(
  'Epic',
  'Epic',
  '2008 - 2015',
  'The most brilliant rock album no one has ever heard.',
  [
    utils.makeSong(
      'hehehe...',
      '2010',
      275,
    ),
    utils.makeSong(
      'The Journey',
      '2012',
      858,
      description = 'This song has gone on to be one of my more commonly played ones, both live and recorded.',
      lyrics = |||
        [Verse 1]
        The light just popped and now you're in the dark.
        You have nowhere to go.
        A light turns on in the distance.
        You follow it around the globe.

        It takes you to places you've never been.
        See things you've never seen before.
        The light goes off; it leaves you in the dark.
        And then you start over again.

        Then you start over again.
        Then you start over again.
        Then you start over again.
        Then you start over again.

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
      |||
    ),
    utils.makeSong(
      'Epic Story',
      '2011',
      317,
      description = 'This song was originally written for a grade 12 English project. It was about the elements of an epic.'
    ),
    utils.makeSong(
      'Change',
      '2008',
      264,
      description = 'I think I wrote 0.5 - 1 lines of lyrics before I decided I didn\'t like them.'
    ),
    utils.makeSong(
      'I See',
      '2008',
      266,
      description = 'Partially inspired by one of my favourite books at the time, World Without End by Sean Russell (no relation).',
      lyrics = |||
        [Verse 1]
        This ain't working
        Give up
        It's going nowhere
        Give up
        You're trying to manouver around us
        Give up
        But we are manouvering around you
        Give up
        Give up
        Give up

        [Chorus]
        But I see what's going on
        You think I'm a puppet but I know better than that
        But I see what's going on
        I may be a puppet to you but I see
        I see

        [Verse 2]
        They are yours
        Give up
        That I see through
        Give up
        I see through your lines
        Give up
        Though you don't even see mine
        Give up
        Give up
        Give up

        [Chorus]

        [Bridge]
        Manouver
        Lines
        Can you
        I see

        [Chorus]

        [Outro]
        But I see
        I see
      |||
    ),
    utils.makeSong(
      'Deleted',
      '2010',
      957,
      description = 'I originally wrote this using my digital piano\'s recording feature.  I then accidentally deleted it and didn\'t realize until over a week later.  I then had to rewrite this from memory.  Hence the name.'
    ),
    utils.makeSong(
      'Now',
      '2008',
      235,
      description = 'One of my favourites still to this day. It deserves a higher quality recording.'
    )
  ],
  description = |||
    This was the first album I ever put together, sometime in the mid-2000's.  I had written a number of songs by this point but had never thought about how they could go together.  Little did I know that this was the start of an effort that would lead to rock operas later in life...
  |||
)
