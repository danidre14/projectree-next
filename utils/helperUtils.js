const IS_SERVER = typeof window === "undefined";

const helperUtils = {
    makeString(string = "") {
        try {
            return ("" + string).trim();
        } catch {
            return "";
        }
    },
    isValidUrl(url = "") {
        if (!url) return true;
        try {
            return !!new URL(url);
        } catch {
            return false;
        }
    },
    getURL(path = "/") {
        const baseURL = IS_SERVER
            ? (process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL)
            : window.location.origin;
        return new URL(path, baseURL).toString();
    }
}

export default helperUtils;
export const makeString = helperUtils.makeString;
export const isValidUrl = helperUtils.isValidUrl;
export const getURL = helperUtils.getURL;