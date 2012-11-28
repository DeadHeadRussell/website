package server

import (
	"log"
	"net/http"
)

type FilePage struct{}

func (page *FilePage) CreatePage(request *http.Request) (int, map[string]string, string) {
	log.Print("Creating file page")
	return readFile(request.URL.Path)
}
