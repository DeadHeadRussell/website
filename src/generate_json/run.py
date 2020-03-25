import argparse
import os

from generate_json import generate_json
from parse_data import parse_data

def run():
  parser = argparse.ArgumentParser(description='Convert yaml data to a single json file.')
  parser.add_argument('data_dir', type=os.path.realpath, help='Path to the directory of input data.')
  parser.add_argument('output_file', type=os.path.realpath, help='File to output the JSON to.')
  args = parser.parse_args()

  songs, tags = parse_data(args.data_dir)
  generate_json(args.output_file, songs, tags)

run()

