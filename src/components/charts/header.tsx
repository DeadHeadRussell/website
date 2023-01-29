import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import Link from 'next/link';
import {FC, ReactNode} from 'react';

import {createPlaylistFromChart} from '../../audioPlayer';
import {Chart} from '../../data';
import {formatTime} from '../../utils';
import {PlayButton} from '../playButton';


const useStyles = makeStyles(theme => ({
  chart: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%'
  },

  spacing: {
    marginTop: '135%'
  },

  chartText: {
    flexGrow: 1,
    display: 'block',
    height: '100%'
  },

  link: {
    display: 'block',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: theme.spacing(2),
    color: 'inherit',
    overflow: 'hidden',
    textDecoration: 'none'
  },

  chartEmbed: {
    width: '100%',
    height: '100%'
  }
}));

export interface ChartHeaderProps {
  chart: Chart;
  link?: boolean;
}

export const ChartHeader: FC<ChartHeaderProps> = ({chart, link}) => {
  const classes = useStyles();

  const Wrapper: FC<{}> = link
    ? ({children}) => (
      <Link href={{pathname: '/chart/[id]'}} as={{pathname: `/chart/${chart.link}`}}>
        <a className={classes.link}>{children}</a>
      </Link>
    ) : ({children}) => <>{children}</>;

  return (
    <Card className={classes.chart}>
      <div className={classes.spacing} />
      <Wrapper>
        <CardContent className={classes.chartText}>
          <Typography variant='h4' align='center'>
            {chart.name}
          </Typography>
          <iframe
            className={classes.chartEmbed}
            src={chart.embedUrl}
            allow='autoplay'
            frameBorder={0}
          />
        </CardContent>
      </Wrapper>
    </Card>
  );
};

