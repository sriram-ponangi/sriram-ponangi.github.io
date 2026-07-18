# SriramPonangiGithubIo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 22.0.5.

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

## Updating Node.js and Angular

Check what's currently required:
```shell
ng version
```
This prints both the Angular CLI version and whether your current Node.js version is supported.

### Updating Node.js (via Homebrew)

```shell
# Install the target LTS version (check angular.dev/reference/versions for the current supported range)
brew install node@24

# Switch the active linked version
brew unlink node
brew link --force --overwrite node@24
hash -r

# Verify
node -v
```

### Updating the Angular CLI and project packages

```shell
# Update the global CLI
npm install -g @angular/cli@latest

# See what's outdated in this project
ng update

# Update Angular core + CLI together (keeps versions in sync)
ng update @angular/cli @angular/core
```

> **Note:** If jumping more than one major version behind, update one major at a time (e.g. v20 → v21 → v22) rather than skipping — `ng update` only supports single-major jumps.

`ng update` may prompt you to opt into optional migrations (e.g. moving to the esbuild-based application builder, or Karma → Vitest for testing). Review each one before accepting — some are safe defaults, others (like test runner changes) are worth handling as a separate, deliberate step if you have custom test config.

### After updating

```shell
npm install
ng build
ng test
ng serve
```
Commit your working tree *before* running `ng update`, so any auto-applied code migrations can be reviewed or reverted via git diff.

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

> **Note:** The `angular.json` snippet above reflects the original setup on the legacy Webpack-based builder. Since this project migrated to Angular's newer esbuild-based `application` builder (via `ng update`'s `use-application-builder` migration), the config keys in `angular.json` may differ slightly from what's shown here — e.g. the entry point key may now be `browser` instead of `main`, and `outputPath` may be an object rather than a string. Check your actual `angular.json` if reproducing this setup from scratch.

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

### Using Custom Domain
- Checkout the angualr application in the `master` branch
- Run the following commands:
    ```shell
    $ npm install
    
    $ ng build --configuration production --base-href /

    $ rm -rf docs/*
    $ printf "%s" "sriram.ponangi.com" > docs/CNAME
    $ cp -r dist/sriram-ponangi.github.io/browser/* docs/
    # On MacOs
    $ sed -i '' 's/<title>SriramPonangiGithubIo<\/title>/<title>SriramPonangi<\/title>/g' docs/index.html
    # On Linux (or Git Bash on Windows)
    $ sed -i 's/<title>SriramPonangiGithubIo<\/title>/<title>SriramPonangi<\/title>/g' docs/index.html
    ```

#### Other DNS Configs
> Step 1: Add the custom domain in GitHub
- Go to your repo sriram-ponangi/sriram-ponangi.github.io on GitHub
- Go to Settings → Pages
- Under "Custom domain," enter sriram.ponangi.com and save GitHub will automatically create a CNAME file in your repo's root containing that domain (if it doesn't, create one yourself with just that one line)

> Step 2: Create the DNS record in Route53
- Go to Route53 → Hosted zones → ponangi.com
- Click Create record
- Fill in:
    - Record name: sriram
    - Record type: CNAME
    - Value: sriram-ponangi.github.io
    - TTL: 300 (default is fine)
- Save the record

> Note: use CNAME, not an A record, since GitHub Pages user sites are served from a hostname, not a fixed IP (unlike apex domains, which need A/ALIAS records to GitHub's IPs — but since you're using a subdomain, CNAME is correct and simpler).

> Step 3: Wait and verify
- DNS propagation usually takes a few minutes to an hour, sometimes longer.
- Once it resolves, go back to GitHub → Settings → Pages and check "Enforce HTTPS" — GitHub needs to issue a certificate for the domain first, which can take up to 24 hours, but is usually much faster
- You can check propagation status by running dig sriram.ponangi.com in a terminal, or using a site like whatsmydns.net

> A couple of things to double check
- If using AWS make sure Route53 is actually your domain's authoritative DNS (i.e., your registrar's nameservers point to the Route53 hosted zone). If you bought the domain through Route53 directly, this is automatic.
- If you ever want ponangi.com (the apex/root, no subdomain) to also point somewhere, that requires a different setup (A records or Route53's ALIAS feature), separate from this.



## STEP-2: Deploy the angular app
- Copy the contents of the generated `dist` directory to `docs` in the `gh-pages` branch.

### IMPORTANT
- Update the `portfolio-data.yaml` URL from the default `/assets/data/portfolio-data.yaml` to any other remote URL. As of now it is set to raw github url: `https://raw.githubusercontent.com/sriram-ponangi/sriram-ponangi.github.io/refs/heads/portfolio-data/assets/data/portfolio-data.yaml` 
- For local development, you can use the default URL. Use the raw github url when deploying to github pages to avoid rebuild and redeploy on every data update.

- Commit and push the code to `gh-pages` branch.

- Go to the repository's settings in the GitHub and update the GitHub Pages build & deployment section as follows:
    - source to `deploy from a branch`
    - branch name to `gh-pages`
    - directory to `docs`