import { CONTACT_EMAIL, LOCATION } from "./site";

export type TextSection = { heading: string; paragraphs: string[]; list?: string[] };

export const PRIVACY_UPDATED = "25 October 2026";

export const CONTACT_REASONS: { name: string; body: string }[] = [
  {
    name: "Builders",
    body: "Tell us what your product does and who it is for. What builders tell us shapes how product profiles are designed.",
  },
  {
    name: "Users",
    body: "Describe a job you tried to find an AI product for and could not. Specific failures are more useful to us than general interest.",
  },
  {
    name: "Partners and investors",
    body: "Write with a short note on who you are and what you have in mind.",
  },
  {
    name: "Your data",
    body: "Ask what we hold about you, ask for a correction, or ask to be removed from the waitlist. Send it from the address you signed up with.",
  },
];

export const CONTACT_FACTS: { k: string; v: string }[] = [
  { k: "Email", v: CONTACT_EMAIL },
  { k: "Based in", v: `${LOCATION.locality}, ${LOCATION.region}, India` },
  { k: "Status", v: "Private build. No public product, no sales team, no support desk." },
];

export const PRIVACY_SECTIONS: TextSection[] = [
  {
    heading: "What we collect",
    paragraphs: [
      "The only personal data AGENYRA collects is what you type into the waitlist form. Required: name, email address and phone number. Optional: company, website, LinkedIn URL, the role that describes you, the areas you are interested in, and a free-text message.",
      "We also store where the signup came from (for example a ref or utm_source value in the link you followed) and an internal status and notes field we use to track follow-up.",
    ],
  },
  {
    heading: "What we do with it",
    paragraphs: [
      "We use it to contact you about AGENYRA: access, early builds, and questions about what you need. Nothing is sent automatically. There is no newsletter, and your details are not sold, rented or shared with anyone for marketing.",
    ],
  },
  {
    heading: "Where it is stored",
    paragraphs: [
      "Waitlist entries are stored in a Postgres database run by Supabase in its Mumbai region (ap-south-1). The site is hosted on Vercel, with server functions in Mumbai (bom1). Row-level security is on and the table has no public access; only the site's server can read or write it.",
    ],
  },
  {
    heading: "Abuse protection",
    paragraphs: [
      "To limit spam, each signup attempt records a SHA-256 hash of your IP address combined with a secret salt. The raw IP address is not stored, and hashes are deleted after one day.",
    ],
  },
  {
    heading: "Cookies",
    paragraphs: [
      "After you join the waitlist, the site sets one cookie, agenyra_waitlist, so the confirmation stays visible if you reload the page. It is limited to /waitlist, is not readable by scripts, and expires after a year. No other cookies are set, and there are no advertising or third-party trackers.",
    ],
  },
  {
    heading: "Analytics",
    paragraphs: [
      "Page views are counted with Vercel Web Analytics. It does not use cookies and does not store IP addresses; visitors are told apart by a hash of the request that is discarded after a day. We see totals such as page views, referrers, countries and device types, not individuals.",
    ],
  },
  {
    heading: "How long we keep it",
    paragraphs: [
      "Waitlist entries are kept until you ask us to remove them, or until AGENYRA no longer needs a waitlist, whichever comes first.",
    ],
  },
  {
    heading: "Your choices",
    paragraphs: [
      `Email ${CONTACT_EMAIL} from the address you signed up with to see what we hold about you, correct it, or delete it. If you only want us to stop contacting you, say so and we will mark your entry as do-not-contact.`,
    ],
  },
];
