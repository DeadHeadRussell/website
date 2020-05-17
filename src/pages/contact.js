import {Contact} from '../components/contact';
import {Root} from '../components/root';
import {processData} from '../data';
import {readData} from '../dataReader';


const ContactPage = ({menuData, audioPlayerData}) => (
  <Root menuData={menuData} audioPlayerData={audioPlayerData}>
    <Contact />
  </Root>
);

export const getStaticProps = async () => {
  const rawData = await readData();
  const {menuData, audioPlayerData} = processData(rawData);
  return {props: {menuData, audioPlayerData}};
};

export default ContactPage;

