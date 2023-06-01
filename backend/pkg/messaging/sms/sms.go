package sms

import "github.com/jayplus-app/jayplus/pkg/messaging"

type Twillio struct {
	SID   string
	Token string
}

// Send sends an SMS using Twillio (Implement SMSGW interface)
func (t Twillio) Send(sms *messaging.Message) error {
	return nil
}
