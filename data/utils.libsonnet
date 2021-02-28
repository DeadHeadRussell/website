{
  local utils = self,

  removeAll(str, toRemove)::
    std.join(
      '',
      [
        char
        for char in std.stringChars(str)
        if !std.member(toRemove, char)
      ]
    ),

  replaceWhitespace(str, char)::
    std.join('_', [
      char
      for char in std.split(str, ' ')
      if std.length(char) > 0
    ]),

  makeLink(name)::
    utils.replaceWhitespace(
      utils.removeAll(
        std.asciiLower(name),
        [
          '!', '@', '#', '$', '%', '^',
          '&', '*', '(', ')', '-', '_',
          '+', '=', ',', '.', '\'', '"',
          '>', '<', '?', '/', '\\'
        ]
      ),
      '_'
    ),

  makeCategory(name, albums):: {
    name: name,
    link: utils.makeLink(name),
    albums: albums
  },

  makeAlbum(id, name, date, tagline, songs, description = '', external = ''):: {
    id: id,
    name: name,
    link: utils.makeLink(id),
    date: date,
    tagline: tagline,
    songs: songs,
    [if std.length(description) > 0 then 'description']: description,
    [if std.length(external) > 0 then 'external']: external
  },

  makeSong(name, date, duration, artist = '', credits = [], video = false, description = '', lyrics = '', sheetMusic = false, external = ''):: {
    name: name,
    link: utils.makeLink(name),
    date: date,
    duration: duration,
    artist: artist,
    credits: credits,
    video: video,
    sheetMusic: sheetMusic,
    [if std.length(description) > 0 then 'description']: description,
    [if std.length(lyrics) > 0 then 'lyrics']: lyrics,
    [if std.length(external) > 0 then 'external']: external
  },

  makeCredit(who, role):: {
    who: who,
    role: role
  }
}
