build: clean
	@echo "Building API..."
	@GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -o ../dist/jayplus_api ./cmd/api
	@echo "API end built!"

clean:
	@echo "Cleaning..."
	@- rm -f ../dist/*
	@go clean
	@echo "Cleaned!"