package server

import (
  "fmt"
  "os"
  "regexp"
  "strconv"
  "time"
)

type Range struct {
  start int
  end int
}

func createDefaultHeaders(stat os.FileInfo) (map[string]string) {
  headers := make(map[string]string)

  headers["Accept-Ranges"] = "bytes"
  headers["Access-Control-Allow-Origin"] = "*"
  headers["Cache-Control"] = "public"
  headers["Connection"] = "Keep-Alive"
  headers["Date"] = time.Now().Format(time.RFC1123)
  headers["Keep-Alive"] = "timeout=15, max=100"
  headers["Last-Modified"] = fmt.Sprint(stat.ModTime())
  headers["Transfer-Encoding"] = "chunked"

  return headers
}

var range_regexp_start *regexp.Regexp = regexp.MustCompile("[0-9]+-")
var range_regexp_end *regexp.Regexp = regexp.MustCompile("-[0-9]+")

func parseRequestRange(request_range string, max_length int) (*Range, int) {
  range_object := new(Range)

  if len(request_range) == 0 {
    range_object.end = max_length - 1
    return range_object, 2
  }

  start_match := range_regexp_start.FindString(request_range)
  if len(start_match) > 0 {
    range_object.start, _ = strconv.Atoi(start_match[:len(start_match) - 1])
  }

  end_match := range_regexp_end.FindString(request_range)
  if len(end_match) > 0 {
    range_object.end, _ = strconv.Atoi(end_match)
    range_object.end = -range_object.end
  }

  if range_object.end > max_length || range_object.end == 0 {
    range_object.end = max_length - 1
  }

  fmt.Println(range_object.start)
  fmt.Println(range_object.end)

  if range_object.end < range_object.start {
    return nil, 1
  }

  return range_object, 0
}

func createResponseRange(range_object *Range, max_length int) (string) {
  return "bytes " + strconv.Itoa(range_object.start) + "-" +
      strconv.Itoa(range_object.end) + "/" + strconv.Itoa(max_length)
}

