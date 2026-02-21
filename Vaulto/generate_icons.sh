#!/bin/bash
set -e
LOGO="src/assets/images/Innerlogo.png"
ANDROID_RES="android/app/src/main/res"
IOS_ICONS="ios/ETFrontend/Images.xcassets/AppIcon.appiconset"

echo "Generating Android icons..."
# Legacy icons
sips -z 48 48 "$LOGO" --out "$ANDROID_RES/mipmap-mdpi/ic_launcher.png"
cp "$ANDROID_RES/mipmap-mdpi/ic_launcher.png" "$ANDROID_RES/mipmap-mdpi/ic_launcher_round.png"
sips -z 72 72 --padToHeightWidth 108 108 "$LOGO" --out "$ANDROID_RES/mipmap-mdpi/ic_launcher_foreground.png"

sips -z 72 72 "$LOGO" --out "$ANDROID_RES/mipmap-hdpi/ic_launcher.png"
cp "$ANDROID_RES/mipmap-hdpi/ic_launcher.png" "$ANDROID_RES/mipmap-hdpi/ic_launcher_round.png"
sips -z 108 108 --padToHeightWidth 162 162 "$LOGO" --out "$ANDROID_RES/mipmap-hdpi/ic_launcher_foreground.png"

sips -z 96 96 "$LOGO" --out "$ANDROID_RES/mipmap-xhdpi/ic_launcher.png"
cp "$ANDROID_RES/mipmap-xhdpi/ic_launcher.png" "$ANDROID_RES/mipmap-xhdpi/ic_launcher_round.png"
sips -z 144 144 --padToHeightWidth 216 216 "$LOGO" --out "$ANDROID_RES/mipmap-xhdpi/ic_launcher_foreground.png"

sips -z 144 144 "$LOGO" --out "$ANDROID_RES/mipmap-xxhdpi/ic_launcher.png"
cp "$ANDROID_RES/mipmap-xxhdpi/ic_launcher.png" "$ANDROID_RES/mipmap-xxhdpi/ic_launcher_round.png"
sips -z 216 216 --padToHeightWidth 324 324 "$LOGO" --out "$ANDROID_RES/mipmap-xxhdpi/ic_launcher_foreground.png"

sips -z 192 192 "$LOGO" --out "$ANDROID_RES/mipmap-xxxhdpi/ic_launcher.png"
cp "$ANDROID_RES/mipmap-xxxhdpi/ic_launcher.png" "$ANDROID_RES/mipmap-xxxhdpi/ic_launcher_round.png"
sips -z 288 288 --padToHeightWidth 432 432 "$LOGO" --out "$ANDROID_RES/mipmap-xxxhdpi/ic_launcher_foreground.png"

echo "Generating iOS icons..."
sips -z 40 40 "$LOGO" --out "$IOS_ICONS/icon-20@2x.png"
sips -z 60 60 "$LOGO" --out "$IOS_ICONS/icon-20@3x.png"
sips -z 58 58 "$LOGO" --out "$IOS_ICONS/icon-29@2x.png"
sips -z 87 87 "$LOGO" --out "$IOS_ICONS/icon-29@3x.png"
sips -z 80 80 "$LOGO" --out "$IOS_ICONS/icon-40@2x.png"
sips -z 120 120 "$LOGO" --out "$IOS_ICONS/icon-40@3x.png"
sips -z 120 120 "$LOGO" --out "$IOS_ICONS/icon-60@2x.png"
sips -z 180 180 "$LOGO" --out "$IOS_ICONS/icon-60@3x.png"
sips -z 1024 1024 "$LOGO" --out "$IOS_ICONS/icon-1024.png"

echo "All icons generated successfully!"
