# Being Seen

## Motivation

Being Seen is a mobile app (Android, iOS) built for an NGO of the same name. The app aims to help homeless youths in the Greater Toronto Area (GTA) by granting them easy access to resources that they can use to help elevate themselves. This means information about job opportunities, education programs, shelters, and other social services.

This software is distributed under the [GLWT License](https://github.com/me-shaon/GLWTPL).

## Installation

### Prerequisites

- [Android Emulator](https://reactnative.dev/docs/environment-setup) (Can be set up through Android Studio)
- [iOS Emulator](https://reactnative.dev/docs/environment-setup) (Requires Xcode which is only available on Mac)
- [Node.js](https://nodejs.org/en/) (app is tested to work for at least `v16.8.0`)
- Code editor or IDE that has support for JavaScript, TypeScript (e.g. [VS Code](https://code.visualstudio.com/))
- Install the Expo CLI on your computer by doing `npm install -g expo-cli`
- Expo Go app on your mobile device to test the app on your device
- `.env` file, contact [LegoCityMan7063](https://github.com/LegoCityMan7063) for access
- MongoDB Cloud, contact [LegoCityMan7063](https://github.com/LegoCityMan7063) for access

### How to Build and Run the App

1. Fork this repo and clone it to your local machine. Create a branch from the `develop` branch called `feature-xxx` where `xxx` is the name of the feature or issue you are
    working on. Switch to the branch you created.
2. Install all required dependencies for the frontend and backend. Starting from the repo root,

    ```powershell
    cd frontend
    npm install
    cd ../backend
    npm install
    ```

3. Run the listener for inbound HTTP requests on your local machine. Starting from the repo root,

    ```powershell
    cd backend
    npm run start:dev
    ```

4. Run the front-end on your local machine. Starting from the repo root,

    ```powershell
    cd frontend
    expo start
    ```

    A browser window for the Expo server should open. Follow the instructions there to open the app on the Expo Go app or an emulator.

    **To automatically open the Android emulator for Step 4**

    ```powershell
    cd frontend
    expo start --android
    ```

    **To automatically open the iOS emulator for Step 4(only for Mac users)**

    ```powershell
    cd frontend
    expo start --ios
    ```

## Contribution

### Do you have a Discord server?

Yes! Join the [Discord server](https://discord.gg/fJvCC858) to learn more about this project.

### What is our tech stack?

We use JavaScript React Native for the front-end with the CSS library Tailwind. For the backend, we use TypeScript NestJS and a MongoDB database.


### Do you use git flow?

Yes, the codebase for official releases is found in the `main` branch. The `develop` branch 
contains the codebase for current development. `feature-xxx` branches are created from and merged into the `develop` branch.

### What do you name your feature branches?

Feature branches are named `feature-xxx` where `xxx` is the name of the feature.

### Do you use GitHub Issues or another ticketing website?

We use Jira.

### Do you use pull requests?

Yes, when we want to merge a `feature-xxx` branch into the upstream `develop`, or `develop` into `main`, there should always be a pull request.
