import * as React from 'react';

interface IHomeSate {

}

interface IHomeProps {
    user: IUser
}

interface IUser {
    id: number,
    title: string,
    userId: number
    completed: boolean
}

export class Home extends React.Component<IHomeProps, IHomeSate> {

    constructor(props: IHomeProps) {
        super(props);

        this.state = {
            user: {} as IUser
        };
    }

    public render() {
        return (
            <div>
                <div>
                    Id: { this.props.user.id }
                </div>
                <div>
                    Title: { this.props.user.title }
                </div>
                <div>
                    Completed: { this.props.user.completed }
                </div>
            </div>
        );
    }
}

