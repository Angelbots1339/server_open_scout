declare global {
    namespace NodeJS {
        interface ProcessEnv {
            SESSION_SECRET: string;
            SCOUT_DB_URI: string;
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}