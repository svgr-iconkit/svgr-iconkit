
import { IconsMapType } from "@svgr-iconkit/core";

// import assets
import SVG_alert from "./alert";
import SVG_archive from "./archive";
import SVG_arrowBoth from "./arrow-both";
import SVG_arrowDown from "./arrow-down";
import SVG_arrowDownLeft from "./arrow-down-left";
import SVG_arrowDownRight from "./arrow-down-right";
import SVG_arrowLeft from "./arrow-left";
import SVG_arrowRight from "./arrow-right";
import SVG_arrowSwitch from "./arrow-switch";
import SVG_arrowUp from "./arrow-up";
import SVG_arrowUpLeft from "./arrow-up-left";
import SVG_arrowUpRight from "./arrow-up-right";
import SVG_beaker from "./beaker";
import SVG_bell from "./bell";
import SVG_bellFill from "./bell-fill";
import SVG_bellSlash from "./bell-slash";
import SVG_blocked from "./blocked";
import SVG_bold from "./bold";
import SVG_book from "./book";
import SVG_bookmark from "./bookmark";
import SVG_bookmarkFill from "./bookmark-fill";
import SVG_bookmarkSlash from "./bookmark-slash";
import SVG_bookmarkSlashFill from "./bookmark-slash-fill";
import SVG_briefcase from "./briefcase";
import SVG_broadcast from "./broadcast";
import SVG_browser from "./browser";
import SVG_bug from "./bug";
import SVG_calendar from "./calendar";
import SVG_check from "./check";
import SVG_checkCircle from "./check-circle";
import SVG_checkCircleFill from "./check-circle-fill";
import SVG_checklist from "./checklist";
import SVG_chevronDown from "./chevron-down";
import SVG_chevronLeft from "./chevron-left";
import SVG_chevronRight from "./chevron-right";
import SVG_chevronUp from "./chevron-up";
import SVG_circle from "./circle";
import SVG_circleSlash from "./circle-slash";
import SVG_clock from "./clock";
import SVG_code from "./code";
import SVG_codeOfConduct from "./code-of-conduct";
import SVG_codeReview from "./code-review";
import SVG_codeSquare from "./code-square";
import SVG_codescan from "./codescan";
import SVG_codescanCheckmark from "./codescan-checkmark";
import SVG_codespaces from "./codespaces";
import SVG_columns from "./columns";
import SVG_comment from "./comment";
import SVG_commentDiscussion from "./comment-discussion";
import SVG_commit from "./commit";
import SVG_container from "./container";
import SVG_copy from "./copy";
import SVG_cpu from "./cpu";
import SVG_creditCard from "./credit-card";
import SVG_crossReference from "./cross-reference";
import SVG_dash from "./dash";
import SVG_database from "./database";
import SVG_dependabot from "./dependabot";
import SVG_desktopDownload from "./desktop-download";
import SVG_deviceCameraVideo from "./device-camera-video";
import SVG_deviceDesktop from "./device-desktop";
import SVG_deviceMobile from "./device-mobile";
import SVG_diamond from "./diamond";
import SVG_diff from "./diff";
import SVG_dot from "./dot";
import SVG_dotFill from "./dot-fill";
import SVG_download from "./download";
import SVG_duplicate from "./duplicate";
import SVG_eye from "./eye";
import SVG_eyeClosed from "./eye-closed";
import SVG_file from "./file";
import SVG_fileBinary from "./file-binary";
import SVG_fileCode from "./file-code";
import SVG_fileDiff from "./file-diff";
import SVG_fileDirectory from "./file-directory";
import SVG_fileDirectoryFill from "./file-directory-fill";
import SVG_fileMedia from "./file-media";
import SVG_fileSubmodule from "./file-submodule";
import SVG_fileSymlinkFile from "./file-symlink-file";
import SVG_fileZip from "./file-zip";
import SVG_filter from "./filter";
import SVG_flame from "./flame";
import SVG_fold from "./fold";
import SVG_foldDown from "./fold-down";
import SVG_foldUp from "./fold-up";
import SVG_gear from "./gear";
import SVG_gift from "./gift";
import SVG_gitBranch from "./git-branch";
import SVG_gitCommit from "./git-commit";
import SVG_gitCompare from "./git-compare";
import SVG_gitMerge from "./git-merge";
import SVG_gitPullRequest from "./git-pull-request";
import SVG_gitPullRequestClosed from "./git-pull-request-closed";
import SVG_gitPullRequestDraft from "./git-pull-request-draft";
import SVG_globe from "./globe";
import SVG_grabber from "./grabber";
import SVG_graph from "./graph";
import SVG_hash from "./hash";
import SVG_heading from "./heading";
import SVG_heart from "./heart";
import SVG_heartFill from "./heart-fill";
import SVG_history from "./history";
import SVG_home from "./home";
import SVG_homeFill from "./home-fill";
import SVG_horizontalRule from "./horizontal-rule";
import SVG_hourglass from "./hourglass";
import SVG_hubot from "./hubot";
import SVG_image from "./image";
import SVG_inbox from "./inbox";
import SVG_infinity from "./infinity";
import SVG_info from "./info";
import SVG_issueClosed from "./issue-closed";
import SVG_issueDraft from "./issue-draft";
import SVG_issueOpened from "./issue-opened";
import SVG_issueReopened from "./issue-reopened";
import SVG_italic from "./italic";
import SVG_iterations from "./iterations";
import SVG_kebabHorizontal from "./kebab-horizontal";
import SVG_key from "./key";
import SVG_law from "./law";
import SVG_lightBulb from "./light-bulb";
import SVG_link from "./link";
import SVG_linkExternal from "./link-external";
import SVG_listOrdered from "./list-ordered";
import SVG_listUnordered from "./list-unordered";
import SVG_location from "./location";
import SVG_lock from "./lock";
import SVG_mail from "./mail";
import SVG_megaphone from "./megaphone";
import SVG_mention from "./mention";
import SVG_milestone from "./milestone";
import SVG_mirror from "./mirror";
import SVG_moon from "./moon";
import SVG_mortarBoard from "./mortar-board";
import SVG_multiSelect from "./multi-select";
import SVG_mute from "./mute";
import SVG_noEntry from "./no-entry";
import SVG_northStar from "./north-star";
import SVG_note from "./note";
import SVG_number from "./number";
import SVG_organization from "./organization";
import SVG_package from "./package";
import SVG_packageDependencies from "./package-dependencies";
import SVG_packageDependents from "./package-dependents";
import SVG_paperAirplane from "./paper-airplane";
import SVG_paste from "./paste";
import SVG_pencil from "./pencil";
import SVG_people from "./people";
import SVG_person from "./person";
import SVG_personAdd from "./person-add";
import SVG_personFill from "./person-fill";
import SVG_pin from "./pin";
import SVG_play from "./play";
import SVG_plug from "./plug";
import SVG_plus from "./plus";
import SVG_plusCircle from "./plus-circle";
import SVG_project from "./project";
import SVG_pulse from "./pulse";
import SVG_question from "./question";
import SVG_quote from "./quote";
import SVG_reply from "./reply";
import SVG_repo from "./repo";
import SVG_repoForked from "./repo-forked";
import SVG_repoPush from "./repo-push";
import SVG_repoTemplate from "./repo-template";
import SVG_report from "./report";
import SVG_rocket from "./rocket";
import SVG_rows from "./rows";
import SVG_rss from "./rss";
import SVG_ruby from "./ruby";
import SVG_screenFull from "./screen-full";
import SVG_screenNormal from "./screen-normal";
import SVG_search from "./search";
import SVG_server from "./server";
import SVG_share from "./share";
import SVG_shareAndroid from "./share-android";
import SVG_shield from "./shield";
import SVG_shieldCheck from "./shield-check";
import SVG_shieldLock from "./shield-lock";
import SVG_shieldX from "./shield-x";
import SVG_sidebarCollapse from "./sidebar-collapse";
import SVG_sidebarExpand from "./sidebar-expand";
import SVG_signIn from "./sign-in";
import SVG_signOut from "./sign-out";
import SVG_singleSelect from "./single-select";
import SVG_skip from "./skip";
import SVG_smiley from "./smiley";
import SVG_sortAsc from "./sort-asc";
import SVG_sortDesc from "./sort-desc";
import SVG_square from "./square";
import SVG_squareFill from "./square-fill";
import SVG_squirrel from "./squirrel";
import SVG_stack from "./stack";
import SVG_star from "./star";
import SVG_starFill from "./star-fill";
import SVG_stop from "./stop";
import SVG_stopwatch from "./stopwatch";
import SVG_strikethrough from "./strikethrough";
import SVG_sun from "./sun";
import SVG_sync from "./sync";
import SVG_tab from "./tab";
import SVG_table from "./table";
import SVG_tag from "./tag";
import SVG_tasklist from "./tasklist";
import SVG_telescope from "./telescope";
import SVG_telescopeFill from "./telescope-fill";
import SVG_terminal from "./terminal";
import SVG_thumbsdown from "./thumbsdown";
import SVG_thumbsup from "./thumbsup";
import SVG_tools from "./tools";
import SVG_trash from "./trash";
import SVG_triangleDown from "./triangle-down";
import SVG_triangleLeft from "./triangle-left";
import SVG_triangleRight from "./triangle-right";
import SVG_triangleUp from "./triangle-up";
import SVG_trophy from "./trophy";
import SVG_typography from "./typography";
import SVG_unfold from "./unfold";
import SVG_unlock from "./unlock";
import SVG_unmute from "./unmute";
import SVG_unverified from "./unverified";
import SVG_upload from "./upload";
import SVG_verified from "./verified";
import SVG_versions from "./versions";
import SVG_video from "./video";
import SVG_workflow from "./workflow";
import SVG_x from "./x";
import SVG_xCircle from "./x-circle";
import SVG_xCircleFill from "./x-circle-fill";
import SVG_zap from "./zap"

// types
export type IconNames = "alert" | "archive" | "arrow-both" | "arrow-down" | "arrow-down-left" | "arrow-down-right" | "arrow-left" | "arrow-right" | "arrow-switch" | "arrow-up" | "arrow-up-left" | "arrow-up-right" | "beaker" | "bell" | "bell-fill" | "bell-slash" | "blocked" | "bold" | "book" | "bookmark" | "bookmark-fill" | "bookmark-slash" | "bookmark-slash-fill" | "briefcase" | "broadcast" | "browser" | "bug" | "calendar" | "check" | "check-circle" | "check-circle-fill" | "checklist" | "chevron-down" | "chevron-left" | "chevron-right" | "chevron-up" | "circle" | "circle-slash" | "clock" | "code" | "code-of-conduct" | "code-review" | "code-square" | "codescan" | "codescan-checkmark" | "codespaces" | "columns" | "comment" | "comment-discussion" | "commit" | "container" | "copy" | "cpu" | "credit-card" | "cross-reference" | "dash" | "database" | "dependabot" | "desktop-download" | "device-camera-video" | "device-desktop" | "device-mobile" | "diamond" | "diff" | "dot" | "dot-fill" | "download" | "duplicate" | "eye" | "eye-closed" | "file" | "file-binary" | "file-code" | "file-diff" | "file-directory" | "file-directory-fill" | "file-media" | "file-submodule" | "file-symlink-file" | "file-zip" | "filter" | "flame" | "fold" | "fold-down" | "fold-up" | "gear" | "gift" | "git-branch" | "git-commit" | "git-compare" | "git-merge" | "git-pull-request" | "git-pull-request-closed" | "git-pull-request-draft" | "globe" | "grabber" | "graph" | "hash" | "heading" | "heart" | "heart-fill" | "history" | "home" | "home-fill" | "horizontal-rule" | "hourglass" | "hubot" | "image" | "inbox" | "infinity" | "info" | "issue-closed" | "issue-draft" | "issue-opened" | "issue-reopened" | "italic" | "iterations" | "kebab-horizontal" | "key" | "law" | "light-bulb" | "link" | "link-external" | "list-ordered" | "list-unordered" | "location" | "lock" | "mail" | "megaphone" | "mention" | "milestone" | "mirror" | "moon" | "mortar-board" | "multi-select" | "mute" | "no-entry" | "north-star" | "note" | "number" | "organization" | "package" | "package-dependencies" | "package-dependents" | "paper-airplane" | "paste" | "pencil" | "people" | "person" | "person-add" | "person-fill" | "pin" | "play" | "plug" | "plus" | "plus-circle" | "project" | "pulse" | "question" | "quote" | "reply" | "repo" | "repo-forked" | "repo-push" | "repo-template" | "report" | "rocket" | "rows" | "rss" | "ruby" | "screen-full" | "screen-normal" | "search" | "server" | "share" | "share-android" | "shield" | "shield-check" | "shield-lock" | "shield-x" | "sidebar-collapse" | "sidebar-expand" | "sign-in" | "sign-out" | "single-select" | "skip" | "smiley" | "sort-asc" | "sort-desc" | "square" | "square-fill" | "squirrel" | "stack" | "star" | "star-fill" | "stop" | "stopwatch" | "strikethrough" | "sun" | "sync" | "tab" | "table" | "tag" | "tasklist" | "telescope" | "telescope-fill" | "terminal" | "thumbsdown" | "thumbsup" | "tools" | "trash" | "triangle-down" | "triangle-left" | "triangle-right" | "triangle-up" | "trophy" | "typography" | "unfold" | "unlock" | "unmute" | "unverified" | "upload" | "verified" | "versions" | "video" | "workflow" | "x" | "x-circle" | "x-circle-fill" | "zap";

// map
export const map: IconsMapType<IconNames> = {
"alert": SVG_alert,
"archive": SVG_archive,
"arrow-both": SVG_arrowBoth,
"arrow-down": SVG_arrowDown,
"arrow-down-left": SVG_arrowDownLeft,
"arrow-down-right": SVG_arrowDownRight,
"arrow-left": SVG_arrowLeft,
"arrow-right": SVG_arrowRight,
"arrow-switch": SVG_arrowSwitch,
"arrow-up": SVG_arrowUp,
"arrow-up-left": SVG_arrowUpLeft,
"arrow-up-right": SVG_arrowUpRight,
"beaker": SVG_beaker,
"bell": SVG_bell,
"bell-fill": SVG_bellFill,
"bell-slash": SVG_bellSlash,
"blocked": SVG_blocked,
"bold": SVG_bold,
"book": SVG_book,
"bookmark": SVG_bookmark,
"bookmark-fill": SVG_bookmarkFill,
"bookmark-slash": SVG_bookmarkSlash,
"bookmark-slash-fill": SVG_bookmarkSlashFill,
"briefcase": SVG_briefcase,
"broadcast": SVG_broadcast,
"browser": SVG_browser,
"bug": SVG_bug,
"calendar": SVG_calendar,
"check": SVG_check,
"check-circle": SVG_checkCircle,
"check-circle-fill": SVG_checkCircleFill,
"checklist": SVG_checklist,
"chevron-down": SVG_chevronDown,
"chevron-left": SVG_chevronLeft,
"chevron-right": SVG_chevronRight,
"chevron-up": SVG_chevronUp,
"circle": SVG_circle,
"circle-slash": SVG_circleSlash,
"clock": SVG_clock,
"code": SVG_code,
"code-of-conduct": SVG_codeOfConduct,
"code-review": SVG_codeReview,
"code-square": SVG_codeSquare,
"codescan": SVG_codescan,
"codescan-checkmark": SVG_codescanCheckmark,
"codespaces": SVG_codespaces,
"columns": SVG_columns,
"comment": SVG_comment,
"comment-discussion": SVG_commentDiscussion,
"commit": SVG_commit,
"container": SVG_container,
"copy": SVG_copy,
"cpu": SVG_cpu,
"credit-card": SVG_creditCard,
"cross-reference": SVG_crossReference,
"dash": SVG_dash,
"database": SVG_database,
"dependabot": SVG_dependabot,
"desktop-download": SVG_desktopDownload,
"device-camera-video": SVG_deviceCameraVideo,
"device-desktop": SVG_deviceDesktop,
"device-mobile": SVG_deviceMobile,
"diamond": SVG_diamond,
"diff": SVG_diff,
"dot": SVG_dot,
"dot-fill": SVG_dotFill,
"download": SVG_download,
"duplicate": SVG_duplicate,
"eye": SVG_eye,
"eye-closed": SVG_eyeClosed,
"file": SVG_file,
"file-binary": SVG_fileBinary,
"file-code": SVG_fileCode,
"file-diff": SVG_fileDiff,
"file-directory": SVG_fileDirectory,
"file-directory-fill": SVG_fileDirectoryFill,
"file-media": SVG_fileMedia,
"file-submodule": SVG_fileSubmodule,
"file-symlink-file": SVG_fileSymlinkFile,
"file-zip": SVG_fileZip,
"filter": SVG_filter,
"flame": SVG_flame,
"fold": SVG_fold,
"fold-down": SVG_foldDown,
"fold-up": SVG_foldUp,
"gear": SVG_gear,
"gift": SVG_gift,
"git-branch": SVG_gitBranch,
"git-commit": SVG_gitCommit,
"git-compare": SVG_gitCompare,
"git-merge": SVG_gitMerge,
"git-pull-request": SVG_gitPullRequest,
"git-pull-request-closed": SVG_gitPullRequestClosed,
"git-pull-request-draft": SVG_gitPullRequestDraft,
"globe": SVG_globe,
"grabber": SVG_grabber,
"graph": SVG_graph,
"hash": SVG_hash,
"heading": SVG_heading,
"heart": SVG_heart,
"heart-fill": SVG_heartFill,
"history": SVG_history,
"home": SVG_home,
"home-fill": SVG_homeFill,
"horizontal-rule": SVG_horizontalRule,
"hourglass": SVG_hourglass,
"hubot": SVG_hubot,
"image": SVG_image,
"inbox": SVG_inbox,
"infinity": SVG_infinity,
"info": SVG_info,
"issue-closed": SVG_issueClosed,
"issue-draft": SVG_issueDraft,
"issue-opened": SVG_issueOpened,
"issue-reopened": SVG_issueReopened,
"italic": SVG_italic,
"iterations": SVG_iterations,
"kebab-horizontal": SVG_kebabHorizontal,
"key": SVG_key,
"law": SVG_law,
"light-bulb": SVG_lightBulb,
"link": SVG_link,
"link-external": SVG_linkExternal,
"list-ordered": SVG_listOrdered,
"list-unordered": SVG_listUnordered,
"location": SVG_location,
"lock": SVG_lock,
"mail": SVG_mail,
"megaphone": SVG_megaphone,
"mention": SVG_mention,
"milestone": SVG_milestone,
"mirror": SVG_mirror,
"moon": SVG_moon,
"mortar-board": SVG_mortarBoard,
"multi-select": SVG_multiSelect,
"mute": SVG_mute,
"no-entry": SVG_noEntry,
"north-star": SVG_northStar,
"note": SVG_note,
"number": SVG_number,
"organization": SVG_organization,
"package": SVG_package,
"package-dependencies": SVG_packageDependencies,
"package-dependents": SVG_packageDependents,
"paper-airplane": SVG_paperAirplane,
"paste": SVG_paste,
"pencil": SVG_pencil,
"people": SVG_people,
"person": SVG_person,
"person-add": SVG_personAdd,
"person-fill": SVG_personFill,
"pin": SVG_pin,
"play": SVG_play,
"plug": SVG_plug,
"plus": SVG_plus,
"plus-circle": SVG_plusCircle,
"project": SVG_project,
"pulse": SVG_pulse,
"question": SVG_question,
"quote": SVG_quote,
"reply": SVG_reply,
"repo": SVG_repo,
"repo-forked": SVG_repoForked,
"repo-push": SVG_repoPush,
"repo-template": SVG_repoTemplate,
"report": SVG_report,
"rocket": SVG_rocket,
"rows": SVG_rows,
"rss": SVG_rss,
"ruby": SVG_ruby,
"screen-full": SVG_screenFull,
"screen-normal": SVG_screenNormal,
"search": SVG_search,
"server": SVG_server,
"share": SVG_share,
"share-android": SVG_shareAndroid,
"shield": SVG_shield,
"shield-check": SVG_shieldCheck,
"shield-lock": SVG_shieldLock,
"shield-x": SVG_shieldX,
"sidebar-collapse": SVG_sidebarCollapse,
"sidebar-expand": SVG_sidebarExpand,
"sign-in": SVG_signIn,
"sign-out": SVG_signOut,
"single-select": SVG_singleSelect,
"skip": SVG_skip,
"smiley": SVG_smiley,
"sort-asc": SVG_sortAsc,
"sort-desc": SVG_sortDesc,
"square": SVG_square,
"square-fill": SVG_squareFill,
"squirrel": SVG_squirrel,
"stack": SVG_stack,
"star": SVG_star,
"star-fill": SVG_starFill,
"stop": SVG_stop,
"stopwatch": SVG_stopwatch,
"strikethrough": SVG_strikethrough,
"sun": SVG_sun,
"sync": SVG_sync,
"tab": SVG_tab,
"table": SVG_table,
"tag": SVG_tag,
"tasklist": SVG_tasklist,
"telescope": SVG_telescope,
"telescope-fill": SVG_telescopeFill,
"terminal": SVG_terminal,
"thumbsdown": SVG_thumbsdown,
"thumbsup": SVG_thumbsup,
"tools": SVG_tools,
"trash": SVG_trash,
"triangle-down": SVG_triangleDown,
"triangle-left": SVG_triangleLeft,
"triangle-right": SVG_triangleRight,
"triangle-up": SVG_triangleUp,
"trophy": SVG_trophy,
"typography": SVG_typography,
"unfold": SVG_unfold,
"unlock": SVG_unlock,
"unmute": SVG_unmute,
"unverified": SVG_unverified,
"upload": SVG_upload,
"verified": SVG_verified,
"versions": SVG_versions,
"video": SVG_video,
"workflow": SVG_workflow,
"x": SVG_x,
"x-circle": SVG_xCircle,
"x-circle-fill": SVG_xCircleFill,
"zap": SVG_zap
};

