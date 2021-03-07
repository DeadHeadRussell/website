import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import React from 'react';
import Link from 'next/link';

import {formatTime} from '../utils';


const useStyles = makeStyles(theme => ({
  paragraph: {
    paddingBottom: theme.spacing(0.5)
  },

  section: {
    margin: 0
  },

  link: {
    color: '#00e',
    cursor: 'pointer',
    textDecoration: 'none'
  }
}));

export type DescriptionProps = {
  description: string;
  onPlay?: (seconds: number) => void;
};

export const Description: React.FC<DescriptionProps> = ({description, onPlay}) => {
  const classes = useStyles();

  return (
    <>
      {description.split(/<<|>>/).map((text, i) => {
        if (i % 2 == 0) {
          if (!text) {
            return null;
          } else {
            return (
              <React.Fragment key={i}>
                {text.split('\n').map((line, i) => (
                  <Typography
                    key={i}
                    classes={{
                      root: classes.paragraph
                    }}
                    align='justify'
                  >
                    {line.split(/\[\[|]]/).map((text, i) => {
                      if (i % 2 == 0) {
                        return text;
                      } else {
                        const [Component, type, content, display] = parseCommand(text);
                        return (
                          <Component
                            className={classes.link}
                            type={type}
                            content={content}
                            display={display}
                            onPlay={onPlay}
                          />
                        );
                      }
                    })}
                  </Typography>
                ))}
              </React.Fragment>
            );
          }
        } else {
          const [Component, type, content, display] = parseCommand(text);
          return (
            <Typography
              key={i}
              component='div'
              align='justify'
            >
              <Component
                className={classes.section}
                type={type}
                content={content}
                display={display}
              />
            </Typography>
          );
        }
      })}
    </>
  );
}


type CommandProps = {
  className: string;
  type: string;
  content: string;
  display: string;
  onPlay?: (seconds: number) => void;
};


function parseCommand(text: string): [React.FC<CommandProps>, string, string, string] {
  const [type, ...contentParts] = text.split(':');
  const [content, ...displayParts] = contentParts.join(':').split('|');
  const display = displayParts.join('|');
  switch (type) {
    case 'category':
    case 'album':
    case 'song': {
      return [ContentLink, type, content, display];
    }

    case 'time': {
      return [TimeLink, type, content, display];
    }

    case 'list': {
      return [ListSection, type, content, display];
    }

    default: {
      throw Error(`Invalid link type of ${type} found in ${text}.`);
    }
  }
}

const ContentLink: React.FC<CommandProps> = ({className, type, content, display}) => (
  <Link
    href={type == 'category'
      ? '/categories/[id]'
      : type == 'album'
      ? '/albums/[id]'
      : type == 'song'
      ? '/albums/[id]'
      : ''
    }
    as={type == 'category'
      ? `/categories/${content}`
      : type == 'album'
      ? `/albums/${content}`
      : type == 'song'
      ? `/albums/${content.split('.')[0]}?song=${content.split('.')[1]}`
      : ''
    }
  >
    <a className={className}>{display}</a>
  </Link>
);

const TimeLink: React.FC<CommandProps> = ({className, type, content, display, onPlay}) => {
  const seconds = parseInt(content, 10);
  if (!onPlay) {
    throw Error('Cannot parse [[time:*]] in <Description /> without `onPlay`');
  }

  return (
    <a
      className={className}
      onClick={() => onPlay(seconds)}
    >
      {display || formatTime(seconds)}
    </a>
  );
}

const ListSection: React.FC<CommandProps> = ({className, type, content, display}) => {
  const items = content.split('\n').filter(i => !!i).map(i => i.slice(2));
  return (
    <>
      {display}
      <ul className={className}>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </>
  );
}

