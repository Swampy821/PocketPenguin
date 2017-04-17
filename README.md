# Pocket Penguin


![Phone Gopher](https://raw.githubusercontent.com/Swampy821/PocketPenguin/master/designs/logos/phone_go_gopher_small.png)



# Local Setup

### Dependencies
```
    Golang
    Docker
    Docker-compose
    Nodejs
```


### Setting up local
```
    make init-setup
```

```
    make start-db
```

You will want to run each run  own tab. 
```
    make run-server
```

```
    make run-frontend
```



To run a build for the server run
```
    make prod-build
```


To view from frontend dev server

[http://localhost:8000](http://localhost:8000)

To view from server

[http://localhost:8081](http://localhost:8081)


The frontend proxies into the backend so you will want to run both.

