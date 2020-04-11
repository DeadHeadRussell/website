#! /usr/bin/env python3

import os
import sys
import zipfile


def pretty_name(album_path):
    return os.path.basename(album_path)

def archive_file(archive, file_path, archive_name):
    with archive.open(archive_name, mode='w') as archive_file:
        with open(file_path, 'rb') as local_file:
            archive_file.write(local_file.read())

def archive(album_path):
    archive_path = os.path.join(album_path, 'archive.zip')
    art_path = os.path.join(album_path, 'art.jpg')
    songs_path = os.path.join(album_path, 'songs')
    with zipfile.ZipFile(archive_path, mode='w') as archive:
        archive_file(archive, art_path, os.path.basename(art_path))

        song_names = os.listdir(songs_path)
        for song_name in song_names:
            song_path = os.path.join(songs_path, song_name)
            archive_file(archive, song_path, song_name)

def write_archives(folder_paths):
    for album_path in folder_paths:
        archive(album_path)

def is_album_with_songs(album_path):
    songs_path = os.path.join(album_path, 'songs')
    return (
        os.path.isdir(album_path) and
        os.path.isdir(songs_path) and
        len(os.listdir(songs_path)) > 0
    )

def get_all_folders(root):
    return [
        os.path.join(root, album_path)
        for album_path in os.listdir(root)
        if is_album_with_songs(os.path.join(root, album_path))
    ]

def run():
    if len(sys.argv) != 2:
        print(f'Usage: {sys.argv[0]} <dir>')
        exit(1)

    root = os.path.abspath(sys.argv[1])

    folder_paths = get_all_folders(root)
    print('Creating archives for:', ', '.join([pretty_name(p) for p in folder_paths]))
    print()
    write_archives(folder_paths)

    print('Done.')

run()

