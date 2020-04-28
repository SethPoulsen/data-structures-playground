# Data Structures Playground
A webapp for learning how to manipulate data structures with code. 

Right now this is in a very early alpha stage. Please contact me at
[sethp3@illinois.edu](mailto:sethp3@illinois.edu) if you would like to
contribute in some way. 

# Building 
First install node and npm (see [the official node
website](https://nodejs.org/en/) for instructions). Then install webpack 
and dependencies with  

```sh
$ npm install -g webpack webpack-cli
$ npm install
```

and then compile the project with 

```sh
$ webpack --depug
```

Start a server in the root of the repository with 

```sh
$ python -m http.server 8000
```
or your other favorite local server
([here](https://gist.github.com/willurd/5720255) are some other examples).

Open your browser to `localhost:8000` (or whichever port you put the site on). 

Enjoy!

