// import requirements
import React, { Component } from "react";

// create connect express class
export class ConnectExpress extends Component {
  // create constructor with props as argument
  constructor(props) {
    // call super to implement constructor of React Component Class
    super(props);

    // create initial state object
    this.state = {
      loading: false,
      githubUserInfo: [],
      gitlabUserInfo: [],
    };

    // bind this to functions
    this.renderGithubUserInformation =
      this.renderGithubUserInformation.bind(this);
    this.renderGithubRepoInformation =
      this.renderGithubRepoInformation.bind(this);
    this.renderGitlabUserInformation =
      this.renderGitlabUserInformation.bind(this);
    this.renderGitlabRepoInformation =
      this.renderGitlabRepoInformation.bind(this);
  }

  // create function to fetch github user from express server
  fetchGithubUser() {
    // set state of loading to true
    this.setState({ loading: true });
    // wait 6 seconds and then fetch github user
    setTimeout(() => {
      fetch("/getGithubUser")
        .then((response) => response.json())
        .then((githubUserInfo) => {
          // set state of githubUserInfo
          this.setState({ githubUserInfo });
          // set state of loading to false
          this.setState(
            {
              loading: false,
            },
            () => console.log("Github User Fetched", githubUserInfo)
          );
        })
        .catch((error) => console.log("ERROR: " + error));
    }, 6000);
  }

  // create function to fetch gitlab user from express server
  fetchGitlabUser() {
    // set state of loading to true
    this.setState({ loading: true });
    // wait 6 seconds and then fetch gitlab user
    setTimeout(() => {
      fetch("/getGitlabUser")
        .then((response) => response.json())
        .then((gitlabUserInfo) => {
          // set state of gitlabUserInfo
          this.setState({ gitlabUserInfo });
          // set state of loading to false
          this.setState(
            {
              loading: false,
            },
            () => console.log("User Fetched", gitlabUserInfo)
          );
        })
        .catch((error) => console.log("ERROR: " + error));
    }, 6000);
  }

  // call fetch github and gitlab when component mounts
  componentDidMount() {
    this.fetchGithubUser();
    this.fetchGitlabUser();
  }

  // function to render GitlabUserInformation
  renderGitlabUserInformation() {
    // if user message exists
    if (this.state.gitlabUserInfo.userMessage !== undefined) {
      // return message
      return (
        <div>
          <br></br>
          <hr></hr>
          <ul>
            <h1>Gitlab {this.state.gitlabUserInfo.userMessage}</h1>
          </ul>
        </div>
      );
    } else {
      return (
        <div>
          <br></br>
          <hr></hr>
          <ul>
            <h1>GITLAB USER</h1>
            {/* map through gitlabUserInfo and extract respective information */}
            {this.state.gitlabUserInfo.map((gitlabUserInfo, index) => (
              <div>
                <li key={index++}>
                  {gitlabUserInfo.gitlabUserName === ""
                    ? "No Username Information In Profile"
                    : gitlabUserInfo.gitlabUserName}
                </li>
                <br></br>
                <li key={index++}>
                  {gitlabUserInfo.gitlabProfilePicture === "" ? (
                    "No Profile Picture Information In Profile"
                  ) : (
                    <a href={gitlabUserInfo.gitlabProfilePicture}>
                      Profile Picture
                    </a>
                  )}
                </li>
              </div>
            ))}
          </ul>
        </div>
      );
    }
  }

  // function to render GitlabRepoInformation
  renderGitlabRepoInformation(i) {
    // if user message exists
    if (this.state.gitlabUserInfo.userMessage !== undefined) {
      // return empty div
      return <div></div>;
    } else {
      // if gitlabUserInfo has not been updated
      if (this.state.gitlabUserInfo === []) {
        // return empty div
        return <div></div>;
      } else {
        // if repo message exists
        if (this.state.gitlabUserInfo.repoMessage !== undefined) {
          // return empty div
          return <div></div>;
        } else {
          return (
            <div>
              <ul>
                {/* map through gitlab user info and return respective information */}
                {this.state.gitlabUserInfo.map((gitlabUserInfo, index) => {
                  return (
                    <div>
                      {gitlabUserInfo["Repository" + i].gitlabRepoName ===
                      undefined ? (
                        <div></div>
                      ) : (
                        <div>
                          <h1>GITLAB REPOSITORY {i}</h1>
                          <li key={index++}>
                            {"Repository Name: " +
                              gitlabUserInfo["Repository" + i].gitlabRepoName}
                          </li>
                          <br></br>
                          <li key={index++}>
                            <a
                              href={
                                gitlabUserInfo["Repository" + i].gitlabRepoURL
                              }
                            >
                              REPOSITORY LINK
                            </a>
                          </li>
                          <br></br>
                          <li key={index++}>
                            {gitlabUserInfo["Repository" + i]
                              .gitlabRepoDescription === null
                              ? "No Descrition Information In Repository"
                              : "Repository Description: " +
                                gitlabUserInfo["Repository" + i]
                                  .gitlabRepoDescription}
                          </li>
                          <br></br>
                          <li key={index++}>
                            {gitlabUserInfo["Repository" + i]
                              .gitlabRepoLastCommit === null
                              ? "No Commit Information In Repository"
                              : "Date Of Last Commit: " +
                                gitlabUserInfo["Repository" + i]
                                  .gitlabRepoLastCommit}
                          </li>
                          <br></br>
                          <li key={index++}>
                            {gitlabUserInfo["Repository" + i]
                              .gitlabRepoDateCreated === null
                              ? "No Creation Date Information In Repository"
                              : "Date Of Creation: " +
                                gitlabUserInfo["Repository" + i]
                                  .gitlabRepoDateCreated}
                          </li>
                          <br></br>
                          <li key={index++}>
                            {gitlabUserInfo["Repository" + i]
                              .gitlabCommitMessage1 === null
                              ? "No Commit Information In Profile"
                              : "Commit Message 1: " +
                                gitlabUserInfo["Repository" + i]
                                  .gitlabCommitMessage1}
                          </li>
                          <br></br>
                          <li key={index++}>
                            {gitlabUserInfo["Repository" + i]
                              .gitlabCommitMessage2 === null
                              ? "No Commit Information In Profile"
                              : "Commit Message 2: " +
                                gitlabUserInfo["Repository" + i]
                                  .gitlabCommitMessage2}
                          </li>
                          <br></br>
                          <li key={index++}>
                            {gitlabUserInfo["Repository" + i]
                              .gitlabCommitMessage3 === null
                              ? "No Commit Information In Profile"
                              : "Commit Message 3: " +
                                gitlabUserInfo["Repository" + i]
                                  .gitlabCommitMessage3}
                          </li>
                          <br></br>
                          <li key={index++}>
                            {gitlabUserInfo["Repository" + i]
                              .gitlabCommitMessage4 === null
                              ? "No Commit Information In Profile"
                              : "Commit Message 4: " +
                                gitlabUserInfo["Repository" + i]
                                  .gitlabCommitMessage4}
                          </li>
                          <br></br>
                          <li key={index++}>
                            {gitlabUserInfo["Repository" + i]
                              .gitlabCommitMessage5 === null
                              ? "No Commit Information In Profile"
                              : "Commit Message 5: " +
                                gitlabUserInfo["Repository" + i]
                                  .gitlabCommitMessage5}
                          </li>
                        </div>
                      )}
                    </div>
                  );
                })}
              </ul>
            </div>
          );
        }
      }
    }
  }
  // function to render GithubUserInformation
  renderGithubUserInformation() {
    // if user message exists
    if (this.state.githubUserInfo.userMessage !== undefined) {
      // return message
      return (
        <div>
          <hr></hr>
          <ul>
            <h1>Github {this.state.githubUserInfo.userMessage}</h1>
          </ul>
        </div>
      );
    } else {
      return (
        <div>
          <hr></hr>
          <ul>
            <h1>GITHUB USER</h1>
            {/* map through github user info and return respective information */}
            {this.state.githubUserInfo.map((githubUserInfo, index) => (
              <div>
                <li key={index++}>
                  <a href={githubUserInfo.githubProfilePicture}>
                    Profile Picture
                  </a>
                </li>
                <br></br>
                <li key={index++}>
                  {githubUserInfo.githubBio === null ||
                  githubUserInfo.githubBio === undefined
                    ? "No Bio Information In Profile"
                    : githubUserInfo.githubBio}
                </li>
                <br></br>
                <li key={index++}>
                  {githubUserInfo.githubCompany === null ||
                  githubUserInfo.githubBio === undefined
                    ? "No Company Information In Profile"
                    : githubUserInfo.githubCompany}
                </li>
                <br></br>
                <li key={index++}>
                  {githubUserInfo.githubEmail === null ||
                  githubUserInfo.githubBio === undefined
                    ? "No Email Information In Profile"
                    : githubUserInfo.githubEmail}
                </li>
                <br></br>
                <li key={index++}>
                  {githubUserInfo.githubLocation === null ||
                  githubUserInfo.githubBio === undefined
                    ? "No Location Information In Profile"
                    : githubUserInfo.githubLocation}
                </li>
                <br></br>
                <li key={index++}>
                  {githubUserInfo.githubReposNumber === null ||
                  githubUserInfo.githubBio === undefined
                    ? "No Repos In Profile"
                    : "Number Of Public Repositories: " +
                      githubUserInfo.githubReposNumber}
                </li>
              </div>
            ))}
          </ul>
        </div>
      );
    }
  }
  // function to render GithubUserInformation
  renderGithubRepoInformation(i) {
    // if user message exists
    if (this.state.githubUserInfo.userMessage !== undefined) {
      // return empty div
      return <div></div>;
    } else {
      // if githubUserInfo has not been updated
      if (this.state.githubUserInfo === []) {
        // return empty div
        return <div></div>;
      } else {
        // if repo message exists
        if (this.state.githubUserInfo.repoMessage !== undefined) {
          // return empty div
          return <div></div>;
        } else {
          return (
            <div>
              <ul>
                {/* map through githubUserInfo and return respective information */}
                {this.state.githubUserInfo.map((githubUserInfo, index) => {
                  return (
                    <div>
                      {githubUserInfo["Repository" + i].githubRepoName ===
                      undefined ? (
                        <div></div>
                      ) : (
                        <div>
                          <h1>GITHUB REPOSITORY {i}</h1>
                          <li key={index++}>
                            {"Repository Name: " +
                              githubUserInfo["Repository" + i].githubRepoName}
                          </li>
                          <br></br>
                          <li key={index++}>
                            <a
                              href={
                                githubUserInfo["Repository" + i].githubRepoURL
                              }
                            >
                              REPOSITORY LINK
                            </a>
                          </li>
                          <br></br>
                          <li key={index++}>
                            {githubUserInfo["Repository" + i]
                              .githubRepoDescription === null
                              ? "No Descrition Information In Repository"
                              : "Repository Description: " +
                                githubUserInfo["Repository" + i]
                                  .githubRepoDescription}
                          </li>
                          <br></br>
                          <li key={index++}>
                            {githubUserInfo["Repository" + i]
                              .githubRepoLastCommit === null
                              ? "No Commit Information In Repository"
                              : "Date Of Last Commit: " +
                                githubUserInfo["Repository" + i]
                                  .githubRepoLastCommit}
                          </li>
                          <br></br>
                          <li key={index++}>
                            {githubUserInfo["Repository" + i]
                              .githubRepoDateCreated === null
                              ? "No Creation Date Information In Repository"
                              : "Date Of Creation: " +
                                githubUserInfo["Repository" + i]
                                  .githubRepoDateCreated}
                          </li>
                          <br></br>
                          <li key={index++}>
                            {githubUserInfo["Repository" + i]
                              .githubCommitMessage1 === null
                              ? "No Commit Information In Profile"
                              : "Commit Message 1: " +
                                githubUserInfo["Repository" + i]
                                  .githubCommitMessage1}
                          </li>
                          <br></br>
                          <li key={index++}>
                            {githubUserInfo["Repository" + i]
                              .githubCommitMessage2 === null
                              ? "No Commit Information In Profile"
                              : "Commit Message 2: " +
                                githubUserInfo["Repository" + i]
                                  .githubCommitMessage2}
                          </li>
                          <br></br>
                          <li key={index++}>
                            {githubUserInfo["Repository" + i]
                              .githubCommitMessage3 === null
                              ? "No Commit Information In Profile"
                              : "Commit Message 3: " +
                                githubUserInfo["Repository" + i]
                                  .githubCommitMessage3}
                          </li>
                          <br></br>
                          <li key={index++}>
                            {githubUserInfo["Repository" + i]
                              .githubCommitMessage4 === null
                              ? "No Commit Information In Profile"
                              : "Commit Message 4: " +
                                githubUserInfo["Repository" + i]
                                  .githubCommitMessage4}
                          </li>
                          <br></br>
                          <li key={index++}>
                            {githubUserInfo["Repository" + i]
                              .githubCommitMessage5 === null
                              ? "No Commit Information In Profile"
                              : "Commit Message 5: " +
                                githubUserInfo["Repository" + i]
                                  .githubCommitMessage5}
                          </li>
                        </div>
                      )}
                    </div>
                  );
                })}
              </ul>
            </div>
          );
        }
      }
    }
  }

  // render function to display respective information
  render() {
    // while loading state is true
    while (this.state.loading === true) {
      // return loading
      return <p className="loadingMessage">Loading User Information...</p>;
    }
    // store render information in respective variables
    let githubUserInfo = this.renderGithubUserInformation();
    let githubRepoInfo1 = this.renderGithubRepoInformation(1);
    let githubRepoInfo2 = this.renderGithubRepoInformation(2);
    let githubRepoInfo3 = this.renderGithubRepoInformation(3);
    let githubRepoInfo4 = this.renderGithubRepoInformation(4);
    let githubRepoInfo5 = this.renderGithubRepoInformation(5);

    // store render information in respective variables
    let gitlabUserInfo = this.renderGitlabUserInformation();
    let gitlabRepoInfo1 = this.renderGitlabRepoInformation(1);
    let gitlabRepoInfo2 = this.renderGitlabRepoInformation(2);
    let gitlabRepoInfo3 = this.renderGitlabRepoInformation(3);
    let gitlabRepoInfo4 = this.renderGitlabRepoInformation(4);
    let gitlabRepoInfo5 = this.renderGitlabRepoInformation(5);

    // return respective elements to be rendered
    return (
      <div>
        <div>
          <div>{githubUserInfo}</div>
          <div>{githubRepoInfo1}</div>
          <div>{githubRepoInfo2}</div>
          <div>{githubRepoInfo3}</div>
          <div>{githubRepoInfo4}</div>
          <div>{githubRepoInfo5}</div>
        </div>
        <div>
          <div>{gitlabUserInfo}</div>
          <div>{gitlabRepoInfo1}</div>
          <div>{gitlabRepoInfo2}</div>
          <div>{gitlabRepoInfo3}</div>
          <div>{gitlabRepoInfo4}</div>
          <div>{gitlabRepoInfo5}</div>
        </div>
      </div>
    );
  }
}

// export default element
export default ConnectExpress;
