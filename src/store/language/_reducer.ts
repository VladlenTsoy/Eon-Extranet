export const FETCH_LANGUAGES = "FETCH_LANGUAGES";

export const defaultLanguageState = [];

export const languagesAction = {
    [FETCH_LANGUAGES]: (state: any) => ({languages: state}),
};
