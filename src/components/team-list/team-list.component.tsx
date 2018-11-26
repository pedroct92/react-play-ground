import * as React from 'react';
import { Team } from '../../models/team.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from 'src/api/api.service';
import { LoadingComponent } from '../loading/loading.component';
import { ErrorComponent } from '../error/error.component';
import { TeamTableComponent } from '../team-table/team-table.component';

interface TeamListSate {
    teams: Array<Team>;
    loading: boolean;
    error: boolean;
}

export class TeamListComponent extends React.Component<{}, TeamListSate> {

    private apiService: ApiService;
    private unMount: Subject<boolean>;

    constructor(props: any) {
        super(props);

        this.state = {
            teams: [],
            loading: true,
            error: false
        };
        this.apiService = new ApiService();
        this.unMount = new Subject();
    }

    public render() {
        return (
            <div>
                <h1> Awesome Teams </h1>
                {this.renderTeams()}
            </div>
        );
    }

    public componentWillUnmount() {
        this.unMount.next(true);
    }

    public componentWillMount() {
        this.loadTeams();
    }

    private loadTeams(): void {
        this.apiService.getTeams()
            .pipe(takeUntil(this.unMount))
            .subscribe(teams => {
                this.setState({
                    teams: teams,
                    loading: false
                });
            }, () => {
                this.setState({
                    loading: false,
                    error: true
                })
            });
    }

    private renderTeams() {
        if (this.state.loading) {
            return <LoadingComponent />;
        }

        if (this.state.error) {
            return <ErrorComponent />;
        }
        return <TeamTableComponent teams={this.state.teams} />;
    }
}

