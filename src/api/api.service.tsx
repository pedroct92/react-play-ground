import { Observable, from, forkJoin } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { Team } from 'src/models/team.model';
import { Member } from 'src/models/member.model';

// TODO: This service should be provided to the components by using DI!
export class ApiService {

    private static baseUrl: string = 'https://tempo-test.herokuapp.com/7d1d085e-dbee-4483-aa29-ca033ccae1e4/1/';

    public getTeams(): Observable<Array<Team>> {
        return from(fetch(ApiService.baseUrl + 'team/'))
            .pipe(
                flatMap(response => response.json())
            );
    }

    public getTeamById(teamId: number): Observable<Team> {
        return from(fetch(ApiService.baseUrl + 'team/' + teamId))
            .pipe(
                flatMap(response => response.json())
            );
    }

    public getMembersOfTeam(membersIds: Array<number>): Observable<Array<Member>> {
        return forkJoin(membersIds.map(userId => this.getMemberById(userId))); 
    }

    public getMemberById(memberId: number): Observable<Member> {
        return from(fetch(ApiService.baseUrl + 'user/' + memberId))
            .pipe(
                flatMap(response => response.json())
            );
    }
}