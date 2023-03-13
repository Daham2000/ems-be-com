import { Document } from "mongoose";
import { StatusCode } from "../../util/statusCode";

export const addAnnouncementService = (ann: Document) => {
    return ann
        .save()
        .then((res) => { return StatusCode.CREATED; })
        .catch((error) => { return error; });
};