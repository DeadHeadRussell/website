import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {FC} from 'react';

import {Category as CategoryType} from '../../../data/types';
import {AlbumGrid} from '../album/grid';
import {Description} from '../description';

const useStyles = makeStyles(theme => ({
  content: {
    margin: 'auto',
    marginTop: theme.spacing(2),
    maxWidth: 750,
    lineHeight: 1.3
  }
}));

export interface CategoryProps {
  category: CategoryType
};

export const Category: FC<CategoryProps> = ({category}) => {
  const classes = useStyles();
  return (
    <>
      <Card>
        <CardContent>
          <Typography variant='h3' align='center'>{category.name}</Typography>
          <div className={classes.content}>
            <Description description={category.description} small={true} context={{category}} />
          </div>
        </CardContent>
      </Card>
      <AlbumGrid albums={category.albums} />
    </>
  );
};

