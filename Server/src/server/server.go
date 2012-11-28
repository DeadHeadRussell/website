package server

import (
	"fmt"
	"log"
	"net/http"
	"strings"
)

type Page interface {
	CreatePage(request *http.Request) (int, map[string]string, string)
}

var main_page Page = new(MainPage)
var filePage Page = new(FilePage)
var favicon_page Page = new(FaviconPage)

var pages = map[string]Page{
	"home":        main_page,
	"music":       main_page,
	"soft":        main_page,
	"about":       main_page,
	"favicon.ico": favicon_page,
}

type Handler struct {
	response_id uint64
}

func (handler *Handler) ServeHTTP(response http.ResponseWriter, request *http.Request) {
	response_id := handler.response_id
	handler.response_id++

	log.Print("============================")
	log.Print("Request: ", response_id)
	log.Print(request.URL)
	log.Print(request.Header)
	log.Print("============================")

	url := request.URL
	path := strings.Split(url.Path, "/")

	page := pages[path[1]]
	if len(path[1]) == 0 {
		log.Print("Using main page")
		page = main_page
	} else if page == nil {
		log.Print("Using file page")
		page = filePage
	}

	status, headers, body := page.CreatePage(request)

	header := response.Header()
	for key, value := range headers {
		header.Add(key, value)
	}

	last_modified := header.Get("Last-Modified")
	//if last_modified == request.Header.Get("If-None-Match") || last_modified == request.Header.Get("If-Modified-Since") {
	//	response.WriteHeader(304)
	//} else {
  {
		header.Add("ETag", last_modified)

		body_range, err := parseRequestRange(request.Header.Get("Range"), len(body))
    if err == 0 {
      status = 206
      header.Add("Content-Range", createResponseRange(body_range, len(body)))
    } else if err == 1 {
      status = 406
      body = "Bad request. Bad range"
    }

		response.WriteHeader(status)

		for i := 0; i < len(body); i += 8192 {
			end := (func(x int, y int) int {
				if x < y { return x }
				return y
			})(i+8192, len(body)-1)
			fmt.Fprint(response, body[i:end])
		}
	}

	log.Print("============================")
	log.Print("Response: ", response_id)
	log.Print(header)
	log.Print("============================")
}
