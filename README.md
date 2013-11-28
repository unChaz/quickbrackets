QuickBrackets
=============

## TLDR

````
npm install
node app
````

##Overview

BracketFactory reimagined, QuickBrckets is a 3 part web application 
that allows users to create and manage brackets from a "manager dashboard". 
From the manager dashboard you can create a public link that generates a 
read only view of the bracket. 

Users will not have to register or login to create/manage brackets. Authentication 
will be done using cookies for users that are not logged in. The cookie will contain a 
SIN that the user can view and save, or login/register and the SIN will be automatically 
added to their account. 

The idea is when you go to the website, without registering or logging in, with only 1 click 
you can be creating brackets. The creation process will be super simple. Select a bracket type, enter names, 
and hit generate.

From the dashboard you can upload images for each competitor, denote winners, and share the link to the public bracket view.

##Design

Like I said, the app will consist of 3 parts; a RESTful API, and 2 separate client side apps. I'd like to take the 
time to carefully design the backend.
 The 2 clients can be quickly built with Yeoman.
 
###Part 1: API

The backend will be a node application that just provides a RESTful API. Because the app doesn't require the user to be logged in, 
anyone can use it with their own apps. It will look something like this:

POST: quickbrackets.com/api/brackets/new

Request:
```javascript
{
'name': 'My Bracket',
'players':['andre', 'chaz', 'bob', 'bill', 'barry', 'ben', ...]
 }
```
    
Response: 
```javascript
{'SIN': '4UnfSSIufG12j3k9f',
//Bracket Data
}
```


###Part 2: Manager Dashboard
The manager dashboard is just an angular app that uses the API. It will need to handle cookies, and logins, and have the appropriate controls for managing the brackets.

The cookie can store a list of brackets, so the user can manage multiple brackets.

###Part 3: Public View
The public view is also an angular app but much simpler. 
All it needs is to display the bracket and automatically check for updates. 
We can also set it up as an iframe so it can be embedded easily. 

The only controlls will be to refresh, and a button to "create your own bracket". 

We could integrate with reddit enhancement suite like Twitter is, so for subs like /r/starcraft 
redditors that click the + button on the post can see the real time results of tournaments. 
That would also be a good way to advertise the app.
