import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import {FC} from 'react';

import {Album, Category} from '../../data/types';
import {AlbumHeader} from './header';


const useStyles = makeStyles(theme => ({
  grid: {
    width: '100%',
    padding: theme.spacing(2)
  }
}));

export interface AlbumGridProps {
  albums: Album[];
}

export const AlbumGrid: FC<AlbumGridProps> = ({albums}) => {
  const classes = useStyles();

  return (
    <div className={classes.grid}>
      <Grid container spacing={4}>
        {albums.map(album => (
          <Grid key={album.category.link + '_' + album.link} item xs={12} sm={6} md={6} lg={4}>
            <AlbumHeader album={album} link={true} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

