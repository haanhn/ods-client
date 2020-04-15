
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