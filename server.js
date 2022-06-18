const express = require('express')
const app = express()
const PORT = 8000
const cors = require('cors')

const fiveLetters = require('./five.js')
const sixLetters = require('./six.js')


app.set('view engine', 'ejs')
app.use(cors())
app.use(express.json())
app.use(express.static('public'))  

app.get('/' , (request,response) => {
    response.render('index.ejs')
} ) 

//ie: api/five
app.get('/api/:numOfLetters' , (request, response) => {
    // set variable for parameter from user
    const numOfLetters = request.params.numOfLetters.toLowerCase()

    if ( numOfLetters == 'five' ) {
        wordList = fiveLetters
    } else if ( numOfLetters == 'six' ) {
        wordList = sixLetters
    } else {
        return response.status(400).json( {error: `List does not exist`})
    }

    // determine a random number to pull word JS file
    let random = Math.floor(Math.random() * wordList.WORDS.length)
    // JSON response with a word from JS file - data returned is an object with array of words
    response.json(wordList.WORDS[random])
})

app.listen( process.env.PORT || PORT, () => {
    console.log(`Running on port ${PORT}`)
})
