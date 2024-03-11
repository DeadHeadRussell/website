import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import {FC} from 'react';

import {conf} from '../../../data';
import {Chart as ChartType} from '../../../data/types';
import {Description} from '../description';


const useStyles = makeStyles(theme => ({
  header: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  title: {
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.contrastText,
    fontFamily: `${conf.theme.funFont}, arial, sans-serif`,
    textStroke: `1.3px ${theme.palette.primary.main}`
  },

  chart: {
    margin: 'auto',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    padding: theme.spacing(4)
  },

  columns: {
    display: 'flex',
    width: 'fit-content',
    margin: 'auto',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    borderRadius: 2,
    background: 'white'
  },

  column: {
    minWidth: 400,
    margin: 0,
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  },

  inChartTitle: {
    color: '#52240b',
    display: 'block',
    fontFamily: `${conf.theme.funFont}, arial, sans-serif`,
    fontSize: '2em'
  },

  sectionHeader: {
    display: 'block',
    textDecoration: 'underline'
  },

  lyric: {
    display: 'block'
  },

  chords: {
    display: 'block',
    fontWeight: 700,
    font: 'Roboto Mono'
  },

  dimSymbol: {
    verticalAlign: 'super',
    lineHeight: 0
  }
}));

export interface ChartProps {
  chart: ChartType;
}

function parseColumn(classes: Record<string, string>, column: string) {
  return column.split('\n').map((line, i) => parseLine(classes, line, i));
}

function parseLine(classes: Record<string, string>, line: string, index: number) {
  const sectionRegexes = [
    /^Verse( \d)?$/,
    /^(\w+-)?Chorus( \d)?$/,
    /^Bridge$/,
    /^Intro$/,
    /^Outro/,
    /^(\w+ )?Solo$/,
    /^(\w+ )?Section$/,
    /^Interlude( \d)?/,
    /^Reprise$/,
    /^Jam$/
  ];

  if (!line.trim()) {
    return (
      <span key={index} className={classes.lyric}> </span>
    );
  }

  const isTitle = line.startsWith('!title:');
  if (isTitle) {
    return (
      <span key={index} className={classes.inChartTitle}>{line.replace('!title:', '')}</span>
    );
  }

  const isSection = sectionRegexes.some(r => r.test(line.trim()));
  if (isSection) {
    return (
      <span key={index} className={classes.sectionHeader}>{line}</span>
    );
  }

  const isChords = (line.length / line.replace(/\s/g, '').length) > 2;
  if (isChords) {
    return (
      <span key={index} className={classes.chords}>{line.split('').map(c => {
        if (c == 'o') {
          return <span className={classes.dimSymbol}>{c}</span>;
        }
        return c;
      })}</span>
    );
  }

  return (
    <span key={index} className={classes.lyric}>{line.replace(/█/g, ' ')}</span>
  );
}

export const Chart: FC<ChartProps> = ({chart}) => {
  const classes = useStyles();

  return (
    <Container maxWidth='md'>
      <Paper className={classes.chart}>
        <section className={classes.header}>
          <Typography className={classes.title} variant='h3'>{chart.name}</Typography>
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
        </section>
        <div className={classes.columns}>
          {chart.columns.map((column, i) => (
            <pre key={i} className={classes.column}>{parseColumn(classes, column)}</pre>
          ))}
        </div>
      </Paper>
    </Container>
  );
};

