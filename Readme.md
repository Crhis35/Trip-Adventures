# Trip Adventures

(insert Trip Adventures description)

## Starting  ð

These instructions will allow you to get a copy of the project running on your local machine for development and testing purposes.

See **Deployment** to know how to deploy the project.

### Pre-requirements ð

To use the project it is necessary to install Node or docker.

Please read the documentation to add, remove or update the project, below some of the most used commands

[Workflows doc](https://docs.docker.com/)

### **List of commands**

- `yarn install`
- `yarn start`

### Installation  ð§

Docker supports running a local server for mocking and testing your application before pushing to the reposityory, After running docker on the root of the project.

## Folder structure ðĶī

    .
    âââ src                     # Source files (alternatively `lib` or `app`)
    â   âââ assets              # Icons, Images, fonts
    â   âââ components          # Components and views
    â   âââ layouts             # AppBars, TopBar, Footer
    â   âââ react-query       # Configuration for react query
    â   âââ redux               # Configuration for redux
    â   âââ services            # All API logic
    â   âââ shared              # Components, logic, hooks that could be re-used
    â   âââ styles              # Global styles
    â   âââ utils               # Shared functions to be used across the app
    âââ public                  # Tools and utilities
    âââ README.md

## Running the tests âïļ

We use [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/)

```sh
yarn test
```

### Analyze end-to-end tests  ðĐ

We use [Cypress](https://docs.cypress.io/guides/overview/why-cypress)

```sh
npx cypress open
```

or

```sh
yarn run cypress open
```

## Encoding style  âĻïļ

**Getting started with [React Styleguidist](./STYLEGUIDE.md)**

## Built with  ð ïļ

- [ReactJS](https://reactjs.org/docs/getting-started.html)  - **React** is a JavaScript library for building user interfaces

- [yarn](https://yarnpkg.com/) is the default package management system

- [Mui](https://mui.com/getting-started/usage/) is the default libray for styling

- [React Hook Form](https://react-hook-form.com/) is the default libray for handle forms

- [React Query](https://react-query.tanstack.com/overview) data-fetching library for React.

- [Redux Tolkit](https://redux-toolkit.js.org/introduction/getting-started) is the default libray for styling

- [Styled components](https://styled-components.com/docs) isolated style for components

- [GitLab](https://about.gitlab.com/) - Version control systems

## Contributing  ðïļ

To contribute to the project please follow the steps below, do not forget to describe the changes in the pull request and comment on it by slack in the corresponding channel.

1. Fork of the repository.
2. Clone the repository.
3. Update the master branch.
4. Create a branch.
5. Make changes.
6. Make a Pull Request.

## Wiki  ð

[Trip Adventures wiki](https://google.com)

## Versionado  ð

We use [SemVer] (<http://semver.org/>) for versioning. For all available versions, check out the [tags in this repository]

_To start using tags in git read the following [documentation](https://www.atlassian.com/git/tutorials/inspecting-a-repository/git-tag)_

## Authors  âïļ

Mention all those who helped build the project since its inception.

- **Crhistian Caraballo**
- **Esteban Castilla**

## Expressions of Gratitude  ð

- Tell others about this project ðĒ
- Invite a beer ðš or a coffee â to someone from the team.
- Give thanks publicly ðĪ.
  