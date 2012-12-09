package server

import (
	"fmt"
)

type ErrorPage interface {
	createErrorPage(err string) (status int, headers map[string]string, body string)
}

type NotFoundErrorPage struct{}

func (*NotFoundErrorPage) createErrorPage(err string) (int, map[string]string, string) {
	body := "<html><head><title>Error</title></head><body>" +
		"ERROR: 404 File Not Found (" + err + ")</body></html>"

	headers := make(map[string]string)
	headers["Content-Type"] = "text/html"
	headers["Content-Length"] = fmt.Sprint(len(body))

	return 404, headers, body
}

type ServerErrorPage struct{}

func (*ServerErrorPage) createErrorPage(err string) (int, map[string]string, string) {
	body := "<html><head><title>Error</title></head><body>" +
		"ERROR: 503 Server Error (" + err + ")</body></html>"

	headers := make(map[string]string)
	headers["Content-Type"] = "text/html"
	headers["Content-Length"] = fmt.Sprint(len(body))

	return 503, headers, body
}
