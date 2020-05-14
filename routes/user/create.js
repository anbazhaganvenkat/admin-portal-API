import core from "../../core";
const { User } = core;
import { BAD_REQUEST, CREATE_SUCCESS } from "../../helpers/status";
import { USER } from "../../helpers/message";

export default (req, res, next) => {
    const { firstName, lastName, email, phoneNumber } = req.body;

    // Set Fields Values
    const user = new User();
    user.setfirstName(firstName);
    user.setlastName(lastName);
    user.setEmail(email);
    user.setphoneNumber(phoneNumber);

    // Create Tag
    user.save((err, data) => {
        // Return Error Message
        if (err) {
            return res.status(BAD_REQUEST).send({ message: err.message });
        }

        // Return Success Message
        return res
            .status(CREATE_SUCCESS)
            .send({ message: USER.MESSAGE_CREATE, data });
    });
};
