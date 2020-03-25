import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

import Tag from './tag';

const TagList = withStyles({
  header: {
    padding: 16,
    paddingBottom: 0
  }
})(({classes, header, tagsData, filter, updateFilter}) => (
  <React.Fragment>
    <Typography className={classes.header} variant='subheading'>{header}</Typography>
    <List dense>
      {tagsData.map(tagData => (
        <ListItem
          key={tagData.name}
          button
          onClick={updateFilter('tag', tagData.name)}
        >
          <Checkbox checked={filter.includes(tagData.name)} />
          <ListItemText primary={tagData.name} />
        </ListItem>
      ))}
    </List>
  </React.Fragment>
));

export default withStyles({
  container: {
    maxWidth: 220,
    margin: 'auto'
  }
})(function Tags({tagsData, classes, filter, updateFilter}) {
  const primaryTags = tagsData.filter(tagData => tagData.primary);
  const otherTags = tagsData.filter(tagData => !tagData.primary);

  return (
    <Paper className={classes.container}>
      <TagList header='Primary' tagsData={primaryTags} filter={filter.tags} updateFilter={updateFilter} />
      <TagList header='Other' tagsData={otherTags} filter={filter.tags} updateFilter={updateFilter} />
    </Paper>
  );
});

