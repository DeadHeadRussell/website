import Container from '@material-ui/core/Container';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import {FC} from 'react';

import {Album as AlbumType, Category, Song as SongType} from '../../../data/types';
import {Description} from '../description';
import {Song} from '../song';
import {HorizontalAlbumHeader} from './horizontalHeader';


const useStyles = makeStyles(theme => ({
  headerContent: {
    padding: theme.spacing(8, 0, 6)
  },

  table: {
    maxWidth: 1000,
    margin: 'auto'
  }
}));

export interface AlbumProps {
  album: AlbumType;
  category: Category;
  song?: SongType;
}

export const Album: FC<AlbumProps> = ({album, category, song}) => {
  const classes = useStyles();

  return (
    <>
      <section className={classes.headerContent}>
        <Container maxWidth='lg'>
          <HorizontalAlbumHeader album={album} />
        </Container>
			</section>
			{album.description && (
				<section>
					<Container maxWidth='md'>
            <Description description={album.description} context={{category, album}} />
					</Container>
				</section>
			)}
      <section>
        <Container maxWidth='lg'>
					<Table className={classes.table}>
						<TableBody>
							{album.songs.map((listSong, index) => (
								<Song
                  key={index}
                  playIndex={index + 1}
                  category={category}
                  album={album}
                  song={listSong}
                  active={song === listSong}
                />
							))}
						</TableBody>
					</Table>
        </Container>
			</section>
    </>
  );
};
