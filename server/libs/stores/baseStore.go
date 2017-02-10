package stores

import mgo "gopkg.in/mgo.v2"

var Session *mgo.Session

func InitStores() error {
	var err error
	Session, err = mgo.Dial("localhost")
	return err
}
