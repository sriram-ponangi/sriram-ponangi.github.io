# SriramPonangiGithubIo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


---



# Steps to Develop the Portfolio Application
$ ng new sriram-ponangi.github.io

$ npm i bootstrap@5.3.3
> Add bootstrap angular.json file's following sections:
```JSON
    {
        "projects": {
            "sriram-ponangi.github.io": {
                "architect": {
                    "build": {
                        "options": {
                            "styles": [
                            "src/styles.css",
                            "node_modules/bootstrap/scss/bootstrap.scss"
                            ],
                            "scripts": [
                            "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
                            ]
                        }
                    }
                }
            }
        }
    }
```

```
npm install yaml
ng generate service services/PortfolioData
```

# Steps to Deploy the Application into Github Pages:


## STEP-1: Build the angular app
### OPTIONAL
- Checkout the angualr application in the `master` branch
- Run the following commands:
    ```shell
    $ npm install
    
    $ ng build --configuration production --base-href https://[username].github.io/[repo]/
    ```
    > **Note:** If this is your default github pages repo ([username].github.io) then you can skip [repo] in the base-ref above.
    ng build --configuration production --base-href https://[username].github.io/

    Example:
    ```shell
    ng build --configuration production --base-href https://sriram-ponangi.github.io/
    ```

## STEP-2: Deploy the angular app
- Copy the contents of the generated `dist` directory to `docs` in the `gh-pages` branch.

### OPTIONAL
- Update the `portfolio-data.yaml` URL from the default `/assets/data/portfolio-data.yaml` to any other remote URL.

- Commit and push the code to `gh-pages` branch.

- Go to the repository's settings in the GitHub and update the GitHub Pages build & deployment section as follows:
    - source to `deploy from a branch`
    - branch name to `gh-pages`
    - directory to `docs`
