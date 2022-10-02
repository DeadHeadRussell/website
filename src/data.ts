import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';

const staticUrl = process.env.NEXT_PUBLIC_STATIC_URL;

export interface Category {
  name: string;
  link: string;
  albums: Album[];
  album: Record<string, Album>;
}

export interface Album {
  id: string;
  name: string;
  link: string;
  date: string;
  tagline: string;
  art: string;
  archive: string;
  duration: number;
  songs: Song[];
  song: Record<string, Song>;
  description?: string;
  external?: string;
  category: Category;
  links: Record<string, {
    embedUrl: string;
    musicUrl: string;
    albumId: string;
  }>;
}

export interface Song {
  name: string;
  link: string;
  date: string;
  duration: number;
  credits: Credit[];
  video: boolean;
  sheetMusic: boolean;
  description?: string;
  lyrics?: string;
  external?: string;
  music: string;
  artist: string;
  fileName: string;
  sheetMusicLink: string | null;
  sections: Section[];
}

export interface Credit {
  who: string;
  role: string;
}

export interface Section {
  title: string;
  startTime: number;
}

export interface MenuAlbum {
  link: string;
  name: string;
  art: string;
}

export interface MenuCategory {
  link: string;
  name: string;
  albums: MenuAlbum[];
  Icon?: any;
}

export interface MenuData {
  categories: MenuCategory[];
}

export function createCategoryLink(category: string, file: string) {
  return `${staticUrl}/music/${category}/${file}`;
}

export function createAlbumLink(category: string, album: string, file: string) {
  return createCategoryLink(category, `${album}/${file}`);
}

export function createSongLink(category: string, album: string, song: string, ext: string) {
  return createAlbumLink(category, album, `songs/${song}.${ext}`);
}

function createMenuAlbum(album: Album): MenuAlbum {
  return {
    link: album.link,
    name: album.name,
    art: album.art
  };
}

function createMenuCategory(category: Category, includeAlbums: boolean, Icon: any = null): MenuCategory {
  return {
    link: category.link,
    name: category.name,
    Icon,
    albums: includeAlbums
      ? category.albums.map(createMenuAlbum)
      : []
  }
}

function createCategory(link: string, name: string, albums: Album[]): Category {
  const category: any = {link, name};
  category.albums = albums
      .map(album => ({
        ...album,
        art: createAlbumLink(category.link, album.link, 'art.jpg'),
        archive: createAlbumLink(category.link, album.link, 'archive.zip'),
        category
      }));
 
  category.album = category.albums
      .reduce((albumObj: any, album: Album) => {
        albumObj[album.link] = album;
        return albumObj;
      }, {} as any);

  category.albums.forEach((album: Album) => {
    if (album.songs) {
      album.songs = album.songs.map((song: Song) => {
        const extension = song.video ? 'mp4' : 'mp3';
        return {
          ...song,
          album,
          music: createSongLink(album.category.link, album.link, song.link, extension),
          sheetMusicLink: song.sheetMusic
            ? createSongLink(album.category.link, album.link, song.link, 'pdf')
            : null,
          fileName: `${song.name}.${extension}`
        };
      });

      album.song = album.songs
        .reduce((songObj: any, song: Song) => {
          songObj[song.link] = song;
          return songObj
        }, {} as any);

      album.duration = album.songs
        .map((song: Song) => song.duration)
        .reduce((total: number, duration: number) => total + duration, 0);
    } else {
      album.songs = [];
      album.song = {};
    }
  });

  return category as Category;
}

function createAlbum(link: string, name: string, date: string, tagline: string, description: string, other: any = {}): Album {
  return {
    link,
    name,
    date,
    tagline,
    description,
    links: other.links,
    external: other.external,
    songs: other.songs,
    duration: other.duration
  } as any as Album;
}

function createSong(name: string, date: string, duration: number, credits: Credit[], other: any = {}): Song {
  return {
    link: name.toLowerCase().replace(/[!@#$%^&*()-_+=,.'"<>?\\]/g, '').replace(/ +/g, '-'),
    name,
    date,
    duration,
    artist: 'Lavish Dude',
    credits,
    video: other.video || false,
    sheetMusic: other.sheetMusic,
    description: (other.description || '').split('\n').map((line: string) => line.trim()).join('\n'),
    lyrics: (other.lyrics || '').split('\n').map((line: string) => line.trim()).join('\n'),
    external: other.external,
    sections: []
  } as any as Song;
}

function createCredit(who: string, role: string): Credit {
  return {who, role};
}

export const categories: Record<string, Category> = {
  studio: createCategory('studio', 'Studio Albums', [
    createAlbum('leading-off', 'Leading Off', '2022-09', 'Lavish Dude\'s Debut Album', `
      In July 2022, Lavish Dude recorded their debut album, Leading Off, during a one-week stay at a lakeside cabin in Lake, Michigan. It was released on September 14. Leading Off draws influences from a wide variety of genres and distills them down into an acoustic-alternative base, with shades of folk, grunge, and jam, and the occasional flourish from jazz, classical, and fusion.
    `, {
      duration: 69*60,
      links: {
        'youtube-music': {
          albumId: 'OLAK5uy_nOMrPa2GTOm8f3SFgAg4EbcDKfWCR9Eu0',
          musicUrl: 'https://music.youtube.com/playlist?list=OLAK5uy_nOMrPa2GTOm8f3SFgAg4EbcDKfWCR9Eu0&feature=share',
          embedUrl: 'https://www.youtube.com/embed/videoseries?list=OLAK5uy_nOMrPa2GTOm8f3SFgAg4EbcDKfWCR9Eu0'
        },
        youtube: {
          albumId: 'OLAK5uy_mlnlTzKVd4ft3y0POOOdyO8VVnhLFbOhI',
          musicUrl: 'https://www.youtube.com/watch?v=SUsaYuoVMzc&list=OLAK5uy_mlnlTzKVd4ft3y0POOOdyO8VVnhLFbOhI',
          embedUrl: 'https://www.youtube.com/embed/videoseries?list=OLAK5uy_mlnlTzKVd4ft3y0POOOdyO8VVnhLFbOhI'
        },
        spotify: {
          albumId: '0d6Z8IrToilY7XWRaqgOCZ',
          musicUrl: 'https://open.spotify.com/album/0d6Z8IrToilY7XWRaqgOCZ',
          embedUrl: 'https://open.spotify.com/embed/album/0d6Z8IrToilY7XWRaqgOCZ?utm_source=generator' 
        },
        apple: {
          albumId: '1645221927',
          musicUrl: 'https://music.apple.com/us/album/leading-off/1645221927?uo=4&app=music&at=1001lry3&ct=dashboard',
          embedUrl: 'https://embed.music.apple.com/us/album/leading-off/1645221927'
        },
        amazon: {
          albumId: 'B0BFCSDY51',
          musicUrl: 'https://music.amazon.ca/albums/B0BFCSDY51',
          embedUrl: 'https://music.amazon.ca/embed/B0BFCSDY51/?id=IGXxoj1MaL&marketplaceId=ART4WZ8MWBX2Y&musicTerritory=CA',
        }
      }
    })
  ]),
  demos: createCategory('demos', 'Demos', [
    createAlbum('fawm-2022', 'FAWM 2022', '2022-02', 'LAVISH DUDE', `
      [[category:demos|Lavish Dude]] is myself and Sean Brennan sometimes writing ok music. Songs are all demos written during FAWM.
    `, {
      songs: [
        createSong(
          'Magic',
          '2022-02',
          234,
          [
            createCredit('Andrew Russell', 'Vocals, Guitar'),
            createCredit('Sean Brennan', 'Vocals, Viola, Bass, Cajon, Music, Lyrics')
          ],
          {
            lyrics: `
              [Verse 1]
              I look out my window and see
              A hazy figure beckoning to me
              It grows closer and I start to realize
              There's no danger, there's kindness in its eyes

              [Pre-Chorus]
              I think it's time to open my door
              And I don't know what I was waiting for

              [Chorus]
              There's magic in the air
              There's magic everywhere
              It swirls and spins all around me

              [Verse 2]
              I look back at my closet and smile
              Those skeletons will be there a while
              I don't need to be trapped by these bones
              I can dance to the world's dulcet tones

              [Pre-Chorus]
              [Chorus]

              [Bridge]
              I can't be trapped anymore
              I won't go back anymore
              Anymore

              [Chorus x2]
            `
          }
        ),
        createSong(
          'You and Me',
          '2022-02',
          269,
          [
            createCredit('Andrew Russell', 'Vocals, Guitar, Music, Lyrics'),
            createCredit('Sean Brennan', 'Vocals, Bass, Cajon, Spoken Part, Music')
          ],
          {
            lyrics: `
              Saturday morning
              The sun reaching to my eyes
              And what will I find
              When I open them
              Will I see
              You

              Laying there beside me
              Arms reaching out
              Or will I be without
              I never know
              That's what you do to
              Me

              Every day's a surprise
              I never know if I'll find
              You there
              Spending time with me

              If there's one thing I could change
              It would be you and me
              And how much time we spent together

              Searching in the morning
              Searching in the afternoon
              Searching in the evening
              Searching under the moon
              Searching for you

              (searching in the morning)
              You walk through that door (searching in the afternoon)
              Don't even say a thing
              Not even a smile (searching in the evening)
              Nothing I can latch right on to
              Nothing I can trust (searching under the moon)
              To change
              Us

              [Solo]

              If there's one thing I could change
              It would be you and me
              And how much time we spent together

              If there's something I could say
              It would come out of my heart
              The problem is I don't know where to start

              Searching in the morning
              (If there's one thing I could change)
              Searching in the afternoon
              (If there's something I could say)
              Searching in the evening
              (If there's nothing I can do)
              Searching under the moon
              (To be there with)
              Searching for
              You
            `
          }
        ),
        createSong(
          'Open Up',
          '2022-02',
          265,
          [
            createCredit('Andrew Russell', 'Vocals, Guitar, Music, Lyrics'),
            createCredit('Sean Brennan', 'Vocals, Viola, Lyrics')
          ],
          {
            lyrics: `
              [Verse 1]
              Breathe in
              The air may sting but you can feel
              The pain is there, but at least it's real
              The wound is fresh, but wounds will heal
              Eventually

              Breathe out
              Relax and let the tension fade
              Try to come to your own aid
              No need to swim when you can wade
              To carry on

              [Pre-Chorus]
              Heroes never earn their name
              For the pain they hold inside
              Let it out, look up ahead
              And find the strength
              To keep moving on

              [Chorus]
              Open up
              Spread your wings and take the skies
              You already know, now realize

              [Verse 2]
              Failure
              Failure is a healing word
              But only when you make it heard
              Without the first time, there's no third
              And that's the charm

              Sometimes
              You push until you feel the strain
              Lie a moment and feel the pain
              The way to learn is to try again
              And carry on

              [Pre-Chorus]

              [Chorus]

              [Instrumental over V, P-C and C]

              [Pre-Chorus]

              [Chorus]
            `
          }
        ),
        createSong(
          'Adam\'s Rib',
          '2022-02',
          325,
          [
            createCredit('Andrew Russell', 'Guitar, Spoken Part, Music'),
            createCredit('Sean Brennan', 'Vocals, Piano, Music, Lyrics')
          ],
          {
            lyrics: `
              [Verse 1]
              Listen up, I have something to say
              I want you to hear me and know that it's true
              It's something to change your life today
              And if you believe me, then shame on you

              [Chorus]
              We're nothing but apes that know how to lie
              We can shatter a nation with a fib
              If I could give Adam some advice
              I'd tell him to hold onto his rib

              [Verse 2]
              When I was young, my daddy told me
              He told me the future was shiny and bright
              Well, either he's wrong, or maybe he fooled me
              But the face on the clock is a dark, stormy night

              [Chorus]

              [Verse 3]
              If I could ask Adam anything
              It's what in the hell did he want to know?
              What would forbidden knowledge bring?
              Where else did he think that we would go?

              [Chorus]
              We're nothing but apes that know how to lie
              We can shatter a nation with one little fib
              If I could give Adam some advice
              I'd tell him to hold on

              [Outro]
              We're in hell y'all
              And hell...
              Is other people.
            `
          }
        ),
        createSong(
          'Lavender Gardens',
          '2022-02',
          227,
          [
            createCredit('Andrew Russell', 'Piano, Music'),
            createCredit('Sean Brennan', 'Vocals, Cajon, Music, Lyrics')
          ],
          {
            lyrics: `
              Lavender gardens
              Extend to infinity beyond the horizon
              Late summer blooms
              They'll all be consumed
              They glow in the deep crimson sunset
              Deep beauty unmet
              Lavender gardens

              Thunder and lightning
              Extinguish the burning of a deep summer passion
              Warnings were stark
              The thoughts all grow dark
              The mind that has nothing to burn through
              Always returns to
              Lavender gardens

              Winter is coming
              A blanket of gray descends around the horizon
              Snow starts to fall
              It covers us all
              The winds grow so harsh as to freeze them
              Nobody sees them
              Lavender gardens
            `,
            description: 'Counting to 9 in 7/8 is hard'
          }
        ),
        createSong(
          'Prayer for Mankind',
          '2022-02',
          280,
          [
            createCredit('Andrew Russell', 'Vocals, Guitar, Music'),
            createCredit('Sean Brennan', 'Viola, Lyrics')
          ],
          {
            lyrics: `
              [Verse 1]
              For all the sounds that rage in disarray,
              The silence is the loudest of it all.
              The ancient trees have never seemed so tall,
              As when they have been felled and cleared away.

              [Chorus]
              There is no other pain that we may know
              Like listless longing wrought by loss of love.
              And though we cry for comfort from above,
              We burn with inner embers from below.
              Like listless longing wrought by loss of love.
              And though we cry for comfort from above,
              We burn with inner embers from below.
              There is no other pain that we may know

              [Verse 2]
              As solace in our fellow man now fades,
              I pray we rediscover what is just.
              And when the last of us has turned to dust,
              Show mercy on us for the mark we made.

              [Chorus]

              [Bridge]
              How strange, the way we treat what we hold dear:
              We notice it the most when it's not here.

              [Chorus]
            `
          }
        ),
        createSong(
          'Subterranean Pomeranians',
          '2022-02',
          58,
          [
            createCredit('Andrew Russell', 'Synths'),
            createCredit('Sean Brennan', 'Music')
          ],
          {description: 'We unfortunately didn\'t have time during FAWM to record this properly so we synthed with MIDI intead.'}
        ),
        createSong(
          'Symbols',
          '2022-02',
          242,
          [
            createCredit('Andrew Russell', 'Guitar, Music'),
            createCredit('Sean Brennan', 'Vocals, Viola, Music, Lyrics')
          ],
          {
            lyrics: `
              [Verse 1]
              Thoughts and prayers
              The currency of cowards
              A magic incantation
              To spare the meditation
              That would lead to agitation

              Thoughts and prayers
              The avatar of actors
              The place the work begins
              But if you're born to means
              Then they're the destination

              [Chorus]
              For all your pious reverence
              Your performative dignity
              Your furrowed brow, your stoic silence
              Did you ever try doing something?

              Grave concern
              The battle cry of bystanders
              A gavel by the norm
              To protect them from reform
              With a veil of civility

              Grave concern
              A substitute for scruple
              Values, said with tact
              For those who lack the will to act
              And with the optics of humility

              [Chorus]
            `
          }
        ),
        createSong(
          'Mountains',
          '2022-02',
          198,
          [
            createCredit('Andrew Russell', 'Vocals, Guitar, Music, Lyrics'),
            createCredit('Sean Brennan', 'Viola, Cajon')
          ],
          {
            lyrics: `
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
            `
          }
        ),
        createSong(
          'Bossa Teresa',
          '2022-02',
          286,
          [
            createCredit('Andrew Russell', 'Piano, Music'),
            createCredit('Sean Brennan', 'Vocals, Bass, Cajon, Music, Lyrics')
          ],
          {
            lyrics: `
              Long after the sun has left the sky
              When the streetlights blossom into view
              And the city serenades the restless denizens of darkness
              My mind and my heart come to rest on you

              The cafés draw their doors 'til tomorrow
              A sleepy silence fills the air
              Sleep softly now and let your dreams be filled with endless peace
              Tomorrow my love will still be there

              I'd climb a hundred thousand mountains
              Just to reach your fifth-story door
              So many stories left to write
              You're the only one I want to write them for

              And when the morning light returns
              The waking city starts to see
              Through the buzzing crowds and city sounds and avenues of adventure
              Wherever you need me, that's where I'll be
            `
          }
        ),
        createSong(
          'Vivid Portraits',
          '2022-02',
          257,
          [
            createCredit('Andrew Russell', 'Vocals, Guitar, Music, Lyrics'),
            createCredit('Sean Brennan', 'Viola, Lyrics')
          ],
          {
            lyrics: `
              The world around me is spinning
              Faster than I can keep up
              I'm turning backwards
              Late, never there

              Gone

              When I look forward
              There's a fog on everything
              When I look back
              It's crystal clear

              Vivid portraits
              Chances I missed

              Seconds ticking on my wrist
              Seconds ticking off my time
              So much left I want to witness
              If I could just lay here, that'd be fine

              Sleep

              And these are still
              My good old days
              But I'm just getting
              Good and old

              I
              Cannot
              Anticipate
              What did I think
              I was doing here
              What did I think I was doing here?

              The fog is growing deeper
              Darker than my eyes can see
              I'm walking in my shadow
              I'm not who I used to be

              Who am I to say that I belong here

              My clock has stopped turning
              Nothing more for me to see
              I'm laying in my shadow
              Take me

              I'm turning off
              Take me
              Back to where I was
              Before
            `
          }
        ),
        createSong(
          'Enough',
          '2022-02',
          308,
          [
            createCredit('Andrew Russell', 'Guitar, Music'),
            createCredit('Sean Brennan', 'Vocals, Viola, Cajon, Music, Lyrics')
          ],
          {
            lyrics: `
              I hear a steady little drip, drip, drip
              Never stopping as I bleed, bleed, bleed
              All my energy and sympathy
              I know you're always gonna take, take, take
              And like a fool I'm gonna give, give, give
              'Cause I'm a faucet with a leaky flow
              I only hope I can fulfill, fill, fill
              Your every need until your cup, cup, cup
              Runneth over and you'll pour just like you said
              Or maybe that was just a lie

              I feel a tiny little tap, tap, tap
              Gonna chisel me away, way, way
              As I crumble to the ground before my sculptor
              Slap some makeup on my face, face, face
              And maybe cover me in paint, paint, paint
              From the palette of a Stockholm Syndrome artist
              I'm a canvas for your heart, heart, heart
              Only costing me my soul, soul, soul
              The one you said that you would share with me one day
              But maybe that will never come

              I gave everything, then that wasn't enough
              I showed my hand, I never called your bluff
              I reached the sky for you, then the bar raised up again
              I nearly died for you, it just wasn't gonna be enough
            `
          }
        ),
        createSong(
          'Dona Nobis Pacem',
          '2022-02',
          217,
          [
            createCredit('Andrew Russell', 'Guitar, Bass, Music'),
            createCredit('Sean Brennan', 'Vocals, Viola, Music')
          ],
          {
            lyrics: 'Dona Nobis Pacem',
            description: '#Ukraine'
          }
        ),
        createSong(
          'Tuesday is the Thursday of Wednesdays',
          '2022-02',
          425,
          [
            createCredit('Andrew Russell', 'Guitar, Music'),
            createCredit('Sean Brennan', 'Viola, Music')
          ],
          {
            description: `
              Okay, so there's a lot to explain this time around. First, the song composition:

              Starting in FAWM 2019, we decided to have some sort of game, or extra-musical inspiration, turn into a jam to force us out of our comfort zones. 2019 brought us "Universal Serial Blues," a jam using the chimes for connecting and removing a USB device as the start of a jam progression. In 2021, we had "Telephone," wherein we took turns adding to a project, leaving the other guy to figure out where it had to go (and then could go) harmonically. We felt that gave us too much control... so this year, we came up with a form of pre-compositional randomness inspired *vaguely* by the twelve-tone matrix. We played a round of the classic children's game "Dots and Boxes." Whoever closed a box got to put the name of a chord in that box. We ended up with this:

              [[song_img:grid.png]]

              We played by the same rules as "Telephone," but this time, had to select an entire row or column (forwards or backwards) at a time for a given section of music. As you see, not everything was exactly a natural fit.

              Now, the title: I teach middle and high school students. Adolescents say the darnedest things. We were trading analogies and life wisdom before class one day, and one kid *really* wanted to contribute some sort of profundity. We had come to some conclusion like "the Beatles were the Beethoven of rock," which by the way has a ton of merit - a distinct early, middle, and late period, pioneering an entire era of straying from predictable and orderly form... and so this kid just out of the blue blurts, "Tuesday... is the... Thursday... of Wednesdays." After laughter to the point of tears, I couldn't help but keep that around. (He was a good sport!)

              This started off all normal like but of course we couldn't help but get weird in the middle. Some neat riffs, cool grooves and all around fun times. And of course, you can't expect a band called Lavish Dude to take such an activity seriously for long.
            `
          }
        )
      ],
      external: 'https://fawm.org/fawmers/lavishdude'
    }),
    createAlbum('fawm-2021', 'FAWM 2021', '2021-02', 'LAVISH DUDE', `
      [[category:demos|Lavish Dude]] is myself and Sean Brennan kicking ass. Songs are all demos written during FAWM.
    `, {
      songs: [
        createSong(
          'Eye Opener',
          '2021-02',
          102,
          [
            createCredit('Andrew Russell', 'Guitar, Music'),
            createCredit('Sean Brennan', 'Viola')
          ]
        ),
        createSong(
          'Seasonal Lies',
          '2021-02',
          217,
          [
            createCredit('Andrew Russell', 'Vocals, Guitar, Music, Lyrics'),
            createCredit('Sean Brennan', 'Piano')
          ],
          {
            lyrics:  `
              The seasons have run away
              The seasons have run away
              The seasons have run away
              The seasons have run away

              The summer has stolen my face
              The summer has stolen my face
              The summer has stolen my face
              The summer has stolen my face

              The fall has revealed your lies
              The fall has revealed your lies
              The fall has revealed your lies
              The fall has revealed your lies

              How will I warm to the winter
              How will I warm to the winter
              How will I warm to the winter
              How will I warm to the winter

              The spring has made me reborn
              It broke off what was sworn
              The spring has made it all end
              The spring has made it all end
              The spring has made it begin again
              The spring has made it begin again
              The spring has made it begin again
              The spring has made it begin again
            `
          }
        ),
        createSong(
          'Can\'t Count',
          '2021-02',
          300,
          [
            createCredit('Andrew Russell', 'Vocals, Guitar, Music, Lyrics'),
            createCredit('Sean Brennan', 'Vocals, Bass'),
          ],
          {
            lyrics:  `
              [Verse 1]
              In the day I stop and watch the skies above
              Ten stormy clouds
              In the day I stop and watch the ground below
              Nine muddy hills

              In the distance I hear
              Hear the cracking of the thunder
              Eight cracks before I run away
              From the sound

              [Chorus]
              (Can't count) I can't count the numbers
              (Can't count) I can't count the numbers
              (Can't count) I can't count the numbers
              Too high
              (Can't count) I can't count the numbers
              (Can't count) I can't count the numbers
              (Can't count) I can't count the numbers
              Too high

              [Verse 2]
              In my day I couldn't stop the breaking of me
              Seven chances missed
              In my day I couldn't stop from losing control
              Six years I miss

              In my memories I see
              See it happen all again
              Five words that she said
              To end

              [Chorus]

              [Bridge 1]
              Counting up my pain
              Counting you away
              Discounting what we did before
              My mind's become poor

              [Bridge 2]
              I've been living all my life
              Recounting all of my pain
              Four days until I go
              Three years too slow

              I can't take this any more
              It's been knocking at my door
              Two days until I go
              One line in the snow
              No more

              [Chorus]
            `
          }
        ),
        createSong(
          'Frozen Lake',
          '2021-02',
          209,
          [
            createCredit('Sean Brennan', 'Vocals, Viola, Music, Lyrics'),
            createCredit('Andrew Russell', 'Guitar')
          ],
          {
            lyrics:  `
              Sometimes I'm haunted by the ghosts of a stormy past
              I don't know who I am and the world is spinning fast
              Spectres surround me; darkness has found me
              I look in their eyes and see my own face

              I walk on a frozen lake beneath a sunlit sky
              I rest on the surface and let the day pass me by
              The ice grows thin, and I fall in
              The water consumes me whole; it leaves no trace

              Sometimes I can't recall my ghosts or feel my past
              I pray that the last time that they came was their last
              I can breathe freely, but I know they see me

              Sometimes I'm trapped by murky visions of loneliest death
              I call out in vain, like Anna Bolena or Lady Macbeth
              Nothing is real, except how it feels
              I want to abandon this wretched place
            `
          }
        ),
        createSong(
          'Whisper of the Streets',
          '2021-02',
          225,
          [
            createCredit('Andrew Russell', 'Vocals, Guitar, Music, Lyrics'),
            createCredit('Sean Brennan', 'Vocals, Viola')
          ],
          {
            lyrics:  `
              [V1]
              Morning whispers come through my window
              Listening is how I see
              I hear the footsteps of a stranger
              Walking along the streets
              Listen to the footsteps
              Walking along the streets

              [V2]
              The whispers continue through the afternoon
              The sounds never cease
              The distant murmur is overwhelmed
              By the whispers of the streets
              Listen to the murmur
              Tell me what do they see

              [Bridge]
              I hear the whispers through the day
              They tell of all they see.
              Listen to the whispers of the
              Morning, evening, afternoon

              [Jam]

              [V3]
              Evening comes and they don't stop
              The streets they never sleep
              Listen to the whispers
              Listen to the whispers

              [Outro]
              Listen to the whisper of the streets
              Telling of the people that they meet.
            `
          }
        ),
        createSong(
          'Succession',
          '2021-02',
          178,
          [
            createCredit('Andrew Russell', 'Guitar, Music'),
            createCredit('Sean Brennan', 'Viola')
          ]
        ),
        createSong(
          'Personal Pagliacci',
          '2021-02',
          202,
          [
            createCredit('Sean Brennan', 'Vocals, Viola, Bass, Music, Lyrics'),
            createCredit('Andrew Russell', 'Guitar')
          ],
          {
            lyrics:  `
              Welcome to the darkness, stranger
              Let me be your personal guide
              It stifles all your joy and anger
              And angst and ennui coincide
              I don't know if this is your first time
              And I can't tell which way you'll go
              But let me walk you one more step
              I see more clearly from down below

              Clouds will gather, storms will rage
              Without a reason and nothing rhymes
              We're all our own personal Pagliacci
              And all you can do is laugh sometimes

              Settle down and get your bearings
              Floating along this River Styx
              Don't dress up that grief you're wearing,
              You can talk it away, but nothing sticks
              Sometimes there are sandy shores
              It might feel good to warm your feet
              But something comes, and then something more
              So grieve, then breathe, and rinse, repeat
            `
          }
        ),
        createSong(
          'Rose Garden',
          '2021-02',
          272,
          [
            createCredit('Andrew Russell', 'Piano, Drums, Music'),
            createCredit('Sean Brennan', 'Viola, Bass')
          ]
        ),
        createSong(
          'Cracked Aces',
          '2021-02',
          298,
          [
            createCredit('Sean Brennan', 'Vocals, Viola, Music, Lyrics'),
            createCredit('Andrew Russell', 'Guitar, Piano')
          ],
          {
            lyrics:  `
              [Verse 1]
              They say that love is a battlefield
              But I say it's more like a card table
              Go in blindly chasing hearts
              Grab what you can and get out if you're able
              And keep your hand tight when you swipe right
              You never know when you'll get a taker
              Who raises, and raises, and C-bets too
              They care about the pot and not what happens to you

              [Chorus]
              I took a gamble calling you
              Tried to bluff, but you saw right through
              Thought I was going places at the start
              But then you cracked my aces and my heart

              [Verse 2]
              So picture this: I get my deal
              Our eyes connect and I place my bet
              There's something in the air I feel
              I break a smile and then I break a sweat
              I'm nervously folding, I've forgotten my plans
              'Cause I'm dreaming of holding her delicate hands
              And just as I'm sure we'll make a consummate pair
              She takes me to the river and she buries me there

              [Verse 3]
              I know why some folks just don't play
              They keep their cards glued tight to their chest
              You might not fight another day
              When someone crushes you at your best
              So keep your hand tight when you swipe right
              You never know when you'll get a taker
              Who raises and raises and C-bets too
              They care about the pot and not what happens to you
            `
          }
        ),
        createSong(
          'Forget What You Mean',
          '2021-02',
          252,
          [
            createCredit('Andrew Russell', 'Vocals, Guitar, Music, Lyrics'),
            createCredit('Sean Brennan', 'Vocals, Viola')
          ],
          {
            lyrics:  `
              [Verse]
              I see greener fields
              Over there beyond the sea
              If I can find a ship to sail
              I can forget what you mean

              I am blocked and grounded
              Oh and I am stuck by me
              If I can get over myself
              I can forget what you mean

              [Verse]
              The path behind leads from shadoes
              Ahead is just a deam
              If I can find someone to wake me
              I can forget what you mean

              I am tired and drowsy here
              And I am stuck in sleep
              If I can wake up myself
              I can forget what you mean

              [Bridge]
              Standing at the edge of the steep
              Staring out over the sea
              I cannot find the
              Way past the
              End of you

              [Verse-ish]
              I see greener fields
              Over there beyond the sea
              Until I find anyone
              All I see is a dream

              [Outro]
              When I find peace within then
              I can forget what you mean
            `
          }
        ),
        createSong(
          'Telephone',
          '2021-02',
          258,
          [
            createCredit('Sean Brennan', 'Viola'),
            createCredit('Andrew Russell', 'Guitar')
          ]
        ),
      ],
      external: 'https://fawm.org/fawmers/lavishdude'
    }),
    createAlbum('fawm-2019', 'FAWM 2019', '2019-02-08 - 2019-02-10', 'LAVISH DUDE', `
      [[category:demos|Lavish Dude]] is myself and Sean Brennan kicking ass over a weekend during FAWM.  36 hours.  11 songs.  1hr of rocking out.
    `, {
      songs: [
        createSong(
          'Falling Down',
          '2019-02',
          179,
          [
            createCredit('Andrew Russell', 'Vocals, Guitar, Bass Guitar, Drums, Music, Lyrics'),
            createCredit('Sean Brennan', 'Viola')
          ],
          {
            lyrics:  `
              [Verse 1]
              I'm awake but in my mind
              I am falling down
              Falling to the ground

              I'm awake but in my mind
              I am falling down
              Falling right down

              Whenever the stars come out
              Walking along the water
              Whenever the stars come out
              Oh I think about falling down

              [Verse 2]
              I'm asleep but in my eyes
              The sun is bright
              The sun is real bright

              I'm asleep but in my eyes
              The sun is bright
              Shining real bright

              The moon begins to fade
              I lay to rest in my home
              Oh the moon begins to fade
              And the sun starts shining in my eyes

              [Verse 3]
              The sun goes down and I arrive
              I arrive at work
              Another late night

              The sun goes down and I arrive
              I arrive at work
              Working late nights

              Whenever the stars come out
              Walking along the water
              Whenever the stars come out
              I think about falling down
              Yeah I think about falling down
              Oh I think about falling down
              Oh I think about falling down
            `
          }
        ),
        createSong(
          'Escape',
          '2019-02',
          390,
          [
            createCredit('Sean Brennan', 'Vocals, Viola, Drums, Music, Lyrics'),
            createCredit('Andrew Russell', 'Guitars, Bass Guitar, Drums, Music')
          ],
          {
            lyrics:  `
              [Verse 1]
              I'm surrounded by thieves and leeches and scum
              I have brought this on myself
              I am least removed from the comforts and values of home
              And now I live and breathe in stealth
              I'm distracted by lust and by avarice and sloth
              I'm witnessing and hold my tongue
              Strangers profit by my poorly guarded heart and treasure
              It seems my death bell has rung
              I want to escape to the sky

              [Verse 2]
              They rebuff and counter every bit of grace I offer
              Only conquest never trade
              And any sentiment is cast aside
              Any debt will go unpaid
              And I lie restless while the bastards gently slumber
              In the bed that I have made
              I want to escape, want to fly

              [Chorus]
              Gonna escape now, gonna escape
              Gonna escape now, gonna escape
              Gonna escape now, gonna escape
              Gonna escape now, yeah yeah
              I'm going to escape, going to fly

              [Verse 3]
              There may never be a greener pasture
              My next haven may not be safe
              I will leave, I will be searching
              I'm out of time to wait
              I'm going to escape, gonna try
            `
          }
        ),
        createSong(
          'I\'m Back',
          '2019-02',
          230,
          [
            createCredit('Sean Brennan', 'Vocals, Viola, Music, Lyrics'),
            createCredit('Andrew Russell', 'Guitars')
          ],
          {
            lyrics:  `
              [Verse 1]
              I am back
              From a valley of helpless self implosion
              And I can breathe
              I am riding the wave of a body in motion
              I can taste
              Of the nectar of self determination
              And I am free
              Of the specter of all my dark fixations

              And waves of terror wash over me
              But they will carry me to shore

              [Verse 2]
              I am safe
              From the perils of demons of my making
              And I'm alive
              And nothing is free but its there for taking
              Night falls
              But I know that a light is shining somewhere
              Day breaks
              And I know that I can find it somewhere

              Rays of hope illuminate me
              And they light my way

              [Bridge]
              Waves of terror wash over me
              They will carry me to shore

              [Outro]
              I am back
              I am back
              I'm back
            `
          }
        ),
        createSong(
          'Ulterior Motives',
          '2019-02',
          215,
          [
            createCredit('Sean Brennan', 'Vocals, Drums, Music, Lyrics'),
            createCredit('Andrew Russell', 'Guitars, Bass Guitar, Drums, Music')
          ],
          {
            lyrics:  `
              [Verse 1]
              You got that look in your eye
              Like there's something you want
              Something you've gotta get
              You got that look in your eye
              Like you think that I want it too
              But I just don't know it yet

              I've got that nasty feeling
              I'm on fire and I'm just holding on

              You've got that look in your eye
              Like the second you get it you're gone

              [Chorus]
              Please understand why I'm so pensive
              Ulterior motives will outlive what I can give
              Pretty soon I'll have nowhere to go
              Quid pro quo is going to overflow the status quo

              [Verse 2]
              You've got that devious smile
              Like you know that I'm trapped
              That I'm right where you want me
              You've got that devious smile
              Like you already won
              And you're flaunting your victory

              I've got that trapped mentality
              I can't leave or I'm the villain

              But you've got that devious smile
              Like I don't even know you
              When I'm taking it on the chin

              [Chorus]
            `
          }
        ),
        createSong(
          'Precious Bean',
          '2019-02',
          301,
          [
            createCredit('Sean Brennan', 'Vocals, Viola, Music, Lyrics'),
            createCredit('Andrew Russell', 'Guitars')
          ],
          {
            lyrics:  `
              [Verse 1]
              I may be concious
              But I'm a lumbering fool
              I may have decisions to make
              But I blindly follow my rule

              Eyes are glazed
              And my mind is slow
              Jaw hinge slack
              I need something to make me go go go

              [Pre-Chorus]
              Somethings always there for me
              To replenish my energy
              Could be gentle, could be bold
              It's all worth its weight in gold
              
              [Chorus]
              It's my precious bean
              It helps me get through my day
              I will make a scene
              For my precious bean

              [Verse 2]
              I may be weary
              But know to keep my chin up
              When life beats my down
              I can latch on to another cup

              Eyes are white
              And the world is a colourful song
              Coming alive
              I know it won't be long long long

              [Pre-Chorus]

              [Chorus]
              It's my precious bean
              From my precious café
              I will make a scene
              For my precious bean

              [Pre-Chorus]

              [Chorus]

              It's my precious bean
              Might make my hair turn grey
              I may make a scene
              For my precious bean
              I will make a scene
              For my precious bean
            `
          }
        ),
        createSong(
          'Lost at Sea',
          '2019-02',
          142,
          [
            createCredit('Sean Brennan', 'Vocals, Viola, Music, Lyrics'),
            createCredit('Andrew Russell', 'Guitars')
          ],
          {
            lyrics:  `
              [Verse 1]
              Lift your gaze above water
              You've been burying your head beneath sand
              There's a wind blowing in then
              It won't always be dry where we stand

              There are clouds in the twilight
              But the deep crimson sun beams shine through
              I could say that we're calming now
              But I don't know my words would be true

              [Chorus]
              You're just like the ocean
              I'm drawn by my fear
              Here we are sailing free
              A tumultuous sea you and me

              [Verse 2]
              Don't be surprised that we're stranded
              You were the one that changed course
              Don't flinch at the rising gale
              You can reach hurricane force

              [Chorus]

              [Bridge]
              Ride the waves
              Ride the waves

              [Chorus]
            `
          }
        ),
        createSong(
          'In My Way',
          '2019-02',
          441,
          [
            createCredit('Andrew Russell', 'Vocals, Guitars, Bass Guitar, Drums, Music, Lyrics'),
            createCredit('Sean Brennan', 'Viola')
          ],
          {
            lyrics:  `
              Oh I am in disarray
              And I am stuck today
              But why must it be this way
              And why can't I stop getting in my way
              I am always getting in my way
            `
          }
        ),
        createSong(
          'It Was You',
          '2019-02',
          275,
          [
            createCredit('Sean Brennan', 'Vocals, Viola, Lyrics'),
            createCredit('Andrew Russell', 'Guitars, Music')
          ],
          {
            lyrics:  `
              [Verse 1]
              I just had an epiphany
              I just solved a mystery
              Where my joy and my passion went
              Where my life and my time was spent
              I inspected the scene of a crime
              Put together the clues
              Realized I'm the victim here
              And the culprit was you
              And the culprit was you

              [Verse 2]
              Going through my conversion
              Done with toxic immersion
              Placing faith in a better place
              Seeking love from another face
              I will walk with my head held high
              I will reap what is due
              Don't pretend that you don't know why
              It wasn't me it was you
              It wasn't me it was you

              [Bridge]
              I will walk with my head held high
              I will reap what is due
              Don't pretend that you don't know why
              I wasn't me it was you
            `
          }
        ),
        createSong(
          'Getting out of a Funk',
          '2019-02',
          392,
          [
            createCredit('Sean Brennan', 'Vocals, Viola, Music, Lyrics'),
            createCredit('Andrew Russell', 'Vocals, Guitars')
          ],
          {
            lyrics:  `
              [Verse 1]
              I don't like myself
              But I will
              I don't trust myself
              But I will
              I don't respect myself
              But I will
              I don't respect myself
              But I will

              I'm getting out of a funk
              I'm getting out of a funk
              I'm getting out of a funk
              I'm getting out of a funk

              [Verse 2]
              I'm restless
              But I can change
              I'm scattered
              But I can change
              I'm flawed
              But I can change
              I'm flawed
              But I can change

              I'm getting out of a funk
              I'm getting out of a funk
              I'm getting out of a funk
              I'm getting out of a funk

              [Verse 3]
              I want to change
              And I will
              I want to win
              And I will
              I want to succeed
              And I will
              I want to succeed
              And I will

              I'm getting out of a funk
              I'm getting out of a funk
              I'm getting out of a funk
              I'm getting out of a funk
            `
          }
        ),
        createSong(
          'Lifting Me Away',
          '2019-02',
          322,
          [
            createCredit('Sean Brennan', 'Vocals, Lyrics'),
            createCredit('Andrew Russell', 'Vocals, Guitars, Organ, Bass Guitar, Drums, Music')
          ],
          {
            lyrics:  `
              [Verse 1]
              I've dropped my last defense
              The past is laid to bed
              Feel like I've lost my sense
              But wisdom hides in chestnut eyes

              It's like a wound has healed
              Safe from the things I've said
              Not even sure what's real
              But truth is there in auburn hair
              
              [Chorus]
              Something beautiful is starting out
              I'm going places I've never been
              Something overwhelming
              Is lifting me away from here
              Far away from all of my jealous fears

              [Verse 2]
              I want to be my best
              That's what you've done to me
              I'm totally obsessed
              It's like I'm trapped but also free

              [Chorus]

              [Outro]
              I will protect you
              I will cherish you
              I'm giving you all I have to give
              I'm giving you all I have to give
            `
          }
        ),
        createSong(
          'Universal Serial Blues',
          '2019-02',
          298,
          [
            createCredit('Sean Brennan', 'Viola'),
            createCredit('Andrew Russell', 'Guitars'),
            createCredit('Windows Sound Design Team', 'Music')
          ]
        ),
      ],
      external: 'https://fawm.org/fawmers/lavishdude'
    })
  ])
};

export const menu: MenuData = {
  categories: [
    createMenuCategory(categories.studio, true),
    createMenuCategory(categories.demos, false, LibraryMusicIcon)
  ]
};

