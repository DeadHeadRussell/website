import Container from '@material-ui/core/Container';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Typography from '@material-ui/core/Typography';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import {FC} from 'react';

import {Album as AlbumType, Category, Song as SongType} from '../../../data/types';
import {CategoryLink} from '../category/link';
import {Description} from '../description';
import {Song} from '../song';
import {HorizontalAlbumHeader} from './horizontalHeader';


const useStyles = makeStyles(theme => ({
  headerContent: {
    padding: theme.spacing(8, 0, 6)
  },

  back: {
    marginBottom: theme.spacing(1),
    textTransform: 'none'
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
          <CategoryLink categoryLink={category.link}>
            <Button
              className={classes.back}
              startIcon={<KeyboardBackspaceIcon />}
            >
              Back to {category.name}
            </Button>
          </CategoryLink>
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
