import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = value => {
  const params = {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: 'colored',
  };

  switch (value) {
    case 'warning-name':
      toast.warn(
        "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",
        params
      );
      break;
    case 'warning-number':
      toast.warn(
        'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +',
        params
      );
      break;
    default:
      console.log('нет такой натификации');
  }
};
export default notify;
