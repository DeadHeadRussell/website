import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import showdown from 'showdown';

import Tag from './tag';

const converter = new showdown.Converter({
  simpleLineBreaks: true
});

export default withStyles({
  song: {
    maxWidth: 600,
    margin: 'auto'
  },
  tagsContainer: {
    display: 'flex',
    flexFlow: 'row wrap'
  },
  tagsItem: {
    flex: '0 0 auto',
    margin: 4
  },
  expandIcon: theme => ({
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duraction: theme.transitions.duration.shortest
    })
  }),
  expandOpen: {
    transform: 'rotation(180deg)'
  }
})(class Song extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showLyrics: false}
  }

  toggleLyrics = () => {
    const {showLyrics} = this.state;
    this.setState({showLyrics: !showLyrics});
  }

  render() {
    const {songData, classes, updateFilter} = this.props;
    const {showLyrics} = this.state;

    return (
      <Card className={classes.song}>
        <CardContent>
          <Typography variant='headline' component='h3'>
            {songData.name}
          </Typography>
          <Typography
            component='div'
            dangerouslySetInnerHTML={{
              __html: converter.makeHtml(songData.description)
            }}
          />
          <CardMedia
            src={`/audio/${songData.name}.mp3`}
            component='audio'
            controls
          />
        </CardContent>
        <CardActions>
          <div className={classes.tagsContainer}>
            {songData.tags.map(tag => (
              <div key={tag.name} className={classes.tagsItem}>
                <Tag tagData={tag} />
              </div>
            ))}
          </div>

          {songData.lyrics
            ? (
              <IconButton
                className={`${classes.expandIcon} ${showLyrics ? classes.expandOpen : ''}`}
                onClick={this.toggleLyrics}
                aria-expanded={showLyrics}
                arial-label='Show Lyrics'
              >
                <ExpandMoreIcon />
              </IconButton>
            )
            : null
          }
        </CardActions>
        <Collapse in={showLyrics}>
          <CardContent>
            <Typography>Lyrics</Typography>
            <Typography
              component='div'
              dangerouslySetInnerHTML={{
                __html: converter.makeHtml(songData.lyrics)
              }}
            />
          </CardContent>
        </Collapse>
      </Card>
    );
  }
});

