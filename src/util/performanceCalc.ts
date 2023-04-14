function calculateEmployeeRating(qualityOfWork: number, speedRate: number, trustRate: number, 
    givenTargets: number, achievedTargets: number): number {
    const targetCompletionRate = (achievedTargets / givenTargets) * 10;
    const rating = (qualityOfWork + speedRate + trustRate + targetCompletionRate) / 4;
    return rating;
}

export default calculateEmployeeRating;