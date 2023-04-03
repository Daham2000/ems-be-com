import { Document } from "mongoose";
import { StatusCode } from "../../util/statusCode";
import IOrganization from '../../db/schemas/OrganizationSchema';

export const registerOrganizationService = (organization: Document) => {
    return organization
        .save()
        .then((res) => { return StatusCode.CREATED; })
        .catch((error) => { return error; });
};

export const getOrganization = (orgID: string) => {
    return IOrganization.findOne({orgID}).then((res) => { return res; })
        .catch((error) => { return error; })
};