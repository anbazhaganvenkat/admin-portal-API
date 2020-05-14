import models from "../../db/models";
const { admin } = models;
import { hasher } from "../../lib/utils";

export default (req, res, next) => {
	const data = req.body;

	const email = data.email;
	if (!email) {
    return res.status(400).send({ message: "Email is required" });
  }

	const password = data.password;
	if (!password) {
    return res.status(400).send({ message: "Password is required" });
	}

	admin
		.findOne({
			attributes: ["id", "first_name","last_name", "password", "session_id"],
			where: { email: data.email}
		})
		.then((adminUser) => {
			if (!adminUser) {
        return res.status(400).send({ message: "This account is not yet registered with us" });
			}

      if (!hasher(password, adminUser.password)) {
        return res.status(400).send({ message: "Invalid credentials" });
      }

			const session_id = adminUser.session_id || Math.floor(Date.now());

      res.json({
        message: "User LoggedIn SuccessFully",
        adminUser: {
          token: session_id,
          userId: adminUser.id
        }
      })
				.catch((err) => {
					req.log.error(err);
					return next(err);
				});
		});

}
