package server

import (
	"log"
	"net/http"
)

type FaviconPage struct{}

func (page *FaviconPage) CreatePage(request *http.Request) (int, map[string]string, string) {
	log.Print("Creating favicon page")
	return readFile("/img/favicon.ico")
}
