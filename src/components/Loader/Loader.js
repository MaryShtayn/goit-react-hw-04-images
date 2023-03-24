import { Hearts } from 'react-loader-spinner';
import { Overlay } from 'components/Modal/Modal.styled';

export const Loader = () => {
  return (
    <Overlay>
      <Hearts
        height="80"
        width="240"
        color="#a94d69"
        ariaLabel="hearts-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </Overlay>
  );
};
