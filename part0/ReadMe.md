# Part 0b
> Fundamentals of Web apps

## Exercises

### 0.4

```text
browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note data:note=<sent message>
server-->browser: Status code: 302, Redirect to exampleapp/notes
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
server-->browser: HTML-code
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: main.css
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
server-->browser: main.js

note over browser:
browser starts executing js-code
that requests JSON data from server 
end note

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: [{ content: "HTML is easy", date: "2019-05-23" }, ...]

note over browser:
browser executes the event handler
that renders notes to display
end note
```

![Screenshot](screenshots/ex4.png)

### 0.5

```text
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
server-->browser: HTML-code
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: main.css
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
server-->browser: spa.js

note over browser:
browser starts executing js-code
that requests JSON data from server 
end note

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: [{ content: "HTML is easy", date: "2019-05-23" }, ...]


note over browser:
browser executes the event handler
that renders notes to display
end note
```

![Screenshot](screenshots/ex5.png)

### 0.6

```text
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
server-->browser: HTML-code
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: main.css
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
server-->browser: spa.js

note over browser:
browser starts executing js-code
that requests JSON data from server 
end note

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: [{ content: "HTML is easy", date: "2019-05-23" }, ...]


note over browser:
browser executes the event handler
that renders notes to display
end note

browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa json:{content: ..., date: ...}
server-->browser: Status code 201, json {message: 'note created'}

note over browser
unlike server side rendering, SPA doesn't
redirect page after POST request.
```

![Screenshot](screenshots/ex6.png)


