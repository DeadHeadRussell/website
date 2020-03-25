import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

import Songs from './songs';
import Tags from './tags';


export default withStyles({
  title: {
    textShadow: '0px 0px 4px #333'
  },

  content: {
    maxWidth: 1386,
    margin: 'auto',
    marginTop: 50,
    padding: 12
  }
})(class Website extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {tags: []}
    };
  }

  updateFilter = (key, value) => {
    return e => {
      const {filter} = this.state;

      if (key == 'tag') {
        if (filter.tags.includes(value)) {
          this.setState({
            filter: {
              ...filter,
              tags: filter.tags.filter(tagName => tagName != value)
            }
          });
        } else {
          this.setState({
            filter: {
              ...filter,
              tags: filter.tags.concat(value)
            }
          });
        }
      } else {
        console.error(`Invalid filter key: ${key}`);
      }
    };
  }

  render() {
    const {data, classes} = this.props;
    const {filter} = this.state;

    return (
      <div>
        <AppBar position='static' color='primary'>
          <Toolbar>
            <Typography
              className={classes.title}
              color='inherit'
              variant='title'
              noWrap
            >
              Andrew Russell - Musician
            </Typography>
          </Toolbar>
        </AppBar>

        <div className={classes.content} wrap='nowrap'>
          <Grid container spacing={24} justify='center'>
            <Grid item xs={12} md={3}>
              <Tags tagsData={data.tags} filter={filter} updateFilter={this.updateFilter} />
            </Grid>

            <Grid item xs={12} md={9}>
              <Songs songsData={data.songs} filter={filter} updateFilter={this.updateFilter} />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
});

