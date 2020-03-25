import yaml

class Tag(yaml.YAMLObject):
  yaml_tag = u'!Tag'

  def __init__(self, name, primary=False, description=''):
    self.name = name
    self.primary = primary
    self.description = description

  @classmethod
  def yaml_builder(cls, loader, node):
    fields = loader.construct_mapping(node)
    return Tag(**fields)

  def as_json(self):
    return {
      'name': self.name,
      'primary': self.primary,
      'description': self.description
    }

  def __repr__(self):
    return 'Tag({}, Primary={}, {})'.format(self.name, self.primary, self.description)


