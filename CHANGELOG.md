# Changelog
Changes, both released, upcoming and in progress are kept here.

## [TODO]
### Added
- Add older songs
  - Add Primal Fusion band songs
  - Get music from FAWM 2019 from Nick Coranado

- Add "sections" to songs

- "Repeat" option to songs


### Changed
- Improve audio player
	- Embeded optional video player
  - Play random album
  - Suggest next album on complete

- Optimize the site
  - Reduce initial load sizes

- ZipScript
  - Provide an option to the zip script to look for diffs.
  - Provide option to do single album

- Rethink song link / URL / info panel.

### Fixed
- No JS support
  - Menu does not appear
  - Audio player does nothing but is visible
  - Play buttons / subscribe button / info panels

- Audio Player
  - Small size layout

- Subscribe Button
  - Phone screen position fixes


## [2022-03-05] - 2022-03-05
### Added
- FAWM 2022 - album
- Lavish Dude / FAWM 2022 - album
- Embeded images in descriptions

### Changed
- Albums are now unique based off of category link + album link instead of just album link
- All files now hosted from external static file host

### Security
- Updated packages to recent versions


## [2021-03-07] - 2021-03-07
### Added
- Chosen - album
- FAWM 2021 - album
- New section level description command parsing
- New section level list description command

### Changed
- Lavish Dude album ordering
- Time description command now has optional display
- Better zip script errors


## [2021-02-28] - 2021-02-28
### Added
- New album data

### Changed
- New ID field to allow multiple albums with the same name. ID is used in links instead of name now.


## [2020-08-18] - 2020-08-18
### Added
- Ability to link to timestamp in a song.

### Changed
- Song lists
  - Song Durations


## [2020-06-22] - 2020-06-22
### Added
- Recet Feed
- Add playlists
- Change playlist if current playlist is untouched
- View current playlist
- Queue up albums and songs


## [2020-05-27] - 2020-05-27
### Added
- New query API for listens
- RSS Feed in "Subscribe" modal

### Removed
- Old "query" API for listens

### Security
- Get HTTPS Cert


## [2020-05-17] - 2020-05-17
### Added
- Contact info page

### Changed
- Data description format allows linking to other albums or songs
- Add dates to album card
- Make album header horizontal on album page

### Fixed
- Fix user IP in listens table


# [2020-05-10] - 2020-05-10
### Added
- New song Once Majestic
- New album and song Home Concert Series
- Link to download sheet music

### Changed
- Initial song changes based on page you start on
- Updating subscriptions based on email
- User IP to listens table

### Fixed
- Play button on songs list now shows proper status
- Unicode issue on Seed into Tree
- Creative Commons license is no longer cut off on small screen sizes
- Subscribe button is no longer below icons

