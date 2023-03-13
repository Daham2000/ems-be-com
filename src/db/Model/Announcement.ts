export default interface IAnnouncement {
    annId: string;
    announcementTitle: string;
    message: string;
    date: string;
    sendBy: string;
    sendTo: string[];
    orgId: string;
}