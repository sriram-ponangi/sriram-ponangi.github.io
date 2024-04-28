

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




# Build Application for Github Pages Deployment:
ng build --configuration production --base-href https://[username].github.io/[repo]/

> **Note:** If this is your default github pages repo ([username].github.io) then you can skip [repo] in the base-ref above.
ng build --configuration production --base-href https://[username].github.io/

Example:
```shell
ng build --configuration production --base-href https://sriram-ponangi.github.io/
```

> Rename the generated dist directory to docs
