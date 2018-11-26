import * as React from 'react';
import { Link } from 'react-router-dom';
import { Team } from 'src/models/team.model';
import { Member } from 'src/models/member.model';

interface TeamDetailsProps {
    team: Team;
    lead: Member;
    members: Array<Member>;
}

export class TeamDetailsComponent extends React.Component<TeamDetailsProps, {}> {

    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <div className="stretch">
                <div>
                    <h1>
                        {this.props.team.name}
                    </h1>
                    <h2>Lead: {this.props.lead.name} </h2>
                    <h2>Members</h2>
                    <table className="stretch-half">
                        <thead>
                            <tr>
                                <td>
                                    Name
                                </td>
                                <td>
                                    User name
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.members.map(member => (
                                <tr key={member.id}>
                                    <td>
                                        {member.name}
                                    </td>
                                    <td>
                                        {member.username}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Link to={"/teams/"}>Back</Link>
            </div>
        );
    }
}