import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';

import Song from './song';

export default withStyles({

})(({songsData, classes, filter}) => (
  <Grid container spacing={16}>
    {songsData
      .filter(songData =>
        filter.tags.length == 0 ||
        !!songData.tags.find(tag => filter.tags.includes(tag.name))
      )
      .sort(function(a, b) {
        const primaryTagA = a.tags.find(tag => tag.primary).name;
        const primaryTagB = b.tags.find(tag => tag.primary).name;
        return (primaryTagA == primaryTagB)
          ? a.order == b.order
            ? (a.name < b.name) ? -1 : 1
            : a.order - b.order
          : (primaryTagA < primaryTagB) ? -1 : 1;
      })
      .map(songData => (
        <Grid key={songData.name} item xs={12} lg={6}>
          <Song songData={songData} />
        </Grid>
      ))
    }
  </Grid>
));

