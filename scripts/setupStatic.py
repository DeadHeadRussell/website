#!/usr/bin/env python3.8

import json
import os
import sys

def run():
    if len(sys.argv) != 3:
        print(f'Usage: {sys.argv[0]} <data.json> <path/to/static>', file=sys.stderr)
        exit(-1)

    data = json.load(open(sys.argv[1], 'r'))
    root_path = sys.argv[2]

    for category in data['categories']:
        for album in category['albums']:
            folder_name = os.path.join(root_path, category['link'], album['link'])
            os.makedirs(folder_name, exist_ok=True)

if __name__ == '__main__':
    run()

