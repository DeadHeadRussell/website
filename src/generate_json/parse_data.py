import os

import yaml

import credit
import song
import tag

yaml.add_constructor('!Credit', credit.Credit.yaml_builder)
yaml.add_constructor('!Song', song.Song.yaml_builder)
yaml.add_constructor('!Tag', tag.Tag.yaml_builder)

def parse_data(data_dir):
  paths = get_data_files_list(data_dir)
  data = [yaml.load(open(path)) for path in paths]

  songs = [d for d in data if isinstance(d, song.Song)]
  tags = [d for d in data if isinstance(d, tag.Tag)]

  return songs, tags

def get_data_files_list(base_dir):
  paths = []
  for root, dirs, file_paths in os.walk(base_dir):
    paths.extend([
      '{}/{}'.format(root, path)
      for path in file_paths
      if path.endswith('.yaml')
    ])
  return paths

