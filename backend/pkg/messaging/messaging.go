package messaging

type Message struct {
	Body       string
	Sender     string
	Recipients []string
}

type Gateway *interface {
	Send(Message) error
}
