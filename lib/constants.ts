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

export const MICHIGAN_VOTER_URLS = {
  lookup: "https://mvic.sos.state.mi.us/",
  register: "https://mvic.sos.state.mi.us/RegisterVoter",
} as const;
