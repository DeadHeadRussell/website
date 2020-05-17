import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import {makeStyles} from '@material-ui/styles';

import {HorizontalAlbumHeader} from './horizontalHeader';
import {Description} from '../description';
import {Song} from '../song';


const useStyles = makeStyles(theme => ({
  headerContent: {
    padding: theme.spacing(8, 0, 6)
  },

  table: {
    maxWidth: 1000,
    margin: 'auto'
  }
}));

export const Album = ({album, category, song}) => {
  const classes = useStyles();

  return (
    <>
      <section className={classes.headerContent}>
        <Container maxWidth='lg'>
          <HorizontalAlbumHeader album={album} category={category} />
        </Container>
			</section>
			{album.description && (
				<section>
					<Container maxWidth='md'>
            <Description description={album.description} />
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
