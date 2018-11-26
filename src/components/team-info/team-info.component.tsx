import * as React from 'react';
import { Team } from 'src/models/team.model';
import { Member } from 'src/models/member.model';
import { Subject, forkJoin } from 'rxjs';
import { takeUntil, switchMap, tap } from 'rxjs/operators';
import { ApiService } from 'src/api/api.service';
import { TeamDetailsComponent } from '../team-details/team-details.component';
import { LoadingComponent } from '../loading/loading.component';
import { ErrorComponent } from '../error/error.component';

interface TeamDetailsSate {
    team: Team;
    lead: Member;
    members: Array<Member>;
    loading: boolean;
    error: boolean;
}

interface TeamDetailsProps {
    match: {
        params: {
            id: number
        }
    }
}

export class TeamInfoComponent extends React.Component<TeamDetailsProps, TeamDetailsSate> {

    private apiService: ApiService;
    private unMount: Subject<boolean>;

    constructor(props: any) {
        super(props);

        this.state = {
            team: { } as Team,
            lead: { } as Member,
            members: [],
            loading: true,
            error: false
        };
        this.apiService = new ApiService();
        this.unMount = new Subject();
    }

    public render() {
        if (this.state.loading) {
            return <LoadingComponent />;
        }

        if (this.state.error) {
            return <ErrorComponent />;
        }
        return <TeamDetailsComponent team={this.state.team} lead={this.state.lead} members={this.state.members} />
    }

    public componentWillUnmount() {
        this.unMount.next(true);
    }

    public componentWillMount() {
        this.loadTeam();
    }

    private loadTeam(): void {
        this.apiService.getTeamById(this.props.match.params.id)
            .pipe(takeUntil(this.unMount),
                tap(team => this.setState({ team })),
                switchMap(team => {
                    return forkJoin(this.apiService.getMembersOfTeam(team.members), this.apiService.getMemberById(team.lead));
                })
            ).subscribe(response => {
                this.setState({
                    members: response[0],
                    lead: response[1],
                    loading: false
                });
            }, () => {
                this.setState({
                    loading: false,
                    error: true
                })
            });
    }
}