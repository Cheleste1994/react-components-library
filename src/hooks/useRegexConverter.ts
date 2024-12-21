export function useRegexConverter() {
  const regexToString = (regex: RegExp): string => regex.toString();

  const stringToRegex = (regexStr: string | null): RegExp | null => {
    if (!regexStr) return null;

    const lastSlash = regexStr.lastIndexOf('/');
    try {
      return new RegExp(regexStr.slice(1, lastSlash), regexStr.slice(lastSlash + 1));
    } catch {
      return null;
    }
  };

  return { regexToString, stringToRegex };
}
