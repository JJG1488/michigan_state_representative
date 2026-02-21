export const SITE_NAME = "Vote Candace Calloway";
export const SITE_URL = "https://votecandacecalloway.com";
export const SITE_DESCRIPTION = "Candace Calloway for Michigan State House Representative — Lead with Hope. Fighting for affordability, education, and safe infrastructure in NW Detroit, Oak Park, and Royal Oak Township.";

export const NAV_ITEMS = [
  { label: "About", href: "/about" },
  { label: "Issues", href: "/issues" },
  { label: "Get Involved", href: "/get-involved" },
] as const;

export const SECONDARY_NAV_ITEMS = [
  { label: "District", href: "/district" },
  { label: "Endorsements", href: "/endorsements" },
  { label: "Events", href: "/events" },
  { label: "Voter Info", href: "/voter-info" },
  { label: "Research", href: "/research" },
  { label: "Contact", href: "/contact" },
] as const;

export const IMPACT_MESSAGES: Record<number, string> = {
  25: "Covers 50 door hangers reaching families in Oak Park",
  50: "Funds campaign materials for a neighborhood canvass",
  100: "Powers a community town hall in Royal Oak Township",
  250: "Enables a week of targeted digital outreach to 5,000 voters",
  500: "Funds a full community event with speakers and refreshments",
  1000: "Powers a month of grassroots organizing across all three communities",
};

export const DEFAULT_IMPACT_MESSAGE = "Every dollar powers the movement for affordable, educated, and connected communities";

export const MICHIGAN_VOTER_URLS = {
  lookup: "https://mvic.sos.state.mi.us/",
  register: "https://mvic.sos.state.mi.us/RegisterVoter",
} as const;
