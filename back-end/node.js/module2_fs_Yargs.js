const argv = require("yargs").argv;
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout, 
  });

  if (argv._[0] == "write") {
    askForUserInput("Please provide the filename: ");
  } else {
    console.log("No write operation");
  }

  function askForUserInput(message) {
    //display question to user to provide filename to write to
    rl.question(message, (fileName) => {
        //check if file exists in file array
      checkFileExists(fileName)
        .then((res) => {
            //write to new file
          writeToFile(fileName, res);
        })
        .catch((err) => {
            //show error
          console.log(err);
        });
    });
  }

function checkFileExists(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile("array.txt", function (err, arrayData) {
      if (err) {
        //array file does not exist , probbaly the first time code is being executed
        if (err.code === "ENOENT") {
          handleArrayFileNotFound(reject, resolve);
        } else {
            //if array file exists but error on read
          reject("array file read error");
        }
      }

      //if array file exists and ready is successfull
      if (arrayData) {
        handleArrayFileExists(arrayData, resolve, fileName);
      }
    });
  });

  function handleArrayFileNotFound(reject, resolve) {
    let content = fileName;
    content += "\n"; //create array with new line
    fs.writeFile("array.txt", content, (error) => {
      if (error) {
        console.log("Error occured");
        reject("file write error");
      }
      rl.close();
      resolve("created");
    });
  }

  function handleArrayFileExists(arrayData, resolve, fileName) {
    //method to check if the file name already exists in the array file
    if (fileNameExistInArray(arrayData, fileName)) {
        //ask for new new name
        askForUserInput("File already exists, Please provide a new filename:=>");
    } else {
      resolve("create file");
    }
  }
}

//check if the file name exists in the array file
function fileNameExistInArray(arrayData, fileName) {
  var array = arrayData.toString().split("\n");
  return array.includes(fileName);
}


function writeToFile(fileName, data) {
    //if data is not created , append data to array file
  if (data !== "created") {
    let content = fileName;
    content += "\n";
    fs.appendFile("array.txt", content, (err) => {
      if (err) console.log(err);
    });
  }

  //create new file with default text
  fs.writeFile(fileName, "You are awesome", (err) => {
    if (err) {
      console.log("Error occured");
    }
  });
}
