import { Document } from "mongoose";
import { StatusCode } from "../../util/statusCode";

export const addEmployeeService = (employee: Document) => {
    return employee
        .save()
        .then((res) => { return StatusCode.CREATED; })
        .catch((error) => { return error; });
};