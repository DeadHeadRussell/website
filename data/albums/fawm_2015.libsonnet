local utils = import '../utils.libsonnet';

utils.makeAlbum(
  'FAWM 2015',
  '2015-02-01 - 2015-02-28',
  'Songs from FAWM 2015 (February Album Writers Month)',
  [
    utils.makeSong(
      'Hold On',
      '2015-02',
      description = 'Free flowing tune'
    ),
    utils.makeSong(
      'Left Alive',
      '2015-02',
      description = 'Song of abandonment',
      lyrics = |||
        Not at home, now alone
        Left to die, left up against a
        Cone trees grow up through
        The holes
        In me
        
        Out in the woods
        The creatures roam all the night and day
        Long comes a roar
        Scatters the
        Leaves to the wind
        
        The rust settles over
        I can't start, what I used to be
        Driving the rounds
        Town to town
        All time
        
        A hole in my shoe
        My clothes are all ragged and torn
        I think I'll just lay down
        Stay here
        Come to rest
        
        I'm alive, I'm free
        Don't look for me
        I'm alive, I'm on my own
      |||
    ),
    utils.makeSong(
      'Life Has Never Been So Kind',
      '2015-02',
      description = 'Mournful, sad, crying',
      lyrics = |||
        I am trying
        Trying not to make it show
        I'd want to hold you
        Press right up against your nose
        I will talk to
        Whisper slowly speaking low
        I would like to know more
        Who I adore
        
        Hold my hand
        Sweaty fists clasped into one
        I hear your breathing
        Shallow noises in my ear
        Overwhelming
        Over time you disappear
        I'd like for you to
        Be around just one more year
        
        Shortened life
        With no walking on your own
        There's no time
        To crown you on your princely throne
        In white walls
        You have never seen your home
        I may join you
        Life has never been so kind
        
        Turn the head and sit up straight
        Eat some food and gain some weight
        Make a smile and try to laugh
        Life has never been so kind
      |||
    ),
    utils.makeSong(
      'A Song About Sweaters',
      '2015-02',
      artist = 'Lavish Dude',
      credits = [
        utils.makeCredit('Sean Brennan', 'Vocals, Viola, Music, Lyrics'),
        utils.makeCredit('Andrew Russell', 'Vocals, Guitar, Music, Lyrics')
      ],
      description = 'There might also be shorts involved...',
      lyrics = |||
        Sweaters are great
        Sweaters are great
        Sweaters are comfy and warm
        Sweaters are great
        Sweaters are great
        I've worn them since the day I was born

        <Banter>

        I like shorts
        I like shorts
        They're comfy and easy to wear
        I like shorts
        I like shorts
        They're the next best thing to going bare

        <Banter>

        Shorts are sloppy
        Shorts are awkward
        When I wear them they don't quite fit
        Shorts droop down
        Shorts ride up
        When I wear them they look like...

        <Banter>

        Sweaters are tight
        Sweaters are hot
        I think sweaters suck
        Sweaters bunch up
        Sweaters stretch out
        No one goes to Mr. Rogers looking for...

        Sweaters are great
        Shorts are too
        Wear them both together if you please
        Shorts are the best
        So are sweaters
        If you want to cover your elbows but not your knees.
      |||,
      external = 'https://www.youtube.com/watch?v=QKcfAy1EBYg'
    )
  ],
  description = |||
    And we're back for FAWM again in 2015!  This year I wrote.... 4 songs!  Oh, what's that?  You're supposed to write 14?...  Oh well, I did a few recordings with others, so I took part in closer to 10 songs.  Just didn't write them...
  |||,
  external = 'http://fawm.org/fawmers/deadhead/'
)
