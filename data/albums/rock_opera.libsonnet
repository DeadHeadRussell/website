local utils = import '../utils.libsonnet';

utils.makeAlbum(
  'Rock Opera',
  'Rock Opera',
  'Early 2010\'s - ???',
  'A rock opera that I\'ve been working on. I still need better titles for everything...',
  [
    utils.makeSong(
      'Farther Away',
      '2014',
      256,
      description = |||
        The intro is set during the not-so-far-distant future in a region of the world that is being hit hard by climate change. The local farmers are struggling to grow their crops, leaving them with little money. Because of this, they have to turn to other means to survive.
        Farther Away starts with a mother lamenting about her living conditions. She recently sold her only daughter so that she would have enough money to struggle out a living. It has finally sunk in that she will never get to see her daugter again.
        This song is supposed to segue directly into Here We Are, but I just didn't record the demo that way for whatever reason.
      |||,
      lyrics = |||
        [Mother]
        
        Fly away my pretty darling.
        Fly away my little one.
        Fly away for now I must let you go.
        Times are hard, increasingly so.
        
        Look at this, see what you have done.
        Sold my child so I could just live on.
        Far away she will go.
        Far away, too far for me to go.
        
        These desolations that you have caused.
        You should stop meddling with nature's affairs.
        These hard times are from you and your.
        Why me? It's unfair.
        
        I am done, nothing to live for.
        You've taken it all away now.
        I am gone, there's no coming back now.
        You've taken everything away from me.
        
        These desolations that that you have caused.
        You should stop meddling with nature's affairs.
        These hard times are from you and your.
        Why me? It's unfair.
        
        Way-oh-way, farther away now.
        
        [Mother and Daughter]
        Way-oh-way, farther away now
      |||
    ),
    utils.makeSong(
      'Here We Are',
      '2014',
      207,
      description = |||
        Ah, so here we are. The intro is done and here comes the bulk of Act I. This song introduces the four themes found in this act.
      |||
    ),
    utils.makeSong(
      'Boy',
      '2014',
      287,
      description = |||
        We now fast forward a few years and find ourselves in a richer part of the world. Life looks great, families are well fed, well educated, and well entertained. This songs introduces to the protagonist of our story; a Boy in his senior year of highschool. He sings about his issues as he struggles to maintain a relationship.
      |||,
      lyrics = |||
        [Boy]
        Suzie what you did there I did see.
        It can't be undone it damaged me.
        Sarah I heard you knock me down.
        You threw me so close to the ground.
        
        Trying to find a better course
        But it always ends up worse.
        Keep on trying to make it be.
        But a heavy load just falls on me.
        
        Megan called me from the door.
        She did not want me anymore.
        Tessa hurt me in a whirl.
        She did not want to be my girl.
        
        Tearing my life to bits and pieces.
        But when I find good it just ceases.
        Keep on trying to restart.
        But my life just falls apart
      |||
    ),
    utils.makeSong(
      'Parents',
      '2014',
      307,
      description = |||
        We follow the Boy as he arrives home after school. His father is there waiting for him, upset that he is so late. His father berates him for not working towards finding a career path as the Boy complains that he isn't given enough space. After being chewed out, the Boy overhears his mother questioning how they are raising their child.
      |||,
      lyrics = |||
        [Father]
        Boy, I am irate, you came home late, get to work.
        Boy, don't you forget, your schedule's set, you are in deep.
        
        Boy, now listen close, I won't speak twice, this is your price.
        Boy, you will not leave, you'll work at home, and see now friends.
        
        I will not tolerate insolence.
        This household's my domain.
        
        Boy, now grab your work, and head upstairs, start at once.
        Boy, don't you move, until you're done, ....
        
        [Boy]
        I, swear this won't happen again.
        I did not mean to cause no harm.
        I was trying to ask for.
        Some more time for myself.
        I swear this will be a one time thing.
        It will not repeat itself.
        Thought I would like more of my time.
        For... my... self...
        
        [Father]
        I will not be interrupted.
        Go, now leave me in peace.
        
        [Mother]
        Do you think that were too hard on him.
        Do you think that he could use a break.
        Yes, I think that he could use some space.
        It is not for us to decide his place.
        
        Now is the turning point of his life.
        We should not get in his way.
        
        [Boy]
        Mother, is that really true?
        I did not think....
        ...is that really true...
        
        [Mother / Boy]
        I he/I could, only have, room to breathe.
        
        [Mother]
        This is his time to excel.
        He can work it out on his own.
        We should be there for support.
        And not to shape him ourselves.
     |||
    ),
    utils.makeSong(
      'Friends => The Meeting',
      '2014',
      604,
      description = |||
        This is both song 5 and 6, as they flow directly into one another. The Boy, being banished to his room, complains to his friends while he does his school work. His friends try to pressure him to sneak out late at night to have some fun. The Boy is conflicted, not wanting to disobey even more, but eventually caves in and follows them out.
        Fast foward to later that night, the Boy and his friends are up to no good. They wind up at a whore house where his friends ask the Madam to treat him well. The madam takes the Boy to their newest possession, the Girl sold in the first song.
        This is the closing song of Act I.
      |||,
      lyrics = |||
        5. Friends
        
        [Friend]
        Come join us for a night on the town.
        We'll help forget what has brought you down.
        Oh come with us to help forget.
        
        Meet us at the diner at one.
        Then we'll go have some real fun.
        Oh come with us and have a night to not forget about.
        
        [Boy / Friend]
        I shouldn't / oh why not?
        It's not right / really??
        I should stay home / oh where's the fun in that.
        
        How can you? / Do what?
        Sneak out late? / What do you mean?
        And they don't know. / Why do they have to know anything.
        
        [Friend]
        What have they done for you?
        They lock you up in their little room.
        Oh come with us and get away.
        
        Don't leave until after dark.
        We'll get you back before the dawn.
        Oh come with us and we'll take good care of you.
        
        [Boy / Friend (Spoken)]
        My mother / what has she done?
        She is nice / to you?
        And helps me out. / What about your father?
        
        My fath... / Yeah, that's what we thought.
        Maybe I'll go.
        
        [Boy]
        I can't help but think this isn't right.
        But maybe they know what's good for me.
        I can see what's past these towering walls.
        Or wallow all alone.
        
        6. The Meeting
        
        [Madam]
        Welcome to our show, we're here to give you cheer.
        Take a look around, you will find it here.
        Tell us what you want, we will see to that.
        You leave satisfied, no where else is better.
        
        [Boy]
        I don't know, what I want, or even if its here.
        
        [Friend (Spoken)]
        Hey darling, this is his first time, you know how it is.
        Why don't you, uh, go get him something special.
        
        [Boy / Girl]
        How could they do this to a girl.
        She is just sixteen / I am just sixteen.
        
        How could they do this to a girl.
        How could they be so mean / They be so mean.
        
        How could they take this girl away, from her mother.
        I have a mother too / have a mother too.
        
        Her mother must be scared.
        She must be so afraid / I am so afraid.
        
        How could they do this to a human.
        I am human too / I am human too.
        
        I have to help my own kind.
        I have to help her out of here / help me out of here.
        
        I have to help...
     |||
    ),
    utils.makeSong(
      'Losing => Looking Back',
      '2016',
      559,
      description = |||
        The intro to Act II goes back to the mother of the Girl. Life has not gotten any better after selling her daughter. Their town is in ruins due to recent floods and there is no help in sight.
        Looking Back starts off the main part of Act II which is a flashback of what happend to the Girl after she was sold. It introduces the four themes found in Act II.
      |||,
      lyrics = |||
        7. Losing
        
        [Mother]
        
        Just last year, we lost our farm.
        The ocean got to high, from the storms.
        We didn't have no money, to eat at all.
        So our only daughter, we did sell.
        
        I wish I could soar, into the sky.
        
        The storms are getting worse, they won't abate.
        All the other towns, they share this fate.
        We've got nothing left, nothing to do.
        No one we know, no where to go.
        
        I wish I could soar, into the sky
      |||
    ),
    utils.makeSong(
      'Owner',
      '2016',
      240,
      description = |||
        The Girl, recently being sold, is introduced to her new owner. He tells her what her life will now be like, as she as terrified about what is happening.
      |||,
      lyrics = |||
        [Owner]
        I am your owner,
        listen what I have to say.
        I'm in control here,
        I make sure you will obey.
        
        Your job is to beg on the streets.
        Come back here at the end of the day.
        I will make you obey.
        
        [Girl]
        Why, is this happening to me.
        I wish, that I could be free.
        If, I should try to flee.
        I would be beaten or worse maybe even be killed.
        
        I'm, feeling hunger pangs.
        But I, have no money to pay.
        I, would like to eat today.
        I have to steal some food or I will not get my fill.
        
        [Owner]
        You have done well,
        but there is room for much more.
        Let the men grab you,
        and lead you up into their floor.
        
        Once up there we will come for you.
        We will not let you come to harm.
        Just make sure to act your role.
        
        [Girl]
        I, am too scared to imagine.
        Though he, said nothing would happen.
        Please, let him burst through the door.
        This is it, nothings left, I cannot take anymore.
     |||
    ),
    utils.makeSong(
      'Escape',
      '2016',
      252,
      description = |||
        One of the other slaves she lives with attempts to make an escape and pulls the Girl along. She is thrilled about getting away, but at the same time, she is terrified about being caught. The worst happens, and they are caught. The Girl quickly burst out crying that she was forced to go along. The owner lets her off the hook as he big plans for her, but the Girl never sees the other slave again.
      |||
    ),
    utils.makeSong(
      'Dusty Road',
      '2016',
      238,
      description = |||
        Note: Please don't listen to this song. My narration is terrible. Like... so bad that I'd like to blot it out of my memory entirely. Saying that...
        The new job for the girl is a sex scam. She attracts rich tourists who think they can have it all while her Owner bursts in their room before anything can happen and blackmails them for their money. The Girl is being well treated and fed during all this and her determination to make something out of her life grows.
      |||,
      lyrics = |||
        [Girl]
        
        Once we started this sex scam, life wasn't as bad.
        I got well fed. I had to look as lovely as a rose my owner would say.
        When some western man was in sight, I'd play my part.
        Smile so seductively that they couldn't resist.
        
        Working on the streets, smiling at the men.
        More that I attract, the happier he will be.
        Working mens' lusts, taking all their pay.
        That's my life, whoa, upon this dusty road.
        
        They'd walk up, and look around, knowing they were doing wrong.
        And I'd play all innocent, offer to sell them a flower.
        But that's not what they'd be there for, they'd want my flower.
        They'd gently take my hand, and lead me up to their room.
        
        Working on the streets, smiling at the men.
        More that I attract, the happier he will be.
        Working mens' lusts, taking all their pay.
        That's my life, whoa, upon this dusty road.
        
        It was always the same. The men would take their pants off.
        They'd take my hand and put it on their hard penis. I'd just smile as if I didn't understand.
        Without fail, my owner would bust in before anything else happened.
        It was all I could do to not laugh at the men as they went flaccid.
        
        Working on the streets, smiling at the men.
        More that I attract, the happier he will be.
        Working mens' lusts, taking all their pay.
        That's my life, whoa, upon this dusty road.
     |||
    ),
    utils.makeSong(
      'Lost Soul',
      '2016',
      300,
      description = |||
        Nothing good lasts for long. The Girl is sold to the whorehouse where the Boy found her. Once again, the Girl's life is throw to tatters and she loses all hope that she will ever have a good life.
      |||,
      lyrics = |||
        [Madam]
        
        You, have been, bought, and sold.
        Your time, with him, is done, and old.
        whoooa
        
        Your, worth is, more than what, you do.
        You are, too, valuable to, misuse.
        whoooa
        
        You, will go, across, the seas
        To where those men, that you beguille, live their life, with ease.
        whoooa
        
        Your, charm, will draw, in a stream.
        And you'll see, what it's like, to be used, as pleased.
        whoooa
        
        You, have been, bought, and sold.
        Your soul, is mine, until you, grow old.
        whooooa
        
        Your, charm will, bring the men, in droves.
        They will not wait, to take off, all of, your clothes.
        whooooa
        
        [Girl]
        
        Where, are you taking me now.
        Please, I would like to get out.
        I, have room for no more.
        
        I would rather die.
        Please, let my soul fly.
        Take me farther away.
     |||
    ),
    utils.makeSong(
      'New Life',
      '2016',
      542,
      description = |||
        Flash back over, we are back in the present. After recounting her life to the Boy, she wants to just be left alone. The Boy refuses, wanting to help her out. He realises that he has to do something about this problem and vows to dedicate his life to it.
      |||,
      lyrics = |||
        [Girl]
        Please, go away, haven't I suffered enough.
        Please, go away, I don't want to feel your touch.
        
        [Boy]
        No, I won't, go away, I'm going to get you some help.
        No, I am, here to stay, stay and look after your health.
        
        [Girl]
        How, can I trust, after what I've been through.
        All, hope is lost, what you say can't be true.
        
        [Boy]
        No, there is, always hope, even when life's at its worst.
        I, will work, towards a way, that your life can be reversed.
        
        I spent these many days without walking.
        I sepnt these many days without truth.
        I spent these many days without talking.
        I spent these many days without you.
        Without you, without you.
        I spent these many days without knowing.
        I spent these many days without you.
        
        I listened to the words you were saying.
        I listened to the words yet again.
        You told me all about your problems.
        I listened to the words that you said.
        That you said, that you said.
        You told me I was part of the problem.
        I listened to the words that you said.
        
        We've got a lot of problems.
        But yours is worth working on.
        
        We've got find the root of it all.
        We've got to find, the real cause.
        I know now, what to work towards.
        I know now, what I have to do.
        
        I'll spend these next days fighting for freedom.
        I'll spend these next days saving you.
        I'll spend these next days, spend these next days.
        I'll spend these next days for you.
     |||
    )
  ],
  description = |||
    Running time: 62ish minutes
    Note: These are all demos. This means that so me instruments are synthesized and all singing parts, including the female ones, are sung by me.
    I started writing this Rock Opera sometime in the early-2010's. I don't really remember the exact date. I had recently been listening to The Who's Tommy and Quadrophenia and was very caught up in the overall flow of the music. I had written many songs before, but had never written a story told by music.
    It took me a while to get started. I didn't have a clue what to write about at first. It wasn't until I happened to be playing guitar one day, and played two of my older songs 'Farther Away' and 'Boy' back-to-back that I got an idea. The two songs fit well together musically, and there was an opportunity for a story. 'Farther Away' was written as a grade 12 English project. Instead of writing a book report, I was able to convince my English teacher to write a song. The book in question is Oryx and Crake by Margaret Atwood (I highly recommend it!!) and this rock opera has been heavily influenced by it. 'Boy', on the other hand, was an unnamed song (yes, I know, I'm terrible at naming things) from I don't even know when. I first remember playing it during a lunch hour in Grade 9, though it probably did not have any lyrics back then. It was simply a song complaining about relationships, as highschool students are wont to do. I have also rewritten parts of its intro many times. From these two songs, I started writing.
    Progress was slow until I started grad school at CMU. I was in the music and tech department and had the opportunity to take composition lessons as part of the program. It was here that my teacher, Nancy Galbraith, convinced me to leave my comfort zone and expand the arrangements. At first, I was just going to write it for my typical four piece band, but it got expanded to include the flute, viola, trumpet, percussion, and four part SATB vocals. I also made more progress here due to actually having weekly lessons where I was expected to make progress.
    Now that I've finished writing all the songs and recorded the demos, what now? Well, I'm still not 100% completed. If you haven't noticed yet, I'm pretty terrible at naming things. Almost every song needs a new name, not to even mention the name of the whole thing, or even any of the characters' names (side note: I named the father 'Jerry' for a while, but thought it sounded weird so I nixed it). I am also not 100% happy with all of the lyrics, so some of them may still change. I guess I could also create some artwork / images. But mainly I really need to finish the sheet music. If I want this ever recorded / performed, having good sheet music will be very important! Otherwise, I guess I have to figure out what to do with it. Do I try and get it performed somewhere? Properly record it? Get someone to choreograph it or even write dialogue for outside of the songs? Who knows.
    Anyways, I hope you enjoy. I'd love to here any feedback, questions, comments, etc, you have!
  |||
)
