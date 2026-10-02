import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
// criativo de anuncio: bitrate alto pra nao sujar o video no feed
Config.setCrf(18);
