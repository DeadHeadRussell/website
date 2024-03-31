import {createCredit, createSection, createSong} from '../dataHelpers';
import {Category, Song} from '../types';


export const portfolio = (categories: Record<string, Category>): Record<string, Song[]> => {
  return {
    stories: [
      categories.demos.album.fawm_2024.song.every_day,
      createSong('No Light', '2020-02', 276, [], {
        music: '/music/portfolio/no_light.mp3'
      }),
      createSong('It\'s Clear', '2022', 480, [], {
        music: '/music/portfolio/its_clear.mp3'
      }),
      createSong('The Setting Sun', '2023-02', 483, [], {
        music: '/music/demos/fawm-2023/songs/the-setting-sun.mp3',
        description: `
          A fairy tale about sacrifice.
        `,
        lyrics: `
          [A - Character Introduction]
          She was a wondrous beauty of guile and grace
          She had sunburned locks curled around her face
          And golden eyes
          She waited for her time
          For her turn to fly

          [A - Setting Introduction]
          The village gathered all around her place
          And cheered as they watched her depart
          To save the setting sun
          Without out her it'd be gone
          She'd be back before too long
          After her turn to fly

          [B - Development]
          She walked away far from her place
          She walked through fields, climbed mountains strange
          Away from the place she once called home
          She climbed until her muscles ached
          Towards the top to meet her fate
          She scrambled when she could not climb no more

          [C - Development]
          At the top she found the setting sun
          And she reached out
          To help it all at once
          But when she looked into his dying eyes
          She finally realized
          What it meant for her to fly

          [B - Conflict]
          She dropped the sun and turned to home
          She couldn't stay she should have known
          Away from the place that was her goal
          The sky grew dark and the air grew cold
          She ran from the top to the fields below
          Away she fled, far from home

          [C - Resolution]
          When she reached the edge of her home
          And she looked out
          O'er the valley far below
          She saw death, cold, fear
          In the place she held so dear
          She knew how to save everyone
          And she turned back to fly
        `,
        sections: [
          createSection('A - Character Introduction', 0),
          createSection('A - Setting Introduction', 94),
          createSection('B - Development', 165),
          createSection('C - Development', 231),
          createSection('B - Conflict', 288),
          createSection('C - Resolution', 332)
        ]
      }),
      categories.projects.album.rock_opera.song.here_we_are,
      categories.projects.album.rock_opera.song.boy
    ],
    classical: [
      categories.demos.album.fawm_2023.song.prelude_in_d_minor,
      categories.demos.album.fawm_2020.song.prelude_in_f_minor,
      createSong('Prelude in E♭ Minor', '2021', 265, [], {
        link: 'prelude_in_eb_minor',
        music: '/music/portfolio/prelude_in_eb_minor.mp3',
        sheetMusic: '/music/portfolio/prelude_in_eb_minor.pdf'
      }),
      categories.demos.album.misc.song.once_majestic,
      categories.demos.album.fawm_2020.song.rhapsody_of_uncertainty,
      categories.demos.album.fawm_2024.song.journey_of_reverie,
      categories.demos.album.fawm_2024.song.regarding_reality,
      categories.demos.album.fawm_2022.song.malplenan_theme,
      categories.demos.album.fawm_2020.song.lone_roamer,
      categories.demos.album.fawm_2020.song.labour_of_love,
      createSong('He Who Was', '2023', 675, [], {
        music: '/music/portfolio/he_who_was.mp3'
      })
    ],
    jazz: [
      categories.demos.album.fawm_2021.song.leading_off,
      categories.demos.album.fawm_2021.song.how_far_will_i_go_for_her,
      categories.demos.album.fawm_2023.song.green_cat,
      categories.demos.album.fawm_2021.song.emotional_charge,
      categories.demos.album.fawm_2021.song.blue,
      categories.demos.album.fawm_2021.song.crosseyed_and_terrified,
      categories.demos.album.fawm_2024.song.little_things,
      categories.demos.album.fawm_2023.song.entry,
      categories.demos.album.fawm_2023.song.pleasant_evening
    ],
    roots: [
      categories.demos.album.fawm_2024.song.lazy_river,
      categories.demos.album.fawm_2024.song.old_and_new,
      createSong('I\'m Not Angry', '2023', 283, [
        createCredit('Alyssa Womack', 'Lead Vocals'),
        createCredit('Geoff Matthews', 'Lyrics'),
        createCredit('Andrew Russell', 'Everything Else')
      ], {
        music: '/music/portfolio/im_not_angry.mp3'
      }),
      categories.demos.album.fawm_2017.song.morning_meadow,
      categories.demos.album.fawm_2022.song.winters_dangerous_beauty,
      categories.demos.album.fawm_2020.song.seed_into_tree,
      categories.demos.album.fawm_2020.song.dance_of_the_dead
    ]
  };
}

