fields limiting:
http://localhost:3000/api/v1/tours?fields=-name,-price

sorting:
http://localhost:3000/api/v1/tours?sort=price

advanced filtering:
http://localhost:3000/api/v1/tours?difficulty=easy&duration[gte]=5&price[lt]=1900

pagination:
http://localhost:3000/api/v1/tours?difficulty=easy&duration[gte]=5&price[lt]=1900
