import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import {makeStyles} from '@material-ui/core/styles';
import {FC} from 'react';

import {ChartData, Chart} from '../../../data/types';


const useStyles = makeStyles(theme => ({
  headerContent: {
    padding: theme.spacing(8, 0, 6)
  },

  grid: {
    width: '100%',
    padding: theme.spacing(2)
  },

  table: {
    maxWidth: 1000,
    margin: 'auto'
  },

  link: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    color: 'inherit',
    overflow: 'hidden',
    textDecoration: 'none'
  },

  name: {
    paddingLeft: theme.spacing(2),
    textTransform: 'none'
  },

  download: {
    width: 48
  }
}));

export interface ChartGridProps {
  charts: ChartData;
}

export interface ChartsSectionProps {
  title: string;
  charts: Chart[];
}

const ChartsSection: FC<ChartsSectionProps> = ({title, charts}) => {
  const classes = useStyles();
  return (
    <>
      <section className={classes.headerContent}>
        <Container maxWidth='lg'>
          <Typography variant='h2'>{title}</Typography>
        </Container>
      </section>
      <section>
        <Container maxWidth='lg'>
          <Table className={classes.table}>
            <TableBody>
              {charts.map(chart => (
                <TableRow key={chart.link}>
                  <TableCell>
                    <Tooltip title='View Chart'>
                      <Link href={{pathname: `/chart/${chart.link}`}}>
                        <a className={classes.link}>
                          <Button aria-label={`view chart for ${chart.name}`}>
                            <InfoIcon />
                            <Typography className={classes.name} variant='h6' noWrap>{chart.name}</Typography>
                          </Button>
                        </a>
                      </Link>
                    </Tooltip>
                  </TableCell>
                  <TableCell className={classes.download}>
                    <Tooltip title='Download Chart'>
                      <IconButton
                        aria-label={`download chart for ${chart.name}`}
                        component='a'
                        target='blank'
                        href={chart.embedUrl}
                        download={chart.name}
                      >
                        <SaveAltIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Container>
      </section>
    </>
  );
};

export const ChartsGrid: FC<ChartGridProps> = ({charts}) => {
  const classes = useStyles();

  return (
    <div className={classes.grid}>
      <ChartsSection title='Collections' charts={charts.collections} />
      <ChartsSection title='Songs' charts={charts.songs} />
    </div>
  );
};

