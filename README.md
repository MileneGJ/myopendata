# My Open Data

This is a authoral project, developed during Driven Bootcamp course and was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It is an platform for scientific data sharing, in which any user can register, look for data based on keyword, title or author and download it for free use. Users also have their own pages, allowing them to upload their own data or visit other users' page.

## Features available for the user

Users need authentication to use the features of this application. The registration to the platform is free of cost

### Search for data based on different fields

A case insensitive search is available to look for specific data, filtering it by title, keyword or author

### See one uploaded file in detail

By clicking on a file on the main list, the user will see a page with more details of that file. On this first version, it is recommended for each uploaded file to have a thorough description so that other users can understand what it is about. Future versions of the application will provide more automation to that process.

### Upload a new file

Clicking on the 'Upload a new file' button will show a form for uploading new data. The user must provide a title, description and at least one keyword. It is possible to add more than one csv data to each file, if it makes sense to the type of data being uploaded.

### See a list of the user own files and manage it

Clicking on 'My Files' on the user menu will show a list of files uploaded by the authenticated user and will show the option of deleting or adding any files. Future versions will also enable the edit option.

### See a list of other authors' files

Either by clicking on the authors' icons on the main files list or by clicking on the author's name on the single file page, the user is redirected to that author's page. There, it will be possible to see a list of files entered by that author and to access more details by clicking on a file. Future versions will provide a direct chat to interact with authors and ask questions about their data.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
