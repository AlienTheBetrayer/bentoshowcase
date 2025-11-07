export const CSSVariable = (variable: string): string => {
    const root = document.documentElement;
    const computed = getComputedStyle(root).getPropertyValue(variable).trim();

    return computed;
};
