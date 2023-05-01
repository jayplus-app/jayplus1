package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

const version = "1.0.0"

type config struct {
	port int
	env  string
	db   struct {
		dsn string
	}
	orm *gorm.DB
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

	app := &application{
		config:   cfg,
		infoLog:  infoLog,
		errorLog: errorLog,
		version:  version,
	}

	return app, nil
}

func makeConfig() (config, error) {
	var cfg config

	flag.IntVar(&cfg.port, "port", 4001, "API server port")
	flag.StringVar(&cfg.env, "env", "development", "Environment (development|production)")
	flag.StringVar(&cfg.db.dsn, "dsn", "root:password@/booking?parseTime=true&tls=false", "MySQL DSN")

	flag.Parse()

	orm, err := gorm.Open(mysql.Open(cfg.db.dsn), &gorm.Config{})
	if err != nil {
		return cfg, err
	}

	cfg.orm = orm

	return cfg, nil
}
