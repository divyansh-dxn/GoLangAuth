package database

import (
	"GoLangAuth/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	db, err := gorm.Open(mysql.Open("root:231223@/golang"),&gorm.Config{})
	if err!=nil {
		panic("Error connecting to database")
	}
	DB = db
	err = db.AutoMigrate(&models.User{})
	if err != nil {
		return 
	}
}
