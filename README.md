# Front End Setup
###### Pre-requisites: Installed NodeJS (Recommended Version => v18.12.1) and NPM (Node Package Manager, Recommended Version => v9.6.5)

## Development Build

1. Open Command Terminal
2. Navigate to frontend/ directory (cd frontend)
3. `npm install` (For first time only)
4. Add .env file to the folder with the following contents
    - `REACT_APP_AWS_ACCESS_KEY_ID="AKIA2VI2VRVWWO4A2NNO"`
    - `REACT_APP_AWS_SECRET_ACCESS_KEY="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"`
    - `REACT_APP_BUCKET_REGION="ap-southeast-1"`
    - `REACT_APP_BUCKET_NAME="heap-g26-image-bucket"`
    - `REACT_APP_GOOGLE_MAPS_API_KEY="AIzaSyChsCzm5-iAjK2cMpj_garxpAQdC4YbqsE"`
5. `npm start` to start a development server
6. Wait for the development server to start, a new page will be opened in your default browser

## Production Build
Go to https://f-xcel.netlify.app/

NOTE: The production server is SLOW at winding up after idling, you might encounter errors when you try to login, it will take a few tries until the server is ready.

# Back End Setup
Pre-requisites: IntelliJ, Java JDK 17

## Development Build

1. Open IntelliJ
2. Open `/backend` folder as a Maven Project
3. Add `.env` file to the folder `/backend/src/main/java/resources` with the following contents
    - `MONGO_DATABASE="main"`
    - `MONGO_USER="bk49"`
    - `MONGO_PASSWORD="xGycUcDT4LT5aSFp"`
    - `MONGO_CLUSTER="heap.lha7ael.mongodb.net"`
    - `JWT_SECRET_KEY="404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970"`
4. Run ‘Backend Application’ (Shift F10/ Run button at the top bar of IntelliJ)

Production Build
Will be kept running at https://heap-springboot-app.onrender.com

NOTE: The production server might be shut down on purpose to save bandwidth! (Limitations of free tier)
