import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/styles';
import showdown from 'showdown';

import {AlbumHeader} from './header';
import {Song} from '../song';


const converter = new showdown.Converter({
  simpleLineBreaks: true
});

const useStyles = makeStyles(theme => ({
  headerContent: {
    padding: theme.spacing(8, 0, 6)
  },

  table: {
    maxWidth: 1000,
    margin: 'auto'
  }
}));

export const Album = ({album, song}) => {
  const classes = useStyles();

  return (
    <>
      <section className={classes.headerContent}>
        <Container maxWidth='sm'>
          <AlbumHeader album={album} />
        </Container>
			</section>
			{album.description && (
				<section>
					<Container maxWidth='md'>
						{album.description.split('\n').map((text, i) => (
							<Typography
								key={i}
								align='justify'
								dangerouslySetInnerHTML={{
									__html: converter.makeHtml(text)
								}}
							/>
						))}
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
