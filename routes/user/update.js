const { User } = core;
import { BAD_REQUEST, CREATE_SUCCESS } from "../../helpers/status";
import core from "../../core";
import { USER } from "../../helpers/message";
export default (req, res, next) => {
    const { id } = req.params;
    const { firstName, lastName, email, PhoneNumber } = req.body;
    // Set Fields Value
    const user = new User();
    user.setId(id);
    user.setfirstName(firstName);
    user.setlastName(lastName);
    user.setEmail(email);
    user.setphoneNumber(PhoneNumber);
    // Update user
    user.save((err, data) => {
        // Return Error message
        if (err) {
            return res.status(BAD_REQUEST).send({ message: err.message });
        }
        // Return Success message
        return res
            .status(CREATE_SUCCESS)
            .send({ message: USER.MESSAGE_UPDATE, data });
    });
};