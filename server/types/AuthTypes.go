package types

type data struct {
	Data picture `json:"data"`
}

type picture struct {
	URL string `json:"url"`
}

type AuthType struct {
	Name          string `json:"name"`
	AccessToken   string `json:"accessToken"`
	Email         string `json:"email"`
	ID            string `json:"id"`
	Picture       data   `json:"picture"`
	SignedRequest string `json:"signedRequest"`
	Username      string `json:"username"`
	Password      string `json:"password"`
}

type dataNA struct {
	Data pictureNA
}

type pictureNA struct {
	URL string
}

type AuthTypeNoAccess struct {
	Name          string
	Email         string
	ID            string
	Picture       string
	JWT           string
	Username      string
	SavedSchedule []string `bson:"SavedSchedule"`
}

type AuthTypeSave struct {
	Name          string
	Email         string
	ID            string
	Picture       string
	JWT           string
	Username      string
	Password      string
	SavedSchedule []string `bson:"SavedSchedule"`
}

type ErrObj struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}
