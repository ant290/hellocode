// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
//modules for createBoilerPlate
const fs = require("fs");
//const path = require("path");

//put this here to get it out the way and make the methods more readable
//store some boilerplate code
const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta http-equiv="X-UA-Compatible" content="ie=edge" />
	<title>Document</title>
	<link rel="stylesheet" href="app.css" />
</head>
<body>
	<h1>Hello World</h1>
</body>
</html>`;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "hellocode" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('helloCode.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World!');
	});
	//adds the disposable to the available subscriptions
	context.subscriptions.push(disposable);

	//error intensifies
	disposable = vscode.commands.registerCommand('helloCode.ohNoes', function () {
		vscode.window.showErrorMessage('OH NOES!');
	});

	context.subscriptions.push(disposable);

	//creates some boilerplate code
	disposable = vscode.commands.registerCommand('helloCode.createBoilerPlate', function () {

		//check they have a folder open
		if(vscode.workspace.workspaceFolders == undefined)
		{
			return vscode.window.showErrorMessage("Please open a folder to create boilerplate");
		}
		//get the path of the current working folder
		const folderPath = vscode.workspace.rootPath;
		const filePath = folderPath + "\\index.html";
		
		//write the new file to the filesystem
		fs.writeFile(filePath, htmlContent, err => {
		//fs.writeFile(path.join(folderPath, "index.html"), htmlContent, err => {
			if (err) {
				return vscode.window.showErrorMessage("Failed to create boilerplate file!");
			}
			vscode.window.showInformationMessage("Created boilerplate file");
			//open the created file
			vscode.workspace.openTextDocument(filePath).then(doc => {
				vscode.window.showTextDocument(doc);
			});
		});
	});

	context.subscriptions.push(disposable);

	//does an ng build command in the terminal
	disposable = vscode.commands.registerCommand('helloCode.ngBuild', function (){
		const wind = vscode.window;
		if (wind.terminals == undefined || wind.terminals.length === 0)
		{
			wind.createTerminal();
			wind.terminals[0].show();
		}
		vscode.window.terminals[0].sendText('ng build --prod');
	});

	context.subscriptions.push(disposable);

	//does an ng serve -open command in the terminal
	disposable = vscode.commands.registerCommand('helloCode.ngServeOpen', function (){
		const wind = vscode.window;
		if (wind.terminals == undefined || wind.terminals.length === 0)
		{
			wind.createTerminal();
			wind.terminals[0].show();
		}
		vscode.window.terminals[0].sendText('ng s -o');
	});

	context.subscriptions.push(disposable);

	//does an ng test command in the terminal
	disposable = vscode.commands.registerCommand('helloCode.ngTest', function (){
		const wind = vscode.window;
		if (wind.terminals == undefined || wind.terminals.length === 0)
		{
			wind.createTerminal();
			wind.terminals[0].show();
		}
		vscode.window.terminals[0].sendText('ng test');
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
