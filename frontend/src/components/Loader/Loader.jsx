import BeatLoader from 'react-spinners/BeatLoader';
import s from './Loader.module.css';

const Loader = () => {
  return (
    <div className={s.loader}>
      <BeatLoader />
    </div>
  );
};

export default Loader;
