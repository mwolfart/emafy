# EMAFY

- This is a custom wrapper for Spotify, designed in ReactJS. It can be used to visualize and play songs, artists, albums and playlists.
- This project was created in order to learn and improve ReactJS skills and Front-end concepts. It was first created with the help of Afonso Ferrer, and later on mantained by myself.

## Technologies

- Project was created using Create React App (CRA)
- Later on, moved from CRA to Parcel
- A predefined design in Figma was used as a base for developing the application
- Typescript, Prettier and ESLint are used for code quality
- Styled Components are used as a CSS tool
- Jest is used for testing
- GitHub Actions is configured in order to run build, test and formatter in all PRs
- Multiple React libraries are used as well:
- - React Infinite Scroll
- - React Spinners
- - React Router
- - Axios
- - Font Awesome
- - Faker (for testing)

## Building & Running

- In order to build and run the project, you can call `npm install` succeeded by `npm run start`. This should deploy the app locally in port 3000 or the next available one.
- To execute tests, you can call `npm test`.

## Usage

- When first entering the web page you should be prompted with a Spotify log in. There, you can use your Spotify account to log in and use the application.
- The side bar on the left is used for navigation between pages.
- The top bar can be used to search for songs, artists, albums or playlists.
- Player is located at the bottom of the screen, and can be used to play an active song, navigate in the queue, control volume and view upcoming songs.
- The website should be very intuitive to use. Most media pages use infinite scroll, where you can scroll to the bottom to load more entries when they are available.
- The settings screen does not contain much at the moment, since most of the settings present on the design files are not provided by the Spotify API.

## Limitations

- The Spotify API is very limited compared to the original player developed by them, so there is a lot of features that the application does not provide.
- There are still some functionalities and improvements that have yet to be implemented, those being mainly the genres screen and the settings features (which currently serve only as placeholders).