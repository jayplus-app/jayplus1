package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
)

const version = "1.0.0"

type config struct {
	port int
	env  string
}

type application struct {
	config   config
	infoLog  *log.Logger
	errorLog *log.Logger
	version  string
}

func (app *application) serve() error {
	srv := &http.Server{
		Addr:    fmt.Sprintf(":%d", app.config.port),
		Handler: app.routes(),
	}

	app.infoLog.Printf("Starting Backend server in %s mode on port %d\n", app.config.env, app.config.port)

	return srv.ListenAndServe()
}

func main() {
	app := makeApp()

	err := app.serve()
	if err != nil {
		app.errorLog.Fatal(err)
	}
}

func makeApp() *application {
	cfg := makeConfig()

	infoLog := log.New(os.Stdout, "INFO\t", log.Ldate|log.Ltime)
	errorLog := log.New(os.Stdout, "ERROR\t", log.Ldate|log.Ltime|log.Lshortfile)

	app := &application{
		config:   cfg,
		infoLog:  infoLog,
		errorLog: errorLog,
		version:  version,
	}

	return app
}

func makeConfig() config {
	var cfg config

	flag.IntVar(&cfg.port, "port", 4001, "API server port")
	flag.StringVar(&cfg.env, "env", "development", "Environment (development|production)")

	flag.Parse()

	return cfg
}
