export const isWordComplete = (
    currentTypedText: string,
    sentenceWords: string[],
    currentTargetWordIndex: number
) => {
    return (
        currentTypedText === sentenceWords[currentTargetWordIndex] + " " ||
        (currentTypedText === sentenceWords[currentTargetWordIndex] &&
            sentenceWords.length === currentTargetWordIndex + 1)
    );
};