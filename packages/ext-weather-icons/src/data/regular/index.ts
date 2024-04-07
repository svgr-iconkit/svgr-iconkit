
import { IconsMapType } from "@svgr-iconkit/core";

// import assets
import SVG_alien from "./alien";
import SVG_barometer from "./barometer";
import SVG_celsius from "./celsius";
import SVG_cloudDown from "./cloud-down";
import SVG_cloudRefresh from "./cloud-refresh";
import SVG_cloudUp from "./cloud-up";
import SVG_cloud from "./cloud";
import SVG_cloudyGusts from "./cloudy-gusts";
import SVG_cloudyWindy from "./cloudy-windy";
import SVG_cloudy from "./cloudy";
import SVG_dayCloudyGusts from "./day-cloudy-gusts";
import SVG_dayCloudyHigh from "./day-cloudy-high";
import SVG_dayCloudyWindy from "./day-cloudy-windy";
import SVG_dayCloudy from "./day-cloudy";
import SVG_dayFog from "./day-fog";
import SVG_dayHail from "./day-hail";
import SVG_dayHaze from "./day-haze";
import SVG_dayLightWind from "./day-light-wind";
import SVG_dayLightning from "./day-lightning";
import SVG_dayRainMix from "./day-rain-mix";
import SVG_dayRainWind from "./day-rain-wind";
import SVG_dayRain from "./day-rain";
import SVG_dayShowers from "./day-showers";
import SVG_daySleetStorm from "./day-sleet-storm";
import SVG_daySleet from "./day-sleet";
import SVG_daySnowThunderstorm from "./day-snow-thunderstorm";
import SVG_daySnowWind from "./day-snow-wind";
import SVG_daySnow from "./day-snow";
import SVG_daySprinkle from "./day-sprinkle";
import SVG_dayStormShowers from "./day-storm-showers";
import SVG_daySunnyOvercast from "./day-sunny-overcast";
import SVG_daySunny from "./day-sunny";
import SVG_dayThunderstorm from "./day-thunderstorm";
import SVG_dayWindy from "./day-windy";
import SVG_degrees from "./degrees";
import SVG_directionDownLeft from "./direction-down-left";
import SVG_directionDownRight from "./direction-down-right";
import SVG_directionDown from "./direction-down";
import SVG_directionLeft from "./direction-left";
import SVG_directionRight from "./direction-right";
import SVG_directionUpLeft from "./direction-up-left";
import SVG_directionUpRight from "./direction-up-right";
import SVG_directionUp from "./direction-up";
import SVG_dust from "./dust";
import SVG_earthquake from "./earthquake";
import SVG_fahrenheit from "./fahrenheit";
import SVG_fire from "./fire";
import SVG_flood from "./flood";
import SVG_fog from "./fog";
import SVG_galeWarning from "./gale-warning";
import SVG_hail from "./hail";
import SVG_horizonAlt from "./horizon-alt";
import SVG_horizon from "./horizon";
import SVG_hot from "./hot";
import SVG_humidity from "./humidity";
import SVG_hurricaneWarning from "./hurricane-warning";
import SVG_hurricane from "./hurricane";
import SVG_lightning from "./lightning";
import SVG_lunarEclipse from "./lunar-eclipse";
import SVG_meteor from "./meteor";
import SVG_moonAltFirstQuarter from "./moon-alt-first-quarter";
import SVG_moonAltFull from "./moon-alt-full";
import SVG_moonAltNew from "./moon-alt-new";
import SVG_moonAltThirdQuarter from "./moon-alt-third-quarter";
import SVG_moonAltWaningCrescent1 from "./moon-alt-waning-crescent-1";
import SVG_moonAltWaningCrescent2 from "./moon-alt-waning-crescent-2";
import SVG_moonAltWaningCrescent3 from "./moon-alt-waning-crescent-3";
import SVG_moonAltWaningCrescent4 from "./moon-alt-waning-crescent-4";
import SVG_moonAltWaningCrescent5 from "./moon-alt-waning-crescent-5";
import SVG_moonAltWaningCrescent6 from "./moon-alt-waning-crescent-6";
import SVG_moonAltWaningGibbous1 from "./moon-alt-waning-gibbous-1";
import SVG_moonAltWaningGibbous2 from "./moon-alt-waning-gibbous-2";
import SVG_moonAltWaningGibbous3 from "./moon-alt-waning-gibbous-3";
import SVG_moonAltWaningGibbous4 from "./moon-alt-waning-gibbous-4";
import SVG_moonAltWaningGibbous5 from "./moon-alt-waning-gibbous-5";
import SVG_moonAltWaningGibbous6 from "./moon-alt-waning-gibbous-6";
import SVG_moonAltWaxingCrescent1 from "./moon-alt-waxing-crescent-1";
import SVG_moonAltWaxingCrescent2 from "./moon-alt-waxing-crescent-2";
import SVG_moonAltWaxingCrescent3 from "./moon-alt-waxing-crescent-3";
import SVG_moonAltWaxingCrescent4 from "./moon-alt-waxing-crescent-4";
import SVG_moonAltWaxingCrescent5 from "./moon-alt-waxing-crescent-5";
import SVG_moonAltWaxingCrescent6 from "./moon-alt-waxing-crescent-6";
import SVG_moonAltWaxingGibbous1 from "./moon-alt-waxing-gibbous-1";
import SVG_moonAltWaxingGibbous2 from "./moon-alt-waxing-gibbous-2";
import SVG_moonAltWaxingGibbous3 from "./moon-alt-waxing-gibbous-3";
import SVG_moonAltWaxingGibbous4 from "./moon-alt-waxing-gibbous-4";
import SVG_moonAltWaxingGibbous5 from "./moon-alt-waxing-gibbous-5";
import SVG_moonAltWaxingGibbous6 from "./moon-alt-waxing-gibbous-6";
import SVG_moonFirstQuarter from "./moon-first-quarter";
import SVG_moonFull from "./moon-full";
import SVG_moonNew from "./moon-new";
import SVG_moonThirdQuarter from "./moon-third-quarter";
import SVG_moonWaningCrescent1 from "./moon-waning-crescent-1";
import SVG_moonWaningCrescent2 from "./moon-waning-crescent-2";
import SVG_moonWaningCrescent3 from "./moon-waning-crescent-3";
import SVG_moonWaningCrescent4 from "./moon-waning-crescent-4";
import SVG_moonWaningCrescent5 from "./moon-waning-crescent-5";
import SVG_moonWaningCrescent6 from "./moon-waning-crescent-6";
import SVG_moonWaningGibbous1 from "./moon-waning-gibbous-1";
import SVG_moonWaningGibbous2 from "./moon-waning-gibbous-2";
import SVG_moonWaningGibbous3 from "./moon-waning-gibbous-3";
import SVG_moonWaningGibbous4 from "./moon-waning-gibbous-4";
import SVG_moonWaningGibbous5 from "./moon-waning-gibbous-5";
import SVG_moonWaningGibbous6 from "./moon-waning-gibbous-6";
import SVG_moonWaxing6 from "./moon-waxing-6";
import SVG_moonWaxingCrescent1 from "./moon-waxing-crescent-1";
import SVG_moonWaxingCrescent2 from "./moon-waxing-crescent-2";
import SVG_moonWaxingCrescent3 from "./moon-waxing-crescent-3";
import SVG_moonWaxingCrescent4 from "./moon-waxing-crescent-4";
import SVG_moonWaxingCrescent5 from "./moon-waxing-crescent-5";
import SVG_moonWaxingGibbous1 from "./moon-waxing-gibbous-1";
import SVG_moonWaxingGibbous2 from "./moon-waxing-gibbous-2";
import SVG_moonWaxingGibbous3 from "./moon-waxing-gibbous-3";
import SVG_moonWaxingGibbous4 from "./moon-waxing-gibbous-4";
import SVG_moonWaxingGibbous5 from "./moon-waxing-gibbous-5";
import SVG_moonWaxingGibbous6 from "./moon-waxing-gibbous-6";
import SVG_moonrise from "./moonrise";
import SVG_moonset from "./moonset";
import SVG_na from "./na";
import SVG_nightAltCloudyGusts from "./night-alt-cloudy-gusts";
import SVG_nightAltCloudyHigh from "./night-alt-cloudy-high";
import SVG_nightAltCloudyWindy from "./night-alt-cloudy-windy";
import SVG_nightAltCloudy from "./night-alt-cloudy";
import SVG_nightAltHail from "./night-alt-hail";
import SVG_nightAltLightning from "./night-alt-lightning";
import SVG_nightAltPartlyCloudy from "./night-alt-partly-cloudy";
import SVG_nightAltRainMix from "./night-alt-rain-mix";
import SVG_nightAltRainWind from "./night-alt-rain-wind";
import SVG_nightAltRain from "./night-alt-rain";
import SVG_nightAltShowers from "./night-alt-showers";
import SVG_nightAltSleetStorm from "./night-alt-sleet-storm";
import SVG_nightAltSleet from "./night-alt-sleet";
import SVG_nightAltSnowThunderstorm from "./night-alt-snow-thunderstorm";
import SVG_nightAltSnowWind from "./night-alt-snow-wind";
import SVG_nightAltSnow from "./night-alt-snow";
import SVG_nightAltSprinkle from "./night-alt-sprinkle";
import SVG_nightAltStormShowers from "./night-alt-storm-showers";
import SVG_nightAltThunderstorm from "./night-alt-thunderstorm";
import SVG_nightClear from "./night-clear";
import SVG_nightCloudyGusts from "./night-cloudy-gusts";
import SVG_nightCloudyHigh from "./night-cloudy-high";
import SVG_nightCloudyWindy from "./night-cloudy-windy";
import SVG_nightCloudy from "./night-cloudy";
import SVG_nightFog from "./night-fog";
import SVG_nightHail from "./night-hail";
import SVG_nightLightning from "./night-lightning";
import SVG_nightPartlyCloudy from "./night-partly-cloudy";
import SVG_nightRainMix from "./night-rain-mix";
import SVG_nightRainWind from "./night-rain-wind";
import SVG_nightRain from "./night-rain";
import SVG_nightShowers from "./night-showers";
import SVG_nightSleetStorm from "./night-sleet-storm";
import SVG_nightSleet from "./night-sleet";
import SVG_nightSnowThunderstorm from "./night-snow-thunderstorm";
import SVG_nightSnowWind from "./night-snow-wind";
import SVG_nightSnow from "./night-snow";
import SVG_nightSprinkle from "./night-sprinkle";
import SVG_nightStormShowers from "./night-storm-showers";
import SVG_nightThunderstorm from "./night-thunderstorm";
import SVG_rainMix from "./rain-mix";
import SVG_rainWind from "./rain-wind";
import SVG_rain from "./rain";
import SVG_raindrop from "./raindrop";
import SVG_raindrops from "./raindrops";
import SVG_refreshAlt from "./refresh-alt";
import SVG_refresh from "./refresh";
import SVG_sandstorm from "./sandstorm";
import SVG_showers from "./showers";
import SVG_sleet from "./sleet";
import SVG_smallCraftAdvisory from "./small-craft-advisory";
import SVG_smog from "./smog";
import SVG_smoke from "./smoke";
import SVG_snowWind from "./snow-wind";
import SVG_snow from "./snow";
import SVG_snowflakeCold from "./snowflake-cold";
import SVG_solarEclipse from "./solar-eclipse";
import SVG_sprinkle from "./sprinkle";
import SVG_stars from "./stars";
import SVG_stormShowers from "./storm-showers";
import SVG_stormWarning from "./storm-warning";
import SVG_strongWind from "./strong-wind";
import SVG_sunrise from "./sunrise";
import SVG_sunset from "./sunset";
import SVG_thermometerExterior from "./thermometer-exterior";
import SVG_thermometerInternal from "./thermometer-internal";
import SVG_thermometer from "./thermometer";
import SVG_thunderstorm from "./thunderstorm";
import SVG_time1 from "./time-1";
import SVG_time10 from "./time-10";
import SVG_time11 from "./time-11";
import SVG_time12 from "./time-12";
import SVG_time2 from "./time-2";
import SVG_time3 from "./time-3";
import SVG_time4 from "./time-4";
import SVG_time5 from "./time-5";
import SVG_time6 from "./time-6";
import SVG_time7 from "./time-7";
import SVG_time8 from "./time-8";
import SVG_time9 from "./time-9";
import SVG_tornado from "./tornado";
import SVG_train from "./train";
import SVG_tsunami from "./tsunami";
import SVG_umbrella from "./umbrella";
import SVG_volcano from "./volcano";
import SVG_windBeaufort0 from "./wind-beaufort-0";
import SVG_windBeaufort1 from "./wind-beaufort-1";
import SVG_windBeaufort10 from "./wind-beaufort-10";
import SVG_windBeaufort11 from "./wind-beaufort-11";
import SVG_windBeaufort12 from "./wind-beaufort-12";
import SVG_windBeaufort2 from "./wind-beaufort-2";
import SVG_windBeaufort3 from "./wind-beaufort-3";
import SVG_windBeaufort4 from "./wind-beaufort-4";
import SVG_windBeaufort5 from "./wind-beaufort-5";
import SVG_windBeaufort6 from "./wind-beaufort-6";
import SVG_windBeaufort7 from "./wind-beaufort-7";
import SVG_windBeaufort8 from "./wind-beaufort-8";
import SVG_windBeaufort9 from "./wind-beaufort-9";
import SVG_windDeg from "./wind-deg";
import SVG_windy from "./windy"

// types
export type IconNames = "alien" | "barometer" | "celsius" | "cloud-down" | "cloud-refresh" | "cloud-up" | "cloud" | "cloudy-gusts" | "cloudy-windy" | "cloudy" | "day-cloudy-gusts" | "day-cloudy-high" | "day-cloudy-windy" | "day-cloudy" | "day-fog" | "day-hail" | "day-haze" | "day-light-wind" | "day-lightning" | "day-rain-mix" | "day-rain-wind" | "day-rain" | "day-showers" | "day-sleet-storm" | "day-sleet" | "day-snow-thunderstorm" | "day-snow-wind" | "day-snow" | "day-sprinkle" | "day-storm-showers" | "day-sunny-overcast" | "day-sunny" | "day-thunderstorm" | "day-windy" | "degrees" | "direction-down-left" | "direction-down-right" | "direction-down" | "direction-left" | "direction-right" | "direction-up-left" | "direction-up-right" | "direction-up" | "dust" | "earthquake" | "fahrenheit" | "fire" | "flood" | "fog" | "gale-warning" | "hail" | "horizon-alt" | "horizon" | "hot" | "humidity" | "hurricane-warning" | "hurricane" | "lightning" | "lunar-eclipse" | "meteor" | "moon-alt-first-quarter" | "moon-alt-full" | "moon-alt-new" | "moon-alt-third-quarter" | "moon-alt-waning-crescent-1" | "moon-alt-waning-crescent-2" | "moon-alt-waning-crescent-3" | "moon-alt-waning-crescent-4" | "moon-alt-waning-crescent-5" | "moon-alt-waning-crescent-6" | "moon-alt-waning-gibbous-1" | "moon-alt-waning-gibbous-2" | "moon-alt-waning-gibbous-3" | "moon-alt-waning-gibbous-4" | "moon-alt-waning-gibbous-5" | "moon-alt-waning-gibbous-6" | "moon-alt-waxing-crescent-1" | "moon-alt-waxing-crescent-2" | "moon-alt-waxing-crescent-3" | "moon-alt-waxing-crescent-4" | "moon-alt-waxing-crescent-5" | "moon-alt-waxing-crescent-6" | "moon-alt-waxing-gibbous-1" | "moon-alt-waxing-gibbous-2" | "moon-alt-waxing-gibbous-3" | "moon-alt-waxing-gibbous-4" | "moon-alt-waxing-gibbous-5" | "moon-alt-waxing-gibbous-6" | "moon-first-quarter" | "moon-full" | "moon-new" | "moon-third-quarter" | "moon-waning-crescent-1" | "moon-waning-crescent-2" | "moon-waning-crescent-3" | "moon-waning-crescent-4" | "moon-waning-crescent-5" | "moon-waning-crescent-6" | "moon-waning-gibbous-1" | "moon-waning-gibbous-2" | "moon-waning-gibbous-3" | "moon-waning-gibbous-4" | "moon-waning-gibbous-5" | "moon-waning-gibbous-6" | "moon-waxing-6" | "moon-waxing-crescent-1" | "moon-waxing-crescent-2" | "moon-waxing-crescent-3" | "moon-waxing-crescent-4" | "moon-waxing-crescent-5" | "moon-waxing-gibbous-1" | "moon-waxing-gibbous-2" | "moon-waxing-gibbous-3" | "moon-waxing-gibbous-4" | "moon-waxing-gibbous-5" | "moon-waxing-gibbous-6" | "moonrise" | "moonset" | "na" | "night-alt-cloudy-gusts" | "night-alt-cloudy-high" | "night-alt-cloudy-windy" | "night-alt-cloudy" | "night-alt-hail" | "night-alt-lightning" | "night-alt-partly-cloudy" | "night-alt-rain-mix" | "night-alt-rain-wind" | "night-alt-rain" | "night-alt-showers" | "night-alt-sleet-storm" | "night-alt-sleet" | "night-alt-snow-thunderstorm" | "night-alt-snow-wind" | "night-alt-snow" | "night-alt-sprinkle" | "night-alt-storm-showers" | "night-alt-thunderstorm" | "night-clear" | "night-cloudy-gusts" | "night-cloudy-high" | "night-cloudy-windy" | "night-cloudy" | "night-fog" | "night-hail" | "night-lightning" | "night-partly-cloudy" | "night-rain-mix" | "night-rain-wind" | "night-rain" | "night-showers" | "night-sleet-storm" | "night-sleet" | "night-snow-thunderstorm" | "night-snow-wind" | "night-snow" | "night-sprinkle" | "night-storm-showers" | "night-thunderstorm" | "rain-mix" | "rain-wind" | "rain" | "raindrop" | "raindrops" | "refresh-alt" | "refresh" | "sandstorm" | "showers" | "sleet" | "small-craft-advisory" | "smog" | "smoke" | "snow-wind" | "snow" | "snowflake-cold" | "solar-eclipse" | "sprinkle" | "stars" | "storm-showers" | "storm-warning" | "strong-wind" | "sunrise" | "sunset" | "thermometer-exterior" | "thermometer-internal" | "thermometer" | "thunderstorm" | "time-1" | "time-10" | "time-11" | "time-12" | "time-2" | "time-3" | "time-4" | "time-5" | "time-6" | "time-7" | "time-8" | "time-9" | "tornado" | "train" | "tsunami" | "umbrella" | "volcano" | "wind-beaufort-0" | "wind-beaufort-1" | "wind-beaufort-10" | "wind-beaufort-11" | "wind-beaufort-12" | "wind-beaufort-2" | "wind-beaufort-3" | "wind-beaufort-4" | "wind-beaufort-5" | "wind-beaufort-6" | "wind-beaufort-7" | "wind-beaufort-8" | "wind-beaufort-9" | "wind-deg" | "windy";

// map
export const map: IconsMapType<IconNames> = {
"alien": SVG_alien,
"barometer": SVG_barometer,
"celsius": SVG_celsius,
"cloud-down": SVG_cloudDown,
"cloud-refresh": SVG_cloudRefresh,
"cloud-up": SVG_cloudUp,
"cloud": SVG_cloud,
"cloudy-gusts": SVG_cloudyGusts,
"cloudy-windy": SVG_cloudyWindy,
"cloudy": SVG_cloudy,
"day-cloudy-gusts": SVG_dayCloudyGusts,
"day-cloudy-high": SVG_dayCloudyHigh,
"day-cloudy-windy": SVG_dayCloudyWindy,
"day-cloudy": SVG_dayCloudy,
"day-fog": SVG_dayFog,
"day-hail": SVG_dayHail,
"day-haze": SVG_dayHaze,
"day-light-wind": SVG_dayLightWind,
"day-lightning": SVG_dayLightning,
"day-rain-mix": SVG_dayRainMix,
"day-rain-wind": SVG_dayRainWind,
"day-rain": SVG_dayRain,
"day-showers": SVG_dayShowers,
"day-sleet-storm": SVG_daySleetStorm,
"day-sleet": SVG_daySleet,
"day-snow-thunderstorm": SVG_daySnowThunderstorm,
"day-snow-wind": SVG_daySnowWind,
"day-snow": SVG_daySnow,
"day-sprinkle": SVG_daySprinkle,
"day-storm-showers": SVG_dayStormShowers,
"day-sunny-overcast": SVG_daySunnyOvercast,
"day-sunny": SVG_daySunny,
"day-thunderstorm": SVG_dayThunderstorm,
"day-windy": SVG_dayWindy,
"degrees": SVG_degrees,
"direction-down-left": SVG_directionDownLeft,
"direction-down-right": SVG_directionDownRight,
"direction-down": SVG_directionDown,
"direction-left": SVG_directionLeft,
"direction-right": SVG_directionRight,
"direction-up-left": SVG_directionUpLeft,
"direction-up-right": SVG_directionUpRight,
"direction-up": SVG_directionUp,
"dust": SVG_dust,
"earthquake": SVG_earthquake,
"fahrenheit": SVG_fahrenheit,
"fire": SVG_fire,
"flood": SVG_flood,
"fog": SVG_fog,
"gale-warning": SVG_galeWarning,
"hail": SVG_hail,
"horizon-alt": SVG_horizonAlt,
"horizon": SVG_horizon,
"hot": SVG_hot,
"humidity": SVG_humidity,
"hurricane-warning": SVG_hurricaneWarning,
"hurricane": SVG_hurricane,
"lightning": SVG_lightning,
"lunar-eclipse": SVG_lunarEclipse,
"meteor": SVG_meteor,
"moon-alt-first-quarter": SVG_moonAltFirstQuarter,
"moon-alt-full": SVG_moonAltFull,
"moon-alt-new": SVG_moonAltNew,
"moon-alt-third-quarter": SVG_moonAltThirdQuarter,
"moon-alt-waning-crescent-1": SVG_moonAltWaningCrescent1,
"moon-alt-waning-crescent-2": SVG_moonAltWaningCrescent2,
"moon-alt-waning-crescent-3": SVG_moonAltWaningCrescent3,
"moon-alt-waning-crescent-4": SVG_moonAltWaningCrescent4,
"moon-alt-waning-crescent-5": SVG_moonAltWaningCrescent5,
"moon-alt-waning-crescent-6": SVG_moonAltWaningCrescent6,
"moon-alt-waning-gibbous-1": SVG_moonAltWaningGibbous1,
"moon-alt-waning-gibbous-2": SVG_moonAltWaningGibbous2,
"moon-alt-waning-gibbous-3": SVG_moonAltWaningGibbous3,
"moon-alt-waning-gibbous-4": SVG_moonAltWaningGibbous4,
"moon-alt-waning-gibbous-5": SVG_moonAltWaningGibbous5,
"moon-alt-waning-gibbous-6": SVG_moonAltWaningGibbous6,
"moon-alt-waxing-crescent-1": SVG_moonAltWaxingCrescent1,
"moon-alt-waxing-crescent-2": SVG_moonAltWaxingCrescent2,
"moon-alt-waxing-crescent-3": SVG_moonAltWaxingCrescent3,
"moon-alt-waxing-crescent-4": SVG_moonAltWaxingCrescent4,
"moon-alt-waxing-crescent-5": SVG_moonAltWaxingCrescent5,
"moon-alt-waxing-crescent-6": SVG_moonAltWaxingCrescent6,
"moon-alt-waxing-gibbous-1": SVG_moonAltWaxingGibbous1,
"moon-alt-waxing-gibbous-2": SVG_moonAltWaxingGibbous2,
"moon-alt-waxing-gibbous-3": SVG_moonAltWaxingGibbous3,
"moon-alt-waxing-gibbous-4": SVG_moonAltWaxingGibbous4,
"moon-alt-waxing-gibbous-5": SVG_moonAltWaxingGibbous5,
"moon-alt-waxing-gibbous-6": SVG_moonAltWaxingGibbous6,
"moon-first-quarter": SVG_moonFirstQuarter,
"moon-full": SVG_moonFull,
"moon-new": SVG_moonNew,
"moon-third-quarter": SVG_moonThirdQuarter,
"moon-waning-crescent-1": SVG_moonWaningCrescent1,
"moon-waning-crescent-2": SVG_moonWaningCrescent2,
"moon-waning-crescent-3": SVG_moonWaningCrescent3,
"moon-waning-crescent-4": SVG_moonWaningCrescent4,
"moon-waning-crescent-5": SVG_moonWaningCrescent5,
"moon-waning-crescent-6": SVG_moonWaningCrescent6,
"moon-waning-gibbous-1": SVG_moonWaningGibbous1,
"moon-waning-gibbous-2": SVG_moonWaningGibbous2,
"moon-waning-gibbous-3": SVG_moonWaningGibbous3,
"moon-waning-gibbous-4": SVG_moonWaningGibbous4,
"moon-waning-gibbous-5": SVG_moonWaningGibbous5,
"moon-waning-gibbous-6": SVG_moonWaningGibbous6,
"moon-waxing-6": SVG_moonWaxing6,
"moon-waxing-crescent-1": SVG_moonWaxingCrescent1,
"moon-waxing-crescent-2": SVG_moonWaxingCrescent2,
"moon-waxing-crescent-3": SVG_moonWaxingCrescent3,
"moon-waxing-crescent-4": SVG_moonWaxingCrescent4,
"moon-waxing-crescent-5": SVG_moonWaxingCrescent5,
"moon-waxing-gibbous-1": SVG_moonWaxingGibbous1,
"moon-waxing-gibbous-2": SVG_moonWaxingGibbous2,
"moon-waxing-gibbous-3": SVG_moonWaxingGibbous3,
"moon-waxing-gibbous-4": SVG_moonWaxingGibbous4,
"moon-waxing-gibbous-5": SVG_moonWaxingGibbous5,
"moon-waxing-gibbous-6": SVG_moonWaxingGibbous6,
"moonrise": SVG_moonrise,
"moonset": SVG_moonset,
"na": SVG_na,
"night-alt-cloudy-gusts": SVG_nightAltCloudyGusts,
"night-alt-cloudy-high": SVG_nightAltCloudyHigh,
"night-alt-cloudy-windy": SVG_nightAltCloudyWindy,
"night-alt-cloudy": SVG_nightAltCloudy,
"night-alt-hail": SVG_nightAltHail,
"night-alt-lightning": SVG_nightAltLightning,
"night-alt-partly-cloudy": SVG_nightAltPartlyCloudy,
"night-alt-rain-mix": SVG_nightAltRainMix,
"night-alt-rain-wind": SVG_nightAltRainWind,
"night-alt-rain": SVG_nightAltRain,
"night-alt-showers": SVG_nightAltShowers,
"night-alt-sleet-storm": SVG_nightAltSleetStorm,
"night-alt-sleet": SVG_nightAltSleet,
"night-alt-snow-thunderstorm": SVG_nightAltSnowThunderstorm,
"night-alt-snow-wind": SVG_nightAltSnowWind,
"night-alt-snow": SVG_nightAltSnow,
"night-alt-sprinkle": SVG_nightAltSprinkle,
"night-alt-storm-showers": SVG_nightAltStormShowers,
"night-alt-thunderstorm": SVG_nightAltThunderstorm,
"night-clear": SVG_nightClear,
"night-cloudy-gusts": SVG_nightCloudyGusts,
"night-cloudy-high": SVG_nightCloudyHigh,
"night-cloudy-windy": SVG_nightCloudyWindy,
"night-cloudy": SVG_nightCloudy,
"night-fog": SVG_nightFog,
"night-hail": SVG_nightHail,
"night-lightning": SVG_nightLightning,
"night-partly-cloudy": SVG_nightPartlyCloudy,
"night-rain-mix": SVG_nightRainMix,
"night-rain-wind": SVG_nightRainWind,
"night-rain": SVG_nightRain,
"night-showers": SVG_nightShowers,
"night-sleet-storm": SVG_nightSleetStorm,
"night-sleet": SVG_nightSleet,
"night-snow-thunderstorm": SVG_nightSnowThunderstorm,
"night-snow-wind": SVG_nightSnowWind,
"night-snow": SVG_nightSnow,
"night-sprinkle": SVG_nightSprinkle,
"night-storm-showers": SVG_nightStormShowers,
"night-thunderstorm": SVG_nightThunderstorm,
"rain-mix": SVG_rainMix,
"rain-wind": SVG_rainWind,
"rain": SVG_rain,
"raindrop": SVG_raindrop,
"raindrops": SVG_raindrops,
"refresh-alt": SVG_refreshAlt,
"refresh": SVG_refresh,
"sandstorm": SVG_sandstorm,
"showers": SVG_showers,
"sleet": SVG_sleet,
"small-craft-advisory": SVG_smallCraftAdvisory,
"smog": SVG_smog,
"smoke": SVG_smoke,
"snow-wind": SVG_snowWind,
"snow": SVG_snow,
"snowflake-cold": SVG_snowflakeCold,
"solar-eclipse": SVG_solarEclipse,
"sprinkle": SVG_sprinkle,
"stars": SVG_stars,
"storm-showers": SVG_stormShowers,
"storm-warning": SVG_stormWarning,
"strong-wind": SVG_strongWind,
"sunrise": SVG_sunrise,
"sunset": SVG_sunset,
"thermometer-exterior": SVG_thermometerExterior,
"thermometer-internal": SVG_thermometerInternal,
"thermometer": SVG_thermometer,
"thunderstorm": SVG_thunderstorm,
"time-1": SVG_time1,
"time-10": SVG_time10,
"time-11": SVG_time11,
"time-12": SVG_time12,
"time-2": SVG_time2,
"time-3": SVG_time3,
"time-4": SVG_time4,
"time-5": SVG_time5,
"time-6": SVG_time6,
"time-7": SVG_time7,
"time-8": SVG_time8,
"time-9": SVG_time9,
"tornado": SVG_tornado,
"train": SVG_train,
"tsunami": SVG_tsunami,
"umbrella": SVG_umbrella,
"volcano": SVG_volcano,
"wind-beaufort-0": SVG_windBeaufort0,
"wind-beaufort-1": SVG_windBeaufort1,
"wind-beaufort-10": SVG_windBeaufort10,
"wind-beaufort-11": SVG_windBeaufort11,
"wind-beaufort-12": SVG_windBeaufort12,
"wind-beaufort-2": SVG_windBeaufort2,
"wind-beaufort-3": SVG_windBeaufort3,
"wind-beaufort-4": SVG_windBeaufort4,
"wind-beaufort-5": SVG_windBeaufort5,
"wind-beaufort-6": SVG_windBeaufort6,
"wind-beaufort-7": SVG_windBeaufort7,
"wind-beaufort-8": SVG_windBeaufort8,
"wind-beaufort-9": SVG_windBeaufort9,
"wind-deg": SVG_windDeg,
"windy": SVG_windy
};

