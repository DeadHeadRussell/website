package server

import (
	"fmt"
	"io/ioutil"
	"os"
	"path"
)

var path_root string = "../../Clients/javascript"

func readFile(file_name string) (int, map[string]string, string) {
	stat, err := os.Stat(path_root + file_name)

	if err != nil {
		fmt.Println(os.ErrNotExist)
		if os.IsNotExist(err) {
			return createError("404", file_name)
		} else {
			return createError("503", err.Error())
		}
	}

	file_content, err := ioutil.ReadFile(path_root + file_name)

	if err != nil {
		return createError("503", err.Error())
	}

	body := string(file_content)

	headers := createDefaultHeaders(stat)
	headers["Content-Type"] = getMimeType(file_name)
  headers["Last-Modified"] = fmt.Sprint(stat.ModTime())

	return 200, headers, body
}

var file_errors = map[string]ErrorPage{
	"404": new(NotFoundErrorPage),
	"503": new(ServerErrorPage),
}

func createError(err string, message string) (int, map[string]string, string) {
	return file_errors[err].createErrorPage(message)
}

var types = map[string]string{
	".html": "text/html",
	".js":   "text/javascript",
	".css":  "text/css",
  ".json": "application/json",
	".mp3":  "audio/mp3",
	".ogg":  "audio/ogg",
	".ico":  "image/x-icon",
	".png":  "image/png",
	".jpeg": "image/jpeg",
	".jpg":  "image/jpeg",
}

func getMimeType(file_name string) string {
	return types[path.Ext(file_name)]
}
