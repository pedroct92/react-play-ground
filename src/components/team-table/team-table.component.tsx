import * as React from 'react';
import { Team } from '../../models/team.model';
import { Link } from "react-router-dom";

interface TeamsProps {
    teams: Array<Team>;
}

export class TeamTableComponent extends React.Component<TeamsProps, {}> {

    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <div className="stretch">
                <table className="stretch-half">
                    <thead>
                        <tr>
                            <td> Id </td>
                            <td> Name </td>
                            <td> Actions </td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.teams.map(team => (
                            <tr key={team.id}>
                                <td> {team.id} </td>
                                <td> {team.name} </td>
                                <td> <Link to={`/teams/${team.id}`}>See More</Link> </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}