## Description
This is a wrapper around the `csv-parse` and `pg-primise` libraries, which can be used from the command line, or imported into an existing node project. 

This is meant to be an interface to read a CSV file, format and sanitize the keys, and upload the data as text to a PostgreSQL server.


## Usage:

`$ get-csv --mode local --uri .\SomeStats.csv`

`$ get-csv --mode local --uri C:/users/user-name/desktop/file.csv`

### OPTIONS:
```
--mode              Specify whether the CSV is a local file 
                    or a remote resource which requires HTML
                    (local|remote)

--uri               Can be a local or remote file path, or a URL
                    to a CSV file to download.
```