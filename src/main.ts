// Every page loads this module. The pages themselves are static HTML; these
// custom elements add interactivity wherever their tags appear.
import { captureReferral } from "./lib/referral";
import "./elements/caa-ballot";
import "./elements/caa-carousel";
import "./elements/caa-menu";
import "./elements/caa-popover";
import "./elements/caa-scroll-to";
import "./elements/caa-subscribe-form";
import "./elements/caa-youtube";

// Remember a referral code from a shared link (/r/CODE lands here as ?ref=CODE).
captureReferral();
