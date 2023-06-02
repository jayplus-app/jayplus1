package sms

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/url"
	"strings"

	"github.com/jayplus-app/jayplus/pkg/messaging"
)

type Twillio struct {
	SID      string
	Token    string
	infoLog  *log.Logger
	errorLog *log.Logger
}

func NewTwillio(sid, token string, infoLog, errorLog *log.Logger) *Twillio {
	return &Twillio{
		SID:      sid,
		Token:    token,
		infoLog:  infoLog,
		errorLog: errorLog,
	}
}

// Send sends an SMS using Twillio (Implement SMSGW interface)
func (t Twillio) Send(sms *messaging.Message) map[string]error {
	urlStr := "https://api.twilio.com/2010-04-01/Accounts/" + t.SID + "/Messages.json" // TODO: [THREAD:3] Read twillio url from env
	msgData := url.Values{}
	errs := map[string]error{}

	for _, r := range sms.Recipients {
		msgData.Set("To", r)
		msgData.Set("From", sms.Sender)
		msgData.Set("Body", sms.Body)
		msgDataReader := *strings.NewReader(msgData.Encode())

		client := &http.Client{}
		req, err := http.NewRequest("POST", urlStr, &msgDataReader)
		if err != nil {
			errs[r] = err
			continue
		}

		req.SetBasicAuth(t.SID, t.Token)
		req.Header.Add("Accept", "application/json")
		req.Header.Add("Content-Type", "application/x-www-form-urlencoded")
		resp, err := client.Do(req)
		if err != nil {
			errs[r] = err
			continue
		}

		if resp.StatusCode >= 200 && resp.StatusCode < 300 {
			var data map[string]interface{}
			decoder := json.NewDecoder(resp.Body)
			err := decoder.Decode(&data)
			if err == nil {
				t.infoLog.Printf("Twillio: SMS sent successfully. [ sid: %s ]\n", data["sid"])
			}
		} else {
			t.errorLog.Printf("Twillio: Failed to send SMS! [ status: %s ]\n", resp.Status)
			errs[r] = fmt.Errorf("Twillio: Failed to send SMS! [ status: %s ]", resp.Status)
		}
	}

	return nil
}
