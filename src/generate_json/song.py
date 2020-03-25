import yaml

class Song(yaml.YAMLObject):
  yaml_tag = u'!Song'

  def __init__(self, name, order=9999, tags=[], credits=[], description='', lyrics=''):
    self.name = name
    self.order = int(order)
    self.tags = tags
    self.credits = credits
    self.description = description
    self.lyrics = lyrics

  @classmethod
  def yaml_builder(cls, loader, node):
    fields = loader.construct_mapping(node)
    return Song(**fields)

  def as_json(self):
    return {
      'name': self.name,
      'order': self.order,
      'tags': self.tags,
      'credits': [credit.as_json() for credit in self.credits],
      'description': self.description,
      'lyrics': self.lyrics
    }

  def __repr__(self):
    short_description = self.description.split('\n')[0] + '...'
    short_lyrics = self.lyrics.split('\n')[0] + '...'
    return 'Song({}, {}, {}, {}, {}, {})'.format(self.name, self.order, self.tags, self.credits, short_description, short_lyrics)

