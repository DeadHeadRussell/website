import json

def generate_json(output_path, songs, tags):
  json_str = json.dumps({
    'songs': [song.as_json() for song in songs],
    'tags': [tag.as_json() for tag in tags]
  })
  with open(output_path, 'w') as f:
    f.write(json_str)
  
