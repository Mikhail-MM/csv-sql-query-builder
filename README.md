# Description
This is a wrapper around the `csv-parse` and `pg-primise` libraries, which can be used from the command line, or imported into an existing node project. 

This is meant to be an interface to read a CSV file, format and sanitize the keys, and upload the data as text to a PostgreSQL server.


## Usage:
* If you want to upload your CSV data to PostgreSQL, make sure to create an .env file containing your DB connection information.

### .env config

```
POSTGRES_HOST=my-db.hash.us-east-2.rds.amazonaws.com
POSTGRES_PORT=5432
POSTGRES_DATABASE=my-db-name
POSTGRES_USER=my-user-name
POSTGRES_PW=my-pass-word
```

# Sample Commands:

`$ get-csv --mode local --uri .\SomeStats.csv`

`$ get-csv --mode local --uri C:/users/user-name/desktop/file.csv`

`$ get-csv --mode local --upload --uri ./file.csv`

# OPTIONS:

```
--mode              Specify whether the CSV is a local file 
                    or a remote resource which requires HTML
                    (local|remote)

--uri               Can be a local or remote file path, or a URL
                    to a CSV file to download.

--upload            Automatically create a Table in PostGres using 
                    the keys found in the CSV file, and proceed to 
                    upload the values
```