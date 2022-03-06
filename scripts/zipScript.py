#!/usr/bin/env python3.8

import json
import os
import sys
import zipfile


def pretty_name(album_path):
    return os.path.basename(album_path)

def find_song(data, album_link, song_link):
    try:
        return next(
            song
            for category in data['categories']
            for album in category.get('albums', [])
            for song in album.get('songs', [])
            if song['link'] == song_link and album['link'] == album_link
        )
    except Exception as e:
        print(f'Error finding: {album_link} {song_link}')
        return None

def archive_file(archive, file_path, archive_name):
    with archive.open(archive_name, mode='w') as archive_file:
        with open(file_path, 'rb') as local_file:
            archive_file.write(local_file.read())

def archive(data, album_path):
    archive_path = os.path.join(album_path, 'archive.zip')
    art_path = os.path.join(album_path, 'art.jpg')
    songs_path = os.path.join(album_path, 'songs')

    album_link = os.path.basename(album_path)

    with zipfile.ZipFile(archive_path, mode='w') as archive:
        archive_file(archive, art_path, os.path.basename(art_path))

        song_names = os.listdir(songs_path)
        for song_name in song_names:
            song_path = os.path.join(songs_path, song_name)
            song_link, ext = os.path.splitext(song_name)
            song = find_song(data, album_link, song_link)
            if song:
                archive_file(archive, song_path, song['name'] + ext)

def write_archives(data, folder_paths):
    for album_path in folder_paths:
        archive(data, album_path)

def is_album_with_songs(album_path):
    songs_path = os.path.join(album_path, 'songs')
    return (
        os.path.isdir(album_path) and
        os.path.isdir(songs_path) and
        len(os.listdir(songs_path)) > 0
    )

def get_all_folders(root):
    return [
        os.path.join(root, category_path, album_path)
        for category_path in os.listdir(root)
        for album_path in os.listdir(os.path.join(root, category_path))
        if is_album_with_songs(os.path.join(root, category_path, album_path))
    ]

def run():
    if len(sys.argv) != 3:
        print(f'Usage: {sys.argv[0]} <data.json> <path/to/static>')
        exit(1)


    data = json.load(open(sys.argv[1], mode='r'))
    root = os.path.abspath(sys.argv[2])

    folder_paths = get_all_folders(root)
    print('Creating archives for:', ', '.join([pretty_name(p) for p in folder_paths]))
    print()
    write_archives(data, folder_paths)

    print('Done.')

run()

