package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"

	. "github.com/jayplus-app/jayplus/internal/driver/models"
)

const version = "1.0.0"

type config struct {
	port int
	env  string
	db   DBConfig
}

type application struct {
	config   config
	infoLog  *log.Logger
	errorLog *log.Logger
	version  string
	db       Models
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
	app, err := makeApp()
	if err != nil {
		log.Fatal(err)
	}

	err = app.serve()
	if err != nil {
		app.errorLog.Fatal(err)
	}
}

func makeApp() (*application, error) {
	infoLog := log.New(os.Stdout, "INFO\t", log.Ldate|log.Ltime)
	errorLog := log.New(os.Stdout, "ERROR\t", log.Ldate|log.Ltime|log.Lshortfile)

	cfg, err := makeConfig()
	if err != nil {
		return nil, err
	}

	models, err := NewModels(&cfg.db)
	if err != nil {
		return nil, err
	}

	app := &application{
		config:   cfg,
		infoLog:  infoLog,
		errorLog: errorLog,
		version:  version,
		db:       *models,
	}

	return app, nil
}

func makeConfig() (config, error) {
	var cfg config

	flag.IntVar(&cfg.port, "port", 4001, "API server port") // TODO: [THREAD:3] Read port from env
	flag.StringVar(&cfg.env, "env", "development", "Environment (development|production)")
	flag.StringVar(&cfg.db.User, "dbuser", "root", "MySQL User")        // TODO: [THREAD:3] Read dbuser from env
	flag.StringVar(&cfg.db.Pass, "dbpass", "", "MySQL Password")        // TODO: [THREAD:3] Read dbpass from env
	flag.StringVar(&cfg.db.Host, "dbhost", "localhost", "MySQL Host")   // TODO: [THREAD:3] Read dbhost from env
	flag.IntVar(&cfg.db.Port, "dbport", 3306, "MySQL Port")             // TODO: [THREAD:3] Read dbport from env
	flag.StringVar(&cfg.db.Name, "dbname", "jayplus", "MySQL Database") // TODO: [THREAD:3] Read dbname from env

	flag.Parse()

	return cfg, nil
}
