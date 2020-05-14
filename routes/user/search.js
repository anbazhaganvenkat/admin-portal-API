import core from "../../core";
const { User } = core;
import { BAD_REQUEST } from "../../helpers/status";

export default (req, res, next) => {
    let {
        page,
        pageSize,
        search,
        sort,
        sortDir,
        pagination,
    } = req.query;

    // Set Search Params
    const user = new User();
    user.setPage(page);
    user.setPageSize(pageSize);
    user.setSearch(search);
    user.setSort(sort);
    user.setSortDir(sortDir);
    user.setPagination(pagination);

    user.list((err, results) => {
          if (err) {
              return res.status(BAD_REQUEST).send({ message: err.message });
          }

          return res.send(results);
      });
};
