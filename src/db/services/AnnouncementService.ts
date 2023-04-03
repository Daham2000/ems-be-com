import { Document } from "mongoose";
import { StatusCode } from "../../util/statusCode";
import IAnnoucement from '../../db/schemas/AnnouncementSchema';

export const addAnnouncementService = (ann: Document): Promise<number> => {
    return ann
        .save()
        .then((res) => { return StatusCode.CREATED; })
        .catch((error) => { return StatusCode.FAILED; });
};

export const getAnnouncementService = (orgId: string): Promise<Document[]> => {
    return IAnnoucement.find({ orgId }).then((res) => {
        return res;
    }).catch((error) => { return error; });
};