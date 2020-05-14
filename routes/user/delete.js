import core from "../../core";
// Constants
import { BAD_REQUEST, CREATE_SUCCESS } from "../../helpers/status";
import { USER } from "../../helpers/message";

const { User } = core;

export default (req, res, next) => {
    const id = req.params.id;

    const user = new User();
    user.setId(id);

    user.delete(err => {
          if (err) {
              return res.status(BAD_REQUEST).send({ message: err.message });
          }

          return res.status(CREATE_SUCCESS).send({ message: USER.MESSAGE_DELETE });
      });
};
