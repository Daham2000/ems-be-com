export default interface IPerformanceReport {
    perId: string,
    empID: string,
    month: string,
    year: number,
    qualityOfWork: number,
    speedRate: number,
    trustRate: number,
    givenTargets: number,
    achivedTargets: number,
    description: string,
    overviewRate: number
}