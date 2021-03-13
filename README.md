# GreyView.js
GrayView.js is a library for executing scripts according to each web page.

## install
`$ npm install greyview`
```JavaScript
import GreyView from "greyview";
```
## usage
Add the data-page-name attribute to the body tag of the page where you want to execute the script.
```html
<body data-page-name="page">
```
Then create an instance of the GrayView class.
```JavaScript
const greyview = new GreyView();
```
To execute the script according to each page, specify the array that stores the character string in the argument of createPathMap () which is a method of greyview. At this time, the character string stored in the array must match the value set in the data-page-name attribute.

Executing createPathMap will generate properties in the pathMap object that match the name of each data-page-name. By assigning a function to that property, it is possible to execute the script according to each page.
```JavaScript
greyview.createPathMap(['page', 'page2', 'page3']);

greyview.pathMap.page = (): void => {
    console.log('foo');
}

greyview.pathMap.page2 = (): void => {
    console.log('bar');
}
...
```
Also, if there is a script that you want to execute for all pages, assign the function to the common property of the pathMap object.
```JavaScript
greyview.pathMap.common = () => {
    console.log('foo');
}
```
Finally, execute start () to get GrayView to work.
```JavaScript
greyview.start();
```

## options
GrayView can use the option by specifying the object as an argument.
(Currently there is only one option, we plan to add it in the future.)

### observation
If the value of data-page-name is rewritten, execute grayview again and Execute the script according to the value of data-page-name after rewriting.

```JavaScript
  observation: boolean
```

## Trouble Shooting
If you have problems with TypeScript not loading modules, try adding "moduleResolution": "node" to your tsconfig.json settings.