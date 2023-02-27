import axios from 'axios';

const postIuran = ({ id }: Props) => {
  axios
    .post(`APi/${id}`, {
      username: 'dsada',
    })
    .then((payload) => {
      console.log(payload.data.userID);
    });
};

interface Props {
  id: string;
}
