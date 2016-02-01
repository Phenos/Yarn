
# Building the project

## Dependencies

[list dependencies]

## Build for Web App


[insert git steps, npm install, bower install, gulp commands]

[project folder structure]

    gulp dev

## Build for Native App (Electron)


[insert git steps, npm install, bower install, gulp commands]

[specific project folder structure]

[how to generate OSX and Windows Builds]

    gulp dev-electron

## Build for API

The api is built with the LoopBack stack from StrongLoop. You can run the
server from the following commands

    cd api
    node .

To note:

- The api should start to listen on: [http://0.0.0.0:5000](http://0.0.0.0:5000)
- The login screen is at [http://0.0.0.0:5000/login](http://0.0.0.0:5000/login)
- Locally I usually setup my host file to [http://api.dev.yarnstudio.io:5000/login](http://api.dev.yarnstudio.io:5000/login)
- You can open the API explorer on [http://api.dev.yarnstudio.io:5000/explorer](http://api.dev.yarnstudio.io:5000/explorer)



