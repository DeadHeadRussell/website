import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/styles';
import Link from 'next/link';


const useStyles = makeStyles(theme => ({
  link: {
    color: '#00e',
    textDecoration: 'none'
  }
}));

export type DescriptionProps = {
  description: string;
};

export const Description: React.FC<DescriptionProps> = ({description}) => {
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
              const [id, display] = text.split('|');
              const [type, link] = id.split(':');
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
          })}
        </Typography>
      ))}
    </>
  );
}
