import { GithubIssuePayload, GithubStarPayload } from "../../../interfaces";


export class GithubService {
  constructor(){}

  onStar(payload: GithubStarPayload): string {
    const { action, sender, repository } = payload;

    return `User ${ sender.login } ${action} star on ${ repository.full_name }`;    
  }

  onIssue(payload: GithubIssuePayload): string {
    const { action, issue } = payload;

    if (action === 'opened') {
        return `An issue was opened with title: ${issue.title} by user: ${issue.user.login}`;
    }

    if (action === 'closed') {
        return `An issue was closed with title: ${issue.title} by user: ${issue.user.login}`;
    }

    if (action === 'reopened') {
        return `An issue was reopened with title: ${issue.title} by user: ${issue.user.login}`;
    }

    return `Anhundled action for the issue event: ${ action }` ;
  }
}