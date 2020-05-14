// Models
import models from "../db/models";
const { user } = models;
// Constants
import { ERROR } from "./error";
// Utils
import { isUndefined, isInteger } from "../utils/validator";
import { defaultDateFormat } from "../lib/utils";
export default function() {
    // Fields
    this.id;
    this.firstName;
    this.lastName;
    this.email;
    this.phoneNumber;
    // Search
    this.sort;
    this.sortDir;
    this.page;
    this.pageSize;
    this.search;
    this.pagination;
    /**
     * Set Id
     *
     * @param id
     */
    this.setId = id => {
        if (!isUndefined(id)) {
            this.id = id;
        }
    };
    /**
     * Set firstName
     *
     * @param firstName
     */
    this.setfirstName = firstName => {
        if (!isUndefined(firstName)) {
            this.firstName = firstName;
        }
    };
    /**
     * Set lastName
     *
     * @param lastName
     */
    this.setlastName = lastName => {
        if (!isUndefined(lastName)) {
            this.lastName = lastName;
        }
    };
    /**
     * Set email
     *
     * @param email
     */
    this.setEmail = email => {
        if (!isUndefined(email)) {
            this.email = email;
        }
    };
    /**
     * Set phoneNumber
     *
     * @param phoneNumber
     */
    this.setphoneNumber = phoneNumber => {
        if (!isUndefined(phoneNumber)) {
            this.phoneNumber = phoneNumber;
        }
    };
    /**
     * Set Sort
     *
     * @param sort
     */
    this.setSort = sort => {
        this.sort = sort;
    };
    /**
     * Set Sort Direction
     *
     * @param sortDir
     */
    this.setSortDir = sortDir => {
        this.sortDir = sortDir;
    };
    /**
     * Set Search
     *
     * @param search
     */
    this.setSearch = search => {
        this.search = search;
    };
    /**
     * Set Page
     *
     * @param page
     */
    this.setPage = page => {
        this.page = page;
    };
    /**
     * Set Page Size
     *
     * @param pageSize
     */
    this.setPageSize = pageSize => {
        this.pageSize = pageSize;
    };
    /**
     * Set pagination
     *
     * @param pagination
     */
    this.setPagination = pagination => {
        this.pagination = pagination;
    };
    /**
     * Search
     *
     * @param callback
     * @returns {*}
     */
    this.list = callback => {
        const where = {};
        const validOrder = ["ASC", "DESC"];
        const sortableFields = {
            id: "id",
            first_name: "first_name",
            last_name: "last_name",
            email: "email",
            phone: "phoneNumber",
            createdAt: "createdAt",
            updatedAt: "updatedAt"
        };
        const sortParam = this.sort || "email";
        // Validate sortable fields is present in sort param
        if (!Object.keys(sortableFields).includes(sortParam)) {
            return callback(new Error(`Unable to sort user by ${sortParam}`));
        }
        const sortDirParam = this.sortDir ? this.sortDir.toUpperCase() : "ASC";
        if (!validOrder.includes(sortDirParam)) {
            return callback(new Error("Invalid sort order"));
        }
        const page = this.page ? parseInt(this.page, 10) : 1;
        if (isNaN(page)) {
            return callback(new Error("Invalid page"));
        }
        const pageSize = this.pageSize ? parseInt(this.pageSize, 10) : 20;
        if (isNaN(pageSize)) {
            return callback(new Error("Invalid page size"));
        }
        // Search term
        const searchTerm = this.search ? this.search.trim() : null;
        if (searchTerm) {
            where.$or = [
                {
                    first_name: {
                        $ilike: `%${searchTerm}%`
                    }
                }
            ];
        }
        const query = {
            order: [[sortParam, sortDirParam]],
            where
        };
        if (this.pagination) {
            if (pageSize > 0) {
                query.limit = pageSize;
                query.offset = (page - 1) * pageSize;
            }
        }
        // Get tag list and count
        user.findAndCountAll(query).then(results => {
            // Return tag is null
            if (results.count === 0) {
                return callback();
            }
            const data = [];
            results.rows.forEach(tagData => {
                const {
                    id,
                    first_name,
                    last_name,
                    email,
                    phone,
                    createdAt,
                    updatedAt
                } = tagData.get();
                data.push({
                    id,
                    name: `${first_name} ${last_name}`,
                    email,
                    phoneNumber: phone,
                    createdAt: defaultDateFormat(createdAt),
                    updatedAt: defaultDateFormat(updatedAt)
                });
            });
            return callback(null, {
                totalCount: results.count,
                currentPage: page,
                pageSize,
                data
            });
        });
    };
    /**
     * isExit
     *
     * @param callback
     * @returns {*}
     */
    this.isExists = callback => {
        if (!this.firstName) {
            return callback();
        }
        const where = {
            first_name: this.firstName
        };
        if (this.id) {
            where.id = { $ne: this.id };
        }
        user.count({ where }).then(tagCountExist => {
            if (tagCountExist > 0) {
                return callback(new Error("user already exist"));
            }
            return callback();
        });
    };
    /**
     * Save
     *
     * @param callback
     * @returns {*}
     */
    this.save = callback => {
        this.isExists(err => {
            if (err) {
                return callback(err);
            }
            const data = {};
            if (!isUndefined(this.firstName)) {
                data.first_name = this.firstName;
            }
            if (!isUndefined(this.lastName)) {
                data.last_name = this.lastName;
            }
            if (!isUndefined(this.email)) {
                data.email = this.email;
            }
            if (!isUndefined(this.phoneNumber)) {
                data.phone = this.phoneNumber;
            }
            if (!this.id) {
                return user
                    .create(data)
                    .then(result => callback(null, result.get()))
                    .catch(err => callback(err));
            }
            return user
                .update(data, { where: { id: this.id } })
                .then(result => callback(null, result))
                .catch(err => callback(err));
        });
    };
    /**
     * Delete
     *
     * @param callback
     */
    this.delete = callback => {
        console.log(this.id);
        return user
            .findOne({ where: { id: this.id } })
            .then(userDetails => {
                console.log(userDetails, "userDetails");
                userDetails.destroy().then(() => callback());
            })
            .catch(err => callback(err));
    };
}
