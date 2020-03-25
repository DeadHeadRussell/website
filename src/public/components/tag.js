import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import {withStyles} from '@material-ui/core/styles';

export default withStyles({
})(function Tag({tagData, classes}) {
  return (
    <Tooltip title={tagData.description}>
      <Chip
        color={tagData.primary ? 'primary' : undefined}
        label={tagData.name}
      />
    </Tooltip>
  );
});

