const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'admin',
  port: 5432,
})

/*  This table contains data from the most used programming languages in 2020.
*   Source: Stack Overflow Developer Survey 2020 
*   https://insights.stackoverflow.com/survey/2020#technology-programming-scripting-and-markup-languages-professional-developers 
*   Column 1 - title = name of the language
*   Column 2 - id = unique identifier for the item
*   Column 3 - usage = popularity of the language in 2020 (as percentage)
*   Column 4 - skills = boolean value to state if user has any skills in the language */



// ??? How to rename the table from exam to languages without messing up the id generator?



//  - - - Assignment 1 - adding a new language - - -

// Adding a new language, title data only:
const addLanguageTitle = async () => {
    try {
      const result = await pool.query("INSERT INTO exam (title) VALUES ('Testi 2')")
      console.log("Number of titles added:", result.rowCount)
    } catch (error) {
      console.log("There was an error:", error)
    }
  }

// Inserting multiple values: 'INSERT INTO exam (title) VALUES ('Java'), ('CSS'), ('NoSQL'), ('C#'), ('Rust'), ('Perl'), ('Go')'

// Adding a new language, data to all 3 columns:
const addLanguage = async (title, usage, skills) => {
    const text = 'INSERT INTO exam(title, usage, skills) VALUES($1, $2, $3) RETURNING *'
    const values = [title, usage, skills]
    try { 
        const result = await pool.query(text, values)
        console.log("Result:", result.rows[0])
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}

// The function above accepts all the data types tested below:
// addLanguage('HTML/CSS', '62.4', 'true')
// addLanguage("SQL","56.9","true")
// addLanguage("Python", 41.6, true)



//  - - - Assignment 2 - removing a language by id - - -

// Removing a language by passing the id as an argument:
const removeLanguage = async (id) => {
    const text = (`DELETE from exam WHERE id=${id}`) // Very important! The WHERE condition prevents the deletion of the whole table
    try {
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}

// The function above accepts both data types tested below:
// removeLanguage(1)
// removeLanguage("2")



//  - - - Assignment 3 - modifying language title - - -

const modifyLanguageTitle = async (title, id) => {
    const text = (`UPDATE exam SET title = '${title}' WHERE id=${id}`)
    try {
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}

// The function above accepts all the data types tested below:
// modifyLanguageTitle('FirstTest', 3)
// modifyLanguageTitle("SecondTest", "4")
// modifyLanguageTitle('ThirdTest', '5')

// This function changes all 3 fields, only the id stays the same (items already deleted from the list cannot be modified):
const modifyLanguage = async (title, usage, skills, id) => {
    const text = (`UPDATE exam SET title = '${title}', usage = ${usage}, skills = ${skills} WHERE id=${id}`) // Again, WHERE is essential
    try {
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}

// modifyLanguage('Java', 38.4, false, 6)
// modifyLanguage('Bash/Shell/PowerShell', 34.8, false, 7)
// modifyLanguage("SecondTest", null, null, 4) // This one cleared the unneccessary values from columns 3 and 4



//  - - - Assignment 4 - getting all exams - - -

const getAll = async () => {
    const text = 'SELECT * FROM exam'
    try {
        const result = await pool.query(text)
        console.log("result:", result)
    } catch (error) {
    console.log("There was an error:", error.stack)
    }
}

// getAll()



//  - - - Assignment 5 - getting an exam by its id - - -

const getById = async (id) => {
    const text = (`SELECT * FROM exam WHERE id=${id}`)
    try {
        const result = await pool.query(text)
        console.log("result:", result)
  } catch (error) {
    console.log("There was an error:", error.stack)
  }
}

// getById(15)



//  - - - Assignment 6 - getting exams organized alphabetically by title - - -

const getAlphabetically = async () => {
    try {
        const result = await pool.query('SELECT * FROM exam ORDER BY title ASC')
        console.log("result:", result)
  } catch (error) {
    console.log("There was an error:", error.stack)
  } finally {
    // ??? Does this make sense:
    pool.end()
  }
}

// getAlphabetically()

// This function gets titles and usages only, from highest percentage to lowest (the meat of this table):
const getMeat = async () => {
    try {
        const result = await pool.query('SELECT title, usage FROM exam ORDER BY usage DESC')
        console.log("result:", result)
    } catch (error) {
        console.log("There was an error:", error.stack)
    } finally {
    pool.end()
    }
}

// getMeat()



//  - - - Assignment 7 - getting exams with ids 1, 2 and 3 in on query  - - -

// IN syntax - Getting all from ids 15, 16 and 17:
const getMultipleValues = async () => {
    try {
        const result = await pool.query('SELECT * FROM exam WHERE id IN (15, 16, 17) ORDER BY usage DESC')
        console.log("result:", result)
    } catch (error) {
        console.log("There was an error:", error.stack)
    } finally {
    pool.end()
    }
}

// getMultipleValues()

// BETWEEN syntax - Getting all languages (titles and usages) with more than 40 percent usage:
const getMostUsed = async () => {
    try {
        const result = await pool.query('SELECT title, usage FROM exam WHERE usage BETWEEN 40 AND 100 ORDER BY usage DESC')
        console.log("result:", result)
    } catch (error) {
        console.log("There was an error:", error.stack)
    } finally {
    pool.end()
    }
}

// getMostUsed()



//  - - - Assignment 8 - Get exams that date before 12.10.2022 (add a column with data type date) - - -

// First we need a function for adding creation dates for the programming languages in the table:
const modifyCreationDate = async (date, title) => {
    const text = (`UPDATE exam SET created = '${date}' WHERE title='${title}'`)
    try {
        const result = await pool.query(text)
        console.log(result)
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}

// modifyCreationDate("2009-11-11","Go")

// This function gets all programming languages created before the year 2000 and lists them alphabetically:
const getOldLanguages = async () => {
    const text = ("SELECT title, created FROM exam WHERE created BETWEEN '1970-11-11' AND '1999-12-31' ORDER BY title ASC")
    try {
        const result = await pool.query(text)
        console.log(result)
    } catch (error) {
        console.log("There was an error:", error.stack)        
    }
}

// getOldLanguages()

// EXAMPLE: SELECT * FROM Orders WHERE OrderDate='2008-11-11'
// 'SELECT title, usage FROM exam WHERE usage BETWEEN 40 AND 100 ORDER BY usage DESC'

//  - - - Assignment 9 - Get languages with the boolean value true - - -

// This function gets languages that have skills set to true:
const getTrueValues = async () => {
    try {
        const result = await pool.query('SELECT title FROM exam WHERE skills=true')
        console.log("result:", result)
  } catch (error) {
    console.log("There was an error:", error.stack)
  }
}

// getTrueValues()











