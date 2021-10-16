package controllers

import (
	"GoLangAuth/database"
	"GoLangAuth/models"
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
	"strconv"
	"time"
)

const SecretKey = "secret"

func Register(c *fiber.Ctx) error {
	//var data = make(map[string]string)
	var data map[string]string
	err := c.BodyParser(&data)
	if err != nil {
		fmt.Println(err)
		return err
	}
	password, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 14)
	user := models.User{Name: data["name"], Email: data["email"], Password: password}
	database.DB.Create(&user)
	return c.JSON(user)
}

func Login(c *fiber.Ctx) error {
	var loginDto models.LoginUserDto
	err := c.BodyParser(&loginDto)
	if err != nil {
		fmt.Println(err)
		return err
	}
	var user models.User
	database.DB.Where("email = ?", loginDto.Email).First(&user)
	if user.Id == 0 {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{"message": "user not found"})
	}
	err = bcrypt.CompareHashAndPassword(user.Password, []byte(loginDto.Password))
	if err != nil {
		fmt.Println(err)
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{"message": "incorrect password"})
	}
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.StandardClaims{
			Issuer:    strconv.Itoa(int(user.Id)),
			ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
		},
	)
	token, err := claims.SignedString([]byte(SecretKey))
	if err != nil {
		fmt.Println(err)
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{"message": "login failed"})
	}
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}
	c.Cookie(&cookie)
	return c.JSON(fiber.Map{"message": "login success"})
}

func User(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")
	token, err := jwt.ParseWithClaims(
		cookie,
		&jwt.StandardClaims{},
		func(token *jwt.Token) (interface{}, error) {
			return []byte(SecretKey), nil
		},
	)
	if err != nil {
		fmt.Println(err)
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{"message": "authorization failure, please login"})
	}
	claims := token.Claims.(*jwt.StandardClaims)
	var user models.User
	database.DB.Where("id = ?",claims.Issuer).First(&user)
	return c.JSON(user)
}

func Logout(c *fiber.Ctx) error {
	cookie := fiber.Cookie{
		Name: "jwt",
		Value: "",
		Expires: time.Now().Add(-time.Minute*1),
		HTTPOnly: true,
	}
	c.Cookie(&cookie)
	return c.JSON(fiber.Map{
		"message":"logged out successfully",
	})
}
