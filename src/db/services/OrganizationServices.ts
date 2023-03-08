import { Document } from "mongoose";
import { StatusCode } from "../../util/statusCode";

export const registerOrganizationService = (organization: Document) => {
    return organization
        .save()
        .then((res) => { return StatusCode.CREATED; })
        .catch((error) => { return error; });
};