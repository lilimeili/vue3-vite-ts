import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhZG1pbiIsInNvdXJjZSI6InBjIiwidHlwZSI6Im1hbmFnZSIsImV4cCI6MTY5MzYzNzMwMSwic2lnbklkIjoiNThkZWU1ODY5ZDg5NGYwY2I5OGE4NTI0OWQ3YzNiYmIiLCJpYXQiOjE2OTMwMzI1MDF9.nMtGdD0rWQpttjt6lLMD3hDBgI9Fyzx4fgt3WSgYvwM'

export function getToken() {
    return Cookies.get(TokenKey)
  }
  
  export function setToken() {
    return Cookies.set(TokenKey, token)
  }