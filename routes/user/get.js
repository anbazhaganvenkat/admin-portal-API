import models from "../../db/models";

const { user } = models;

export default (req, res, next) => {
    const { id } = req.params;

   user.findOne({
        where: { id },
    })
        .then(userDetails => {
            if (!userDetails) {
                return res.status(400).send({ message: "User not found" });
            }

            const {
                id,
                first_name,
              last_name,
              phone,
              email
            } = userDetails.get();

            const data = {
                id,
              firstName: first_name,
              lastName: last_name,
              phoneNumber: phone,
              email
            };

            res.status(200).send(data);
        })
        .catch(err => res.status(400).send({ message: err.message }));
};
