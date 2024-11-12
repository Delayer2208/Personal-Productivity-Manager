@echo off

	set maindir=%cd%
	set backenddir=personal-productivity-backend
	set frontenddir=personal-productivity-frontend

cd %maindir%\%backenddir%

echo "PLEASE ENTER THE NAME OF YOUR DATA BASE"

SET /P THEDATABASE=

ECHO MONGO_URI=mongodb://localhost:27017/%THEDATABASE% > .env

echo "PLEASE TYPE IN YOUR SECERET KEY FOR YOUR DATA BASE"
SET /P YourSecretKey=
echo JWT_SECRET=%YourSecretKey% >> .env
pause




got end
goto skip
set maindir=%cd%
set backenddir=personal-productivity-backend
set frontenddir=personal-productivity-frontend

cd %maindir%\%backenddir%

npm install
npm install dotenv

cd %maindir%\%frountenddir%
npm install
npm install axios
npm install bootstrap


cd %maindir%\%backenddir%

:end