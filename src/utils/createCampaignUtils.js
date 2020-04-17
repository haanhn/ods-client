//Get initEndDate in step 3
export const getInitEndDate = (endDateStr) => {
    if (!endDateStr) {
        return null;
    }
    let endDate = null;
    try {
        endDate = new Date(endDateStr);
    } catch (error) {
        console.log(error);
    }
    return endDate;
}

//Params: steps: array [1, 0, 0, 0, 0]
// 1: done; 0: not done
export const getMaxStepsDone = (steps) => {
    if (!steps || steps.length === 0) {
        return 1;
    }
    let i = 0;
    let maxStep = 1;
    for (i = 0; i < 5; i++ ) {
        if (steps[i] === 0) {
            maxStep = i + 1;
            break;
        }
    }
    return maxStep;
}

export const getInitStepIndex = (steps) => {
    if (!steps || steps.length === 0) {
        return 0;
    }
    let i = 0;
    let currentStep = 0;
    for (i = 0; i < 5; i++ ) {
        if (steps[i] === 0) {
            currentStep = i;
            break;
        }
    }
    return currentStep;
}

//params: campaign: object returned from request api
export const getAllStepsOfSettingCamppaign = (campaign, user, bankAccount) => {
    let steps = [0, 0, 0, 0, 0];
    if (campaign) {
        const hasTitle = campaign.campaignTitle ? true : false;
        const hasGoal = campaign.campaignGoal ? true : false;
        const hasImage = campaign.campaignThumbnail ? true : false;
        const hasStory = campaign.campaignDescription ? true : false;
        const hasEndDate = campaign.campaignEndDate ? true : false;
        let hasUserAddress = false;
        let hasBankAccount = false;
        if (user && bankAccount) {
            hasUserAddress = user.address ? true : false;
            const hasAccountNumber = bankAccount.accountNumber ? true : false;
            const hasBank = bankAccount.bankName ? true : false;
            if (hasAccountNumber && hasBank) {
                hasBankAccount = true;
            }
        }
        if (hasTitle && hasGoal && hasEndDate && hasUserAddress && hasBankAccount) {
            steps = [1, 1, 1, 1, 0];
        } else if (hasTitle && hasGoal && hasEndDate) {
            steps = [1, 1, 1, 0, 0];
        } else if (hasImage || hasStory) {
            steps = [1, 1, 0, 0, 0];
        } else if (hasTitle) {
            steps = [1, 0, 0, 0, 0];
        }
    }
    return steps;
}