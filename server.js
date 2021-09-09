// require necessary requirements
const express = require("express");
const helmet = require("helmet");
const fetch = require("node-fetch");

//  create instance of express
const app = express();

// tell app to use json functionality
// tell app to use url encoding
// tell app to use helmet
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// set the Express server on which port it will run on.
const PORT = process.env.PORT || 5000;

// create gitlabUserObject
let gitlabUserObject = [
  {
    gitlabUserName: "",
    gitlabProfilePicture: "",
    Repository1: {
      gitlabCommitMessage1: "",
      gitlabCommitMessage2: "",
      gitlabCommitMessage3: "",
      gitlabCommitMessage4: "",
      gitlabCommitMessage5: "",
    },
    Repository2: {
      gitlabCommitMessage1: "",
      gitlabCommitMessage2: "",
      gitlabCommitMessage3: "",
      gitlabCommitMessage4: "",
      gitlabCommitMessage5: "",
    },
    Repository3: {
      gitlabCommitMessage1: "",
      gitlabCommitMessage2: "",
      gitlabCommitMessage3: "",
      gitlabCommitMessage4: "",
      gitlabCommitMessage5: "",
    },
    Repository4: {
      gitlabCommitMessage1: "",
      gitlabCommitMessage2: "",
      gitlabCommitMessage3: "",
      gitlabCommitMessage4: "",
      gitlabCommitMessage5: "",
    },
    Repository5: {
      gitlabCommitMessage1: "",
      gitlabCommitMessage2: "",
      gitlabCommitMessage3: "",
      gitlabCommitMessage4: "",
      gitlabCommitMessage5: "",
    },
  },
];

// create githubUserObject
let githubUserObject = [
  {
    githubProfilePicture: "",
    githubBio: "",
    githubCompany: "",
    githubLocation: "",
    githubEmail: "",
    githubReposNumber: "",
    Repository1: {
      githubCommitMessage1: "",
      githubCommitMessage2: "",
      githubCommitMessage3: "",
      githubCommitMessage4: "",
      githubCommitMessage5: "",
    },
    Repository2: {
      githubCommitMessage1: "",
      githubCommitMessage2: "",
      githubCommitMessage3: "",
      githubCommitMessage4: "",
      githubCommitMessage5: "",
    },
    Repository3: {
      githubCommitMessage1: "",
      githubCommitMessage2: "",
      githubCommitMessage3: "",
      githubCommitMessage4: "",
      githubCommitMessage5: "",
    },
    Repository4: {
      githubCommitMessage1: "",
      githubCommitMessage2: "",
      githubCommitMessage3: "",
      githubCommitMessage4: "",
      githubCommitMessage5: "",
    },
    Repository5: {
      githubCommitMessage1: "",
      githubCommitMessage2: "",
      githubCommitMessage3: "",
      githubCommitMessage4: "",
      githubCommitMessage5: "",
    },
  },
];

// create empty variable to store githubUser
let githubUser = "";

// create asynchronous function to fetch all githubUserData
async function fetchGithub(user) {
  // create variable to store fetched user data
  let userData = await fetch("https://api.github.com/users/" + user).then(
    (response) => response.json()
  );

  // check if a message is returned and check if the message is "not found"
  if (userData.message !== "Not Found" && userData.message === undefined) {
    // store fetched data in respective variables
    let githubProfilePicture = await userData.avatar_url;
    let githubBio = await userData.bio;
    let githubCompany = await userData.company;
    let githubLocation = await userData.location;
    let githubEmail = await userData.email;
    let githubReposNumber = await userData.public_repos;

    // store fetched data in github user Object
    githubUserObject[0].githubProfilePicture = githubProfilePicture;
    githubUserObject[0].githubBio = githubBio;
    githubUserObject[0].githubCompany = githubCompany;
    githubUserObject[0].githubLocation = githubLocation;
    githubUserObject[0].githubEmail = githubEmail;
    githubUserObject[0].githubReposNumber = githubReposNumber;

    // create variable to store fetched repo data
    let reposData = await fetch(
      "https://api.github.com/users/" + user + "/repos"
    ).then((response) => response.json());

    // create empty variable to store commit data
    let commitData = "";

    // check if repoData is undefined
    if (reposData[0] !== undefined) {
      for (i = 0; i < 5; i++) {
        // store fetched data in respective variables
        let githubRepoName = await reposData[i].name;
        let githubRepoURL = await reposData[i].html_url;
        let githubRepoDescription = await reposData[i].description;
        let githubRepoLastCommit = await reposData[i].updated_at;
        let githubRepoDateCreated = await reposData[i].created_at;

        // store fetched data in github user Object
        githubUserObject[0]["Repository" + (i + 1)]["githubRepoName"] =
          githubRepoName;
        githubUserObject[0]["Repository" + (i + 1)]["githubRepoURL"] =
          githubRepoURL;
        githubUserObject[0]["Repository" + (i + 1)]["githubRepoDescription"] =
          githubRepoDescription;
        githubUserObject[0]["Repository" + (i + 1)]["githubRepoLastCommit"] =
          githubRepoLastCommit;
        githubUserObject[0]["Repository" + (i + 1)]["githubRepoDateCreated"] =
          githubRepoDateCreated;

        // assign fetched commit data to variable
        commitData = await fetch(
          "https://api.github.com/repos/" +
            user +
            "/" +
            reposData[i].name +
            "/commits"
        ).then((response) => response.json());

        // loop through five repositories
        for (j = 0; j < 5; j++) {
          // loop through five commit messages in each repository
          for (z = 0; z < 5; z++) {
            if (commitData[z] !== undefined) {
              // create variable to store fetched commit messages and to remove any line separators
              let githubCommitMessage = await commitData[
                z
              ].commit.message.replace(/\n/g, " ");

              // store fetched data in github user Object
              githubUserObject[0]["Repository" + (j + 1)][
                "githubCommitMessage" + (z + 1)
              ] = githubCommitMessage;
            }
          }
        }
      }
      // assign the github user object to the github user variable
      githubUser = githubUserObject;
      // console.log(githubUserObject);
    } else {
      // assign the github user object to the github user variable
      githubUser = githubUserObject;
      // create repo message if user has no projects
      githubUser.repoMessage = "Projects Do Not Exist";
    }
  } else {
    // create user message if user does not exist
    githubUser = { userMessage: "User Does Not Exist" };
  }
}

// create empty variable to store gitlabUser
let gitlabUser = "";

// create asynchronous function to fetch all gitlabUserData
async function fetchGitlab(user) {
  // create variable to store fetched user data
  let gitlabUserData = await fetch(
    "https://gitlab.com/api/v4/users?username=" + user
  ).then((response) => response.json());

  // check if gitlabUserData is undefined
  if (gitlabUserData[0] !== undefined) {
    // store fetched data in respective variables
    let gitlabUserName = await gitlabUserData[0].name;
    let gitlabProfilePicture = await gitlabUserData[0].avatar_url;

    // store fetched data in gitlabUserObject
    gitlabUserObject[0].gitlabUserName = gitlabUserName;
    gitlabUserObject[0].gitlabProfilePicture = gitlabProfilePicture;

    // create variable to store fetched repo data
    let gitlabRepoData = await fetch(
      "https://gitlab.com/api/v4/users/" + user + "/projects"
    ).then((response) => response.json());

    // check if gitlabRepoData is undefined
    if (gitlabRepoData[0] !== undefined) {
      for (i = 0; i < 5; i++) {
        // store fetched data in respective variables
        let gitlabRepoName = await gitlabRepoData[i].name;
        let gitlabRepoURL = await gitlabRepoData[i].web_url;
        let gitlabRepoDescription = await gitlabRepoData[i].description;
        let gitlabRepoLastCommit = await gitlabRepoData[i].last_activity_at;
        let gitlabRepoDateCreated = await gitlabRepoData[i].created_at;

        // store fetched data in gitlabUserObject
        gitlabUserObject[0]["Repository" + (i + 1)]["gitlabRepoName"] =
          gitlabRepoName;
        gitlabUserObject[0]["Repository" + (i + 1)]["gitlabRepoURL"] =
          gitlabRepoURL;
        gitlabUserObject[0]["Repository" + (i + 1)]["gitlabRepoDescription"] =
          gitlabRepoDescription;
        gitlabUserObject[0]["Repository" + (i + 1)]["gitlabRepoLastCommit"] =
          gitlabRepoLastCommit;
        gitlabUserObject[0]["Repository" + (i + 1)]["gitlabRepoDateCreated"] =
          gitlabRepoDateCreated;

        // create variable to store fetched commit data
        gitlabCommitData = await fetch(
          "https://gitlab.com/api/v4/projects/" +
            gitlabRepoData[0].id +
            "/repository/commits"
        ).then((response) => response.json());

        // loop through five repositories
        for (j = 0; j < 5; j++) {
          // loop through five commit messages in each repository
          for (z = 0; z < 5; z++) {
            if (gitlabCommitData[z] !== undefined) {
              // create variable to store fetched commit messages and to remove any line separators
              let gitlabCommitMessage = await gitlabCommitData[
                z
              ].message.replace(/\n/g, " ");

              // store fetched data in gitlab user Object
              gitlabUserObject[0]["Repository" + (j + 1)][
                "gitlabCommitMessage" + (z + 1)
              ] = gitlabCommitMessage;
            }
          }
        }
      }
      // assign the gitlab user object to the gitlab user variable
      gitlabUser = gitlabUserObject;
    } else {
      // create repo message if user has no projects
      gitlabUser[0].repoMessage = "Projects Do Not Exist";
    }
  } else {
    // create user message if user has no projects
    gitlabUser = { userMessage: "User Does Not Exist" };
  }
}

// create post endpoint
app.post("/postGithubUser", (req, res) => {
  // fetch user name from posted body
  const user = req.body.user;

  // over write githubUserObject with empty github user object
  githubUserObject = [
    {
      githubProfilePicture: "",
      githubBio: "",
      githubCompany: "",
      githubLocation: "",
      githubEmail: "",
      githubReposNumber: "",
      Repository1: {
        githubCommitMessage1: "",
        githubCommitMessage2: "",
        githubCommitMessage3: "",
        githubCommitMessage4: "",
        githubCommitMessage5: "",
      },
      Repository2: {
        githubCommitMessage1: "",
        githubCommitMessage2: "",
        githubCommitMessage3: "",
        githubCommitMessage4: "",
        githubCommitMessage5: "",
      },
      Repository3: {
        githubCommitMessage1: "",
        githubCommitMessage2: "",
        githubCommitMessage3: "",
        githubCommitMessage4: "",
        githubCommitMessage5: "",
      },
      Repository4: {
        githubCommitMessage1: "",
        githubCommitMessage2: "",
        githubCommitMessage3: "",
        githubCommitMessage4: "",
        githubCommitMessage5: "",
      },
      Repository5: {
        githubCommitMessage1: "",
        githubCommitMessage2: "",
        githubCommitMessage3: "",
        githubCommitMessage4: "",
        githubCommitMessage5: "",
      },
    },
  ];

  // fetch new github user data
  fetchGithub(user);
  // respond with user
  res.json(user);
});

// create post endpoint
app.post("/postGitlabUser", (req, res) => {
  // fetch user name from posted body
  const user = req.body.user;

  // over write gitlabUserrObject with empty gitlab User object
  gitlabUser = [
    {
      gitlabUserName: "",
      gitlabProfilePicture: "",
      Repository1: {
        gitlabCommitMessage1: "",
        gitlabCommitMessage2: "",
        gitlabCommitMessage3: "",
        gitlabCommitMessage4: "",
        gitlabCommitMessage5: "",
      },
      Repository2: {
        gitlabCommitMessage1: "",
        gitlabCommitMessage2: "",
        gitlabCommitMessage3: "",
        gitlabCommitMessage4: "",
        gitlabCommitMessage5: "",
      },
      Repository3: {
        gitlabCommitMessage1: "",
        gitlabCommitMessage2: "",
        gitlabCommitMessage3: "",
        gitlabCommitMessage4: "",
        gitlabCommitMessage5: "",
      },
      Repository4: {
        gitlabCommitMessage1: "",
        gitlabCommitMessage2: "",
        gitlabCommitMessage3: "",
        gitlabCommitMessage4: "",
        gitlabCommitMessage5: "",
      },
      Repository5: {
        gitlabCommitMessage1: "",
        gitlabCommitMessage2: "",
        gitlabCommitMessage3: "",
        gitlabCommitMessage4: "",
        gitlabCommitMessage5: "",
      },
    },
  ];

  // fetch new github user data
  fetchGitlab(user);

  // respond with user
  res.json(user);
});

app.get("/getGithubUser", (req, res) => {
  setTimeout(() => {
    res.json(githubUser);
  }, 6000);
});

app.get("/getGitlabUser", (req, res) => {
  setTimeout(() => {
    res.json(gitlabUser);
  }, 6000);
});

// This displays message that the server running and listening to specified port
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
