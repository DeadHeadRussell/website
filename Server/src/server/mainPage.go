package server

import (
	"log"
	"net/http"
)

type MainPage struct{}

func (page *MainPage) CreatePage(request *http.Request) (int, map[string]string, string) {
	log.Print("Creating main page")
	return readFile("/index.html")
}
