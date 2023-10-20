local utils = import '../../utils.libsonnet';

utils.makeAlbum(
  'FAWM 2023',
  'FAWM 2023',
  '2023-02',
  'Andrew Russell',
  [
    utils.makeSong(
      'Entry',
      '2023-02',
      255,
      artist = 'The Andrew Russell Trio'
    ),
    utils.makeSong(
      'Green Cat',
      '2023-02',
      206,
      artist = 'The Andrew Russell Trio starring Alex Klages',
      credits = [
        utils.makeCredit('Alex Klages', 'Vocals and Lyrics'),
        utils.makeCredit('Andrew Russell', 'Piano, Bass, Drums and Music')
      ],
      lyrics = |||
        [Verse 1]
        Green cat
        Stares at me
        From his lofty perch as though to tell me
        Now get to work

        Green dog
        His partner
        On his right hand side he smiles so blithely
        Like there's something to hide

        [Chorus]
        Green cat green dog
        What do you mean
        Green cat green dog
        What is the scene
        What is the scene

        [Verse 2]
        White angel
        Stands proudly
        Holding the candlestick not strange to smirks loudly
        Wondering why I'm so thick

        White angel
        The partner
        To the first candlestick in range to stand guarder
        And he looks good that's no trick

        [Chorus]
        White angel standing guard
        What do you mean
        White angle standing guard
        What is the scene
        What is the scene

        [Outro]
        Figurines of my living room
        Remind me of another time and place
        Figurines of my living room
        Always put a little smile on my face

        Green cat green dog white angels
      |||
    ),
    utils.makeSong(
      'Pleasant Evening',
      '2023-02',
      356,
      artist = 'The Andrew Russell Trio'
    ),
    utils.makeSong(
      'Prelude in D Minor',
      '2023-02',
      192,
      sheetMusic = true
    ),
    utils.makeSong(
      'We Are',
      '2023-02',
      187,
      credits = [
        utils.makeCredit('Jordan', 'Lyrics'),
        utils.makeCredit('Nyxie Huitsing', 'Melody'),
        utils.makeCredit('Andrew Russell', 'Bass'),
        utils.makeCredit('Rowan Bartram', 'Harmony 1'),
        utils.makeCredit('Mary Dunsford', 'Harmony 2')
      ],
      description = 'The yearly harmony challenge, where the song is built up person by person.  The lyricist starts, then comes the melody, then each of the three harmony parts one by one.  This creates a fun collaboration challenge, resulting in songs and techniques you might not normally try.',
      lyrics = |||
				We are here, we're not gone
				For as long as we live on
				In your hearts and in your minds
				We're here all the time

				We are here when the flowers grow
				We are here when the west wind blows
				We are here when the leaves fall slow
				We are here in the winter snow

				We are the seasons
				(And when you're struggling, we urge you on)
				We come
				We go
				We shine, we rain, we thaw, we grow
				(And when you're thriving, we sit and watch)

				We're the sun that caresses your face
				We're the clouds when you need cool shade
				We're the stars if the dark night stains
				And we're the birds at the break of day

				We are the seasons
				(And when you're struggling, we urge you on)
				We come
				We go
				We shine, we rain, we thaw, we grow
				(And when you're thriving, we sit and watch)
				(And smile to ourselves)

				I'm the tapestry of colour, calling in summer, as the sun is in rise from spring
				I'm the gentlest breeze, providing relief, at the ocean on the warmest day
				I'm the solitary flower, growing with power, from a seed in the driest field
				I'm a delicate feather, that binds us together, when you need reminding of me

				We are here, we're not gone
				For as long as we live on
				In your hearts and in your minds
				We're here all the time

				We are the seasons
				(We've changed that's all)
				We come
				We go
				We shine, we rain, we thaw, we grow
				(We're here all the time)
      |||
    ),
		utils.makeSong(
			'I love my life',
			'2023-02',
			151,
			artist = 'Andrew Russell and Nadine de Macdeo',
			credits = [
        utils.makeCredit('Nadine de Macedo', 'Lyrics'),
        utils.makeCredit('Andrew Russell', 'Vocals, Guitar, Bass, Drums, Music, Shouts')
			],
			lyrics = |||
				[Verse]
				Rainy foggy Monday morn
				Worked until the crack of dawn
				Ate my breakfast in my car
				But I didn't come all that far
				Lost my head on filtered coffee
				Didn't work well I need some morphine
				Neon lights made me feel blind
				Train drove by left me behind

				[Pre-Chorus]
				All I know I came too late
				Otherwise I would not appreciate

				[Chorus]
				All in all I love my life
				All in all I love my life
				All in all I love my life
				All in all I love my life

				[Verse 2]
				Came to office in a rush
				My hair is wet my face is blushed
				Legs are trembling nerves will burst
				My boss said go kill your thirst
				Called me up to his bureau
				This is not a feeble hoax
				Love your daughter love your son
				Go see them we are done

				[Pre-Chorus]

				[Chorus]

				[Bridge]
				Twists and turns of misery
				Are an unsolved mystery

				[Chorus]
			|||
		),
		utils.makeSong(
			'Me and My Guitar - 6',
			'2023-02',
			276,
      description = 'Another entry in the "I pick up my guitar and play" series.  See [[album:fawm.fawm_2022|FAWM 2022]] for the start of this series.'
		),
    utils.makeSong(
      'I, Lover',
      '2023-02',
      69,
      artist = 'The Russell Family',
      sheetMusic = true,
      credits = [
        utils.makeCredit('Elsa Gidlow', 'Poem (lyrics)'),
        utils.makeCredit('Heather Russell', 'Music, Alto'),
        utils.makeCredit('Kristen Machina', 'Soprano'),
        utils.makeCredit('Andrew Russell', 'Tenor'),
        utils.makeCredit('Christopher Russell', 'Bass')
      ],
      lyrics = |||
        I shall never have any fear of love, 
        Not of its depth nor its uttermost height,
        Its exquisite pain and its terrible delight.
        I shall never have any fear of love.

        I shall never hesitate to go down
        Into the fastness of its abyss
        Nor shrink from the cruelty of its awful kiss.
        I shall never have any fear of love. 
      |||,
      description = 'The Russell Family gets choral.  The song is based on a poem by Elsa Gidlow, the first recorded openly Lesbian poet.'
    ),
    utils.makeSong(
      'Dying Fire',
      '2023-02',
      238
    ),
    utils.makeSong(
      'Impromptu 6',
      '2023-02',
      1215
    ),
    utils.makeSong(
      'Prelude in D Minor - Variations Highlights',
      '2023-02',
      908,
      credits = [
        utils.makeCredit('Andrew Russell', 'Original Music, Various Variations'),
        utils.makeCredit('Heather Russell', 'Various Variations'),
        utils.makeCredit('Christopher Russell', 'Various Variations')
      ],
      sections = [
        utils.makeSection(0, 'Heather Russell'),
        utils.makeSection(78, 'Andrew Russell'),
        utils.makeSection(287, 'Heather Russell'),
        utils.makeSection(370, 'Christopher Russell'),
        utils.makeSection(536, 'Heather Russell'),
        utils.makeSection(617, 'Christopher Russell'),
        utils.makeSection(701, 'Andrew Russell')
      ],
      description = 'This is the highlights of an hour of recording improv variations over [[song:fawm.fawm_2023.prelude_in_d_minor|Prelude in D Minor]].  For the full recording, see [[song:fawm.fawm_2023.prelude_in_d_minor_variations_full|here]].'
    ),
    utils.makeSong(
      'Prelude in D Minor - Variations Full',
      '2023-02',
      4484,
      credits = [
        utils.makeCredit('Andrew Russell', 'Original Music, Various Variations'),
        utils.makeCredit('Heather Russell', 'Various Variations'),
        utils.makeCredit('Christopher Russell', 'Various Variations')
      ],
      description = 'This is the full recording of improv variations over [[song:fawm.fawm_2023.prelude_in_d_minor|Prelude in D Minor]].  For the highlights recording, see [[song:fawm.fawm_2023.prelude_in_d_minor_variations_highlights|here]].'
    ),
  ],
  description = |||
    A fun FAWM, some decent jazz tunes, but most focus was on [[category:lavish_dude|Lavish Dude]]
  |||,
  external = 'http://fawm.org/@deadhead'
)

