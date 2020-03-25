import yaml

class Credit(yaml.YAMLObject):
  yaml_tag = u'!Credit'

  def __init__(self, role, who):
    self.role = role
    self.who = who

  @classmethod
  def yaml_builder(cls, loader, node):
    fields = loader.construct_mapping(node)
    return Credit(**fields)

  def as_json(self):
    return {
      'role': self.role,
      'who': self.who
    }

  def __repr__(self):
    return 'Credit({}, {})'.format(self.role, self.who)


