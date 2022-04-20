
import { IconsMapType } from "@svgr-iconkit/core";

// import assets
import SVG_anchor from "./anchor";
import SVG_arrowBack from "./arrow-back";
import SVG_arrowDown from "./arrow-down";
import SVG_arrowForward from "./arrow-forward";
import SVG_arrowLeft from "./arrow-left";
import SVG_arrowLoop from "./arrow-loop";
import SVG_arrowMaximise from "./arrow-maximise";
import SVG_arrowMinimise from "./arrow-minimise";
import SVG_arrowMove from "./arrow-move";
import SVG_arrowRepeat from "./arrow-repeat";
import SVG_arrowRight from "./arrow-right";
import SVG_arrowSync from "./arrow-sync";
import SVG_arrowUp from "./arrow-up";
import SVG_attachment from "./attachment";
import SVG_backspace from "./backspace";
import SVG_calendar from "./calendar";
import SVG_camera from "./camera";
import SVG_cancel from "./cancel";
import SVG_chartArea from "./chart-area";
import SVG_chartBar from "./chart-bar";
import SVG_chartLine from "./chart-line";
import SVG_chartPie from "./chart-pie";
import SVG_chevronLeft from "./chevron-left";
import SVG_chevronRight from "./chevron-right";
import SVG_cloudStorage from "./cloud-storage";
import SVG_code from "./code";
import SVG_cog from "./cog";
import SVG_delete from "./delete";
import SVG_divide from "./divide";
import SVG_download from "./download";
import SVG_eject from "./eject";
import SVG_equals from "./equals";
import SVG_export from "./export";
import SVG_eye from "./eye";
import SVG_flag from "./flag";
import SVG_flash from "./flash";
import SVG_globe from "./globe";
import SVG_group from "./group";
import SVG_heartFull from "./heart-full";
import SVG_heartHalf from "./heart-half";
import SVG_heart from "./heart";
import SVG_home from "./home";
import SVG_image from "./image";
import SVG_infinity from "./infinity";
import SVG_infoLarge from "./info-large";
import SVG_info from "./info";
import SVG_inputChecked from "./input-checked";
import SVG_key from "./key";
import SVG_link from "./link";
import SVG_locationArrow from "./location-arrow";
import SVG_location from "./location";
import SVG_lockClosed from "./lock-closed";
import SVG_lockOpen from "./lock-open";
import SVG_mediaEject from "./media-eject";
import SVG_mediaFastForward from "./media-fast-forward";
import SVG_mediaPause from "./media-pause";
import SVG_mediaPlayReverse from "./media-play-reverse";
import SVG_mediaPlay from "./media-play";
import SVG_mediaRecord from "./media-record";
import SVG_mediaRewind from "./media-rewind";
import SVG_mediaStop from "./media-stop";
import SVG_microphone from "./microphone";
import SVG_minus from "./minus";
import SVG_notes from "./notes";
import SVG_phone from "./phone";
import SVG_pi from "./pi";
import SVG_pin from "./pin";
import SVG_plane from "./plane";
import SVG_plus from "./plus";
import SVG_pointOfInterest from "./point-of-interest";
import SVG_power from "./power";
import SVG_puzzle from "./puzzle";
import SVG_radar from "./radar";
import SVG_refresh from "./refresh";
import SVG_rss from "./rss";
import SVG_scissors from "./scissors";
import SVG_socialSkype from "./social-skype";
import SVG_sortAlphabetically from "./sort-alphabetically";
import SVG_sortNumerically from "./sort-numerically";
import SVG_spanner from "./spanner";
import SVG_starFull from "./star-full";
import SVG_starHalf from "./star-half";
import SVG_star from "./star";
import SVG_starburst from "./starburst";
import SVG_tabs from "./tabs";
import SVG_thLarge from "./th-large";
import SVG_thList from "./th-list";
import SVG_thMenu from "./th-menu";
import SVG_thSmall from "./th-small";
import SVG_tick from "./tick";
import SVG_times from "./times";
import SVG_upload from "./upload";
import SVG_userAdd from "./user-add";
import SVG_userDelete from "./user-delete";
import SVG_user from "./user";
import SVG_video from "./video";
import SVG_warning from "./warning";
import SVG_waves from "./waves";
import SVG_wiFi from "./wi-fi";
import SVG_world from "./world";
import SVG_zoomIn from "./zoom-in";
import SVG_zoomOut from "./zoom-out";
import SVG_zoom from "./zoom"

// types
export type IconNames = "anchor" | "arrow-back" | "arrow-down" | "arrow-forward" | "arrow-left" | "arrow-loop" | "arrow-maximise" | "arrow-minimise" | "arrow-move" | "arrow-repeat" | "arrow-right" | "arrow-sync" | "arrow-up" | "attachment" | "backspace" | "calendar" | "camera" | "cancel" | "chart-area" | "chart-bar" | "chart-line" | "chart-pie" | "chevron-left" | "chevron-right" | "cloud-storage" | "code" | "cog" | "delete" | "divide" | "download" | "eject" | "equals" | "export" | "eye" | "flag" | "flash" | "globe" | "group" | "heart-full" | "heart-half" | "heart" | "home" | "image" | "infinity" | "info-large" | "info" | "input-checked" | "key" | "link" | "location-arrow" | "location" | "lock-closed" | "lock-open" | "media-eject" | "media-fast-forward" | "media-pause" | "media-play-reverse" | "media-play" | "media-record" | "media-rewind" | "media-stop" | "microphone" | "minus" | "notes" | "phone" | "pi" | "pin" | "plane" | "plus" | "point-of-interest" | "power" | "puzzle" | "radar" | "refresh" | "rss" | "scissors" | "social-skype" | "sort-alphabetically" | "sort-numerically" | "spanner" | "star-full" | "star-half" | "star" | "starburst" | "tabs" | "th-large" | "th-list" | "th-menu" | "th-small" | "tick" | "times" | "upload" | "user-add" | "user-delete" | "user" | "video" | "warning" | "waves" | "wi-fi" | "world" | "zoom-in" | "zoom-out" | "zoom";

// map
export const map: IconsMapType<IconNames> = {
"anchor": SVG_anchor,
"arrow-back": SVG_arrowBack,
"arrow-down": SVG_arrowDown,
"arrow-forward": SVG_arrowForward,
"arrow-left": SVG_arrowLeft,
"arrow-loop": SVG_arrowLoop,
"arrow-maximise": SVG_arrowMaximise,
"arrow-minimise": SVG_arrowMinimise,
"arrow-move": SVG_arrowMove,
"arrow-repeat": SVG_arrowRepeat,
"arrow-right": SVG_arrowRight,
"arrow-sync": SVG_arrowSync,
"arrow-up": SVG_arrowUp,
"attachment": SVG_attachment,
"backspace": SVG_backspace,
"calendar": SVG_calendar,
"camera": SVG_camera,
"cancel": SVG_cancel,
"chart-area": SVG_chartArea,
"chart-bar": SVG_chartBar,
"chart-line": SVG_chartLine,
"chart-pie": SVG_chartPie,
"chevron-left": SVG_chevronLeft,
"chevron-right": SVG_chevronRight,
"cloud-storage": SVG_cloudStorage,
"code": SVG_code,
"cog": SVG_cog,
"delete": SVG_delete,
"divide": SVG_divide,
"download": SVG_download,
"eject": SVG_eject,
"equals": SVG_equals,
"export": SVG_export,
"eye": SVG_eye,
"flag": SVG_flag,
"flash": SVG_flash,
"globe": SVG_globe,
"group": SVG_group,
"heart-full": SVG_heartFull,
"heart-half": SVG_heartHalf,
"heart": SVG_heart,
"home": SVG_home,
"image": SVG_image,
"infinity": SVG_infinity,
"info-large": SVG_infoLarge,
"info": SVG_info,
"input-checked": SVG_inputChecked,
"key": SVG_key,
"link": SVG_link,
"location-arrow": SVG_locationArrow,
"location": SVG_location,
"lock-closed": SVG_lockClosed,
"lock-open": SVG_lockOpen,
"media-eject": SVG_mediaEject,
"media-fast-forward": SVG_mediaFastForward,
"media-pause": SVG_mediaPause,
"media-play-reverse": SVG_mediaPlayReverse,
"media-play": SVG_mediaPlay,
"media-record": SVG_mediaRecord,
"media-rewind": SVG_mediaRewind,
"media-stop": SVG_mediaStop,
"microphone": SVG_microphone,
"minus": SVG_minus,
"notes": SVG_notes,
"phone": SVG_phone,
"pi": SVG_pi,
"pin": SVG_pin,
"plane": SVG_plane,
"plus": SVG_plus,
"point-of-interest": SVG_pointOfInterest,
"power": SVG_power,
"puzzle": SVG_puzzle,
"radar": SVG_radar,
"refresh": SVG_refresh,
"rss": SVG_rss,
"scissors": SVG_scissors,
"social-skype": SVG_socialSkype,
"sort-alphabetically": SVG_sortAlphabetically,
"sort-numerically": SVG_sortNumerically,
"spanner": SVG_spanner,
"star-full": SVG_starFull,
"star-half": SVG_starHalf,
"star": SVG_star,
"starburst": SVG_starburst,
"tabs": SVG_tabs,
"th-large": SVG_thLarge,
"th-list": SVG_thList,
"th-menu": SVG_thMenu,
"th-small": SVG_thSmall,
"tick": SVG_tick,
"times": SVG_times,
"upload": SVG_upload,
"user-add": SVG_userAdd,
"user-delete": SVG_userDelete,
"user": SVG_user,
"video": SVG_video,
"warning": SVG_warning,
"waves": SVG_waves,
"wi-fi": SVG_wiFi,
"world": SVG_world,
"zoom-in": SVG_zoomIn,
"zoom-out": SVG_zoomOut,
"zoom": SVG_zoom
};

