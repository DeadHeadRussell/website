import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/styles';
import Link from 'next/link';

import {formatTime} from '../utils';


const useStyles = makeStyles(theme => ({
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
      {description.split('\n').map((line, i) => (
        <Typography
          key={i}
          align='justify'
        >
          {line.split(/\[\[|]]/).map((text, i) => {
            if (i % 2 == 0) {
              return text;
            } else {
              const [type, content] = text.split(':');
              switch (type) {
                case 'category':
                case 'album':
                case 'song': {
                  const [link, display] = content.split('|');
                  return (
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
                        ? `/categories/${link}`
                        : type == 'album'
                        ? `/albums/${link}`
                        : type == 'song'
                        ? `/albums/${link.split('.')[0]}?song=${link.split('.')[1]}`
                        : ''
                      }
                    >
                      <a className={classes.link}>{display}</a>
                    </Link>
                  );
                }

                case 'time': {
                  const seconds = parseInt(content, 10);
                  if (!onPlay) {
                    throw Error('Cannot parse [[time:*]] in <Description /> without `onPlay`');
                  }

                  return (
                    <a
                      className={classes.link}
                      onClick={() => onPlay(seconds)}
                    >
                      {formatTime(seconds)}
                    </a>
                  );
                }
              }
            }
          })}
        </Typography>
      ))}
    </>
  );
}
