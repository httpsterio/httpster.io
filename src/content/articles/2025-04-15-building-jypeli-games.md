---
title: Building Jypeli executables on Windows and Mac
date: "2025-04-15"
description: "Creating nice executables for Jypeli games"
writingtime: "6 hour"
draft: false
tags:
  - Jypeli
  - C#
socialimage: "/assets/images/articles/2025/cover-content-css.jpg"
---

## Table of Content

1. [Intro](#intro)
2. [Building for Windows](#building-for-windows)
2.1. [Visual Studio](#visual-studio)
2.2. [dotnet build](#dotnet-build)
2.3. [Jetbrains Rider](#jetbrains-rider)
3. [Building for MacOS](#building-for-macos)
3.1. [dotnet publish](#dotnet-publish)
3.2. [Bundling manually](#bundling-manually)
3.3. [Bundling script](#bundling-script)
3.4. [Removing the app from quarantine](#removing-the-app-from-quarantine)
4. [Final thoughts](#final-thoughts)

## Intro

[Jypeli](https://github.com/Jypeli-JYU/Jypeli) is the University of Jyväskylä's fork of Microsoft's XNA, released way back in 2010. It's still used to teach the Programming 1 course at the university, which is why I ended up making a game with it in 2020.

Having spent a few weeks going through all of the [game projects](/projects) I've been a part of, I found myself updating my Jypeli game [CueBit](https://github.com/httpsterio/CueBit) five years later.

This post isn't going to be a primer on how to get started with Jypeli, the [official materials](https://tim.jyu.fi/velp/kurssit/jypeli/wiki) and Programming 1 course are better than anything I could write.

Rather, I thought I'd show how I managed to build self-contained single file executables for Jypeli games on both Windows and MacOS. The official material doesn't really touch on that and it's more focused on getting the project set up and doing stuff with the engine itself.

## Building for Windows

Jypeli can be built with Visual Studio, .NET SDK with the _dotnet build_ console command. or with JetBrains Rider.

I recommend Rider, but will walk through all of the options.

### Visual Studio

In order to use Jypeli with Visual Studio, you must already have the .NET 8.0 SDK installed, but in case you don't have it, grab it from [https://dotnet.microsoft.com/en-us/download](https://dotnet.microsoft.com/en-us/download).

If you don't mind a bazillion dll-files being included with your final project, doing a regular build in Visual Studio should produce a working exe in a folder of files. You should find it roughly in `bin/Release/net8.0/win-x64/`. Just zip up the whole folder and that's that.

The user will need to install the .NET 8.0.15 runtime to be able to play the game.

Visual Studio also has the possibility to _publish_ the game, but in my experience it breaks easily. You need to disable trimming by creating a property group in your `.csproj` file like so

```xml
<PropertyGroup>
  <TargetFramework>net8.0</TargetFramework>
  <RuntimeIdentifier>win-x64</RuntimeIdentifier>
  <PublishTrimmed>false</PublishTrimmed>
  <SelfContained>true</SelfContained>
</PropertyGroup>
```

If you go with this option, your game will end up in `bin/Release/net8.0/win-x64/publish/`. The SelfContained directive includes the .NET runtime in the published file, which will likely double or triple the game size, but it'll run more reliably without any extra installs required. You can also add 
```xml
<PublishSingleFile>true</PublishSingleFile>
```
in the property group to create a single exe without all the adjacent files, but I didn't manage to get it to work.

If you have a .ico icon, you should also add it to the property group above like so:

```xml
<ApplicationIcon>path/to/icon.ico</ApplicationIcon>
```

### dotnet build

If you prefer the terminal or just want to script things, the dotnet CLI gets the job done. You’ll need the .NET 8 SDK installed, and your project should already be targeting .NET 8.0.

To build a self-contained Windows version:

```bash
dotnet publish -c Release -r win-x64 --self-contained true /p:PublishSingleFile=true /p:PublishTrimmed=false
```

What that does:

- `-c Release` builds in Release mode

- `-r win-x64` targets Windows 64-bit

- `--self-contained true` means the .NET runtime is bundled in

- `PublishSingleFile=true` tries to spit out one .exe

- `PublishTrimmed=false` avoids breaking stuff by removing unused code _(which Jypeli really doesn't like)_

You’ll find the result in `bin/Release/net8.0/win-x64/publish/`.

If everything works, you get a single .exe you can send around. In practice, it’s hit-or-miss—Jypeli’s native dependencies sometimes force extra files in. Still, the folder’s pretty tidy and runs out of the box.

If `PublishSingleFile` refuses to cooperate (which it might), just leave it out or set it to false and ship the full folder. Less elegant, but it works.

Icons and other settings in your `.csproj` will be included, so make sure you've set those up as well.

### Jetbrains Rider
Rider is my go-to for Jypeli projects. It’s fast, doesn’t get in the way, and makes building executables pretty painless. You’ll need the .NET 8.0 or .NET 10 SDK installed first. You should obviously also grab the [Rider](https://www.jetbrains.com/rider/) non-commercial version from their website.

Rider will also read your `.csproj`, so make sure it's set up correctly.

To build a self-contained Windows `.exe`, set up a publish configuration:

1. In the top menu, go to **Run** → **Edit Configurations**
2. Click the **+** button and select **.NET: Publish to Folder**
3. Fill in the options:

   - **Target location**: `/path/to/your/build/folder` or wherever you want the final build
   - **Configuration**: `Release | Any CPU`
   - **Target framework**: `net8.0`
   - **Target runtime**: `win-x64`
   - **Enable ReadyToRun compilation**: `true`
   - **Trim unused assemblies**: `false` → The game won't run if you set this to true.
   - **Produce single file**: `true`
   - **Include native libraries for self-extract**: `true`
   - **Include all content for self-extract**: `true`
   - **Delete existing files**: optional, but setting it to `true` keeps the folder clean. Will delete your files if you're not careful.

Once saved, just run the config and you’ll get a single `.exe` in your target folder.  
You can delete the `.pdb`, the .exe will work standalone.

This has the .NET runtime bundled, so the file size will be considerable, but at least it's a single .exe that will run on most Windows machines!

## Building for MacOS

Building a Jypeli for Mac is relatively simple. There's just one massive caveat—___signing and notarisation require a paid Apple developer license.___ 

It's not the end of the world, you can still build and distribute your app for free. Your users just have to jump through a few hoops if you're not going to shell out the $99 a year for the developer license.

Apple is pretty anal when it comes to unsigned applications, meaning that the executables get a quarantine parameter added. To the end user this shows up as a warning that the app can be malicious or even corrupted with a suggestion to delete it. Not ideal!

Let's look at the building and bundling first though!

### dotnet publish

Install the .NET 8.0 SDK from [https://dotnet.microsoft.com/en-us/download](https://dotnet.microsoft.com/en-us/download). Make sure you're grabbing the correct one for your architechture, either arm64 or x64. Then open up the terminal and navigate to your project folder.

If you're using an Apple Silicon based Mac, run this command: 
```bash
dotnet publish -c Release -r osx-arm64 --self-contained true /p:PublishSingleFile=false /p:IncludeNativeLibrariesForSelfExtract=true
```

if you're on an older Intel based Mac, replace the `osx-arm64` with `osx-x64`. This will work with Mac's running MacOS 10.12 Sierra or later.

This should create a folder `/bin/Release/net8.0/osx-arm64/publish` with a ton of files. Try to execute the $GameName executable file in the directory. You should see your terminal pop up and the game window starting.

You could zip this up and share with your users, but it isn't the most user friendly format to run. So, let's make an app bundle from it!

### Bundling manually

An app bundle, aka _yourgame.app_ is actually just a collection of nested folders with some metadata. It looks like this:

```bash
MyApp.app
├── Contents
│   ├── MacOS
│   │   └── MyApp               # Main executable file
│   ├── Resources
│   │   └── icon.icns           # App icon
│   └── Info.plist              # App metadata and configuration
```

So, to get started, let's create the folder structure.

You can make the folders manually by hand, remember to name the topmost folder with the .app extension and use right click to _"show package contents"_ to get inside the app bundle. Or you can use this oneliner:

```bash
mkdir -p MyApp.app/Contents/{MacOS,Resources} && touch MyApp.app/Contents/Info.plist
```

Move every file from the `/bin/Release/net8.0/osx-arm64/publish` inside the `MyApp.app/Contents/MacOS` folder.

For the icon, you'll need a 1024x1024 pixel sized png image. Then run this command
```bash
mkdir -p icon.iconset && sips -z 512 512 your-icon.png --out icon.iconset/icon_512x512.png && cp your-icon.png icon.iconset/icon_512x512@2x.png && iconutil -c icns icon.iconset -o icon.icns && rm -rf icon.iconset
```

This will take `your-icon.png`, create a downscaled 512x512 png and copy your icon to a 512x512@2 retina version of the icon and create an `icns` file from both of the images.

Now, move the created `icon.icns` into the `MyApp.app/Contents/Resources` folder.

Lastly, we'll fill in the `info.plist`. 

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" 
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleName</key>
    <string>${APP_NAME}</string>
    <key>CFBundleExecutable</key>
    <string>${APP_NAME}</string>
    <key>CFBundleIdentifier</key>
    <string>com.${PUBLISHER}.${APP_NAME}</string>
    <key>CFBundleVersion</key>
    <string>1.0.1</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>CFBundleIconFile</key>
    <string>icon</string>
</dict>
</plist>
```
Fill in the `${APP_NAME}` fields with your app name as well as `com.${PUBLISHER}.${APP_NAME}`, your publisher name.

The last field, `<string>icon</string>` refers to your app icon. Make sure the value `icon`is changed to whatever you named your icns file as without the icns extension.

You know what? You should have a fully functional app bundle now! Just drag the created `MyApp.app` to your `Applications/` folder and you're good to go! Check out the part on [removing the app from the quarantine](#removing-the-app-from-quarantine) at the end though!

### Bundling script

I also made a simple script to automate the creationg of the app bundle. If you're doing multiple builds, it'll get tedious creating the bundle by hand every time so a script like this will save some serious time!

Save the following as `build.sh` in the same folder as your `.sln` file. Change the _"MyApp"_ to whatever your game is called and _"YourName"_ to a single publisher name you want to use.

```bash
#!/bin/bash

# Set app name
APP_NAME="MyApp"

# Set up publisher name
PUBLISHER="YourName"

# Set up app directory
APP_DIR="release/${APP_NAME}.app"

# 1. Build the project
dotnet publish -c Release -r osx-arm64 --self-contained true /p:PublishSingleFile=false /p:IncludeNativeLibrariesForSelfExtract=true

# 2. Clean up any existing .app
rm -rf "$APP_DIR"

# 3. Create .app structure
mkdir -p "$APP_DIR/Contents/MacOS"
mkdir -p "$APP_DIR/Contents/Resources"

# 4. Move published files into MacOS directory
cp -R "bin/Release/net8.0/osx-arm64/publish/"* "$APP_DIR/Contents/MacOS/"

# 5. Copy icon to Resources
cp "bin/Release/net8.0/osx-arm64/publish/Content/app.icns" "$APP_DIR/Contents/Resources/"

# Copy the rest of Content (excluding app.icns) to MacOS/Content
mkdir -p "$APP_DIR/Contents/MacOS/Content"
rsync -a --exclude="app.icns" "bin/Release/net8.0/osx-arm64/publish/Content/" "$APP_DIR/Contents/MacOS/Content/"

# 6. Create Info.plist
cat > "$APP_DIR/Contents/Info.plist" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" 
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleName</key>
    <string>${APP_NAME}</string>
    <key>CFBundleExecutable</key>
    <string>${APP_NAME}</string>
    <key>CFBundleIdentifier</key>
    <string>com.${PUBLISHER}$.${APP_NAME}</string>
    <key>CFBundleVersion</key>
    <string>1.0.1</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>CFBundleIconFile</key>
    <string>icon</string>
</dict>
</plist>
EOF

# 7. Rename main binary to match app name
mv "$APP_DIR/Contents/MacOS/${APP_NAME}" "$APP_DIR/Contents/MacOS/${APP_NAME}"

echo "✅ ${APP_NAME}.app created at $APP_DIR/"

# 8. Cleanup bin directory
rm -rf "bin"
echo "🧹 Cleaned up build artifacts."
```

The script assumes your `icon.icns`is located in your Jypeli `Contents` directory and is set to always output it in your `.csproj` like so:

```xml
<ItemGroup>
  <None Include="Content\icon.icns" CopyToOutputDirectory="Always" />
</ItemGroup>
```

Next, run the following command to allow executing the script and then run the script.

```bash
chmod +x build.sh
./build.sh
```

In short, fill out the two variable names at the start of the script and make sure your icns is output by the build. Run the script and you'll have the finished executable in your `release/` directory, next to your `.sln` file.

### Removing the app from quarantine

Assuming you're not signing and notarising the app, Apple will flag the app stopping your players from starting the game.

The fix is literally one single terminal command.

```bash
xattr -rd com.apple.quarantine /path/to/MyApp.app
```

Instead of typing the path to the app, it's also possible to write out the start of the command and then dragging the app file into the terminal window. The path will automatically added to the command. After hitting enter, the file will be removed from quarantine and should be executable by the players!

## Final thoughts

There you have it. As you can see, you have a few options when it comes to building your Jypeli games for distribution. There are some caveats with each option, but hopefully I showed you how to exercise your options should you choose one.

Happy gaming!