package main

import (
	"fmt"
	"log"
	"net/http"
)

import (
	"server"
)

// Create easy /close http handler to shut down the server
var dev_environment = true

type CloseHandler struct {
	c chan bool
}

func (handler CloseHandler) ServeHTTP(response http.ResponseWriter, request *http.Request) {
	fmt.Fprint(response, "Shutting down the server...")
	handler.c <- true
}

func startServer(c chan bool) {
	handler := server.Handler{}
	http.Handle("/", &handler)

	if dev_environment == true {
		closeHandler := CloseHandler{c}
		http.Handle("/close", closeHandler)
	}

	log.Fatal(http.ListenAndServe(":8003", nil))
}

func main() {
	log.Print("Starting server")

	c := make(chan bool, 1)
	go startServer(c)
	<-c

	log.Print("Server has successfully shut down.")
}
