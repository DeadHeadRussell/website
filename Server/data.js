var fs = require('fs');
var data = {};

exports.getData = function(callback) {
    fs.readFile('../Client/resumes/' + data.resumes[0].path + '_part.html', 'ascii', function(error, fdata) {
        if(error) {
            callback(null);
        } else {
            data.resumes[0].data = fdata;
            callback(data);
        }
    });
};

data.about = {
    name: 'Andrew Russell',
    title: 'Musician and Software Engineering Student'
};

data.intro = 'Feel free to have a look around.';

data.contact = {
    email: 'deadhead.russell@gmail.com'
};

data.sites = [
  {
    name: 'West Coast Drinking Expedition',
    link: 'http://wcdrinkingexpedition.ajrussell.ca',
    desc: 'Blog that details the West Coast Drinking Expedition I attended'
  },
  {
    name: 'Baryons for Breakfast',
    link: 'http://baryonsforbreakfast.wordpress.com',
    desc: 'My sister\'s delicious cooking blog'
  },
  {
    name: 'Stephan Pastis\'s Blog',
    link: 'http://stephanpastis.wordpress.com',
    desc: 'Personal blog of the creator of the syndicated comic \'Pearls Before Swine\'.'
  }
];

data.artists = [
    {
        name: 'Solo Works',
        start: '1990-07-21',
        description: 'My own solo endevours. From solo live vocal/ guitar performances to full band studio recordings, most of my musical endevours have been solo efforts.',
        albums: [
            {
                name: 'YouTube',
                description: 'Check out my YouTube channel. I have many videos of me playing both covers and original songs.',
                link: 'http://www.youtube.com/user/DeadHeadRussell',
                songs: []
            },
            {
                name: 'MIDI',
                description: 'A collection of works that use MIDI patches for the bass and drums with real instruments recorded ontop',
                songs: [
                    {
                        name: 'What Am I?',
                        description: 'Guitar led, instrumental rock song\n' +
                                     '\n<b>Credits:</b>\n' +
                                     'All instruments played by Andrew Russll\n' +
                                     'Music written by Andrew Russell.',
                        recording: true
                    },
                    {
                        name: 'Has That Ever Crossed Your Mind',
                        description: 'Simple 6/8 rock song\n' +
                                     '\n<b>Credits:</b>\n' +
                                     'All instruments played by Andrew Russell\n' +
                                     'Music and lyrics written by Andrew Russell',
                        recording: true
                    },
                    {
                        name: 'Six Wide Lanes',
                        description: 'Upbeat bluegrass tune\n' +
                                     '\n<b>Credits:</b>\n' +
                                     'All instruments played by Andrew Russell\n' +
                                     'Music and lyrics written by Andrew Russell and Heather Russell',
                        recording: true
                    },
                    {
                        name: 'Mellow Song',
                        description: 'Catchy pop tune\n' +
                                     '\n<b>Credits:</b>\n' +
                                     'All instruments played by Andrew Russell\n' +
                                     'Music and lyrics written by Andrew Russell and Heather Russell',
                        recording: true
                    },
                    {
                        name: 'Die Die Die',
                        description: 'Rock-funk trio\n' +
                                     '\n<b>Credits:</b>\n' +
                                     'All instruments played by Andrew Russell\n' +
                                     'Music and lyrics written by Andrew Russell',
                        recording: true
                    },
                    {
                        name: 'Jazzy #5',
                        description: 'Instrumental jazz song\n' +
                                     '\n<b>Credits:</b>\n' +
                                     'All instruments played by Andrew Russell\n' +
                                     'Music written by Andrew Russell',
                        recording: true
                    },
                    {
                        name: 'KOR Waltz',
                        description: 'Jazz-rock waltz\n' +
                                     '\n<b>Credits:</b>\n' +
                                     'All instruments played by Andrew Russell\n' +
                                     'Music written by Andrew Russell',
                        recording: true
                    }
                ]
            },
            {
                name: 'Epic',
                description: 'The most brilliant rock album no one has ever heard.',
                songs: [
                    {
                        name: 'hehehe...',
                        description: '' +
                                     '\n<b>Credits:</b>\n' +
                                     'All instruments played by Andrew Russell\n' +
                                     'Music written by Andrew Russell',
                        recording: true
                    },
                    {
                        name: 'The Journey',
                        description: '' +
                                     '\n<b>Credits:</b>\n' +
                                     'All instruments played by Andrew Russell\n' +
                                     'Music and lyrics written by Andrew Russell',
                        recording: true
                    },
                    {
                        name: 'Epic Story',
                        description: '' +
                                     '\n<b>Credits:</b>\n' +
                                     'All instruments played by Andrew Russell\n' +
                                     'Music and lyrics written by Andrew Russell',
                        recording: true
                    },
                    {
                        name: 'Change',
                        description: '' +
                                     '\n<b>Credits:</b>\n' +
                                     'All instruments played by Andrew Russell\n' +
                                     'Music and lyrics written by Andrew Russell',
                        recording: true
                    },
                    {
                        name: 'I See',
                        description: '' +
                                     '\n<b>Credits:</b>\n' +
                                     'All instruments played by Andrew Russell\n' +
                                     'Music and lyrics written by Andrew Russell',
                        recording: true
                    },
                    {
                        name: 'Deleted',
                        description: '' +
                                     '\n<b>Credits:</b>\n' +
                                     'All instruments played by Andrew Russell\n' +
                                     'Music written by Andrew Russell',
                        recording: true
                    },
                    {
                        name: 'Now',
                        description: '' +
                                     '\n<b>Credits:</b>\n' +
                                     'All instruments played by Andrew Russell\n' +
                                     'Music written by Andrew Russell',
                        recording: true
                    }
                ]
            },
            {
                name: 'This World',
                description: 'A rock album with a theme centered around the world we all live on.',
                songs: [
                ]
            }
        ]
    },
    {
        name: 'The Cam Jervis Experience',
        start: '2008-01-01',
        end: '2008-09-01',
        description: 'For the last year in high school, my friends and I formed a band. I was on lead guitar, and played keys and sang vocals for some tracks. We rocked out at various local venues, benefit concerts and battle of the bands. While we played a couple original songs, we mainly played covers.',
        albums: [
            {
                name: 'Songs',
                description: 'Originals and covers played by The Cam Jervis Experience',
                songs: [
                    {
                        name: 'Road to Want',
                        description: 'Progressive rock song\n' +
                                     '\n<b>Credits:</b>\n' +
                                     'Lead Guitar: Andrew Russell\n' +
                                     'Rhythm Guitar: Adam Baigent\n' +
                                     'Bass Guitar: Cam Jervis\n' +
                                     'Didgeridoo: Adam Baigent\n' +
                                     'Drums: Garry Garneau\n' +
                                     'Music written by: The Cam Jervis Experience',
                        recording: true
                    },
                    {
                        name: 'On Either Side',
                        description: 'Laid back folk\n' +
                                     '\n<b>Credits:</b>\n' +
                                     'Lead Vocals: Garry Garneau\n' +
                                     'Backing Vocals: Adam Baigent, Andrew Russell, Cam Jervis\n' +
                                     'Russian Lap Harp: Garry Garneau\n' +
                                     'Guitar: Adam Baigent\n' +
                                     'Piano: Andrew Russell\n' +
                                     'Bass: Cameron Jervis\n' +
                                     'Music written by Adam Baigent\n' +
                                     'Lyrics written by Garry Garneau',
                        recording: true
                    },
                    {
                        name: 'Farmhouse',
                        description: 'A rock ballad by the band Phish\n' +
                                     '\n<b>Credits:</b>\n' +
                                     'Lead Vocals: Andrew Russell\n' +
                                     'Backing Vocals: Garry Garneau\n' +
                                     'Lead Guitar: Andrew Russell\n' +
                                     'Rhythm Guitar: Adam Baigent\n' +
                                     'Piano: Cam Jervis\n' +
                                     'Bass: Cam Jervis\n' +
                                     'Drums: Andrew Russell\n' +
                                     'Music written by Trey Anastasio\n' +
                                     'Lyrics written by Tom Marshall',
                        recording: true
                    },
                    {
                        name: 'El Scorcho',
                        description: 'A rock song by Weezer\n' +
                                     '\n<b>Credits:</b>\n' +
                                     'Lead Vocals: Garry Garneau\n' +
                                     'Lead Guitar: Andrew Russell\n' +
                                     'Rhythm Guitar: Adam Baigent\n' +
                                     'Rock Organ: Andrew Russell\n' +
                                     'Bass: Cam Jervis\n' +
                                     'Drums: Andrew Russell\n',
                        recording: true
                    }
                ]
            }
        ]
    },
    {
        name: 'The Orfs',
        start: '2009-05-01',
        end: '2010-10-01',
        description: 'While I was the pianist in the University of Waterloo\'s Stage Band, the stage band\'s guitarist invited me to play with his band. The Orfs, a pyscedelic rock band, is led by Grant Kouzechar who writes most of the music we play. The rest of the songs are covers from various artists. I played the keys in this band using a number of sounds ranging from the piano to the organ and even the clavicord.',
        albums: [
            {
                name: 'Live - 26.11.09 - Maxwell\'s Music House',
                description: 'Live recording of a performance at Maxwell\'s Music House in Waterloo, Ontario.',
                songs: [
                    {
                        name: 'One Foot in the Graveyard',
                        description: '\n<b>Credits:</b>\n' +
                                     'Vocals: Grant Kozuchar\n' +
                                     'Lead Guitar: Grant Kozuchar\n' +
                                     'Rhythm Guitar: Tim Ambos\n' +
                                     'Keybaord: Andrew Russell\n' +
                                     'Bass: Matt Hurst\n' +
                                     'Drums: Bradford Nowak\n' +
                                     'Music and lyrics written by Grant Kozuchar',

                        recording: true
                    },
                    {
                        name: 'Baby It\'s You',
                        description: '\n<b>Credits:</b>\n' +
                                     'Vocals: Grant Kozuchar\n' +
                                     'Lead Guitar: Grant Kozuchar\n' +
                                     'Rhythm Guitar: Tim Ambos\n' +
                                     'Keybaord: Andrew Russell\n' +
                                     'Bass: Matt Hurst\n' +
                                     'Drums: Bradford Nowak\n' +
                                     'Music and lyrics written by Grant Kozuchar',
                        recording: true
                    },
                    {
                        name: 'Walk My Way',
                        description: '\n<b>Credits:</b>\n' +
                                     'Vocals: Grant Kozuchar\n' +
                                     'Lead Guitar: Grant Kozuchar\n' +
                                     'Rhythm Guitar: Tim Ambos\n' +
                                     'Keybaord: Andrew Russell\n' +
                                     'Bass: Matt Hurst\n' +
                                     'Drums: Bradford Nowak\n' +
                                     'Music and lyrics written by Grant Kozuchar',
                        recording: true
                    },
                    {
                        name: 'One Night Stand',
                        description: '\n<b>Credits:</b>\n' +
                                     'Vocals: Grant Kozuchar\n' +
                                     'Lead Guitar: Grant Kozuchar\n' +
                                     'Rhythm Guitar: Tim Ambos\n' +
                                     'Keybaord: Andrew Russell\n' +
                                     'Bass: Matt Hurst\n' +
                                     'Drums: Bradford Nowak\n' +
                                     'Music and lyrics written by Grant Kozuchar',
                        recording: true
                    },
                    {
                        name: 'Lipstick On My Collar',
                        description: '\n<b>Credits:</b>\n' +
                                     'Vocals: Grant Kozuchar\n' +
                                     'Lead Guitar: Grant Kozuchar\n' +
                                     'Rhythm Guitar: Tim Ambos\n' +
                                     'Keybaord: Andrew Russell\n' +
                                     'Bass: Matt Hurst\n' +
                                     'Drums: Bradford Nowak\n' +
                                     'Music and lyrics written by Grant Kozuchar',
                        recording: true
                    },
                    {
                        name: 'Bring a Woman to Me',
                        description: '\n<b>Credits:</b>\n' +
                                     'Vocals: Grant Kozuchar\n' +
                                     'Lead Guitar: Grant Kozuchar\n' +
                                     'Rhythm Guitar: Tim Ambos\n' +
                                     'Keybaord: Andrew Russell\n' +
                                     'Bass: Matt Hurst\n' +
                                     'Drums: Bradford Nowak\n' +
                                     'Music and lyrics written by Grant Kozuchar',
                        recording: true
                    },
                    {
                        name: 'Unrequited Love',
                        description: '\n<b>Credits:</b>\n' +
                                     'Vocals: Grant Kozuchar\n' +
                                     'Lead Guitar: Grant Kozuchar\n' +
                                     'Rhythm Guitar: Tim Ambos\n' +
                                     'Keybaord: Andrew Russell\n' +
                                     'Bass: Matt Hurst\n' +
                                     'Drums: Bradford Nowak\n' +
                                     'Music and lyrics written by Grant Kozuchar',
                        recording: true
                    },
                    {
                        name: 'Keep on Rocking',
                        description: '\n<b>Credits:</b>\n' +
                                     'Vocals: Grant Kozuchar\n' +
                                     'Lead Guitar: Grant Kozuchar\n' +
                                     'Rhythm Guitar: Tim Ambos\n' +
                                     'Keybaord: Andrew Russell\n' +
                                     'Bass: Matt Hurst\n' +
                                     'Drums: Bradford Nowak\n' +
                                     'Music and lyrics written by Grant Kozuchar',
                        recording: true
                    },
                    {
                        name: 'Moma\'s Gone Insane',
                        description: '\n<b>Credits:</b>\n' +
                                     'Vocals: Grant Kozuchar\n' +
                                     'Lead Guitar: Grant Kozuchar\n' +
                                     'Rhythm Guitar: Tim Ambos\n' +
                                     'Keybaord: Andrew Russell\n' +
                                     'Bass: Matt Hurst\n' +
                                     'Drums: Bradford Nowak\n' +
                                     'Music and lyrics written by Grant Kozuchar',
                        recording: true
                    },
                    {
                        name: 'Cosmic Dragons',
                        description: '\n<b>Credits:</b>\n' +
                                     'Vocals: Grant Kozuchar\n' +
                                     'Lead Guitar: Grant Kozuchar\n' +
                                     'Rhythm Guitar: Tim Ambos\n' +
                                     'Keybaord: Andrew Russell\n' +
                                     'Bass: Matt Hurst\n' +
                                     'Drums: Bradford Nowak\n' +
                                     'Music and lyrics written by Grant Kozuchar',
                        recording: true
                    },
                    {
                        name: 'Sailing Alone',
                        description: '\n<b>Credits:</b>\n' +
                                     'Vocals: Grant Kozuchar\n' +
                                     'Lead Guitar: Grant Kozuchar\n' +
                                     'Rhythm Guitar: Tim Ambos\n' +
                                     'Keybaord: Andrew Russell\n' +
                                     'Bass: Matt Hurst\n' +
                                     'Drums: Bradford Nowak\n' +
                                     'Music and lyrics written by Grant Kozuchar',
                        recording: true
                    },
                    {
                        name: 'Maggot Brains',
                        description: 'Funkadelic cover\n' +
                                     '\n<b>Credits:</b>\n' +
                                     'Vocals: Grant Kozuchar\n' +
                                     'Lead Guitar: Grant Kozuchar\n' +
                                     'Rhythm Guitar: Tim Ambos\n' +
                                     'Keybaord: Andrew Russell\n' +
                                     'Bass: Matt Hurst\n' +
                                     'Drums: Bradford Nowak\n' +
                                     'Music written by Eddie Hazel',
                        recording: true
                    }
                ]
            }
        ]
    }
];

data.equipment = [
    {
        name: 'Guitars',
        equipment: [
            {
                name: 'Fender Stratocaster',
                description: ''
            },
            {
                name: 'Seagull S6+ Spruce',
                description: ''
            }
        ]
    },
    {
        name: 'Guitar Pedals',
        equipment: [
            {
                name: 'Ibenez TS9 Tubescreamer',
                description: ''
            },
            {
                name: 'Electro-Harmonix Little Big Pi Muff',
                description: ''
            },
            {
                name: 'Boss CS-3 Compressor',
                description: ''
            },
            {
                name: 'Digitech Whammy',
                description: ''
            },
            {
                name: 'MXR Micro Flanger',
                description: ''
            },
            {
                name: 'Dunlop Cry Baby Wah',
                description: ''
            },
            {
                name: 'TC Electronic RPT-1 Nova Repeater',
                description: ''
            },
            {
                name: 'Ernie Ball VP Junior Volume Pedal',
                description: ''
            },
            {
                name: 'Boss RC-20XL Loop Station',
                description: ''
            }
        ]
    },
    {
        name: 'Guitar Amplifiers',
        equipment: [
            {
                name: 'Marshall MG 30FX',
                description: ''
            }
        ]
    },
    {
        name: 'Keyboards',
        equipment: [
            {
                name: 'Yamaha CP300 Stage Piano',
                description: ''
            }
        ]
    },
    {
        name: 'Mixing Boards',
        equipment: [
            {
                name: 'Steinberg MI4',
                description: ''
            },
            {
                name: 'Yamaha MW12 USB Mixing Studio',
                description: ''
            }
        ]
    },
    {
        name: 'Microphones',
        equipment: [
            {
                name: 'Samson CO2 Pencil Microphones',
                description: ''
            },
            {
                name: 'Vocal Microphones',
                description: 'Shure SM58S Vocal Microphone, Apex 381 Vocal Microphone'
            },
            {
                name: 'Drum Microphones',
                description: 'Shure PG 56 Drum Microphone x3, Shure PG 52 Bass Drum Microphone'
            },
        ]
    }
];


data.resumes = [
    { path: 'current' }
];

data.softwareProjects = [
    {
        name: 'Personal Website',
        description: 'This is the source for both the server side and client ' +
                     'side code required for running this website. Node.js ' +
                     'required to run the server. No audio files and ' +
                     'no other software project\'s source are included with ' +
                     'wth this source.'
    },
    {
        name: 'Defend Your Castle',
        description: 'Lovingly ripped off of the popular flash game. I ' +
                     'created this game for a UI assignment at the ' +
                     'University of Waterloo. The goal of this game is to ' +
                     'kill all of the attacking stick figures by dropping ' +
                     'them from a great hight before they knock down your ' +
                     'castle.',
    },
    {
        name: 'Soccer Emulator',
        description: 'A soccer emulator I made for as a mini-game for an ' +
                     'online, text-based RPG. NOTE: Windows only'
    },
    {
        name: 'Carz',
        description: 'A game I originally saw on a TI-83 graphing calculator.' +
                     'Try to keep your car inside the lines. NOTE: Windows ' +
                     'only. Sometimes has framerate issues and runs too fast'
    },
    {
        name: 'Conway\'s Game of Life',
        description: 'An implementation of Conway\'s Game of Life using OpenGL'
    },
    {
        name: 'Pong',
        description: 'Pong, teh awesome game. Implemented with C++ and ' +
                     'OpenGL. What more can be said? NOTE: Windows only'
    },
    {
        name: 'Hearts',
        description: 'An implementation of hearts I made while learning ' +
                     'perl. Needless to say, I have not used perl since.'
    }
];

