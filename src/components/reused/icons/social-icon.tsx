import type React from "react";

import { default as IconAnotherLink } from "./social-store/another-link-v2.svg";
import { default as IconBehance } from "./social-store/behance.svg";
import { default as IconCodepen } from "./social-store/codepen.svg";
import { default as IconDribbble } from "./social-store/dribbble.svg";
import { default as IconFacebook } from "./social-store/facebook.svg";
import { default as IconFbMessenger } from "./social-store/fb-messenger.svg";
import { default as IconFigma } from "./social-store/figma.svg";
import { default as IconGitHub } from "./social-store/github.svg";
import { default as IconGoogleHangouts } from "./social-store/google-hangouts.svg";
import { default as IconGoogleMeet } from "./social-store/google-meet.svg";
import { default as IconInstagram } from "./social-store/instagram.svg";
import { default as IconLinkedIn } from "./social-store/linkedin.svg";
import { default as IconNetflix } from "./social-store/netflix.svg";
import { default as IconNotion } from "./social-store/notion.svg";
import { default as IconPatreon } from "./social-store/patreon.svg";
import { default as IconPinterest } from "./social-store/pinterest.svg";
import { default as IconSketch } from "./social-store/pinterest.svg";
import { default as IconSkype } from "./social-store/skype.svg";
import { default as IconSlack } from "./social-store/slack.svg";
import { default as IconTelegram } from "./social-store/telegram.svg";
import { default as IconTwitter } from "./social-store/twitter.svg";
import { default as IconViber } from "./social-store/viber.svg";
import { default as IconWhatApp } from "./social-store/whatsapp.svg";
import { default as IconYouTube } from "./social-store/youtube.svg";
import { default as IconZoom } from "./social-store/zoom.svg";

type TypeSocialIcon = {
  [name: string]: React.JSX.Element;
};

const socialIcon: TypeSocialIcon = {
  another_link: <IconAnotherLink />,
  behance: <IconBehance />,
  codepen: <IconCodepen />,
  dribbble: <IconDribbble />,
  facebook: <IconFacebook />,
  fb_messenger: <IconFbMessenger />,
  figma: <IconFigma />,
  github: <IconGitHub />,
  google_hangouts: <IconGoogleHangouts />,
  google_meet: <IconGoogleMeet />,
  instagram: <IconInstagram />,
  linkedin: <IconLinkedIn />,
  netflix: <IconNetflix />,
  notion: <IconNotion />,
  patreon: <IconPatreon />,
  pinterest: <IconPinterest />,
  sketch: <IconSketch />,
  skype: <IconSkype />,
  slack: <IconSlack />,
  telegram: <IconTelegram />,
  twitter: <IconTwitter />,
  viber: <IconViber />,
  whatsapp: <IconWhatApp />,
  youtube: <IconYouTube />,
  zoom: <IconZoom />,
};

export default socialIcon;
